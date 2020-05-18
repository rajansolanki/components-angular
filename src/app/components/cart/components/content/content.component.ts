import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

import { CheckoutItem, Checkout } from '@bit/rajansolanki.dev.shared';
import { CheckoutChange } from '../../services/checkout.service.helpers';
import { CheckoutService } from '../../services/checkout.service';
import {
  CartContentAnimationsDirective,
  cartContentAnimations,
} from './content.animations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: cartContentAnimations,
})
export class CartContentComponent extends CartContentAnimationsDirective {
  @Input() checkout: Checkout | undefined;

  constructor(
    protected el: ElementRef<HTMLElement>,
    private checkoutService: CheckoutService
  ) {
    super(el);
  }

  itemTrackBy(_index: number, { id }: CheckoutItem): string {
    return id;
  }

  handleItemChange(change: CheckoutChange): void {
    this.checkoutService.changeCheckoutItem(change);
  }
}
