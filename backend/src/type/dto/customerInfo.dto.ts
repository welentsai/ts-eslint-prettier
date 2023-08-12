//===============================================
// DTO for CustomerInfo
//===============================================

import { UnvalidatedCustomerInfo } from "../domain/orderTaking.domain"


export type CustomerInfoDto = {
    firstName: string
    lastName: string
    emailAddress: string
}

type toUnvalidatedCustomerInfo = (dto: CustomerInfoDto) => UnvalidatedCustomerInfo

