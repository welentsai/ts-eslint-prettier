import * as S from '@effect/schema/Schema'

const regex = /^G\d{3}$/
const schema = S.string.pipe(S.nonEmpty(), S.startsWith('G'), S.pattern(regex))


const toString = (gizmoCode: GizmoCode) => gizmoCode
const of = S.parseEither(schema)

export type GizmoCode = S.To<typeof schema>
export const GizmoCode = { schema, toString, of }