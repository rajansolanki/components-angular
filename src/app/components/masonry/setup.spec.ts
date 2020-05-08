import { setupModule } from '@bit/rajansolanki.dev.shared';
import { MasonryModule } from './masonry.module';
import { setup } from './setup';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./masonry.module', () => ({
  MasonryModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(expect.hasAssertions);

describe('`setup`', () => {
  it('should call `setupModule` with `MasonryModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(MasonryModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
