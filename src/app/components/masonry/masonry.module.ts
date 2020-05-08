import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { MasonryComponent } from './components/masonry.component';
import { MasonryDirective } from './directives/masonry.directive';

export const NAME = 'component-masonry';

@NgModule({
  declarations: [MasonryComponent, MasonryDirective],
  imports: [BrowserModule],
  entryComponents: [MasonryComponent],
})
export class MasonryModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, MasonryComponent, this.injector);
  }
}
