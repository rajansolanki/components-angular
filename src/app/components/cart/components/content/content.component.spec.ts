import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Checkout, CheckoutItem } from '@bit/rajansolanki.dev.shared';
import { CheckoutService } from '../../services/checkout.service';
import { CartContentComponent } from './content.component';

let compHost: TestHostComponent;
let comp: CartContentComponent;
let fixture: ComponentFixture<TestHostComponent>;
let checkoutService: CheckoutService;
let page: Page;

jest.mock('./content.animations', () => {
  class StubCartContentAnimationsDirective {}

  return {
    CartContentAnimationsDirective: StubCartContentAnimationsDirective,
  };
});

class MockCheckoutService {
  changeCheckoutItem = jest.fn();
}

@Component({
  selector: 'app-cart-item',
  template: '',
})
class StubCartItemComponent {
  @Input() item: CheckoutItem | undefined;
}

@Component({
  selector: 'app-host',
  template: '<app-content [checkout]="checkout"></app-content>',
})
class TestHostComponent {
  checkout: Checkout | undefined;
}

describe('`CartComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        TestHostComponent,
        CartContentComponent,
        StubCartItemComponent,
      ],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `checkout`', () => {
    compHost.checkout = 0 as any;
    fixture.detectChanges();

    expect(comp.checkout).toBe(0);
  });

  describe('`itemTrackBy`', () => {
    it('should return `id`', () => {
      const res = comp.itemTrackBy(0, { id: 'id' } as CheckoutItem);

      expect(res).toBe('id');
    });
  });

  describe('`handleItemChange`', () => {
    beforeEach(() => comp.handleItemChange('change' as any));

    it('should call `CheckoutService` `changeCheckoutItem` with `change` arg', () => {
      expect(checkoutService.changeCheckoutItem).toHaveBeenCalledWith('change');
    });
  });

  describe('Template', () => {
    describe('No `checkout`', () => {
      beforeEach(() => {
        compHost.checkout = undefined;
        fixture.detectChanges();
      });

      describe('Header', () => {
        it('should not be displayed', () => {
          expect(page.header).toBeFalsy();
        });
      });

      describe('Info', () => {
        it('should not be displayed', () => {
          expect(page.info).toBeFalsy();
        });
      });
    });

    describe('Has `checkout`', () => {
      beforeEach(() => {
        compHost.checkout = {
          lineItems: [
            { id: 'id1' } as CheckoutItem,
            { id: 'id2' } as CheckoutItem,
            { id: 'id3' } as CheckoutItem,
          ],
          totalPrice: '1',
          ready: true,
        };
        fixture.detectChanges();
      });

      describe('Header', () => {
        it('should be displayed', () => {
          expect(page.header).toBeTruthy();
        });

        it('should display items count', () => {
          expect(page.itemsCount.innerHTML.trim()).toBe('3');
        });
      });

      describe('Info', () => {
        it('should be displayed', () => {
          expect(page.info).toBeTruthy();
        });

        describe('Items', () => {
          it('should be displayed', () => {
            expect(page.items.length).toBe(3);
          });

          it('should call `itemTrackBy` for each `lineItems`', () => {
            expect(comp.itemTrackBy).toHaveBeenCalledWith(0, { id: 'id1' });
            expect(comp.itemTrackBy).toHaveBeenCalledWith(1, { id: 'id2' });
            expect(comp.itemTrackBy).toHaveBeenCalledWith(2, { id: 'id3' });
          });

          describe('Item', () => {
            it('should set `CartItemComponent` `item` as `item`', () => {
              expect(page.cartItemComponent.item).toEqual({
                id: 'id1',
              });
            });

            it('should call `handleItemChange` on `itemChange`', () => {
              page.items[0].dispatchEvent(new Event('itemChange'));

              expect(comp.handleItemChange).toHaveBeenCalledWith(
                expect.objectContaining({ type: 'itemChange' })
              );
            });
          });
        });

        describe('Info footer', () => {
          it('should display total', () => {
            expect(page.total.textContent).toBe('£1');
          });

          describe('Link', () => {
            it('should be displayed', () => {
              expect(page.link).toBeTruthy();
            });

            it('should have disabled class if `checkout` `ready` is `false`', () => {
              compHost.checkout = {
                ...compHost.checkout,
                ready: false,
              } as Checkout;
              fixture.detectChanges();
              expect(page.link.classList.value).toContain('disabled');

              compHost.checkout = {
                ...compHost.checkout,
                ready: true,
              } as Checkout;
              fixture.detectChanges();
              expect(page.link.classList.value).not.toContain('disabled');
            });
          });
        });
      });
    });
  });
});

class Page {
  get header(): HTMLElement {
    return this.query<HTMLElement>('#header');
  }
  get itemsCount(): HTMLSpanElement {
    return this.query<HTMLSpanElement>('#items-count');
  }
  get info(): HTMLElement {
    return this.query<HTMLElement>('#info');
  }
  get items(): HTMLElement[] {
    return this.queryAll<HTMLElement>('app-cart-item');
  }
  get total(): HTMLSpanElement {
    return this.query<HTMLSpanElement>('#total');
  }
  get link(): HTMLAnchorElement {
    return this.query<HTMLAnchorElement>('#link');
  }

  get cartItemComponent(): StubCartItemComponent {
    const el = fixture.debugElement.query(By.directive(StubCartItemComponent));
    return el.injector.get<StubCartItemComponent>(StubCartItemComponent);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  const compEl = fixture.debugElement.query(By.directive(CartContentComponent));
  comp = compEl.injector.get<CartContentComponent>(CartContentComponent);
  checkoutService = fixture.debugElement.injector.get<CheckoutService>(
    CheckoutService
  );
  page = new Page();

  jest.spyOn(comp, 'itemTrackBy');
  jest.spyOn(comp, 'handleItemChange');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
