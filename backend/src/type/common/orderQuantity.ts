import * as S from '@effect/schema/Schema'
import { UnitQuantity } from './unitQuantity'
import { KilogramQuantity } from './kilogramQuantity'

const schema = S.union(UnitQuantity.schema, KilogramQuantity.schema)
const of = S.parseEither(schema)

export type OrderQuantity = S.To<typeof schema>
export const OrderQuantity = { schema, of }