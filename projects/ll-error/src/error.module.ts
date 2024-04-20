import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { bootstrapModule } from '@rajansolanki/ll-shared';
import { ErrorComponent } from './components/error.component';

export const NAME = 'component-error';

@NgModule({
  declarations: [ErrorComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
})
export class ErrorModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, ErrorComponent, this.injector);
  }
}
