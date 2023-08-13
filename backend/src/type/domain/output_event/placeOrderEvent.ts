import { BillableOrderPlaced } from "./billableOrderPlaced";
import { OrderAcknowledgmentSent } from "./orderAcknowledgmentSent";
import { OrderPlaced } from "./pricedOrder";

/// The possible events resulting from the PlaceOrder workflow
/// Not all events will occur, depending on the logic of the workflow
export type PlaceOrderEvent = OrderPlaced | BillableOrderPlaced | OrderAcknowledgmentSent