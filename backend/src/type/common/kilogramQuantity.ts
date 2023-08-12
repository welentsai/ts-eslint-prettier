import * as S from '@effect/schema/Schema'

const schema = S.number.pipe(S.between(0.05, 100.0))

const of = S.parseEither(schema)

export type KilogramQuantity = S.To<typeof schema>
export const KilogramQuantity = { schema, of }