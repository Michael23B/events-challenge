const {httpsGet} = require('../common/http-request');
const {createResponse} = require('../common/http-response');

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

/**
 * Searches for events using the discovery API and provided query string parameters
 * @param {Object} queryStringParameters Dictionary of query parameters.
 * Key represents the parameter name and value represents the parameter value.
 * @returns {Object} Object with pagination info and events list
 */
const getEvents = async (queryStringParameters) => {
    // Add apikey to the query string parameters
    const getEventsParameters = {...queryStringParameters, apikey: API_KEY};
    const getEventsUrl = getUrlWithQueryParams(`${DISCOVERY_API_URL}${EVENTS_RESOURCE}`, getEventsParameters)

    const eventsResponse = await httpsGet(getEventsUrl);

    return {
        page: eventsResponse.page,
        events: eventsResponse._embedded.events
    }
}

/**
 * Returns a list of events from the TicketMaster discovery API
 */
exports.getAllItemsHandler = async (event) => {
    console.debug('Received event: ', event);
    let response = {};

    try {
        const queryStringParameters = getAllowedQueryStringParameters(event);
        // Get events from the discovery API
        const eventsResponse = await getEvents(queryStringParameters);
        response = createResponse(200, eventsResponse);
    } catch (err) {
        console.error(err)
        response = createResponse(500, {error: "Unable to call Discovery API"});
    }

    return response;
}
