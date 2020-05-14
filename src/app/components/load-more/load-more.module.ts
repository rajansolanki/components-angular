import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { LoadMoreComponent } from './components/load-more.component';

export const NAME = 'component-load-more';

@NgModule({
  declarations: [LoadMoreComponent],
  imports: [BrowserModule],
  entryComponents: [LoadMoreComponent],
})
export class LoadMoreModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, LoadMoreComponent, this.injector);
  }
}
