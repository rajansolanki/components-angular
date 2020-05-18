import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MasonryComponent,
  ErrorComponent,
  LoadMoreComponent,
  CartComponent,
} from 'routes';

const routes: Routes = [
  {
    path: 'masonry',
    component: MasonryComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'load-more',
    component: LoadMoreComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
