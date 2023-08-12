import * as S from '@effect/schema/Schema'

const schema = S.number.pipe(S.nonNaN(), S.between(0.0, 10000.0))
const of = S.parseEither(schema)

export type BillingAmount = S.To<typeof schema>
export const BillingAmount = { schema, of }