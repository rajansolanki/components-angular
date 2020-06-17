import { NgElement, WithProperties } from '@angular/elements';

import { SlideComponent } from './components/slide.component';
import { SlideModule, NAME } from './slide.module';
import { setup } from './setup';

type ComponentProps = WithProperties<
  Pick<SlideComponent, never> & { ref?: any }
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

export { setup as default, SlideModule };
