import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPageComponent} from "./event-page.component";
import {EventCardModule} from "../event-card/event-card.module";
import {EventPageRoutingModule} from "./event-page-routing.module";
import {EventService} from "../../shared/services/event.service";
import {FormsModule} from "@angular/forms";

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
  ],
  providers: [
    EventService
  ]
})
export class EventPageModule {
}
