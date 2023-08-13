//===============================================
// DTO for CustomerInfo
//===============================================

import { ParseError } from "@effect/schema/ParseResult"
import { UnvalidatedCustomerInfo } from "../domain/input/unvalidatedCustomerInfo"
import * as E from 'fp-ts/Either'
import { CustomerInfo } from "../common/customerInfo"


export type CustomerInfoDto = {
    firstName: string
    lastName: string
    emailAddress: string
}

const of = (firstName: string) => (lastName: string) => (emailAddress: string) => ({
    firstName,
    lastName,
    emailAddress
})


// Convert the DTO into a UnvalidatedCustomerInfo object.
/// Used when importing an OrderForm from the outside world into the domain.
type ToUnvalidatedCustomerInfo = (dto: CustomerInfoDto) => E.Either<ParseError, UnvalidatedCustomerInfo>
const toUnvalidatedCustomerInfo: ToUnvalidatedCustomerInfo = (dto: CustomerInfoDto) => UnvalidatedCustomerInfo.of(dto)


/// Convert the DTO into a CustomerInfo object
/// Used when importing from the outside world into the domain, eg loading from a database
type ToCustomerInfo = (dto: CustomerInfoDto) => E.Either<ParseError, CustomerInfo>
const toCustomerInfo: ToCustomerInfo = (dto: CustomerInfoDto) => {

    // it's helpful to use an explicit type annotation
    const data: CustomerInfo = {
        name: {
            firstName: dto.firstName,
            lastName: dto.lastName
        },
        emailAddress: dto.emailAddress
    }

    return CustomerInfo.of(data)
}


/// Convert a CustomerInfo object into the corresponding DTO.
type FromCustomerInfo = (dto: CustomerInfo) => CustomerInfoDto
const fromCustomerInfo: FromCustomerInfo = (customerInfo: CustomerInfo) => ({
    firstName: customerInfo.name.firstName,
    lastName: customerInfo.name.lastName,
    emailAddress: customerInfo.emailAddress
})

export const CustomerInfoDto = {
    of,
    toUnvalidatedCustomerInfo,
    toCustomerInfo,
    fromCustomerInfo
}