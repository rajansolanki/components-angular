import { NgElement, WithProperties } from '@angular/elements';

import { HoverComponent } from './components/hover.component';
import { HoverModule, NAME } from './hover.module';
import { setup } from './setup';

type ComponentProps = WithProperties<
  Pick<HoverComponent, never> & { ref?: any }
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

export { setup, HoverModule };
