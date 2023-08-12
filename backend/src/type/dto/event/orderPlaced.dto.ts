/// Event to send to shipping context
import {CustomerInfoDto} from "../customerInfo.dto";
import {AddressDto} from "../address.dto";
import {PricedOrderLineDto} from "../pricedOrderLine.dto";

//===============================================
// DTO for OrderPlaced event
//===============================================

/// Event to send to shipping context
export type OrderPlacedDto = {
    orderId: string
    customerInfo: CustomerInfoDto
    shippingAddress: AddressDto
    billingAddress: AddressDto
    amountToBill: number
    lines: Array<PricedOrderLineDto>
}