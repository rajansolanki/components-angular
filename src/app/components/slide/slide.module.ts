import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { SlideComponent } from './components/slide.component';
import { ImageComponent } from './components/image/image.component';

export const NAME = 'component-slide';

@NgModule({
  declarations: [SlideComponent, ImageComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
})
export class SlideModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, SlideComponent, this.injector);
  }
}
