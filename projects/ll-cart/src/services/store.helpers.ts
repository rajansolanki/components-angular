import { CheckoutItem } from '@rajansolanki/ll-shared';
import {
  CheckoutChange,
  CheckoutChangeAdd,
  CheckoutChangeRemove,
  CheckoutChangeUpdate,
  CheckoutItemStore,
} from './checkout.service.helpers';

export const getStoreItems = (store: CheckoutItemStore): CheckoutItem[] =>
  Array.from(store, ([_, item]) => item);

export const addVariantToStore = (
  { item }: CheckoutChangeAdd,
  store: CheckoutItemStore
): CheckoutItemStore => store.set(item.id, item);

export const updateVariantInStore = (
  { item: { id }, quantity }: CheckoutChangeUpdate,
  store: CheckoutItemStore
): void => {
  const item = store.get(id);
  if (!item) throw new Error('No `item`');

  const newItem: CheckoutItem = {
    ...item,
    quantity,
  };

  store.set(newItem.id, newItem);
};

export const removeVariantFromStore = (
  { item: { id } }: CheckoutChangeRemove,
  store: CheckoutItemStore
): void => {
  const hasDeleted = store.delete(id);

  if (!hasDeleted) throw new Error('No `item`');
};

export const changeStore = (
  change: CheckoutChange,
  store: CheckoutItemStore
): CheckoutItemStore => {
  switch (change.type) {
    case 'ADD':
      addVariantToStore(change, store);
      break;
    case 'UPDATE':
      updateVariantInStore(change, store);
      break;
    case 'REMOVE':
      removeVariantFromStore(change, store);
      break;
  }

  return store;
};
