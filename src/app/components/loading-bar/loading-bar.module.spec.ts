import { Injector } from '@angular/core';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { LoadingBarComponent } from './components/loading-bar.component';
import { LoadingBarModule } from './loading-bar.module';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  bootstrapModule: jest.fn(),
}));

jest.mock('./components/loading-bar.component', () => ({
  LoadingBarComponent: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(expect.hasAssertions);

describe('`LoadingBarModule`', () => {
  let loadingbarModule: LoadingBarModule;

  beforeEach(
    () =>
      (loadingbarModule = new LoadingBarModule(
        ('injector' as unknown) as Injector
      ))
  );

  describe('`ngDoBootstrap`', () => {
    beforeEach(() => loadingbarModule.ngDoBootstrap());

    it('should call `bootstrapModule` with args', () => {
      expect(bootstrapModule).toHaveBeenCalledWith(
        'component-loading-bar',
        LoadingBarComponent,
        'injector'
      );
    });
  });
});
