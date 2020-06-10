import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { SlideComponent } from './components/slide.component';
import { ImageComponent } from './components/image/image.component';

export const NAME = 'component-slide';

@NgModule({
  declarations: [SlideComponent, ImageComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  entryComponents: [SlideComponent],
})
export class SlideModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, SlideComponent, this.injector);
  }
}
