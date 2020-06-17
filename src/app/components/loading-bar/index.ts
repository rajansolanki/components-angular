import { NgElement, WithProperties } from '@angular/elements';

import { LoadingBarComponent } from './components/loading-bar.component';
import { LoadingBarModule, NAME } from './loading-bar.module';
import { setup } from './setup';

type ComponentProps = WithProperties<
  Pick<LoadingBarComponent, 'status'> & { ref?: any }
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

export { setup as default, LoadingBarModule };
