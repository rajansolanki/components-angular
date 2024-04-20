import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import {
  exhaustMap,
  flatMap,
  map,
  take,
  delay,
  startWith,
  share,
} from 'rxjs/operators';

import { Checkout, CheckoutItem } from '@rajansolanki/ll-shared';
import {
  CheckoutChange,
  CheckoutItemStore,
  CheckoutItemStoreKey,
  createCheckout,
} from './checkout.service.helpers';
import { changeStore } from './store.helpers';

@Injectable()
export class CheckoutService {
  private checkoutStoreSource = new BehaviorSubject(
    new Map<CheckoutItemStoreKey, CheckoutItem>()
  );
  checkout$: Observable<Checkout>;

  private checkoutChangeSource = new Subject<CheckoutChange>();
  checkoutChange$ = this.checkoutChangeSource.pipe(
    exhaustMap((change) => this.changeCheckout(change)),
    share()
  );

  constructor() {
    this.checkout$ = this.checkoutStoreSource.pipe(
      map(createCheckout),
      flatMap((checkout) =>
        of(checkout).pipe(delay(500), startWith({ ...checkout, ready: false }))
      ),
      share()
    );
  }

  private mutateChangeCheckout(
    change: CheckoutChange,
    store: CheckoutItemStore
  ): Observable<Checkout> {
    this.checkoutStoreSource.next(changeStore(change, store));

    return this.checkout$.pipe(take(1));
  }

  private changeCheckout(change: CheckoutChange): Observable<Checkout> {
    return this.checkoutStoreSource.pipe(
      take(1),
      flatMap((store) => this.mutateChangeCheckout(change, store))
    );
  }

  changeCheckoutItem(change: CheckoutChange): void {
    this.checkoutChangeSource.next(change);
  }
}
