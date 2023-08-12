//===============================================
// DTO for OrderAcknowledgmentSent event
//===============================================

/// Event to send to other bounded contexts
type OrderAcknowledgmentSentDto = {
    OrderId: string
    EmailAddress: string
}