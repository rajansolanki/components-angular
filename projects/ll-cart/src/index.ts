import { NgElement, WithProperties } from '@angular/elements';

import { CartComponent } from './components/cart.component';
import { CartModule, NAME } from './cart.module';
import { setup } from './setup';

type ComponentProps = WithProperties<
  Pick<CartComponent, never> & { ref?: any }
>;

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: NgElement & ComponentProps;
  }

  namespace JSX {
    interface IntrinsicElements {
      [NAME]: ComponentProps;
    }
  }
}

export { setup, CartModule };
