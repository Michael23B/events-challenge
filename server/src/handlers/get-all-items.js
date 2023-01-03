const DISCOVERY_API_URL = "https://app.ticketmaster.com/discovery/v2/";
const EVENTS_RESOURCE = "events.json";
const API_KEY = process.env.API_KEY;

/**
 * Accepts a URL and a query string parameters object and returns a URL with the query string parameters appended
 * @param {string} url
 * @param {Object} params Dictionary of query parameters.
 * Key represents the parameter name and value represents the parameter value.
 * @returns {string} Returns a URL with the query parameters appended
 */
const getUrlWithQueryParams = (url, params) => {
    const finalUrl = new URL(url);

    // Iterate over every key,value pair in the params object
    for (const [key, value] of Object.entries(params)) {
        // Add params to the URL if they are not null or undefined
        if (value !== null && value !== undefined) {
            finalUrl.searchParams.append(key, value);
        }
    }

    return finalUrl.toString()
}

/**
 * Returns the allowed query string parameters. Other parameters will be ignored.
 * @param {Object} event
 * @returns {Object} Dictionary of allowed query string parameters.
 */
const getAllowedQueryStringParameters = (event) => {
    if (!event || !event.queryStringParameters) {
        return {};
    }
    const {countryCode, postalCode, startDateTime, endDateTime, page, size} = event.queryStringParameters;

    return {countryCode, postalCode, startDateTime, endDateTime, page, size};
}
