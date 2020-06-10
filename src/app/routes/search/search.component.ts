import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `<component-search></component-search>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {}
