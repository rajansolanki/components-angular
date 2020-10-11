import { Injector } from '@angular/core';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { SearchComponent } from './components/search.component';
import { SearchModule } from './search.module';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  bootstrapModule: jest.fn(),
}));

jest.mock('./components/search.component', () => ({
  SearchComponent: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`SearchModule`', () => {
  let searchModule: SearchModule;

  beforeEach(
    () => (searchModule = new SearchModule(('injector' as unknown) as Injector))
  );

  describe('`ngDoBootstrap`', () => {
    beforeEach(() => searchModule.ngDoBootstrap());

    it('should call `bootstrapModule` with args', () => {
      expect(bootstrapModule).toHaveBeenCalledWith(
        'component-search',
        SearchComponent,
        'injector'
      );
    });
  });
});
