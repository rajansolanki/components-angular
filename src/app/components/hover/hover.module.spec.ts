import { Injector } from '@angular/core';

import { bootstrapModule } from '@bit/rajansolanki.dev.shared';
import { HoverComponent } from './components/hover.component';
import { HoverModule } from './hover.module';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  bootstrapModule: jest.fn(),
}));

jest.mock('./components/hover.component', () => ({
  HoverComponent: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(expect.hasAssertions);

describe('`HoverModule`', () => {
  let hoverModule: HoverModule;

  beforeEach(
    () => (hoverModule = new HoverModule(('injector' as unknown) as Injector))
  );

  describe('`ngDoBootstrap`', () => {
    beforeEach(() => hoverModule.ngDoBootstrap());

    it('should call `bootstrapModule` with args', () => {
      expect(bootstrapModule).toHaveBeenCalledWith(
        'component-hover',
        HoverComponent,
        'injector'
      );
    });
  });
});
