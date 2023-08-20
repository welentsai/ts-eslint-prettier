import { pipe, flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as A from 'fp-ts/Array'
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import * as M from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'
import * as O from 'fp-ts/Option'
import { sequenceS } from 'fp-ts/Apply'
import * as TSP from 'ts-pattern'
// ---------------------------
// ValidateOrder step
// ---------------------------

import { CustomerInfo } from "../common/customerInfo";
import { UnvalidatedCustomerInfo } from "../domain/input/unvalidatedCustomerInfo";
import { CustomerInfoDto } from "../dto/customerInfo.dto";
import { ParseError } from '@effect/schema/ParseResult';
import { AcknowledgeOrder, CheckAddressExists, CheckProductCodeExists, CheckedAddress, CreateEvents, CreateOrderAcknowledgmentLetter, GetProductPrice, OrderAcknowledgment, PriceOrder, SendOrderAcknowledgment, ValidatedOrder, ValidatedOrderLine } from './placeOrder.types';
import { AddressDto } from '../dto/address.dto';
import { Address } from '../common/address';
import { ValidationError } from '../error/validationError';
import { OrderId } from '../common/orderId';
import { OrderLineId } from '../common/orderLineId';
import { ProductCode } from '../common/productCode';
import { OrderQuantity } from '../common/orderQuantity';
import { UnvalidatedOrderLine } from '../domain/input/unvalidatedOrderLine';
import { UnvalidatedOrder } from '../domain/input/unvalidatedOrder';
import { OrderPlaced, PricedOrder, PricedOrderLine } from '../domain/output_event/pricedOrder'
import { Price } from '../common/Price'
import { OrderAcknowledgmentSent } from '../domain/output_event/orderAcknowledgmentSent'
import { BillableOrderPlaced } from '../domain/output_event/billableOrderPlaced'
import { PlaceOrderEventDto } from '../dto/event/placeOrderEvent.dto'
import { PlaceOrderEvent } from '../domain/output_event/placeOrderEvent'

const toCustomerInfo: (unvalidatedCustomerInfo: UnvalidatedCustomerInfo) => E.Either<ParseError, CustomerInfo>
    = (unvalidatedCustomerInfo) => CustomerInfoDto.toCustomerInfo(unvalidatedCustomerInfo)

const toAddress: (checkedAddress: CheckedAddress) => E.Either<ParseError, Address>
    = (checkedAddress) => AddressDto.toAddress(checkedAddress)

const toCheckedAddress: (checkAddress: CheckAddressExists) => (address: Address) => TE.TaskEither<ValidationError, CheckedAddress>
    = (checkAddress: CheckAddressExists) => (address: Address) =>
        pipe(
            address,
            checkAddress,
        )

const toOrderId = (orderId: string) => OrderId.of(orderId)
const toOrderLineId = (orderLineId: string) => OrderLineId.of(orderLineId)

const toProductCode = (checkProductCode: CheckProductCodeExists) => (productCode: string) => pipe(
    productCode,
    ProductCode.of,
    E.chainW(checkProductCode),
)

type Quantity = number | string

// TODO: productCode not used !!!
const toOrderQuantity = (productCode: ProductCode) => (quantity: Quantity) => OrderQuantity.of(quantity)

const toValidatedOrderLine: (checkProductCodeExists: CheckProductCodeExists) => (unvalidatedOrderLine: UnvalidatedOrderLine) => E.Either<ParseError | ValidationError, ValidatedOrderLine>
    = (checkProductCodeExists: CheckProductCodeExists) => (unvalidatedOrderLine: UnvalidatedOrderLine) =>
        pipe(
            {
                orderLineId: toOrderLineId(unvalidatedOrderLine.orderLineId),
                productCode: toProductCode(checkProductCodeExists)(unvalidatedOrderLine.productCode),
                quantity: toOrderQuantity(unvalidatedOrderLine.productCode)(unvalidatedOrderLine.quantity)
            },
            sequenceS(E.Apply)
        )


const toValidateOrder: (checkProductCodeExists: CheckProductCodeExists) => (checkAddressExists: CheckAddressExists) => (unvalidatedOrder: UnvalidatedOrder) => E.Either<ParseError | ValidationError, ValidatedOrder>
    = (checkProductCodeExists) => (checkAddressExists) => (unvalidatedOrder) =>
        pipe(
            {
                orderId: toOrderId(unvalidatedOrder.orderId),
                customerInfo: toCustomerInfo(unvalidatedOrder.customerInfo),
                shippingAddress: toAddress(unvalidatedOrder.shippingAddress),
                billingAddress: toAddress(unvalidatedOrder.billingAddress),
                lines: pipe(
                    unvalidatedOrder.lines,
                    RA.toArray,
                    A.traverse(E.Applicative)(toValidatedOrderLine(checkProductCodeExists)),
                )
            },
            sequenceS(E.Apply),
        )


// ---------------------------
// PriceOrder step
// ---------------------------

const toPricedOrderLine: (getProductPrice: GetProductPrice) => (validatedOrderLine: ValidatedOrderLine) => PricedOrderLine
    = (getProductPrice) => (validatedOrderLine) => {
        const qty = validatedOrderLine.quantity
        const price = getProductPrice(validatedOrderLine.productCode)
        const linePrice = Price.multiply(qty)(price)

        return {
            orderLineId: validatedOrderLine.orderLineId,
            productCode: validatedOrderLine.productCode,
            quantity: validatedOrderLine.quantity,
            linePrice
        } as PricedOrderLine
    }

const getSum: (numbers: Array<number>) => number = M.concatAll(
    N.MonoidSum
)

const toPricedOrder: PriceOrder = (getProductPrice: GetProductPrice) => (validatedOrder: ValidatedOrder) => {
    const lines: Array<PricedOrderLine> = pipe(
        validatedOrder.lines,
        A.map(toPricedOrderLine(getProductPrice))
    )
    const amountToBill = pipe(
        lines,
        A.map((pricedOrderline) => pricedOrderline.linePrice),
        getSum
    )

    return E.right({
        orderId: validatedOrder.orderId,
        customerInfo: validatedOrder.customerInfo,
        shippingAddress: validatedOrder.shippingAddress,
        billingAddress: validatedOrder.billingAddress,
        lines,
        amountToBill: amountToBill
    } as PricedOrder)
}

const acknowledgeOrder: AcknowledgeOrder = (createOrderAcknowledgmentLetter) =>
    (sendOrderAcknowledgment) => (pricedOrder) => {
        const letter = createOrderAcknowledgmentLetter(pricedOrder)
        const acknowledgement: OrderAcknowledgment = {
            emailAddress: pricedOrder.customerInfo.emailAddress,
            letter
        }

        return pipe(
            acknowledgement,
            sendOrderAcknowledgment,
            result => TSP.match(result)
                .with('Sent', () => {
                    const event: OrderAcknowledgmentSent = {
                        orderId: pricedOrder.orderId,
                        emailAddress: pricedOrder.customerInfo.emailAddress
                    }
                    return O.some(event)
                })
                .with('NotSent', () => O.none)
                .exhaustive(),
        )

    }


// ---------------------------
// Create events
// ---------------------------

const createOrderPlacedEvent: (placedOrder: PricedOrder) => OrderPlaced = (placedOrder) => placedOrder

const createBillingEvent: (placedOrder: PricedOrder) => O.Option<BillableOrderPlaced>
    = (placedOrder) => {
        const billingAmount = placedOrder.amountToBill
        if (billingAmount > 0) {
            return O.some({
                orderId: placedOrder.orderId,
                billingAddress: placedOrder.billingAddress,
                amountToBill: placedOrder.amountToBill
            })
        } else {
            return O.none
        }
    }


const createEvents: CreateEvents = (pricedOrder: PricedOrder) => (orderAcknowledgmentSent: O.Option<OrderAcknowledgmentSent>) => {
    const acknowledgmentEvents: Array<PlaceOrderEvent> = pipe(
        orderAcknowledgmentSent,
        O.match(
            () => [],
            (orderAcknowledgment) => [orderAcknowledgment]
        )
    )

    const orderPlacedEvents: Array<PlaceOrderEvent> = pipe(
        pricedOrder,
        createOrderPlacedEvent,
        orderPlaced => [orderPlaced]
    )

    const billingEvents: Array<PlaceOrderEvent> = pipe(
        pricedOrder,
        createBillingEvent,
        O.match(
            () => [],
            (billableOrderPlaced) => [billableOrderPlaced]
        )
    )

    return acknowledgmentEvents.concat(orderPlacedEvents, billingEvents)
}

// ---------------------------
// overall workflow
// ---------------------------

const placeOrder = (checkProductExists: CheckProductCodeExists) => (checkAdddressExists: CheckAddressExists) => (getProductPrice: GetProductPrice) =>
    (createOrderAcknowledgeLetter: CreateOrderAcknowledgmentLetter) => (sendOrderAcknowledgement: SendOrderAcknowledgment) => (unvalidatedOrder: UnvalidatedOrder) => {
        pipe(
            unvalidatedOrder,
            toValidateOrder(checkProductExists)(checkAdddressExists),
            E.chainW(toPricedOrder(getProductPrice)),
            E.map((pricedOrder) => pipe(
                pricedOrder,
                acknowledgeOrder(createOrderAcknowledgeLetter)(sendOrderAcknowledgement),
                createEvents(pricedOrder)
            ))
        )
    }