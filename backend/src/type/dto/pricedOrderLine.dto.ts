//===============================================
// DTOs for PricedOrderLines
//===============================================
export type PricedOrderLineDto = {
    orderLineId: string
    productCode: string
    quantity: number
    linePrice: number
}