import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CheckoutItem } from '@bit/rajansolanki.dev.shared';
import { CheckoutChange } from '../../../services/checkout.service.helpers';
import {
  cartItemAnimations,
  CartItemAnimationsDirective,
} from './item.animations';

@Component({
  selector: 'app-cart-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: cartItemAnimations,
})
export class CartItemComponent extends CartItemAnimationsDirective {
  @Input() item: CheckoutItem | undefined;
  @Output() private itemChange = new EventEmitter<CheckoutChange>();

  constructor(protected el: ElementRef<HTMLElement>) {
    super(el);
  }

  handleUpdateClick(delta: '1' | '-1'): void {
    if (!this.item) throw new Error('No `item`');

    this.itemChange.next({
      type: 'UPDATE',
      item: this.item,
      quantity: this.item.quantity + +delta,
    });
  }

  handleRemoveClick(): void {
    if (!this.item) throw new Error('No `item`');

    this.itemChange.next({
      type: 'REMOVE',
      item: this.item,
    });
  }
}
