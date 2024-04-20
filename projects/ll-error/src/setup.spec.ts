import { setupModule } from '@rajansolanki/ll-shared';
import { ErrorModule } from './error.module';
import { setup } from './setup';

jest.mock('@rajansolanki/ll-shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./error.module', () => ({
  ErrorModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`setup`', () => {
  it('should call `setupModule` with `ErrorModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(ErrorModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
