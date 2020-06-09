import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { HoverComponent } from './components/hover.component';
import { HoverDirective } from './directives/hover.directive';

export const NAME = 'component-hover';

@NgModule({
  declarations: [HoverComponent, HoverDirective],
  imports: [BrowserModule],
  entryComponents: [HoverComponent],
})
export class HoverModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, HoverComponent, this.injector);
  }
}
