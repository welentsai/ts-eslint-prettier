import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function'
import { CustomerInfoDto } from "./customerInfo.dto";
import { AddressDto } from "./address.dto";
import { UnvalidatedOrder } from "../domain/input/unvalidatedOrder";
import { OrderLineDto } from "./orderLine.dto";

//===============================================
// DTO for OrderForm
//===============================================
export type OrderFormDto = {
    orderId: string
    customerInfo: CustomerInfoDto
    shippingAddress: AddressDto
    billingAddress: AddressDto
    lines: Array<OrderLineDto>
}

const of: (orderId: string) => (customerInfo: CustomerInfoDto) => (shippingAddress: AddressDto)
    => (billingAddress: AddressDto) => (lines: Array<OrderLineDto>) => OrderFormDto =
    (orderId) => (customerInfo) => (shippingAddress) => (billingAddress) => (lines) => ({
        orderId,
        customerInfo,
        shippingAddress,
        billingAddress,
        lines
    })

type ToUnvalidatedOrder = (dto: OrderFormDto) => UnvalidatedOrder
const toUnvalidatedOrder = (dto: OrderFormDto) => ({
    orderId: dto.orderId,
    customerInfo: CustomerInfoDto.toUnvalidatedCustomerInfo(dto.customerInfo),
    shippingAddress: AddressDto.toUnvalidatedAddress(dto.shippingAddress),
    billingAddress: AddressDto.toUnvalidatedAddress(dto.billingAddress),
    lines: pipe(dto.lines, A.map(OrderLineDto.toUnvalidatedOrderLine))
})

export const OrderFormDto = {
    of,
    toUnvalidatedOrder
}