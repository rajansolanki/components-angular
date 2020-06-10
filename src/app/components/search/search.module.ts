import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { SearchComponent } from './components/search.component';
import { AutoCompleteComponent } from './components/autocomplete/autocomplete.component';
import { OptionComponent } from './components/autocomplete/option/option.component';

export const NAME = 'component-search';

@NgModule({
  declarations: [SearchComponent, AutoCompleteComponent, OptionComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule],
  entryComponents: [SearchComponent],
})
export class SearchModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    bootstrapModule(NAME, SearchComponent, this.injector);
  }
}
