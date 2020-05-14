import { NgElement, WithProperties } from '@angular/elements';

import { LoadMoreComponent } from './components/load-more.component';
import { LoadMoreModule, NAME } from './load-more.module';
import { setup } from './setup';

type ComponentProps = WithProperties<Pick<LoadMoreComponent, never>>;

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

export { setup as default, LoadMoreModule };
