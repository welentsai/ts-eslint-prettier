import * as S from '@effect/schema/Schema'
import { OrderId } from '../../common/orderId'
import { CustomerInfo } from '../../common/customerInfo'
import { BillingAmount } from '../../common/billingAmount'
import { OrderLineId } from '../../common/orderLineId'
import { ProductCode } from '../../common/productCode'
import { OrderQuantity } from '../../common/orderQuantity'
import { Price } from '../../common/Price'
import { Address } from '../../common/address'


const pricedOrderLineschema = S.struct({
    orderLineId: OrderLineId.schema,
    productCode: ProductCode.schema,
    quantity: OrderQuantity.schema,
    linePrice: Price.schema
})

const ofPricedOrderLineschema = S.parseEither(pricedOrderLineschema)

export type PricedOrderLine = S.To<typeof pricedOrderLineschema>
export const PricedOrderLine = { schema: pricedOrderLineschema, of: ofPricedOrderLineschema }



const pricedOrderSchema = S.struct({
    orderId: OrderId.schema,
    customerInfo: CustomerInfo.schema,
    shippingAddress: Address.schema,
    billingAddress: Address.schema,
    amountToBill: BillingAmount.schema,
    lines: S.array(PricedOrderLine.schema)
})

const ofPricedOrderSchema = S.parseEither(pricedOrderSchema)

export type PricedOrder = S.To<typeof pricedOrderSchema>
export const PricedOrder = { schema: pricedOrderSchema, of: ofPricedOrderLineschema }


/// Event to send to shipping context
export type OrderPlaced = PricedOrder
export const OrderPlaced = PricedOrder