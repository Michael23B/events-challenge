import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventPageComponent} from "./event-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'events',
        component: EventPageComponent,
      },
      {
        path: '**',
        redirectTo: 'events',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {
}
