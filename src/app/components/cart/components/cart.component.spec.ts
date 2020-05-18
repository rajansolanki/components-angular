import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of, Subject, timer, NEVER } from 'rxjs';

import { Checkout } from '@bit/rajansolanki.dev.shared';
import { CheckoutService } from '../services/checkout.service';
import { getItems } from '../data';
import { CartComponent } from './cart.component';

let comp: CartComponent;
let fixture: ComponentFixture<CartComponent>;
let changeDetectorRef: ChangeDetectorRef;
let checkoutService: CheckoutService;
let page: Page;

jest.mock('../data', () => ({
  getItems: jest.fn().mockReturnValue(NEVER),
}));

class MockCheckoutService {
  checkoutChange$ = of('checkoutChange$');
  checkout$ = of({ lineItems: [] });
  changeCheckoutItem = jest.fn();

  constructor() {
    jest.spyOn(this.checkoutChange$, 'subscribe');
  }
}

@Component({
  selector: 'app-content',
  template: '',
})
class StubCartContentComponent {
  @Input() checkout: Checkout | undefined;
}

describe('`CartComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [CartComponent, StubCartContentComponent],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngAfterViewInit`', () => {
    beforeEach(() => (getItems as jest.Mock).mockReturnValueOnce([1, 2]));

    it('should call `CheckoutService` `changeCheckoutItem` with each `ITEMS` after `checkoutChange$`', fakeAsync(() => {
      const checkoutChangeSource = new Subject();
      checkoutService.checkoutChange$ = checkoutChangeSource as any;
      jest.clearAllMocks();
      comp.ngAfterViewInit();

      expect(checkoutService.changeCheckoutItem).not.toHaveBeenCalled();
      tick(2200);
      expect(checkoutService.changeCheckoutItem).toHaveBeenCalledWith({
        type: 'ADD',
        item: 1,
      });
      tick(2200);
      expect(checkoutService.changeCheckoutItem).toHaveBeenCalledTimes(1);
      checkoutChangeSource.next();
      expect(checkoutService.changeCheckoutItem).toHaveBeenCalledTimes(1);
      tick(2200);
      expect(checkoutService.changeCheckoutItem).toHaveBeenCalledWith({
        type: 'ADD',
        item: 2,
      });
    }));

    it('should unsubscribe if `onDestroy$` emits', fakeAsync(() => {
      checkoutService.checkoutChange$ = timer(2200, 1) as any;
      jest.clearAllMocks();
      comp.ngAfterViewInit();

      tick(2200);
      expect(checkoutService.changeCheckoutItem).toHaveBeenCalledTimes(1);
      (comp as any).onDestroy$.next();
      tick(3000);
      expect(checkoutService.changeCheckoutItem).toHaveBeenCalledTimes(1);
    }));
  });

  describe('`ngOnInit`', () => {
    beforeEach(() => {
      comp.checkout$ = undefined;
      comp.ngOnInit();
    });

    it('should subscribe to `CheckoutService` `checkoutChange$`', () => {
      expect(checkoutService.checkoutChange$.subscribe).toHaveBeenCalled();
    });

    it('should set `checkout$` as `CheckoutService` `checkout$`', () => {
      expect(comp.checkout$).toBe(checkoutService.checkout$);
    });
  });

  describe('`ngOnDestroy`', () => {
    beforeEach(() => {
      (comp as any).onDestroy$ = { next: jest.fn(), complete: jest.fn() };
      comp.ngOnDestroy();
    });

    it('should call `onDestroy$` `next`', () => {
      expect((comp as any).onDestroy$.next).toHaveBeenCalled();
    });

    it('should call `onDestroy$` `complete`', () => {
      expect((comp as any).onDestroy$.complete).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    describe('Content', () => {
      describe('No `checkout$`', () => {
        beforeEach(() => {
          comp.checkout$ = undefined;
          changeDetectorRef.markForCheck();
          fixture.detectChanges();
        });

        it('should not be displayed', () => {
          expect(page.content).toBeFalsy();
        });
      });

      describe('Has `checkout$`', () => {
        describe('No `checkout` `lineItems`', () => {
          beforeEach(() => {
            comp.checkout$ = of(({ lineItems: [] } as unknown) as Checkout);
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should not be displayed', () => {
            expect(page.content).toBeFalsy();
          });
        });

        describe('Has `checkout` `lineItems`', () => {
          beforeEach(() => {
            comp.checkout$ = of(({ lineItems: [{}] } as unknown) as Checkout);
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.content).toBeTruthy();
          });

          it('should set `checkout` as `checkout`', () => {
            expect(page.checkoutItemComponent.checkout).toEqual({
              lineItems: [{}],
            });
          });
        });
      });
    });
  });
});

class Page {
  get content(): HTMLElement {
    return this.query<HTMLElement>('app-content');
  }

  get checkoutItemComponent(): StubCartContentComponent {
    const el = fixture.debugElement.query(
      By.directive(StubCartContentComponent)
    );
    return el.injector.get<StubCartContentComponent>(StubCartContentComponent);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(CartComponent);
  comp = fixture.componentInstance;
  changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(
    ChangeDetectorRef as any
  );
  checkoutService = fixture.debugElement.injector.get<CheckoutService>(
    CheckoutService
  );
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
