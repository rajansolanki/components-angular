import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { bootstrapModule } from '@rajansolanki/ll-shared';
import { SearchComponent } from './components/search.component';
import { AutoCompleteComponent } from './components/autocomplete/autocomplete.component';
import { OptionComponent } from './components/autocomplete/option/option.component';

export const NAME = 'component-search';

@NgModule({
  declarations: [SearchComponent, AutoCompleteComponent, OptionComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule],
})
export class SearchModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, SearchComponent, this.injector);
  }
}
