import * as S from '@effect/schema/Schema'

const schema = S.string.pipe(S.nonEmpty(), S.maxLength(5))
const toString = (zipCode: ZipCode) => zipCode

export type ZipCode = S.To<typeof schema>
export const ZipCode = { schema, toString }