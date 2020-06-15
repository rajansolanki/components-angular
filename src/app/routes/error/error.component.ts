import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `<component-error type="app"></component-error>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
