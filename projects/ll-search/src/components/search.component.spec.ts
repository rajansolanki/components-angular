import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { getTagStore } from '../data';
import { SearchComponent } from './search.component';

let comp: SearchComponent;
let fixture: ComponentFixture<SearchComponent>;
let changeDetectorRef: ChangeDetectorRef;
let page: Page;

jest.mock('../data', () => ({
  getTagStore: jest.fn().mockReturnValue('getTagStoreReturn'),
}));

@Component({
  selector: 'component-autocomplete',
  template: '',
})
class StubAutoCompleteComponent {
  @Input() control: any;
  @Input() tags: any;
}

describe('`SearchComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchComponent, StubAutoCompleteComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`tagStore`', () => {
    it('should call `getTagStore`', () => {
      expect(getTagStore).toHaveBeenCalled();
    });

    it('should set `tagStore` as `getTagStore` return', () => {
      expect((comp as any).tagStore).toBe('getTagStoreReturn');
    });
  });

  describe('`handleClearClick`', () => {
    it('should call `control` `reset` with empty string arg', () => {
      comp.control = ({ reset: jest.fn() } as unknown) as FormControl;
      comp.handleClearClick();

      expect(comp.control.reset).toHaveBeenCalledWith('');
    });
  });

  describe('Template', () => {
    beforeEach(() => (comp.tags$ = of('tags$') as any));

    describe('Search', () => {
      describe('Input', () => {
        it('should be displayed', () => {
          expect(page.searchInput).toBeTruthy();
        });

        it('should set `control` `value`', () => {
          page.searchInput.value = 'value';
          page.searchInput.dispatchEvent(new Event('input'));

          expect(comp.control.value).toBe('value');
        });
      });

      describe('Clear', () => {
        it('should be displayed if has `control` `value`', () => {
          comp.control.setValue('value');
          changeDetectorRef.markForCheck();
          fixture.detectChanges();

          expect(page.searchClear).toBeTruthy();
        });

        it('should not be displayed if no `control` `value`', () => {
          comp.control.setValue('');
          changeDetectorRef.markForCheck();
          fixture.detectChanges();

          expect(page.searchClear).toBeFalsy();
        });
      });
    });

    describe('Autocomplete', () => {
      describe('`control` `dirty` is `true`', () => {
        beforeEach(() => {
          comp.control.markAsDirty();
          changeDetectorRef.markForCheck();
          fixture.detectChanges();
        });

        it('should be displayed', () => {
          expect(page.autoComplete).toBeTruthy();
        });

        it('should set `AutoCompleteComponent` `control` as `control`', () => {
          expect(page.autoCompleteComponent.control).toBe(comp.control);
        });

        it('should set `AutoCompleteComponent` `tags` as `tags$`', () => {
          expect(page.autoCompleteComponent.tags).toBe('tags$');
        });
      });

      describe('`control` `dirty` is `false`', () => {
        beforeEach(() => {
          comp.control.markAsPristine();
          changeDetectorRef.markForCheck();
          fixture.detectChanges();
        });

        it('should not be displayed', () => {
          expect(page.autoComplete).toBeFalsy();
        });
      });
    });
  });
});

class Page {
  get searchInput(): HTMLInputElement {
    return this.query<HTMLInputElement>('input');
  }
  get searchClear(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('#clear');
  }
  get autoComplete(): HTMLElement {
    return this.query<HTMLElement>('component-autocomplete');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  get autoCompleteComponent(): StubAutoCompleteComponent {
    return fixture.debugElement
      .query(By.directive(StubAutoCompleteComponent))
      .injector.get<StubAutoCompleteComponent>(StubAutoCompleteComponent);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(SearchComponent);
  comp = fixture.componentInstance;
  changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(
    ChangeDetectorRef
  );
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
