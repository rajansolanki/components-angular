import { CheckoutItem } from '@bit/rajansolanki.dev.shared';
import { CheckoutChange, CheckoutItemStore } from './checkout.service.helpers';
import {
  addVariantToStore,
  changeStore,
  getStoreItems,
  removeVariantFromStore,
  updateVariantInStore,
} from './store.helpers';

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`getStoreItems`', () => {
  it('should map and return `store`', () => {
    const res = getStoreItems(
      new Map([
        ['id1', { id: 'id1', quantity: 1 } as CheckoutItem],
        ['id2', { id: 'id2', quantity: 2 } as CheckoutItem],
        ['id3', { id: 'id3', quantity: 3 } as CheckoutItem],
      ])
    );

    expect(res).toEqual([
      { id: 'id1', quantity: 1 },
      { id: 'id2', quantity: 2 },
      { id: 'id3', quantity: 3 },
    ]);
  });
});

describe('`addVariantToStore`', () => {
  it('should call `store` `set` with args', () => {
    const store = ({ set: jest.fn() } as unknown) as CheckoutItemStore;

    addVariantToStore(
      {
        type: 'ADD',
        item: { id: 'id', quantity: 1 } as CheckoutItem,
      },
      store
    );

    expect(store.set).toHaveBeenCalledWith('id', {
      id: 'id',
      quantity: 1,
    });
  });
});

describe('`updateVariantInStore`', () => {
  it('should call `store` `get` with  `id` arg', () => {
    const store = ({
      get: jest.fn().mockReturnValue({ id: 'getReturn' }),
      set: jest.fn(),
    } as unknown) as CheckoutItemStore;

    updateVariantInStore(
      {
        type: 'UPDATE',
        item: { id: 'id', quantity: 1 } as CheckoutItem,
        quantity: 2,
      },
      store
    );

    expect(store.get).toHaveBeenCalledWith('id');
  });

  describe('`store` `get` returns `undefined`', () => {
    it('should throw error', () => {
      const res = () =>
        updateVariantInStore(
          {
            type: 'UPDATE',
            item: { id: 'id', quantity: 1 } as CheckoutItem,
            quantity: 2,
          },
          ({
            get: jest.fn().mockReturnValue(undefined),
            set: jest.fn(),
          } as unknown) as CheckoutItemStore
        );

      expect(res).toThrowError('No `item`');
    });
  });

  describe('`store` `get` does not return `undefined`', () => {
    it('should call `store` `set` with args', () => {
      const store = ({
        get: jest.fn().mockReturnValue({ id: 'getReturn' }),
        set: jest.fn(),
      } as unknown) as CheckoutItemStore;

      updateVariantInStore(
        {
          type: 'UPDATE',
          item: { id: 'id', quantity: 1 } as CheckoutItem,
          quantity: 2,
        },
        store
      );

      expect(store.set).toHaveBeenCalledWith('getReturn', {
        id: 'getReturn',
        quantity: 2,
      });
    });
  });
});

describe('`removeVariantFromStore`', () => {
  it('should call `store` `delete` with  `id` arg', () => {
    const store = ({
      delete: jest.fn().mockReturnValue('deleteReturn'),
    } as unknown) as CheckoutItemStore;

    removeVariantFromStore(
      {
        type: 'REMOVE',
        item: { id: 'id', quantity: 1 } as CheckoutItem,
      },
      store
    );

    expect(store.delete).toHaveBeenCalledWith('id');
  });

  describe('`store` `delete` returns `true`', () => {
    it('should not throw', () => {
      const res = () =>
        removeVariantFromStore(
          {
            type: 'REMOVE',
            item: { id: 'id', quantity: 1 } as CheckoutItem,
          },
          ({
            delete: jest.fn().mockReturnValue(true),
          } as unknown) as CheckoutItemStore
        );

      expect(res).not.toThrow();
    });
  });

  describe('`store` `delete` returns `false`', () => {
    it('should throw error', () => {
      const res = () =>
        removeVariantFromStore(
          {
            type: 'REMOVE',
            item: { id: 'id', quantity: 1 } as CheckoutItem,
          },
          ({
            delete: jest.fn().mockReturnValue(false),
          } as unknown) as CheckoutItemStore
        );

      expect(res).toThrowError('No `item`');
    });
  });
});

describe('`changeStore`', () => {
  beforeEach(() => {
    (addVariantToStore as unknown) = jest
      .fn()
      .mockReturnValue('addVariantToStoreReturn');
    (updateVariantInStore as unknown) = jest
      .fn()
      .mockReturnValue('updateVariantInStoreReturn');
    (removeVariantFromStore as unknown) = jest
      .fn()
      .mockReturnValue('removeVariantFromStoreReturn');
    (getStoreItems as unknown) = jest
      .fn()
      .mockReturnValue('getStoreItemsReturn');
  });

  describe('`type`', () => {
    describe('ADD', () => {
      it('should call `addVariantToStore` with `change` and `store` args', () => {
        changeStore({ type: 'ADD' } as CheckoutChange, 'store' as any);

        expect(addVariantToStore).toHaveBeenCalledWith(
          {
            type: 'ADD',
          },
          'store'
        );
      });

      it('should return `store`', () => {
        const res = changeStore(
          { type: 'ADD' } as CheckoutChange,
          'store' as any
        );

        expect(res).toBe('store');
      });
    });

    describe('UPDATE', () => {
      it('should call `updateVariantInStore` with `change` and `store` args', () => {
        changeStore({ type: 'UPDATE' } as CheckoutChange, 'store' as any);

        expect(updateVariantInStore).toHaveBeenCalledWith(
          {
            type: 'UPDATE',
          },
          'store'
        );
      });

      it('should return `store`', () => {
        const res = changeStore(
          { type: 'UPDATE' } as CheckoutChange,
          'store' as any
        );

        expect(res).toBe('store');
      });
    });

    describe('REMOVE', () => {
      it('should call `removeVariantFromStore` with `change` and `store` args', () => {
        changeStore({ type: 'REMOVE' } as CheckoutChange, 'store' as any);

        expect(removeVariantFromStore).toHaveBeenCalledWith(
          {
            type: 'REMOVE',
          },
          'store'
        );
      });

      it('should return `store`', () => {
        const res = changeStore(
          { type: 'REMOVE' } as CheckoutChange,
          'store' as any
        );

        expect(res).toBe('store');
      });
    });
  });
});
