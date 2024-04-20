import { NgElement, WithProperties } from '@angular/elements';

import { ErrorComponent, ErrorType } from './components/error.component';
import { ErrorModule, NAME } from './error.module';
import { setup } from './setup';

type ComponentProps = WithProperties<
  Pick<ErrorComponent, 'type'> & { ref?: any }
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

export { setup, ErrorModule, ErrorType };
