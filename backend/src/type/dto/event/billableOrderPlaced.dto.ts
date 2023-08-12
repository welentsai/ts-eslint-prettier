import {AddressDto} from "../address.dto";

//===============================================
// DTO for BillableOrderPlaced event
//===============================================

/// Event to send to billing context
type BillableOrderPlacedDto = {
    orderId: string
    billingAddress: AddressDto
    amountToBill: number
}