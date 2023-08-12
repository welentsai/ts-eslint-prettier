import * as S from '@effect/schema/Schema'
import { String50 } from "./string50";

const schema = S.struct({
    firstName: String50.schema,
    lastName: String50.schema
})

const of = S.parseEither(schema)

export type PersonalName = S.To<typeof schema>
export const PersonalName = { schema, of }