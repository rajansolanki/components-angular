import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slide',
  template: `<component-slide></component-slide>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent {}
