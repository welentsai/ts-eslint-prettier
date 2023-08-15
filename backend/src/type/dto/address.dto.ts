//===============================================
// DTO for Address
//===============================================
import * as E from 'fp-ts/Either'
import { UnvalidatedAddress } from "../domain/input/unvalidatedAddress"
import { ParseError } from '@effect/schema/ParseResult'
import { Address } from '../common/address'

export type AddressDto = {
    addressLine1: string
    addressLine2: string
    addressLine3: string
    addressLine4: string
    city: string
    zipCode: string
}

const of = (addressLine1: string) => (addressLine2: string) => (addressLine3: string) =>
    (addressLine4: string) => (city: string) => (zipCode: string) => ({
        addressLine1,
        addressLine2,
        addressLine3,
        addressLine4,
        city,
        zipCode
    })

type ToUnvalidatedAddress = (dto: AddressDto) => UnvalidatedAddress
const toUnvalidatedAddress: ToUnvalidatedAddress = (dto: UnvalidatedAddress) => ({
    addressLine1: dto.addressLine1,
    addressLine2: dto.addressLine2,
    addressLine3: dto.addressLine3,
    addressLine4: dto.addressLine4,
    city: dto.city,
    zipCode: dto.zipCode
})

type ToAddress = (dto: AddressDto) => E.Either<ParseError, Address>
const toAddress: ToAddress = (dto: Address) => Address.of(dto)


type FromAddress = (address: Address) => AddressDto
const fromAddress: FromAddress = (address) => ({
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    addressLine3: address.addressLine3,
    addressLine4: address.addressLine4,
    city: address.city,
    zipCode: address.zipCode
})


export const AddressDto = {
    of,
    toUnvalidatedAddress,
    toAddress,
    fromAddress
}
