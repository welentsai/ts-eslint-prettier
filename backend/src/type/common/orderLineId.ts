import { OrderId } from "./orderId";
import { String50 } from "./string50";

export type OrderLineId = String50

const create = (orderId: OrderId) => OrderLineId.of(orderId + '001')

export const OrderLineId = {
    ...String50,
    create
}