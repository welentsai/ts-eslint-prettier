//===============================================
// DTOs for OrderLines
import * as E from 'fp-ts/Either'
import { UnvalidatedOrderLine } from "../domain/input/unvalidatedOrderLine"
import { ParseError } from '@effect/schema/ParseResult'

//===============================================
export type OrderLineDto = {
    orderLineId: string
    productCode: string
    quantity: number
}

const of: (orderLineId: string) => (productCode: string) => (quantity: number) => OrderLineDto =
    (orderLineId) => (productCode) => (quantity) => ({
        orderLineId,
        productCode,
        quantity
    })

type ToUnvalidatedOrderLine = (dto: OrderLineDto) => UnvalidatedOrderLine
const toUnvalidatedOrderLine: ToUnvalidatedOrderLine = (dto: OrderLineDto) => ({
    orderLineId: dto.orderLineId,
    productCode: dto.productCode,
    quantity: dto.quantity
})


export const OrderLineDto = {
    of,
    toUnvalidatedOrderLine
}

