import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasonryComponent } from 'routes';

const routes: Routes = [
  {
    path: 'masonry',
    component: MasonryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
