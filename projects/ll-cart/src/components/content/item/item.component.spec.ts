import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CheckoutItem } from '@rajansolanki/ll-shared';
import { CartItemComponent } from './item.component';

let compHost: TestHostComponent;
let comp: CartItemComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

jest.mock('./item.animations', () => {
  class StubCartItemAnimationsDirective {}

  return {
    CartItemAnimationsDirective: StubCartItemAnimationsDirective,
  };
});

@Component({
  selector: 'app-host',
  template:
    '<app-cart-item [item]="item" (itemChange)="handleItemChange($event)"></app-cart-item>',
})
class TestHostComponent {
  item: CheckoutItem | undefined;

  handleItemChange = jest.fn();
}

describe('`CartItemComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, CartItemComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `item`', () => {
    compHost.item = 0 as any;
    fixture.detectChanges();

    expect(comp.item).toBe(0);
  });

  describe('`itemChange`', () => {
    beforeEach(() => (comp as any).itemChange.next('itemChange$'));

    it('should emit `itemChange` with args', () => {
      expect(compHost.handleItemChange).toHaveBeenCalledWith('itemChange$');
    });
  });

  describe('`handleUpdateClick`', () => {
    describe('No `item`', () => {
      beforeEach(() => (comp.item = undefined));

      it('should throw error', () => {
        expect(() => comp.handleUpdateClick('delta' as any)).toThrowError(
          'No `item`'
        );
      });
    });

    describe('Has `item`', () => {
      beforeEach(
        () =>
          (comp.item = ({
            quantity: 2,
          } as unknown) as CheckoutItem)
      );

      it('should call `itemChange` `next` with args', () => {
        comp.handleUpdateClick('1');
        expect((comp as any).itemChange.next).toHaveBeenCalledWith({
          type: 'UPDATE',
          item: {
            quantity: 2,
          },
          quantity: 3,
        });

        comp.handleUpdateClick('-1');
        expect((comp as any).itemChange.next).toHaveBeenCalledWith({
          type: 'UPDATE',
          item: {
            quantity: 2,
          },
          quantity: 1,
        });
      });
    });
  });

  describe('`handleRemoveClick`', () => {
    describe('No `item`', () => {
      beforeEach(() => (comp.item = undefined));

      it('should throw error', () => {
        expect(() => comp.handleRemoveClick()).toThrowError('No `item`');
      });
    });

    describe('Has `item`', () => {
      beforeEach(() => (comp.item = ('item' as unknown) as CheckoutItem));

      it('should call `itemChange` `next` with args', () => {
        comp.handleRemoveClick();

        expect((comp as any).itemChange.next).toHaveBeenCalledWith({
          type: 'REMOVE',
          item: 'item',
        });
      });
    });
  });

  describe('Template', () => {
    describe('No `item`', () => {
      beforeEach(() => {
        compHost.item = undefined;
        fixture.detectChanges();
      });

      it('should not be displayed', () => {
        expect(page.item).toBeFalsy();
      });
    });

    describe('Has `item`', () => {
      beforeEach(() => {
        compHost.item = {
          id: '1',
          title: 'product-title',
          quantity: 5,
          variant: {
            title: 'variant-title',
            price: '1',
            compareAtPrice: '2',
          },
        };
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.item).toBeTruthy();
      });

      describe('Remove', () => {
        it('should be displayed', () => {
          expect(page.itemRemove).toBeTruthy();
        });

        it('should call `handleRemoveClick` on click', () => {
          page.itemRemove.click();

          expect(comp.handleRemoveClick).toHaveBeenCalled();
        });
      });

      describe('Item content', () => {
        describe('Content titles', () => {
          it('should display product title', () => {
            expect(page.itemProductTitle.innerHTML.trim()).toBe(
              'product-title'
            );
          });

          it('should display variant title', () => {
            expect(page.itemVariantTitle.innerHTML.trim()).toBe(
              'variant-title'
            );
          });
        });

        describe('Content meta', () => {
          describe('Quantity', () => {
            it('should display current quantity', () => {
              expect(page.itemCurrentQuantity.innerHTML).toBe('5');
            });

            describe('Minus', () => {
              it('should be displayed', () => {
                expect(page.itemQuantityMinus).toBeTruthy();
              });

              describe('`item` `quantity` is above `1`', () => {
                beforeEach(() => {
                  compHost.item = {
                    ...compHost.item,
                    quantity: 2,
                  } as CheckoutItem;
                  fixture.detectChanges();
                });

                it('should not set `disabled`', () => {
                  expect(
                    page.itemQuantityMinus.hasAttribute('disabled')
                  ).toBeFalsy();
                });

                it('should call `handleUpdateClick` on click', () => {
                  page.itemQuantityMinus.click();

                  expect(comp.handleUpdateClick).toHaveBeenCalledWith('-1');
                });
              });

              describe('`item` `quantity` is below or at `1`', () => {
                it('should set `disabled`', () => {
                  compHost.item = {
                    ...compHost.item,
                    quantity: 0,
                  } as CheckoutItem;
                  fixture.detectChanges();
                  expect(
                    page.itemQuantityMinus.hasAttribute('disabled')
                  ).toBeTruthy();

                  compHost.item = {
                    ...compHost.item,
                    quantity: 1,
                  } as CheckoutItem;
                  fixture.detectChanges();
                  expect(
                    page.itemQuantityMinus.hasAttribute('disabled')
                  ).toBeTruthy();
                });
              });
            });

            describe('Plus', () => {
              it('should be displayed', () => {
                expect(page.itemQuantityPlus).toBeTruthy();
              });

              it('should call `handleUpdateClick` on click with 1 arg', () => {
                page.itemQuantityPlus.click();

                expect(comp.handleUpdateClick).toHaveBeenCalledWith('1');
              });
            });
          });

          describe('Prices', () => {
            it('should display current price', () => {
              expect(page.itemCurrentPrice.innerHTML).toBe('£1');
            });

            describe('Previous price', () => {
              it('should be displayed if has `item` `variant.compareAtPrice`', () => {
                compHost.item = {
                  ...compHost.item,
                  variant: {
                    ...(compHost.item as CheckoutItem).variant,
                    compareAtPrice: '2',
                  },
                } as CheckoutItem;
                fixture.detectChanges();

                expect(page.itemPreviousPrice.innerHTML.trim()).toBe('£2');
              });

              it('should not be displayed if no `item` `variant.compareAtPrice`', () => {
                compHost.item = {
                  ...compHost.item,
                  variant: {
                    ...(compHost.item as CheckoutItem).variant,
                    compareAtPrice: null,
                  },
                } as CheckoutItem;
                fixture.detectChanges();

                expect(page.itemPreviousPrice).toBeFalsy();
              });
            });
          });
        });
      });
    });
  });
});

class Page {
  get item(): HTMLDivElement {
    return this.query<HTMLDivElement>('.cart-item');
  }
  get itemRemove(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('.item-remove');
  }
  get itemProductTitle(): HTMLDivElement {
    return this.query<HTMLDivElement>('.product-title');
  }
  get itemVariantTitle(): HTMLDivElement {
    return this.query<HTMLDivElement>('.variant-title');
  }
  get itemQuantityMinus(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('.quantity-minus');
  }
  get itemCurrentQuantity(): HTMLSpanElement {
    return this.query<HTMLSpanElement>('.current-quantity');
  }
  get itemQuantityPlus(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('.quantity-plus');
  }
  get itemPreviousPrice(): HTMLDivElement {
    return this.query<HTMLDivElement>('.previous-price');
  }
  get itemCurrentPrice(): HTMLDivElement {
    return this.query<HTMLDivElement>('.current-price');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  const compEl = fixture.debugElement.query(By.directive(CartItemComponent));
  comp = compEl.injector.get<CartItemComponent>(CartItemComponent);
  page = new Page();

  jest.spyOn(comp, 'handleRemoveClick');
  jest.spyOn(comp, 'handleUpdateClick');
  jest.spyOn((comp as any).itemChange, 'next');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
