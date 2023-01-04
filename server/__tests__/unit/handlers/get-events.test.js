const {getEventsHandler} = require('../../../src/handlers/get-events');

// First mock the httpsGet function from http-request.js
jest.mock('../../../src/common/http-request', () => {
    const httpsGet = jest.fn();
    // Mock the response from the discovery API
    const eventsResponse = {
        page: {
            size: 20,
            totalElements: 100,
            totalPages: 5,
            number: 0
        },
        _embedded: {
            events: [
                {
                    name: 'Event 1',
                }
            ]
        },
    }
    // Mock the response from the discovery API
    httpsGet.mockResolvedValue(eventsResponse);
    return {
        httpsGet: httpsGet
    }
});

// Now mock the handler function
describe('Test get events handler', () => {
    it('getEvents returns a valid response', async () => {
        const response = await getEventsHandler({queryStringParameters: {countryCode: 'US'}});
        expect(response.statusCode).toBe(200);
        expect(response.headers).toBeDefined();
        expect(response.body).toBe('{"page":{"size":20,"totalElements":100,"totalPages":5,"number":0},"events":[{"name":"Event 1"}]}');
    });
});
