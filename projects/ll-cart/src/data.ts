import { CheckoutItem } from '@rajansolanki/ll-shared';

export const getItems: () => CheckoutItem[] = () => [
  {
    id: '1',
    title: 'Night Spirit',
    quantity: 1,
    variant: {
      title: 'Black',
      price: '40.99',
      compareAtPrice: '44.99',
    },
  },
  {
    id: '2',
    title: 'Monarch',
    quantity: 1,
    variant: {
      title: 'Gold',
      price: '69.99',
      compareAtPrice: '85.00',
    },
  },
];
