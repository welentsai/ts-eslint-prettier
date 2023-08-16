//===============================================
// DTO for PlaceOrderEvent
//===============================================
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { PlaceOrderEvent } from "../../domain/output_event/placeOrderEvent";
import { OrderPlaced } from "../../domain/output_event/pricedOrder";
import { OrderPlacedDto } from './orderPlaced.dto';
import { BillableOrderPlaced } from '../../domain/output_event/billableOrderPlaced';
import { BillableOrderPlacedDto } from './billableOrderPlaced.dto';
import { OrderAcknowledgmentSentDto } from './orderAcknowledgmentSent.dto';

interface Dictionary<T> {
    [Key: string]: T;
}

type PlaceOrderEventDto<T> = Dictionary<T>


type FromDomain<T extends PlaceOrderEvent> = (domainObj: T) => PlaceOrderEventDto<T>


function isOrderPlaced(domainObj: PlaceOrderEvent): domainObj is OrderPlaced {
    return pipe(
        domainObj,
        OrderPlaced.of,
        E.match(
            () => false,
            () => true
        )
    )
}

function isBillableOrderPlaced(domainObj: PlaceOrderEvent): domainObj is BillableOrderPlaced {
    return pipe(
        domainObj,
        BillableOrderPlaced.of,
        E.match(
            () => false,
            () => true
        )
    )
}

const fromDomain: FromDomain<PlaceOrderEvent> = (domainObj: PlaceOrderEvent) => {
    if (isOrderPlaced(domainObj)) {
        const obj = OrderPlacedDto.fromDomain(domainObj)
        const key = 'OrderPlaced'
        return obj[key]
    } else if (isBillableOrderPlaced(domainObj)) {
        const obj = BillableOrderPlacedDto.fromDomain(domainObj)
        const key = 'BillableOrderPlaced'
        return obj[key]
    } else {
        const obj = OrderAcknowledgmentSentDto.fromDomain(domainObj)
        const key = 'OrderAcknowledgmentSent'
        return obj[key]
    }
}

export const PlaceOrderEventDto = {
    fromDomain
} 