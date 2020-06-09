import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hover',
  template: `<component-hover></component-hover>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverComponent {}
