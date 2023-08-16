//===============================================
// DTOs for PricedOrderLines

import { PricedOrderLine } from "../domain/output_event/pricedOrder"

//===============================================
export type PricedOrderLineDto = {
    orderLineId: string
    productCode: string
    quantity: number
    linePrice: number
}

const of: (orderLineId: string, productCode: string, quantity: number, linePrice: number) => PricedOrderLineDto =
    (orderLineId, productCode, quantity, linePrice) => ({
        orderLineId,
        productCode,
        quantity,
        linePrice
    })

type FromDomain = (domainObj: PricedOrderLine) => PricedOrderLineDto
const fromDomain: FromDomain = (domainObj: PricedOrderLine) => ({
    orderLineId: domainObj.orderLineId,
    productCode: domainObj.productCode,
    quantity: domainObj.quantity,
    linePrice: domainObj.linePrice
})

export const PricedOrderLineDto = {
    of,
    fromDomain
}

