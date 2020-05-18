/* tslint:disable:class-name */

export interface Image {
  src: any;
  alt: string | null;
}

export interface BasicProductNode_images_edges {
  node: Image;
}

export interface BasicProductNode_images {
  edges: BasicProductNode_images_edges[];
}

export interface BasicProductNode {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  description: string;
  images: BasicProductNode_images;
}

export interface BasicProduct {
  node: BasicProductNode;
}

export interface CheckoutItem_node_variant {
  title: string;
  price: string;
  compareAtPrice: string | null;
}

export interface CheckoutItem {
  id: string;
  title: string;
  quantity: number;
  variant: CheckoutItem_node_variant;
}

export interface Checkout {
  totalPrice: string;
  ready: boolean;
  lineItems: CheckoutItem[];
}
