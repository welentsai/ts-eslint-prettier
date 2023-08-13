import * as S from '@effect/schema/Schema'

const schema = S.struct({
    firstName: S.string,
    lastName: S.string,
    emailAddress: S.string
})

const of = S.parseEither(schema)

// inputs to the workflow
export type UnvalidatedCustomerInfo = S.To<typeof schema>
export const UnvalidatedCustomerInfo = { schema, of }