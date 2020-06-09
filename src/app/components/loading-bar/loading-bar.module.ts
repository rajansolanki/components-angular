import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { LoadingBarComponent } from './components/loading-bar.component';

export const NAME = 'component-loading-bar';

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [BrowserModule],
  entryComponents: [LoadingBarComponent],
})
export class LoadingBarModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, LoadingBarComponent, this.injector);
  }
}
