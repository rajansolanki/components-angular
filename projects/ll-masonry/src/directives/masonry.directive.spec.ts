import { Component, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MasonryDirective } from './masonry.directive';
import { createDimensions } from './masonry.directive.helpers';

let fixture: ComponentFixture<TestHostComponent>;
let masonryDirective: MasonryDirective;
let renderer2: Renderer2;

window.setInterval = jest.fn() as any;
window.clearInterval = jest.fn();

jest.mock('./masonry.directive.helpers', () => ({
  createDimensions: jest.fn().mockReturnValue('createDimensionsReturn'),
  initialDimensions: 'initialDimensions',
}));

@Component({
  template: '<main componentMasonry><div #masonry></div></main>',
})
class TestHostComponent {}

describe('`MasonryDirective`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [MasonryDirective, TestHostComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create directive', () => {
    expect(masonryDirective).toBeTruthy();
  });

  describe('`getDimensions`', () => {
    it('should call `dimensions` `get` with `index - 1` arg', () => {
      (masonryDirective as any).getDimensions(0);

      expect((masonryDirective as any).dimensions.get).toHaveBeenCalledWith(-1);
    });

    it(
      'should call `createDimensions` with `index` and' +
        ' `previousDimensions` as `dimensions` `get` return if `dimensions` `get` returns `Dimensions`',
      () => {
        ((masonryDirective as any).dimensions
          .get as jest.Mock).mockReturnValueOnce('getReturn');
        (masonryDirective as any).getDimensions(0);

        expect(createDimensions).toHaveBeenCalledWith(0, 'getReturn');
      }
    );

    it(
      'should call `createDimensions` with `index` and' +
        ' `previousDimensions` as `initialDimensions` return if `dimensions` `get` returns `undefined`',
      () => {
        ((masonryDirective as any).dimensions
          .get as jest.Mock).mockReturnValueOnce(undefined);
        (masonryDirective as any).getDimensions(0);

        expect(createDimensions).toHaveBeenCalledWith(0, 'initialDimensions');
      }
    );

    it('should call `dimensions` `set` with `index` and `createDimensions` return args', () => {
      (masonryDirective as any).getDimensions(0);

      expect((masonryDirective as any).dimensions.set).toHaveBeenCalledWith(
        0,
        'createDimensionsReturn'
      );
    });

    it('should return` createDimensions`', () => {
      const res = (masonryDirective as any).getDimensions(0);

      expect(res).toBe('createDimensionsReturn');
    });
  });

  describe('`setDimensions`', () => {
    beforeEach(() => {
      (masonryDirective as any).getDimensions = jest
        .fn()
        .mockReturnValue({ height: 50, width: 100 });
      (masonryDirective as any).setDimensions(
        ({ nativeElement: 'nativeElement' } as unknown) as ElementRef<
          HTMLElement
        >,
        'index'
      );
    });

    it('should call `getDimensions` with `index` arg', () => {
      expect((masonryDirective as any).getDimensions).toHaveBeenCalledWith(
        'index'
      );
    });

    it('should call `Renderer2` `setStyle` with `el` `nativeElement` and `getDimensions` return `width` args', () => {
      expect(renderer2.setStyle).toHaveBeenCalledWith(
        'nativeElement',
        'grid-column-end',
        'span 100'
      );
    });

    it('should call `Renderer2` `setStyle` with `el` `nativeElement` and `getDimensions` return `height` args', () => {
      expect(renderer2.setStyle).toHaveBeenCalledWith(
        'nativeElement',
        'grid-row-end',
        'span 50'
      );
    });
  });

  describe('`updateChildren`', () => {
    beforeEach(() => ((masonryDirective as any).setDimensions = jest.fn()));

    describe('No `children`', () => {
      beforeEach(() => (masonryDirective.children = undefined));

      it('should throw', () => {
        expect(() => (masonryDirective as any).updateChildren()).toThrowError(
          'No `children`'
        );
      });
    });

    describe('Has `children`', () => {
      beforeEach(
        () =>
          (masonryDirective.children = ([
            'child-1',
            'child-2',
            'child-3',
          ] as unknown) as QueryList<ElementRef>)
      );

      it('should call `setDimensions` on each `el` with `el` and `index` args', () => {
        (masonryDirective as any).updateChildren();

        expect((masonryDirective as any).setDimensions).toHaveBeenCalledWith(
          'child-1',
          0
        );
        expect((masonryDirective as any).setDimensions).toHaveBeenCalledWith(
          'child-2',
          1
        );
        expect((masonryDirective as any).setDimensions).toHaveBeenCalledWith(
          'child-3',
          2
        );
      });
    });
  });

  describe('`ngAfterViewInit`', () => {
    beforeEach(() => {
      (masonryDirective as any).updateChildren = jest.fn();
      jest.clearAllMocks();
      masonryDirective.ngAfterViewInit();
    });

    it('should call `updateChildren`', () => {
      expect((masonryDirective as any).updateChildren).toHaveBeenCalled();
    });

    it('should call `setInterval` with `updateChildren` callback', () => {
      expect(window.setInterval).toHaveBeenCalledWith(
        expect.any(Function),
        2000
      );

      const [
        [callback],
      ] = ((window.setInterval as any) as jest.Mock).mock.calls;
      expect((masonryDirective as any).updateChildren).toHaveBeenCalledTimes(1);
      callback();
      expect((masonryDirective as any).updateChildren).toHaveBeenCalledTimes(2);
    });
  });

  describe('`ngOnDestroy`', () => {
    describe('Has `intervalId`', () => {
      beforeEach(() => {
        (masonryDirective as any).intervalId = 'intervalId';
        masonryDirective.ngOnDestroy();
      });

      it('should call `clearInterval` with `intervalId` arg', () => {
        expect(window.clearInterval).toHaveBeenCalledWith('intervalId');
      });
    });

    describe('No `intervalId`', () => {
      beforeEach(() => {
        (masonryDirective as any).intervalId = undefined;
        masonryDirective.ngOnDestroy();
      });

      it('should not call `clearInterval`', () => {
        expect(window.clearInterval).not.toHaveBeenCalled();
      });
    });
  });
});

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  const el = fixture.debugElement.query(By.directive(MasonryDirective));
  masonryDirective = el.injector.get<MasonryDirective>(MasonryDirective);
  renderer2 = fixture.debugElement.injector.get<Renderer2>(Renderer2);

  jest.spyOn((masonryDirective as any).dimensions, 'get');
  jest.spyOn((masonryDirective as any).dimensions, 'set');
  jest.spyOn(masonryDirective as any, 'setDimensions');
  renderer2.setStyle = jest.fn();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
