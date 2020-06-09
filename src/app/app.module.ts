import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import {
  MasonryComponent,
  ErrorComponent,
  LoadMoreComponent,
  CartComponent,
  LoadingBarComponent,
  HoverComponent,
} from 'routes';
import './components';

@NgModule({
  declarations: [
    AppComponent,
    MasonryComponent,
    ErrorComponent,
    LoadMoreComponent,
    CartComponent,
    LoadingBarComponent,
    HoverComponent,
  ],
  imports: [BrowserModule, RoutingModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
