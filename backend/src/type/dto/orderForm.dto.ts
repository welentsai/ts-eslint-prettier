import {CustomerInfoDto} from "./customerInfo.dto";
import {AddressDto} from "./address.dto";
import {OrderFormLineDto} from "./orderFormLine.dto";

//===============================================
// DTO for OrderForm
//===============================================
type OrderFormDto = {
    OrderId: string
    CustomerInfo: CustomerInfoDto
    ShippingAddress: AddressDto
    BillingAddress: AddressDto
    Lines: Array<OrderFormLineDto>
}