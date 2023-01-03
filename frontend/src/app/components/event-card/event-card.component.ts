import {Component, Input} from '@angular/core';
import {EventInterface} from "../../shared/interfaces/event.interface";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  // @ts-ignore - This is a property that will be passed in from the parent component
  @Input() public event: EventInterface;
}
