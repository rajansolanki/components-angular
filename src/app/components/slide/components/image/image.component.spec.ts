import { ChangeDetectorRef, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Variant } from '../../data';
import { ImageComponent } from './image.component';

let compHost: HostComponent;
let comp: ImageComponent;
let fixture: ComponentFixture<HostComponent>;
let changeDetectorRef: ChangeDetectorRef;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<component-image [variant]="variant"></component-image>',
})
export class HostComponent {
  variant: Variant | null | undefined;
}

describe('`ImageComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [HostComponent, ImageComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `variant`', () => {
    compHost.variant = { image: { src: 'variant' } } as Variant;
    fixture.detectChanges();

    expect(comp.variant).toEqual({ image: { src: 'variant' } });
  });

  describe('`handleLoad`', () => {
    beforeEach(() => {
      comp.state = 'state' as any;
      comp.handleLoad();
    });

    it('should set `state` as loaded', () => {
      expect(comp.state).toBe('loaded');
    });
  });

  describe('`ngOnChanges`', () => {
    describe('`variant`', () => {
      beforeEach(() => (comp.state = 'state' as any));

      describe('Has `currentValue`', () => {
        beforeEach(() =>
          comp.ngOnChanges({ variant: { currentValue: 'currentValue' } } as any)
        );

        it('should not set `state`', () => {
          expect(comp.state).toBe('state');
        });
      });

      describe('No `currentValue`', () => {
        beforeEach(() =>
          comp.ngOnChanges({ variant: { currentValue: null } } as any)
        );

        it('should set `state` as loading', () => {
          expect(comp.state).toBe('loading');
        });
      });
    });
  });

  describe('Template', () => {
    describe('Container', () => {
      it('should be displayed', () => {
        expect(page.container).toBeTruthy();
      });

      it('should set `class` as `state`', () => {
        comp.state = 'state' as any;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();

        expect(page.container.className).toBe('state');
      });

      describe('Img', () => {
        describe('No `variant`', () => {
          beforeEach(() => {
            comp.variant = null;
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should not be displayed', () => {
            expect(page.img).toBeFalsy();
          });
        });

        describe('Has `variant`', () => {
          beforeEach(() => {
            comp.variant = { title: 'title', image: { src: 'src' } };
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.img).toBeTruthy();
          });

          it('should set `src`', () => {
            expect(page.img.src).toBe('http://localhost/src');
          });

          it('should call `handleLoad` on `load`', () => {
            page.img.dispatchEvent(new Event('load'));

            expect(comp.handleLoad).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

class Page {
  get container(): HTMLDivElement {
    return this.query<HTMLDivElement>('div');
  }
  get img(): HTMLImageElement {
    return this.query<HTMLImageElement>('img');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(HostComponent);
  compHost = fixture.componentInstance;
  const imageEl = fixture.debugElement.query(By.directive(ImageComponent));
  comp = imageEl.injector.get<ImageComponent>(ImageComponent);
  changeDetectorRef = imageEl.injector.get<ChangeDetectorRef>(
    ChangeDetectorRef as any
  );
  page = new Page();

  jest.spyOn(comp, 'handleLoad');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
