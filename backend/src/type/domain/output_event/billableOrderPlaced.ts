import * as S from '@effect/schema/Schema'
import { OrderId } from '../../common/orderId'
import { Address } from '../../common/address'
import { BillingAmount } from '../../common/billingAmount'

const schema = S.struct({
    orderId: OrderId.schema,
    billingAddress: Address.schema,
    amountToBill: BillingAmount.schema
})

const of = S.parseEither(schema)

/// Event to send to billing context
/// Will only be created if the AmountToBill is not zero
export type BillableOrderPlaced = S.To<typeof schema>
export const BillableOrderPlaced = { schema, of }