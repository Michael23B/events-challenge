import { Component } from '@angular/core';
import {EventService} from "../../shared/services/event.service";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  public events: any = ["1", "2"];
  public location: string = "";
  public dateFrom: string = "";
  public dateTo: string = "";

}
