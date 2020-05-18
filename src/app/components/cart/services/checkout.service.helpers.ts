import { CheckoutItem, Checkout } from '@bit/rajansolanki.dev.shared';
import { getStoreItems } from './store.helpers';

export type CheckoutItemStoreKey = string;
export type CheckoutItemStore = Map<CheckoutItemStoreKey, CheckoutItem>;

export interface CheckoutChangeAdd {
  type: 'ADD';
  item: CheckoutItem;
}
export interface CheckoutChangeUpdate {
  type: 'UPDATE';
  item: CheckoutItem;
  quantity: number;
}
export interface CheckoutChangeRemove {
  type: 'REMOVE';
  item: CheckoutItem;
}
export type CheckoutChange =
  | CheckoutChangeAdd
  | CheckoutChangeUpdate
  | CheckoutChangeRemove;

export const createTotalPrice = (items: CheckoutItem[]): string =>
  items
    .reduce(
      (acc, { quantity, variant: { price } }) => acc + quantity * +price,
      0
    )
    .toFixed(2);

export const createCheckout = (store: CheckoutItemStore): Checkout => {
  const lineItems = getStoreItems(store);

  return {
    lineItems,
    totalPrice: createTotalPrice(lineItems),
    ready: true,
  };
};
