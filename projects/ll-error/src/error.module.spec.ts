import { Injector } from '@angular/core';

import { bootstrapModule } from '@rajansolanki/ll-shared';
import { ErrorComponent } from './components/error.component';
import { ErrorModule } from './error.module';

jest.mock('@rajansolanki/ll-shared', () => ({
  bootstrapModule: jest.fn(),
}));

jest.mock('./components/error.component', () => ({
  ErrorComponent: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`ErrorModule`', () => {
  let errorModule: ErrorModule;

  beforeEach(
    () => (errorModule = new ErrorModule(('injector' as unknown) as Injector))
  );

  describe('`ngDoBootstrap`', () => {
    beforeEach(() => errorModule.ngDoBootstrap());

    it('should call `bootstrapModule` with args', () => {
      expect(bootstrapModule).toHaveBeenCalledWith(
        'component-error',
        ErrorComponent,
        'injector'
      );
    });
  });
});
