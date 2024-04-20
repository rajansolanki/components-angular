import { createImageWidth } from '@rajansolanki/ll-shared';

export interface Image {
  src: string;
}

export interface Variant {
  title: string;
  image: Image;
}

export const getVariants = (): Variant[] => [
  {
    title: 'Blue',
    image: {
      src: `https://cdn.shopify.com/s/files/1/0058/9683/1043/products/night-spirit-blue_${createImageWidth()}x.jpg?v=1584571706`,
    },
  },
  {
    title: 'Black',
    image: {
      src: `https://cdn.shopify.com/s/files/1/0058/9683/1043/products/night-spirit-black_${createImageWidth()}x.jpg?v=1584571706`,
    },
  },
];
