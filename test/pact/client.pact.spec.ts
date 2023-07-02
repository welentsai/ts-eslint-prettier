import {pactWith} from 'jest-pact';
import {healthRequest, healthyResponse} from "../../src/pact.features";
import {api} from "../../src/simpleClinet";

pactWith(
    {consumer: 'MyConsumer', provider: 'MyProvider'},
    (provider) => {
        let client: any;

        beforeEach(() => {
            client = api(provider.mockService.baseUrl)
        });

        describe('health endpoint', () => {
            beforeEach(() =>
                provider.addInteraction({
                    state: "Server is healthy",
                    ...healthRequest,
                    willRespondWith: healthyResponse
                })
            );

            it('returns server health', () =>
                client.getHealth().then((health: any) => {
                    expect(health).toEqual('up')
                }));
        });
    });