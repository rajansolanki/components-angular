import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `<component-error></component-error>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
