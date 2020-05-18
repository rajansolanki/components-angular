import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `<component-cart></component-cart>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {}
