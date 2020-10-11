import { setupModule } from '@bit/rajansolanki.dev.shared';
import { SlideModule } from './slide.module';
import { setup } from './setup';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./slide.module', () => ({
  SlideModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`setup`', () => {
  it('should call `setupModule` with `SlideModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(SlideModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
