/// Event to send to shipping context
import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import * as A from 'fp-ts/Array'
import { CustomerInfoDto } from "../customerInfo.dto";
import { AddressDto } from "../address.dto";
import { PricedOrderLineDto } from "../pricedOrderLine.dto";
import { OrderPlaced } from "../../domain/output_event/pricedOrder";

//===============================================
// DTO for OrderPlaced event
//===============================================

/// Event to send to shipping context
export type OrderPlacedDto = {
    orderId: string
    customerInfo: CustomerInfoDto
    shippingAddress: AddressDto
    billingAddress: AddressDto
    amountToBill: number
    lines: Array<PricedOrderLineDto>
}

type FromDomain = (domainObj: OrderPlaced) => OrderPlacedDto
const fromDomain: FromDomain = (domainObj: OrderPlaced) => ({
    orderId: domainObj.orderId,
    customerInfo: CustomerInfoDto.fromCustomerInfo(domainObj.customerInfo),
    shippingAddress: AddressDto.fromAddress(domainObj.shippingAddress),
    billingAddress: AddressDto.fromAddress(domainObj.billingAddress),
    amountToBill: domainObj.amountToBill,
    lines: pipe(domainObj.lines, RA.map(PricedOrderLineDto.fromDomain)).concat()
})

export const OrderPlacedDto = {
    fromDomain
}