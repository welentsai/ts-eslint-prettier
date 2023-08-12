import * as S from '@effect/schema/Schema'
import { String50 } from './string50'

const schema = S.struct({
    addressLine1: String50.schema,
    addressLine2: String50.schema,
    addressLine3: String50.schema,
    addressLine4: String50.schema,
    city: String50.schema,
    zipCode: String50.schema,
})

const of = S.parseEither(schema)

export type Address = S.To<typeof schema>
export const Address = { schema, of }