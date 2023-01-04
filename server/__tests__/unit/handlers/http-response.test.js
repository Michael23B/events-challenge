const {createResponse} = require('../../../src/common/http-response');

// This includes all tests for getAllItemsHandler()
describe('Test http-response', () => {
    it('createResponse returns a valid response', async () => {
        const response = createResponse(200, {message: 'test'});
        expect(response.statusCode).toBe(200);
        expect(response.headers).toBeDefined();
        expect(response.body).toBe('{"message":"test"}');
    });
});
