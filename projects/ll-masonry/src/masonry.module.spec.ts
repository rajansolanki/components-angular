import { Injector } from '@angular/core';

import { bootstrapModule } from '@rajansolanki/ll-shared';
import { MasonryComponent } from './components/masonry.component';
import { MasonryModule } from './masonry.module';

jest.mock('@rajansolanki/ll-shared', () => ({
  bootstrapModule: jest.fn(),
}));

jest.mock('./components/masonry.component', () => ({
  MasonryComponent: jest.fn(),
}));

jest.mock('./directives/masonry.directive', () => ({
  MasonryDirective: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`MasonryModule`', () => {
  let masonryModule: MasonryModule;

  beforeEach(
    () =>
      (masonryModule = new MasonryModule(('injector' as unknown) as Injector))
  );

  describe('`ngDoBootstrap`', () => {
    beforeEach(() => masonryModule.ngDoBootstrap());

    it('should call `bootstrapModule` with args', () => {
      expect(bootstrapModule).toHaveBeenCalledWith(
        'component-masonry',
        MasonryComponent,
        'injector'
      );
    });
  });
});
