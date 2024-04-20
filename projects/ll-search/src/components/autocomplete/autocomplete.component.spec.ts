import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AutoCompleteComponent } from './autocomplete.component';

let compHost: TestHostComponent;
let comp: AutoCompleteComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

jest.mock('./autocomplete.animations', () => {
  class StubAutoCompleteComponentAnimationsDirective {}

  return {
    AutoCompleteComponentAnimationsDirective: StubAutoCompleteComponentAnimationsDirective,
  };
});

@Component({
  selector: 'component-option',
  template: '<ng-content></ng-content>',
})
class StubOptionComponent {}

@Component({
  selector: 'app-host',
  template: `<component-autocomplete
    [control]="control"
    [tags]="tags"
  ></component-autocomplete>`,
})
export class TestHostComponent {
  control: FormControl | undefined;
  tags: string[] | undefined;
}

describe('`AutocompleteComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        AutoCompleteComponent,
        StubOptionComponent,
      ],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `control`', () => {
    compHost.control = 'control' as any;
    fixture.detectChanges();

    expect((comp as any).control).toBe('control');
  });

  it('should set `tags`', () => {
    compHost.tags = ['tags'] as any;
    fixture.detectChanges();

    expect(comp.tags).toEqual(['tags']);
  });

  describe('`tagTrackBy`', () => {
    it('should return `tag`', () => {
      const res = comp.tagTrackBy(1, 'tag');

      expect(res).toBe('tag');
    });
  });

  describe('`handleOptionClick`', () => {
    describe('No `control`', () => {
      beforeEach(() => ((comp as any).control = undefined));

      it('should throw error', () => {
        expect(() => comp.handleOptionClick('tag')).toThrowError(
          'No `control`'
        );
      });
    });

    describe('Has `control`', () => {
      beforeEach(() => {
        (comp as any).control = {
          setValue: jest.fn(),
          markAsPristine: jest.fn(),
        };
        comp.handleOptionClick('tag');
      });

      it('should call `control` `setValue` with `tag` arg', () => {
        expect((comp as any).control.setValue).toHaveBeenCalledWith('tag');
      });

      it('should call `control` `markAsPristine`', () => {
        expect((comp as any).control.markAsPristine).toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    describe('Options', () => {
      beforeEach(() => {
        compHost.tags = ['tag1', 'tag2', 'tag3'];
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.options.length).toBe(3);
      });

      it('should pass `tag`', () => {
        expect(page.options[0].innerHTML.trim()).toEqual('tag1');
      });

      it('should call `handleOptionClick` with `tag` arg on click', () => {
        comp.handleOptionClick = jest.fn();
        page.options[0].click();

        expect(comp.handleOptionClick).toHaveBeenCalledWith('tag1');
      });
    });
  });
});

class Page {
  get options(): HTMLElement[] {
    return this.queryAll<HTMLElement>('component-option');
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement
    .query(By.directive(AutoCompleteComponent))
    .injector.get<AutoCompleteComponent>(AutoCompleteComponent);
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
