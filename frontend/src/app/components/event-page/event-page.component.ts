import {Component} from '@angular/core';
import {EventService} from "../../shared/services/event.service";
import {
    GetEventsQueryStringParametersInterface
} from "../../shared/interfaces/get-events-query-string-parameters.interface";
import {EventInterface} from "../../shared/interfaces/event.interface";
import {GetEventsResponseInterface} from "../../shared/interfaces/get-events-response.interface";
import {Observable, tap} from "rxjs";

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
    // Event search fields
    public events: EventInterface[] = [];
    public postalCode: string = "";
    public dateFrom: string = "";
    public dateTo: string = "";
    public country: string = "AU";
    // Pagination
    public page: number = 1;
    public totalPages: number = 1;
    // Observables
    public getEventsObservable: Observable<GetEventsResponseInterface> = new Observable<GetEventsResponseInterface>();

    constructor(private eventService: EventService) {
    }

    public submitSearch(): void {
        this.page = 1;
        this.searchEvents();
    }

    public searchEvents(): void {
        const eventSearchParameters: GetEventsQueryStringParametersInterface = {
            page: this.page.toString(),
            countryCode: this.country,
            postalCode: this.postalCode,
            startDateTime: this.dateFrom,
            endDateTime: this.dateTo
        };

        this.getEventsObservable = this.eventService.getEvents(eventSearchParameters).pipe(
            tap((getEventsResponse: GetEventsResponseInterface) => {
                    this.events = getEventsResponse.events;
                    this.totalPages = getEventsResponse.page.totalPages;
                }
            ));
    }

    public nextPage(): void {
        this.page++;
        this.searchEvents();
    }

    public previousPage(): void {
        this.page--;
        this.searchEvents();
    }
}
