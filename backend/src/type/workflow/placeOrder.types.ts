import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { UnvalidatedAddress } from '../domain/input/unvalidatedAddress'
import { ProductCode } from '../common/productCode'
import { AddressValidationError, ProductCodeValidationError, ValidationError } from '../error/validationError'
import { UnvalidatedOrder } from '../domain/input/unvalidatedOrder'
import { PlaceOrderError } from '../error/placeOrderError'
import { PlaceOrderEvent } from '../domain/output_event/placeOrderEvent'
import { OrderLineId } from '../common/orderLineId'
import { OrderQuantity } from '../common/orderQuantity'
import { OrderId } from '../common/orderId'
import { CustomerInfo } from '../common/customerInfo'
import { Address } from '../common/address'
import { Price } from '../common/Price'
import { PricedOrder } from '../domain/output_event/pricedOrder'
import { PricingError } from '../error/pricingError'
import { EmailAddress } from '../common/emailAddress'
import { OrderAcknowledgmentSent } from '../domain/output_event/orderAcknowledgmentSent'

// ======================================================
// Section 1 : Define each step in the workflow using types
// ======================================================


export type CheckProductCodeExists = (productCode: ProductCode) => E.Either<ProductCodeValidationError, ProductCode>
export type CheckedAddress = UnvalidatedAddress

export type CheckAddressExists = (unvalidatedAddress: UnvalidatedAddress) => TE.TaskEither<AddressValidationError, CheckedAddress>

// type PlaceOrder = (unvalidatedOrder: UnvalidatedOrder) => TE.TaskEither<PlaceOrderError, Array<PlaceOrderEvent>>


// ---------------------------
// Validated Order
// ---------------------------

export type ValidatedOrderLine = {
    orderLineId: OrderLineId
    productCode: ProductCode
    quantity: OrderQuantity
}

export type ValidatedOrder = {
    orderId: OrderId
    customerInfo: CustomerInfo
    shippingAddress: Address
    billingAddress: Address
    lines: Array<ValidatedOrderLine>
}

type ValidateOrder =
    (checkProductCodeExists: CheckProductCodeExists)  // dependency
        => (checkAddressExists: CheckAddressExists)  // dependency
            => (unvalidatedOrder: UnvalidatedOrder)    // input
                => TE.TaskEither<ValidationError, ValidatedOrder> // output


// ---------------------------
// Pricing step
// ---------------------------

export type GetProductPrice = (productCode: ProductCode) => Price

// priced state is defined Domain.WorkflowTypes

export type PriceOrder =
    (getProductPrice: GetProductPrice)     // dependency
        => (validatedOrder: ValidatedOrder)  // input
            => E.Either<PricingError, PricedOrder>  // output


// ---------------------------
// Send OrderAcknowledgment
// ---------------------------

type HtmlString = string

export type OrderAcknowledgment = {
    emailAddress: EmailAddress
    letter: HtmlString
}

export type CreateOrderAcknowledgmentLetter = (pricedOrder: PricedOrder) => HtmlString

/// Send the order acknowledgement to the customer
/// Note that this does NOT generate an Result-type error (at least not in this workflow)
/// because on failure we will continue anyway.
/// On success, we will generate a OrderAcknowledgmentSent event,
/// but on failure we won't.

type SendResult = 'Sent' | 'NotSent'

export type SendOrderAcknowledgment = (orderAcknowledgment: OrderAcknowledgment) => SendResult

export type AcknowledgeOrder =
    (createOrderAcknowledgmentLetter: CreateOrderAcknowledgmentLetter)  // dependency
        => (sendOrderAcknowledgment: SendOrderAcknowledgment)      // dependency
            => (pricedOrder: PricedOrder)                  // input
                => O.Option<OrderAcknowledgmentSent> // output


// ---------------------------
// Create events
// ---------------------------

export type CreateEvents =
    (pricedOrder: PricedOrder)                           // input
        => (orderAcknowledgmentSent: O.Option<OrderAcknowledgmentSent>)    // input (event from previous step)
            => Array<PlaceOrderEvent>              // output


// ======================================================
// Section 2 : Implementation
// ======================================================

