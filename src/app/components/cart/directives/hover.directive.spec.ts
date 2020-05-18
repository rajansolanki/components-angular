import { Component, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HoverDirective } from './hover.directive';
import { getPagePosition } from './hover.directive.helpers';

let fixture: ComponentFixture<TestHostComponent>;
let page: Page;
let hoverDirective: HoverDirective;
let renderer2: Renderer2;

(global as any).scrollY = 2.5;

jest.mock('./hover.directive.helpers', () => ({
  getPagePosition: jest.fn().mockReturnValue({ pageX: 100, pageY: 50 }),
}));

@Component({
  template: '<div appHover></div>',
})
class TestHostComponent {}

describe('`HoverDirective`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [HoverDirective, TestHostComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create directive', () => {
    expect(hoverDirective).toBeTruthy();
  });

  describe('`constructor`', () => {
    it('should call `addListeners`', () => {
      expect((hoverDirective as any).addListeners).toHaveBeenCalled();
    });
  });

  describe('`setStyles`', () => {
    beforeEach(() => (hoverDirective as any).setStyles(100, 50));

    it('should call `Renderer2` `setStyle` with args', () => {
      expect(renderer2.setStyle).toHaveBeenCalledWith(
        page.div,
        '--x',
        '100px',
        expect.any(Number)
      );
      expect(renderer2.setStyle).toHaveBeenCalledWith(
        page.div,
        '--y',
        '50px',
        expect.any(Number)
      );
    });
  });

  describe('`handleMove`', () => {
    describe('No `event` `target`', () => {
      beforeEach(() =>
        (hoverDirective as any).handleMove(({
          target: null,
        } as unknown) as MouseEvent)
      );

      it('should not call `getPagePosition`', () => {
        expect(getPagePosition).not.toHaveBeenCalled();
      });
    });

    describe('Has `event` `target`', () => {
      describe('`event` `target` is not `HTMLElement`', () => {
        beforeEach(() =>
          (hoverDirective as any).handleMove(({
            target: {},
          } as unknown) as MouseEvent)
        );

        it('should not call `getPagePosition`', () => {
          expect(getPagePosition).not.toHaveBeenCalled();
        });
      });

      describe('`event` `target` is `HTMLElement`', () => {
        it('should call `getPagePosition` with `event` arg', () => {
          const event = ({
            target: page.div,
          } as unknown) as MouseEvent;

          (hoverDirective as any).handleMove(event);

          expect(getPagePosition).toHaveBeenCalledWith(event);
        });

        it('should call `target` `getBoundingClientRect`', () => {
          const event = ({
            target: page.div,
          } as unknown) as MouseEvent;
          (event.target as any).getBoundingClientRect = jest
            .fn()
            .mockReturnValue({ left: 50, width: 25, top: 25, height: 12.5 });

          (hoverDirective as any).handleMove(event);

          expect(
            (event as any).target.getBoundingClientRect
          ).toHaveBeenCalled();
        });

        it('should call `setStyles` with calculated `x` and `y` args', () => {
          const event = ({
            target: page.div,
          } as unknown) as MouseEvent;
          (event.target as any).getBoundingClientRect = jest
            .fn()
            .mockReturnValue({ left: 50, width: 25, top: 25, height: 12.5 });

          (hoverDirective as any).handleMove(event);

          expect((hoverDirective as any).setStyles).toHaveBeenCalledWith(
            25,
            10
          );
        });
      });
    });
  });

  describe('`addListeners`', () => {
    beforeEach(() => (hoverDirective as any).addListeners());

    it('should call `el` `nativeElement.addEventListener` with args', () => {
      expect(page.div.addEventListener).toHaveBeenCalledWith(
        'touchmove',
        (hoverDirective as any).handleMoveBound,
        { passive: true }
      );
    });

    it('should call `el` `nativeElement.addEventListener` with args', () => {
      expect(page.div.addEventListener).toHaveBeenCalledWith(
        'mousemove',
        (hoverDirective as any).handleMoveBound,
        { passive: true }
      );
    });
  });

  describe('`ngOnDestroy`', () => {
    beforeEach(() => hoverDirective.ngOnDestroy());

    it('should call `el` `nativeElement.removeEventListener` with args', () => {
      expect(page.div.removeEventListener).toHaveBeenCalledWith(
        'touchmove',
        (hoverDirective as any).handleMoveBound,
        { capture: false }
      );
    });

    it('should call `el` `nativeElement.removeEventListener` with args', () => {
      expect(page.div.removeEventListener).toHaveBeenCalledWith(
        'mousemove',
        (hoverDirective as any).handleMoveBound,
        { capture: false }
      );
    });
  });
});

class Page {
  get div(): HTMLDivElement {
    return this.query<HTMLDivElement>('div');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  const el = fixture.debugElement.query(By.directive(HoverDirective));
  hoverDirective = el.injector.get<HoverDirective>(HoverDirective);
  renderer2 = fixture.debugElement.injector.get<Renderer2>(Renderer2);
  page = new Page();

  jest.spyOn(hoverDirective as any, 'handleMove');
  jest.spyOn(hoverDirective as any, 'setStyles');
  jest.spyOn(HoverDirective.prototype as any, 'addListeners');
  renderer2.setStyle = jest.fn();
  jest.spyOn(page.div, 'addEventListener');
  jest.spyOn(page.div, 'removeEventListener');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
