import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Observable, from, zip, Subject } from 'rxjs';
import { startWith, delay, takeUntil } from 'rxjs/operators';

import { Checkout } from '@rajansolanki/ll-shared';
import { CheckoutService } from '../services/checkout.service';
import { getItems } from '../data';

@Component({
  selector: 'component-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  checkout$: Observable<Checkout | undefined> | undefined;

  private onDestroy$ = new Subject<void>();

  constructor(private checkoutService: CheckoutService) {}

  ngAfterViewInit() {
    zip(
      from(getItems()),
      this.checkoutService.checkoutChange$.pipe(startWith(undefined))
    )
      .pipe(delay(2200), takeUntil(this.onDestroy$))
      .subscribe(([item]) =>
        this.checkoutService.changeCheckoutItem({ type: 'ADD', item })
      );
  }

  ngOnInit(): void {
    this.checkoutService.checkoutChange$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
    this.checkout$ = this.checkoutService.checkout$;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
