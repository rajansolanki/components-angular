import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-load-more',
  template: `<component-load-more status="loading"></component-load-more>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreComponent {}
