import {PageInfoInterface} from "./page-info.interface";
import {EventInterface} from "./event.interface";

export interface GetEventsResponseInterface {
    page: PageInfoInterface,
    events: EventInterface[]
}
