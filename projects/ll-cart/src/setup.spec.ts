import { setupModule } from '@rajansolanki/ll-shared';
import { CartModule } from './cart.module';
import { setup } from './setup';

jest.mock('@rajansolanki/ll-shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./cart.module', () => ({
  CartModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`setup`', () => {
  it('should call `setupModule` with `CartModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(CartModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
