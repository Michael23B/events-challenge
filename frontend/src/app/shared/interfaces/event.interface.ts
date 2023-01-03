// Truncated event interface for the purposes of this project
// For the full model, see: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2

interface EventImageInterface {
    url: string
}

interface EventDateInterface {
    start: { localDate: string, localTime: string }
}

interface EventPriceRangeInterface {
    min: number,
    max: number
}

export interface EventInterface {
    id: string,
    name: string,
    info: string,
    url: string,
    images: EventImageInterface[],
    dates: EventDateInterface,
    priceRanges: EventPriceRangeInterface[]
}
