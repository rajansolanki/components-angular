import { setupModule } from '@rajansolanki/ll-shared';
import { SearchModule } from './search.module';
import { setup } from './setup';

jest.mock('@rajansolanki/ll-shared', () => ({
  setupModule: jest.fn().mockReturnValue('setupModuleReturn'),
}));

jest.mock('./search.module', () => ({
  SearchModule: jest.fn(),
}));

beforeEach(jest.clearAllMocks);
afterEach(() => expect.hasAssertions());

describe('`setup`', () => {
  it('should call `setupModule` with `SearchModule` arg', () => {
    setup();

    expect(setupModule).toHaveBeenCalledWith(SearchModule);
  });

  it('should return `setupModule`', () => {
    const res = setup();

    expect(res).toBe('setupModuleReturn');
  });
});
