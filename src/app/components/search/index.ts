import { NgElement, WithProperties } from '@angular/elements';

import { SearchComponent } from './components/search.component';
import { SearchModule, NAME } from './search.module';
import { setup } from './setup';

type ComponentProps = WithProperties<Pick<SearchComponent, never>>;

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

export { setup as default, SearchModule };
