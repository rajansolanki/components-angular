import { NgElement, WithProperties } from '@angular/elements';

import { MasonryComponent } from './components/masonry.component';
import { MasonryModule, NAME } from './masonry.module';
import { setup } from './setup';

type ComponentProps = WithProperties<
  Pick<MasonryComponent, never> & { ref?: any }
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

export { setup as default, MasonryModule };
