import * as S from '@effect/schema/Schema'

const schema = S.struct({
    orderLineId: S.string,
    productCode: S.string,
    quantity: S.number
})

const of = S.parseEither(schema)

// inputs to the workflow
export type UnvalidatedOrderLine = S.To<typeof schema>
export const UnvalidatedOrderLine = { schema, of }
