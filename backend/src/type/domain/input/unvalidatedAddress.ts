import * as S from '@effect/schema/Schema'

const schema = S.struct({
    addressLine1: S.string,
    addressLine2: S.string,
    addressLine3: S.string,
    addressLine4: S.string,
    city: S.string,
    zipCode: S.string
})

const of = S.parseEither(schema)

// inputs to the workflow
export type UnvalidatedAddress = S.To<typeof schema>
export const UnvalidatedAddress = { schema, of }
