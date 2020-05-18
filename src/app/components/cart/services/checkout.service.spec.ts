import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EMPTY, NEVER, Observable, of, timer } from 'rxjs';

import { createCheckout } from './checkout.service.helpers';
import { changeStore } from './store.helpers';
import { CheckoutService } from './checkout.service';

let checkoutService: CheckoutService;

jest.mock('./store.helpers', () => ({
  changeStore: jest.fn().mockReturnValue('changeStoreReturn'),
}));

jest.mock('./checkout.service.helpers', () => ({
  createCheckout: jest
    .fn()
    .mockReturnValue({ createCheckoutReturn: 'createCheckoutReturn' }),
}));

describe('`CheckoutService`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [CheckoutService],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(async(createService));

  it('should create service', () => {
    expect(checkoutService).toBeTruthy();
  });

  describe('`checkoutStoreSource`', () => {
    it('should emit empty `Map`', async(() => {
      ((checkoutService as any).checkoutStoreSource as Observable<
        any
      >).subscribe((res) => expect(res).toEqual(new Map()));
    }));
  });

  describe('`checkout$`', () => {
    it('should call `createCheckout` with `checkoutStoreSource` emit', async(() => {
      checkoutService.checkout$.subscribe();
      (checkoutService as any).checkoutStoreSource.next('checkoutStoreSource$');

      expect(createCheckout).toHaveBeenCalledWith('checkoutStoreSource$', 1);
    }));

    it('should emit `createCheckout` return twice after delay', fakeAsync(() => {
      let res;
      checkoutService.checkout$.subscribe((emit) => (res = emit));

      expect(res).toEqual({
        createCheckoutReturn: 'createCheckoutReturn',
        ready: false,
      });
      tick(499);
      expect(res).toEqual({
        createCheckoutReturn: 'createCheckoutReturn',
        ready: false,
      });
      tick(1);
      expect(res).toEqual({
        createCheckoutReturn: 'createCheckoutReturn',
      });
    }));

    it('should only call side effects once even if multiple subscribers', async(() => {
      checkoutService.checkout$.subscribe();
      checkoutService.checkout$.subscribe();

      expect(createCheckout).toHaveBeenCalledTimes(1);
    }));
  });

  describe('`checkoutChange$`', () => {
    beforeEach(
      () =>
        ((checkoutService as any).changeCheckout = jest
          .fn()
          .mockReturnValue(EMPTY))
    );

    it('should call `changeCheckout` with `checkoutChangeSource` emit', () => {
      checkoutService.checkoutChange$.subscribe();
      (checkoutService as any).checkoutChangeSource.next(
        'checkoutChangeSource$'
      );

      expect((checkoutService as any).changeCheckout).toHaveBeenCalledWith(
        'checkoutChangeSource$'
      );
    });

    it('should not call `changeCheckout` on `checkoutChangeSource` emit again if `changeCheckout` has not completed', () => {
      (checkoutService as any).changeCheckout = jest
        .fn()
        .mockReturnValue(NEVER);

      checkoutService.checkoutChange$.subscribe();
      (checkoutService as any).checkoutChangeSource.next('');
      expect((checkoutService as any).changeCheckout).toHaveBeenCalledTimes(1);
      (checkoutService as any).checkoutChangeSource.next('');
      expect((checkoutService as any).changeCheckout).toHaveBeenCalledTimes(1);
    });

    it('should call `changeCheckout` on `checkoutChangeSource` emit again if `changeCheckout` has completed', () => {
      (checkoutService as any).changeCheckout = jest
        .fn()
        .mockReturnValue(EMPTY);

      checkoutService.checkoutChange$.subscribe();
      (checkoutService as any).checkoutChangeSource.next('');
      expect((checkoutService as any).changeCheckout).toHaveBeenCalledTimes(1);
      (checkoutService as any).checkoutChangeSource.next('');
      expect((checkoutService as any).changeCheckout).toHaveBeenCalledTimes(2);
    });

    it('should emit `changeCheckout`', async(() => {
      (checkoutService as any).changeCheckout = jest
        .fn()
        .mockReturnValue(of('changeCheckout$'));

      checkoutService.checkoutChange$.subscribe((res) =>
        expect(res).toBe('changeCheckout$')
      );
      (checkoutService as any).checkoutChangeSource.next('');
    }));
  });

  describe('`mutateChangeCheckout`', () => {
    beforeEach(() => (checkoutService.checkout$ = timer(0, 1000) as any));

    it('should call `changeStore` with `change` and `store` args', () => {
      ((checkoutService as any).mutateChangeCheckout(
        'change',
        'store'
      ) as Observable<any>).subscribe();

      expect(changeStore).toHaveBeenCalledWith('change', 'store');
    });

    it('should call `checkoutStoreSource` `next` with `changeStore` return arg', () => {
      ((checkoutService as any).mutateChangeCheckout(
        'change',
        'store'
      ) as Observable<any>).subscribe();

      expect(
        (checkoutService as any).checkoutStoreSource.next
      ).toHaveBeenCalledWith('changeStoreReturn');
    });

    it('should emit first `checkout$` emit', fakeAsync(() => {
      const sub = ((checkoutService as any).mutateChangeCheckout(
        'change',
        'store'
      ) as Observable<any>).subscribe((res) => expect(res).toBe(0));

      tick();
      expect(sub.closed).toBeTruthy();
    }));
  });

  describe('`changeCheckout`', () => {
    beforeEach(() => {
      (checkoutService as any).checkoutStoreSource = timer(0, 1000);
      (checkoutService as any).mutateChangeCheckout = jest
        .fn()
        .mockReturnValue(of('mutateChangeCheckout$'));
    });

    it('should call `mutateChangeCheckout` with first `checkoutStoreSource` emit', fakeAsync(() => {
      ((checkoutService as any).changeCheckout('change') as Observable<
        any
      >).subscribe();

      tick();
      expect(
        (checkoutService as any).mutateChangeCheckout
      ).toHaveBeenCalledWith('change', 0);
      tick(2000);
      expect(
        (checkoutService as any).mutateChangeCheckout
      ).toHaveBeenCalledTimes(1);
    }));

    it('should emit `mutateChangeCheckout`', async(() => {
      ((checkoutService as any).changeCheckout('change') as Observable<
        any
      >).subscribe((res) => expect(res).toBe('mutateChangeCheckout$'));
    }));
  });

  describe('`changeCheckoutItem`', () => {
    beforeEach(() => checkoutService.changeCheckoutItem('change' as any));

    it('should call `checkoutChangeSource` `next` with `change` arg', () => {
      expect(
        (checkoutService as any).checkoutChangeSource.next
      ).toHaveBeenCalledWith('change');
    });
  });
});

function createService(): void {
  checkoutService = TestBed.get<CheckoutService>(CheckoutService);

  jest.spyOn(checkoutService as any, 'changeCheckout');
  jest.spyOn((checkoutService as any).checkoutChangeSource, 'next');
  jest.spyOn((checkoutService as any).checkoutStoreSource, 'next');
}
