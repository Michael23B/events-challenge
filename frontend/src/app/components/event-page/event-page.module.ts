import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPageComponent} from "./event-page.component";
import {EventCardModule} from "../event-card/event-card.module";
import {EventPageRoutingModule} from "./event-page-routing.module";
import {EventService} from "../../shared/services/event.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

@NgModule({
    declarations: [
        EventPageComponent
    ],
    exports: [
        EventPageComponent
    ],
    imports: [
        CommonModule,
        EventCardModule,
        EventPageRoutingModule,
        FormsModule,
        PaginationModule.forRoot(),
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
    ],
    providers: [
        EventService
    ]
})
export class EventPageModule {
}
