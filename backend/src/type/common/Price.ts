import * as S from '@effect/schema/Schema'

const schema = S.number.pipe(S.nonNaN(), S.between(0.0, 1000.0))
const of = S.parseEither(schema)

export type Price = S.To<typeof schema>
export const Price = { schema, of }