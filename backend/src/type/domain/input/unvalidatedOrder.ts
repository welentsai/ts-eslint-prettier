import * as S from '@effect/schema/Schema'
import { UnvalidatedCustomerInfo } from './unvalidatedCustomerInfo'
import { UnvalidatedAddress } from './unvalidatedAddress'
import { UnvalidatedOrderLine } from './unvalidatedOrderLine'

// ------------------------------------
// inputs to the workflow

const schema = S.struct({
    orderId: S.string,
    customerInfo: UnvalidatedCustomerInfo.schema,
    shippingAddress: UnvalidatedAddress.schema,
    billingAddress: UnvalidatedAddress.schema,
    lines: S.array(UnvalidatedOrderLine.schema)
})

const of = S.parseEither(schema)

// inputs to the workflow
export type UnvalidatedOrder = S.To<typeof schema>
export const UnvalidatedOrder = { schema, of }