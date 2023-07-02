import {Matchers} from '@pact-foundation/pact';
import {HTTPMethod} from "@pact-foundation/pact/src/common/request";

export const healthRequest = {
    uponReceiving: 'A request for API health',
    withRequest: {
        method: 'GET' as HTTPMethod,
        path: '/health',
    },
};

export const healthyResponse = {
    status: 200,
    body: {
        status: Matchers.like('up'),
    },
};