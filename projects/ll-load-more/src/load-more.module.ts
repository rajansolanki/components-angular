import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { bootstrapModule } from '@rajansolanki/ll-shared';
import { LoadMoreComponent } from './components/load-more.component';

export const NAME = 'component-load-more';

@NgModule({
  declarations: [LoadMoreComponent],
  imports: [BrowserModule],
})
export class LoadMoreModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, LoadMoreComponent, this.injector);
  }
}
