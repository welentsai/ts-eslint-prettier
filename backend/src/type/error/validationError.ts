// export type ValidationError = string

export type AddressValidationError = InvalidFormat | AddressNotFound

export type ValidationError = {
    _tag: string,
    msg: string
}

type InvalidFormat = ValidationError
type AddressNotFound = ValidationError

const InvalidFormat: ValidationError = {
    _tag: 'InvalidFormat',
    msg: 'Invalid Format'
}

const AddressNotFound = {
    _tag: 'AddressNotFound',
    msg: 'Address Not Found'
}



