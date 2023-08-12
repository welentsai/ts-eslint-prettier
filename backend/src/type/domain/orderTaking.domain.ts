// ==================================
// This file contains the definitions of PUBLIC types (exposed at the boundary of the bounded context)
// related to the PlaceOrder workflow
// ==================================

// ------------------------------------
// inputs to the workflow

import {OrderId} from "../common/orderId";
import {EmailAddress} from "../common/emailAddress";
import {OrderLineId} from "../common/orderLineId";
import {ProductCode} from "../common/productCode";
import {OrderQuantity} from "../common/orderQuantity";
import {Price} from "../common/Price";
import {Address} from "cluster";
import {CustomerInfo} from "../common/customerInfo";
import {BillingAmount} from "../common/billingAmount";

export type UnvalidatedCustomerInfo = {
    firstName: string
    lastName: string
    emailAddress: string
}

export type UnvalidatedAddress = {
    addressLine1: string
    addressLine2: string
    addressLine3: string
    addressLine4: string
    city: string
    zipCode: string
}

export type UnvalidatedOrderLine = {
    orderLineId: string
    productCode: string
    quantity: number
}

export type UnvalidatedOrder = {
    orderId: string
    customerInfo: UnvalidatedCustomerInfo
    shippingAddress: UnvalidatedAddress
    billingAddress: UnvalidatedAddress
    lines: Array<UnvalidatedOrderLine>
}

// ------------------------------------
// outputs from the workflow (success case)

/// Event will be created if the Acknowledgment was successfully posted
type OrderAcknowledgmentSent = {
    orderId: OrderId
    emailAddress: EmailAddress
}

// priced state
type PricedOrderLine = {
    orderLineId: OrderLineId
    productCode: ProductCode
    quantity: OrderQuantity
    linePrice: Price
}

type PricedOrder = {
    OrderId: OrderId
    CustomerInfo: CustomerInfo
    ShippingAddress: Address
    BillingAddress: Address
    AmountToBill: BillingAmount
    Lines: Array<PricedOrderLine>
}

/// Event to send to shipping context
type OrderPlaced = PricedOrder

/// Event to send to billing context
/// Will only be created if the AmountToBill is not zero
type BillableOrderPlaced = {
    OrderId: OrderId
    BillingAddress: Address
    AmountToBill: BillingAmount
}

/// The possible events resulting from the PlaceOrder workflow
/// Not all events will occur, depending on the logic of the workflow
export type PlaceOrderEvent = OrderPlaced | BillableOrderPlaced | OrderAcknowledgmentSent





