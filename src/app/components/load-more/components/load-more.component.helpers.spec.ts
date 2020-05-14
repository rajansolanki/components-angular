import { fakeAsync, tick } from '@angular/core/testing';

import { loadMore } from './load-more.component.helpers';

beforeEach(jest.clearAllMocks);
afterEach(expect.hasAssertions);

describe('`loadMore`', () => {
  it('should emit', fakeAsync(() => {
    let res;
    const sub = loadMore().subscribe((res$) => (res = res$));

    expect(res).toEqual({ loading: true });
    expect(sub.closed).toBe(false);
    tick(1000);
    expect(res).toEqual({ loading: false, data: null });
    expect(sub.closed).toBe(true);
  }));
});
