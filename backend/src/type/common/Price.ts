import * as S from '@effect/schema/Schema'
import { OrderQuantity } from './orderQuantity'

const schema = S.number.pipe(S.nonNaN(), S.between(0.0, 1000.0))
const of = S.parseEither(schema)

const multiply = (quantity: OrderQuantity) => (price: Price) => quantity * price

export type Price = S.To<typeof schema>
export const Price = { schema, of, multiply }