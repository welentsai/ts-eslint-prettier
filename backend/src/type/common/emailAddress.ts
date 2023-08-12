import * as S from '@effect/schema/Schema'

const regex = /\S+@\S+\.\S+/     // anystring@anystring.anystring
const schema = S.string.pipe(S.pattern(regex))

const toString = (emailAddress: EmailAddress) => emailAddress
const of = S.parseEither(schema)

export type EmailAddress = S.To<typeof schema>
export const EmailAddress = { schema, toString, of }

