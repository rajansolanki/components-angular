import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MasonryComponent,
  ErrorComponent,
  LoadMoreComponent,
  CartComponent,
  LoadingBarComponent,
  HoverComponent,
  SearchComponent,
  SlideComponent,
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
  {
    path: 'hover',
    component: HoverComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'slide',
    component: SlideComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class RoutingModule {}
