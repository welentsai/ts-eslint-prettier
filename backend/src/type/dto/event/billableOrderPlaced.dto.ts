import { BillableOrderPlaced } from "../../domain/output_event/billableOrderPlaced";
import { AddressDto } from "../address.dto";

//===============================================
// DTO for BillableOrderPlaced event
//===============================================

/// Event to send to billing context
type BillableOrderPlacedDto = {
    orderId: string
    billingAddress: AddressDto
    amountToBill: number
}

type FromDomain = (domainObj: BillableOrderPlaced) => BillableOrderPlacedDto

const fromDomain: FromDomain = (domainObj: BillableOrderPlaced) => ({
    orderId: domainObj.orderId,
    billingAddress: domainObj.billingAddress,
    amountToBill: domainObj.amountToBill
})

export const BillableOrderPlacedDto = {
    fromDomain
}