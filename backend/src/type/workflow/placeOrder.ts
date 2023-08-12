import * as TE from 'fp-ts/TaskEither'
import { PlaceOrderEvent, UnvalidatedOrder } from "../domain/orderTaking.domain";
import { PlaceOrderError } from '../error/placeOrderError'

type PlaceOrder = (unvalidatedOrder: UnvalidatedOrder) => TE.TaskEither<PlaceOrderError, Array<PlaceOrderEvent>>