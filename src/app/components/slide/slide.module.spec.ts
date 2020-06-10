import { Injector } from '@angular/core';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { SlideComponent } from './components/slide.component';
import { SlideModule } from './slide.module';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  bootstrapModule: jest.fn(),
}));

jest.mock('./components/slide.component', () => ({
  SlideComponent: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(expect.hasAssertions);

describe('`SlideModule`', () => {
  let slideModule: SlideModule;

  beforeEach(
    () => (slideModule = new SlideModule(('injector' as unknown) as Injector))
  );

  describe('`ngDoBootstrap`', () => {
    beforeEach(() => slideModule.ngDoBootstrap());

    it('should call `bootstrapModule` with args', () => {
      expect(bootstrapModule).toHaveBeenCalledWith(
        'component-slide',
        SlideComponent,
        'injector'
      );
    });
  });
});
