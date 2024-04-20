import { setupModule } from '@rajansolanki/ll-shared';
import { HoverModule } from './hover.module';
import { setup } from './setup';

jest.mock('@rajansolanki/ll-shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./hover.module', () => ({
  HoverModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`setup`', () => {
  it('should call `setupModule` with `HoverModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(HoverModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
