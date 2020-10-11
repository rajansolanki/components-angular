import { setupModule } from '@bit/rajansolanki.dev.shared';
import { LoadingBarModule } from './loading-bar.module';
import { setup } from './setup';

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./loading-bar.module', () => ({
  LoadingBarModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`setup`', () => {
  it('should call `setupModule` with `LoadingBarModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(LoadingBarModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
