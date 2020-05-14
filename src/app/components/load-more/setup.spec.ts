import { setupModule } from '@bit/rajansolanki.dev.shared';
import { LoadMoreModule } from './load-more.module';
import { setup } from './setup';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./load-more.module', () => ({
  LoadMoreModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(expect.hasAssertions);

describe('`setup`', () => {
  it('should call `setupModule` with `LoadMoreModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(LoadMoreModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
