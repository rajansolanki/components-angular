import { ChangeDetectorRef } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { NEVER, of, timer } from 'rxjs';

import { loadMore } from './load-more.component.helpers';
import { LoadMoreComponent } from './load-more.component';

let comp: LoadMoreComponent;
let fixture: ComponentFixture<LoadMoreComponent>;
let changeDetectorRef: ChangeDetectorRef;
let page: Page;

jest.mock('./load-more.component.helpers', () => ({
  loadMore: jest.fn().mockReturnValue(of('loadMore$')),
}));

describe('`LoadMoreComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [LoadMoreComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`handleTrigger`', () => {
    beforeEach(() => {
      (comp as any).shouldLoad$ = { next: jest.fn() };
      comp.handleTrigger();
    });

    it('should call `shouldLoad$` `next`', () => {
      expect((comp as any).shouldLoad$.next).toHaveBeenCalled();
    });
  });

  describe('`ngOnInit`', () => {
    it('should call initial `loadMore`', () => {
      (comp as any).shouldLoad$.next();

      expect(loadMore).toHaveBeenCalled();
    });

    it('should call `loadMore` on `shouldLoad$` emit', () => {
      (comp as any).shouldLoad$.next();

      expect(loadMore).toHaveBeenCalledTimes(2);
    });

    it('should not call `loadMore` on `shouldLoad$` emit again if `loadMore` has not completed', () => {
      expect(loadMore).toHaveBeenCalledTimes(1);
      (loadMore as jest.Mock).mockReturnValueOnce(NEVER);

      (comp as any).shouldLoad$.next();
      expect(loadMore).toHaveBeenCalledTimes(2);
      (comp as any).shouldLoad$.next();
      expect(loadMore).toHaveBeenCalledTimes(2);
    });

    it('should call `loadMore` on `shouldLoad$` emit again if `loadMore` has completed', () => {
      expect(loadMore).toHaveBeenCalledTimes(1);
      (loadMore as jest.Mock).mockReturnValueOnce(of(''));

      (comp as any).shouldLoad$.next();
      expect(loadMore).toHaveBeenCalledTimes(2);
      (comp as any).shouldLoad$.next();
      expect(loadMore).toHaveBeenCalledTimes(3);
    });

    describe('Return', () => {
      it('should set `data` as `loadMore` emit', () => {
        expect(comp.data).toBe('loadMore$');
      });

      it('should call `changeDetectorRef` `markForCheck`', () => {
        expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
      });

      it('should unsubscribe if `onDestroy$` emits', fakeAsync(() => {
        (loadMore as jest.Mock).mockReturnValueOnce(timer(0, 1000));
        (comp as any).shouldLoad$.next();

        tick(1000);
        expect(comp.data).toBe(1);
        (comp as any).onDestroy$.next();
        tick(1000);
        expect(comp.data).toBe(1);
      }));
    });
  });

  describe('`ngOnDestroy`', () => {
    beforeEach(() => comp.ngOnDestroy());

    it('should call `onDestroy$` `next` and `complete`', () => {
      expect((comp as any).onDestroy$.next).toHaveBeenCalled();
      expect((comp as any).onDestroy$.complete).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    beforeEach(() => (comp.handleTrigger = jest.fn()));

    describe('`ngIf`', () => {
      describe('No `data`', () => {
        it('should display hexagon and not error', () => {
          comp.data = undefined;
          changeDetectorRef.markForCheck();
          fixture.detectChanges();

          expect(page.hexagon).toBeTruthy();
          expect(page.error).toBeFalsy();
        });
      });

      describe('Has `data`', () => {
        describe('`data` `loading` is `true` and has `data` `data`', () => {
          it('should display hexagon and not error', () => {
            comp.data = { loading: true, data: 'data' };
            changeDetectorRef.markForCheck();
            fixture.detectChanges();

            expect(page.hexagon).toBeTruthy();
            expect(page.error).toBeFalsy();
          });
        });

        describe('`data` `loading` is `true` and no `data` `data`', () => {
          it('should display hexagon and not error', () => {
            comp.data = { loading: true, data: undefined };
            changeDetectorRef.markForCheck();
            fixture.detectChanges();

            expect(page.hexagon).toBeTruthy();
            expect(page.error).toBeFalsy();
          });
        });

        describe('`data` `loading` is `false` and has `data` `data.products`', () => {
          it('should display hexagon and not error', () => {
            comp.data = { loading: false, data: 'data' };
            changeDetectorRef.markForCheck();
            fixture.detectChanges();

            expect(page.hexagon).toBeTruthy();
            expect(page.error).toBeFalsy();
          });
        });

        describe('`data` `loading` is `false` and no `data` `data.products`', () => {
          it('should display error and not hexagon', () => {
            comp.data = { loading: false, data: undefined };
            changeDetectorRef.markForCheck();
            fixture.detectChanges();

            expect(page.error).toBeTruthy();
            expect(page.hexagon).toBeFalsy();
          });
        });
      });
    });

    describe('Hexagon', () => {
      beforeEach(() => {
        comp.data = { loading: false, data: 'data' };
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.hexagon).toBeTruthy();
      });

      it('should have loading class if `data` `loading` is `true`', () => {
        comp.data = { loading: true, data: 'data' };
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
        expect(page.hexagon.className).toBe('loading');

        comp.data = { loading: false, data: 'data' };
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
        expect(page.hexagon.className).toBe('');
      });

      it('should call `handleTrigger` on click', () => {
        page.hexagon.click();

        expect(comp.handleTrigger).toHaveBeenCalled();
      });

      describe('Svg', () => {
        it('should be displayed', () => {
          expect(page.hexagonSvg).toBeTruthy();
        });
      });
    });

    describe('Error', () => {
      beforeEach(() => {
        comp.data = { loading: false, data: undefined };
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.error).toBeTruthy();
      });

      describe('Error button', () => {
        it('should be displayed', () => {
          expect(page.errorButton).toBeTruthy();
        });

        it('should call `handleTrigger` on click', () => {
          page.errorButton.dispatchEvent(new Event('click'));

          expect(comp.handleTrigger).toHaveBeenCalled();
        });
      });
    });
  });
});

class Page {
  get hexagon(): HTMLDivElement {
    return this.query<HTMLDivElement>('#load-more #hexagon');
  }
  get hexagonSvg(): HTMLElement {
    return this.query<HTMLElement>('#load-more #hexagon svg');
  }
  get error(): HTMLDivElement {
    return this.query<HTMLDivElement>('#load-more div:not(#hexagon)');
  }
  get errorButton(): HTMLElement {
    return this.query<HTMLElement>('#load-more button');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(LoadMoreComponent);
  comp = fixture.componentInstance;
  changeDetectorRef = (comp as any).changeDetectorRef;
  page = new Page();

  jest.spyOn(changeDetectorRef, 'markForCheck');
  jest.spyOn(comp, 'handleTrigger');
  jest.spyOn((comp as any).shouldLoad$, 'next');
  jest.spyOn((comp as any).onDestroy$, 'next');
  jest.spyOn((comp as any).onDestroy$, 'complete');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
