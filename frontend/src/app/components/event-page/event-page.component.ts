import {Component, OnInit} from '@angular/core';
import {EventService} from "../../shared/services/event.service";
import {
    GetEventsQueryStringParametersInterface
} from "../../shared/interfaces/get-events-query-string-parameters.interface";
import {EventInterface} from "../../shared/interfaces/event.interface";
import {GetEventsResponseInterface} from "../../shared/interfaces/get-events-response.interface";
import {finalize, Observable, tap} from "rxjs";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryInterface} from "../../shared/interfaces/country.interface";
import {COUNTRIES} from "../../shared/constants/countries.constants";

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
    public eventSearchForm: FormGroup = new FormGroup<any>({});
    public events: EventInterface[] = [];
    public countries: CountryInterface[] = COUNTRIES;
    public isLoading: boolean = false;
    // Pagination
    public page: number = 1;
    public totalPages: number = 1;
    // Observables
    public getEventsObservable: Observable<GetEventsResponseInterface> = new Observable<GetEventsResponseInterface>();

    constructor(private eventService: EventService, private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        // Create the event search form
        this.createEventSearchForm();
    }


    public submitSearch(): void {
        // TODO Validate eventSearchForm
        this.page = 1;
        this.searchEvents();
    }

    public searchEvents(): void {
        // Get the query string parameters from the form
        const eventSearchFormValues = this.eventSearchForm.value;

        // Create the search parameters
        const eventSearchParameters: GetEventsQueryStringParametersInterface = {
            countryCode: eventSearchFormValues.countryCode,
            postalCode: eventSearchFormValues.postalCode,
            startDateTime: this.getFormattedDateString(eventSearchFormValues.startDateTime),
            endDateTime: this.getFormattedDateString(eventSearchFormValues.endDateTime),
            page: this.page.toString(),
        };

        // Show loader
        this.isLoading = true;

        // Get events
        this.getEventsObservable = this.eventService.getEvents(eventSearchParameters).pipe(
            tap((getEventsResponse: GetEventsResponseInterface) => {
                    this.events = getEventsResponse.events;
                    this.totalPages = getEventsResponse.page.totalPages;
                }
            ),
            finalize(() => {
                this.isLoading = false;
            }));
    }

    public nextPage(): void {
        this.page++;
        this.searchEvents();
    }

    public previousPage(): void {
        this.page--;
        this.searchEvents();
    }

    public pageChanged(event: PageChangedEvent): void {
        this.page = event.page;
        this.searchEvents();
    }

    private createEventSearchForm(): void {
        this.eventSearchForm = this.formBuilder.group({
            countryCode: ['AU'],
            postalCode: ['', [Validators.maxLength(10)]],
            startDateTime: [],
            endDateTime: [],
        });
    }

    private getFormattedDateString(date: Date): string {
        if (!date) {
            return '';
        }

        // Format the date based on examples from the API docs https://developer.ticketmaster.com/api-explorer/v2/
        return `${date.toISOString().substring(0, 19)}Z`
    }
}
