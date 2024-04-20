import { getPlatform, PlatformRef } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { setupModule, createImageWidth, bootstrapModule } from './helpers';

customElements.get = jest.fn();
customElements.define = jest.fn();

jest.mock('@angular/core', () => {
  return {
    ...jest.requireActual<{}>('@angular/core'),
    getPlatform: jest.fn().mockReturnValue({ bootstrapModule: jest.fn() }),
  };
});

jest.mock('@angular/platform-browser', () => {
  return {
    ...jest.requireActual<{}>('@angular/platform-browser'),
    platformBrowser: jest.fn().mockReturnValue({ bootstrapModule: jest.fn() }),
  };
});

jest.mock('@angular/elements', () => ({
  createCustomElement: jest.fn().mockReturnValue('createCustomElementReturn'),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`setupModule`', () => {
  it('should call `getPlatform`', () => {
    setupModule('module' as any);

    expect(getPlatform).toHaveBeenCalled();
  });

  describe('`getPlatform` returns `PlatformRef`', () => {
    beforeEach(() => {
      (getPlatform as jest.Mock).mockReturnValue({
        bootstrapModule: jest.fn(),
      });
      setupModule('module' as any);
    });

    it('should call `getPlatform` `bootstrapModule` with `module` arg', () => {
      expect(
        (getPlatform() as PlatformRef).bootstrapModule
      ).toHaveBeenCalledWith('module');
    });

    it('should not call `platformBrowser`', () => {
      expect(platformBrowser).not.toHaveBeenCalled();
    });
  });

  describe('`getPlatform` returns `null`', () => {
    beforeEach(() => {
      (getPlatform as jest.Mock).mockReturnValue(null);
      setupModule('module' as any);
    });

    it('should call `platformBrowser`', () => {
      expect(platformBrowser).toHaveBeenCalled();
    });

    it('should call `platformBrowser` `bootstrapModule` with `module` arg', () => {
      expect(
        (platformBrowser() as PlatformRef).bootstrapModule
      ).toHaveBeenCalledWith('module');
    });
  });
});

describe('`bootstrapModule`', () => {
  it('should call `customElements` `get` with `name` arg', () => {
    bootstrapModule('name', 'component' as any, 'injector' as any);

    expect(customElements.get).toHaveBeenCalledWith('name');
  });

  describe('`customElements` `get` returns element', () => {
    beforeEach(() => {
      (customElements.get as jest.Mock).mockReturnValue({});
      bootstrapModule('name', 'component' as any, 'injector' as any);
    });

    it('should not call `createCustomElement`', () => {
      expect(createCustomElement).not.toHaveBeenCalled();
    });

    it('should not call `customElements` `define`', () => {
      expect(customElements.define).not.toHaveBeenCalled();
    });
  });

  describe('`customElements` `get` returns `undefined`', () => {
    beforeEach(() => {
      (customElements.get as jest.Mock).mockReturnValue(undefined);
      bootstrapModule('name', 'component' as any, 'injector' as any);
    });

    it('should call `createCustomElement` with args', () => {
      expect(createCustomElement).toHaveBeenCalledWith('component', {
        injector: 'injector',
      });
    });

    it('should call `customElements` `define` with args', () => {
      expect(customElements.define).toHaveBeenCalledWith(
        'name',
        'createCustomElementReturn'
      );
    });
  });
});

describe('`createImageWidth`', () => {
  describe('No `window` `innerWidth`', () => {
    beforeEach(() =>
      Object.defineProperty(window, 'innerWidth', {
        value: undefined,
      })
    );

    it('should return `IMAGE_XS`', () => {
      const res = createImageWidth();

      expect(res).toBe(550);
    });
  });

  describe('Has `window` `innerWidth`', () => {
    it('should return rounded up width if `window` `innerWidth` is bigger than `IMAGE_XS`', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 10101,
      });
      const res = createImageWidth();

      expect(res).toBe(10200);
    });

    it('should return rounded up `IMAGE_XS` if `window` `innerWidth` is `IMAGE_XS`', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 550,
      });
      const res = createImageWidth();

      expect(res).toBe(600);
    });

    it('should return `IMAGE_XS` if `window` `innerWidth` is less than `IMAGE_XS`', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 549,
      });
      const res = createImageWidth();

      expect(res).toBe(550);
    });
  });
});
