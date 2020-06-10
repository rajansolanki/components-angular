import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { getVariants, Variant } from '../data';
import { SlideComponent } from './slide.component';

let comp: SlideComponent;
let fixture: ComponentFixture<SlideComponent>;
let changeDetectorRef: ChangeDetectorRef;
let page: Page;

jest.mock('../data', () => ({
  getVariants: jest.fn().mockReturnValue(['getVariantsReturn']),
}));

@Component({
  selector: 'component-image',
  template: '',
})
class StubImageComponent {
  @Input() variant: any;
}

describe('`SlideComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [SlideComponent, StubImageComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`variants`', () => {
    it('should call `getVariants`', () => {
      expect(getVariants).toHaveBeenCalled();
    });

    it('should set `variants` as `getVariants` return', () => {
      expect(comp.variants).toEqual(['getVariantsReturn']);
    });
  });

  describe('`variantChange$`', () => {
    it('should emit `variantChangeSource`', async(() => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      testScheduler.run(({ cold, expectObservable }) => {
        const expected = 'a-b 749ms c-d 749ms (e|)';
        const values = {
          a: 'getVariantsReturn',
          b: null,
          c: 'variant1',
          d: null,
          e: 'variant2',
        };

        const variantChangeSource = cold('--c 751ms e', values);
        variantChangeSource.subscribe((comp as any).variantChangeSource);

        expectObservable(comp.variantChange$.pipe(take(5))).toBe(
          expected,
          values
        );
      });
    }));
  });

  describe('`variantTrackBy`', () => {
    it('should return `title`', () => {
      const res = comp.variantTrackBy(0, {
        title: 'title',
      } as Variant);

      expect(res).toBe('title');
    });
  });

  describe('`handleChange`', () => {
    beforeEach(
      () => (comp.variants = ['variant1', 'variant2', 'variant3'] as any)
    );

    describe('`target` is not `HTMLSelectElement`', () => {
      it('should not call `variantChangeSource`', () => {
        comp.handleChange(({ target: page.image } as unknown) as Event);

        expect((comp as any).variantChangeSource.next).not.toHaveBeenCalled();
      });
    });

    describe('`target` is `HTMLSelectElement`', () => {
      it('should call `variantChangeSource` with arg', () => {
        comp.handleChange(({
          target: page.variantSelect,
        } as unknown) as Event);

        expect((comp as any).variantChangeSource.next).toHaveBeenCalledWith(
          'variant1'
        );
      });
    });
  });

  describe('Template', () => {
    beforeEach(() => {
      comp.variants = [
        {
          title: 'title-1',
          image: {
            src: 'src-1',
          },
        },
        {
          title: 'title-2',
          image: {
            src: 'src-2',
          },
        },
        {
          title: 'title-3',
          image: {
            src: 'src-3',
          },
        },
      ];
      comp.variantChange$ = of('variantChange$') as any;
      changeDetectorRef.markForCheck();
      fixture.detectChanges();
    });

    describe('Variant select', () => {
      it('should be displayed', () => {
        expect(page.variantSelect).toBeTruthy();
      });

      it('should call `handleChange` on `change` with arg', () => {
        page.variantOptions[1].selected = true;
        page.variantSelect.dispatchEvent(new Event('change'));

        expect(comp.handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'change',
            target: expect.objectContaining({ value: '1' }),
          })
        );
      });

      describe('Options', () => {
        it('should be displayed', () => {
          expect(page.variantOptions.length).toBe(3);
        });

        it('should call `variantTrackBy`', () => {
          expect(comp.variantTrackBy).toHaveBeenCalledWith(0, {
            title: 'title-1',
            image: {
              src: 'src-1',
            },
          });
        });

        it('should display `title`', () => {
          expect(page.variantOptions[0].innerHTML.trim()).toBe('title-1');
        });
      });
    });

    describe('Image', () => {
      it('should be displayed', () => {
        expect(page.image).toBeTruthy();
      });

      it('should set `ImageComponent` `variant` as `variantChange$`', () => {
        expect(page.imageComponent.variant).toBe('variantChange$');
      });
    });
  });
});

class Page {
  get variantSelect(): HTMLSelectElement {
    return this.query<HTMLSelectElement>('select');
  }
  get variantOptions(): HTMLOptionElement[] {
    return this.queryAll<HTMLOptionElement>('option');
  }
  get image(): HTMLElement {
    return this.query<HTMLElement>('component-image');
  }

  get imageComponent(): StubImageComponent {
    const el = fixture.debugElement.query(By.directive(StubImageComponent));
    return el.injector.get<StubImageComponent>(StubImageComponent);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(SlideComponent);
  comp = fixture.componentInstance;
  changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(
    ChangeDetectorRef
  );
  page = new Page();

  jest.spyOn((comp as any).variantChangeSource, 'next');
  jest.spyOn(comp, 'variantTrackBy');
  jest.spyOn(comp, 'handleChange');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
