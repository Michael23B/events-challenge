const origin = process.env.FRONTEND_URL;

const headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": origin, // Allow requests from the provided origin
    "Access-Control-Allow-Methods": "GET" // Allow only GET requests
}

/**
 * Creates a response object for API Gateway
 * @param {Number} statusCode
 * @param {Object} body
 * @returns {{headers: Object, body: string, statusCode: Number}}
 */
function createResponse(statusCode, body) {
    return {
        headers,
        statusCode,
        body: JSON.stringify(body),
    };
}

module.exports = {
    createResponse
}
