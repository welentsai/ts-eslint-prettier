//===============================================
// DTO for PlaceOrderEvent
//===============================================

interface Dictionary<T> {
    [Key: string]: T;
}

type PlaceOrderEventDto<T> = Dictionary<T>

