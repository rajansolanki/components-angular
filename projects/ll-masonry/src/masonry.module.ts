import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { bootstrapModule } from '@rajansolanki/ll-shared';
import { MasonryComponent } from './components/masonry.component';
import { MasonryDirective } from './directives/masonry.directive';

export const NAME = 'component-masonry';

@NgModule({
  declarations: [MasonryComponent, MasonryDirective],
  imports: [BrowserModule],
})
export class MasonryModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, MasonryComponent, this.injector);
  }
}
