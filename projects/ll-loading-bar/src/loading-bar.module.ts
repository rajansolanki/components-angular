import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { bootstrapModule } from '@rajansolanki/ll-shared';
import { LoadingBarComponent } from './components/loading-bar.component';

export const NAME = 'component-loading-bar';

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [BrowserModule],
})
export class LoadingBarModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, LoadingBarComponent, this.injector);
  }
}
