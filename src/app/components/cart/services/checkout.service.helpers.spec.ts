import { CheckoutItem } from '@bit/rajansolanki.dev.shared';
import { getStoreItems } from './store.helpers';
import { createCheckout, createTotalPrice } from './checkout.service.helpers';

jest.mock('./store.helpers', () => ({
  getStoreItems: jest.fn().mockReturnValue('getStoreItemsReturn'),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`createTotalPrice`', () => {
  it('should return total price rounded to 2 decimal places', () => {
    const res = createTotalPrice([
      {
        quantity: 1,
        variant: {
          price: '2.22222',
        },
      } as CheckoutItem,
      {
        quantity: 2,
        variant: {
          price: '2.22222',
        },
      } as CheckoutItem,
    ]);

    expect(res).toBe('6.67');
  });
});

describe('`createCheckout`', () => {
  beforeEach(
    () =>
      ((createTotalPrice as unknown) = jest
        .fn()
        .mockReturnValue('createTotalPriceReturn'))
  );

  it('should call `getStoreItems` with `store` arg', () => {
    createCheckout('store' as any);

    expect(getStoreItems).toHaveBeenCalledWith('store');
  });

  it('should call `createTotalPrice` with `getStoreItems` return arg', () => {
    createCheckout('store' as any);

    expect(createTotalPrice).toHaveBeenCalledWith('getStoreItemsReturn');
  });

  it('should return `Checkout`', () => {
    const res = createCheckout('store' as any);

    expect(res).toEqual({
      lineItems: 'getStoreItemsReturn',
      totalPrice: 'createTotalPriceReturn',
      ready: true,
    });
  });
});
