
import * as S from '@effect/schema/Schema'


import { EmailAddress } from "../../common/emailAddress"
import { OrderId } from "../../common/orderId"


const schema = S.struct({
    orderId: OrderId.schema,
    emailAddress: EmailAddress.schema
})

const of = S.parseEither(schema)

// ------------------------------------
// outputs from the workflow (success case)
/// Event will be created if the Acknowledgment was successfully posted
export type OrderAcknowledgmentSent = S.To<typeof schema>
export const OrderAcknowledgmentSent = { schema, of }