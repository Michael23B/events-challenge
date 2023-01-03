import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {GetEventsQueryStringParametersInterface} from "../interfaces/get-events-query-string-parameters.interface";
import {GetEventsResponseInterface} from "../interfaces/get-events-response.interface";

const EMPTY_GET_EVENTS_RESULT: GetEventsResponseInterface = {
    page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0
    }, events: []
};

@Injectable({
    providedIn: 'root'
})
export class EventService {
    constructor(private http: HttpClient) {
    }

    public getEvents(getEventsParameters: GetEventsQueryStringParametersInterface): Observable<GetEventsResponseInterface> {
        const params = {...getEventsParameters}
        return this.http.get<GetEventsResponseInterface>(environment.BACKEND_URL, {params}).pipe(
            // TODO We should be using a http interceptor to handle errors based on status code, then use catchError for specific error handling
            catchError((err) => {
                console.error(err);
                return of(EMPTY_GET_EVENTS_RESULT);
            }));
    }
}
