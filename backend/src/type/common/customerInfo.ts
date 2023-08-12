import * as S from '@effect/schema/Schema'
import { EmailAddress } from "./emailAddress";
import { PersonalName } from "./personalName";


const schema = S.struct({
    name: PersonalName.schema,
    emailAddress: EmailAddress.schema
})

const of = S.parseEither(schema)

export type CustomerInfo = S.To<typeof schema>
export const CustomerInfo = { schema, of }
