import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MasonryComponent,
  ErrorComponent,
  LoadMoreComponent,
  CartComponent,
  LoadingBarComponent,
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
  {
    path: 'loading-bar',
    component: LoadingBarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
