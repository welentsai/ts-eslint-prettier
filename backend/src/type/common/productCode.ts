import * as S from '@effect/schema/Schema'
import { GizmoCode } from "./gizmoCode";
import { WidgetCode } from "./widgetCode";

// export type ProductCode = GizmoCode | WidgetCode

const schema = S.union(GizmoCode.schema, WidgetCode.schema)

const of = S.parseEither(schema)

export type ProductCode = S.To<typeof schema>
export const ProductCode = { schema, of }