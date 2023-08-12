import * as S from '@effect/schema/Schema'

const schema = S.number.pipe(S.nonNaN(), S.greaterThanOrEqualTo(1), S.greaterThanOrEqualTo(1000))

const of = S.parseEither(schema)
export type UnitQuantity = S.To<typeof schema>
export const UnitQuantity = { schema, of }

