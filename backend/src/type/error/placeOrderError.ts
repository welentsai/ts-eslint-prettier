import { ValidationError } from './validationError'
import { PricingError } from "./pricingError";
import { RemoteServiceError } from "./remoteServiceError";

export type PlaceOrderError = ValidationError | PricingError | RemoteServiceError