import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  template: `<component-loading-bar status="loading"></component-loading-bar>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBarComponent {}
