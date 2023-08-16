//===============================================
// DTO for OrderAcknowledgmentSent event
//===============================================

import { OrderAcknowledgmentSent } from "../../domain/output_event/orderAcknowledgmentSent"

/// Event to send to other bounded contexts
type OrderAcknowledgmentSentDto = {
    orderId: string
    emailAddress: string
}

type FromDomain = (domainObj: OrderAcknowledgmentSent) => OrderAcknowledgmentSentDto
const fromDomain: FromDomain = (domainObj: OrderAcknowledgmentSent) => ({
    orderId: domainObj.orderId,
    emailAddress: domainObj.emailAddress
})

export const OrderAcknowledgmentSentDto = {
    fromDomain
}