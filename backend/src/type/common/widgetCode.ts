import * as S from '@effect/schema/Schema'

const regex = /^W\d{4}$/

const schema = S.string.pipe(S.nonEmpty(), S.startsWith('W'), S.pattern(regex))

const toString = (widgetCode: WidgetCode) => widgetCode

const of = S.parseEither(schema)

export type WidgetCode = S.To<typeof schema>
export const WidgetCode = { schema, toString, of }