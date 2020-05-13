import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { ErrorComponent } from './components/error.component';

export const NAME = 'component-error';

@NgModule({
  declarations: [ErrorComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  entryComponents: [ErrorComponent],
})
export class ErrorModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, ErrorComponent, this.injector);
  }
}
