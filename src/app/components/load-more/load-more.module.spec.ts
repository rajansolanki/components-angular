import { Injector } from '@angular/core';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { LoadMoreComponent } from './components/load-more.component';
import { LoadMoreModule } from './load-more.module';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  bootstrapModule: jest.fn(),
}));

jest.mock('./components/load-more.component', () => ({
  LoadMoreComponent: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`LoadMoreModule`', () => {
  let errorModule: LoadMoreModule;

  beforeEach(
    () =>
      (errorModule = new LoadMoreModule(('injector' as unknown) as Injector))
  );

  describe('`ngDoBootstrap`', () => {
    beforeEach(() => errorModule.ngDoBootstrap());

    it('should call `bootstrapModule` with args', () => {
      expect(bootstrapModule).toHaveBeenCalledWith(
        'component-load-more',
        LoadMoreComponent,
        'injector'
      );
    });
  });
});
