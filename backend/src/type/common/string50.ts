import * as S from "@effect/schema/Schema";

const schema = S.string.pipe(S.nonEmpty(), S.maxLength(50))

const toString = (string50: String50) => string50
const of = S.parseEither(schema)

export type String50 = S.To<typeof schema>
export const String50 = { schema, toString, of }
