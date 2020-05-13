import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasonryComponent, ErrorComponent } from 'routes';

const routes: Routes = [
  {
    path: 'masonry',
    component: MasonryComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
