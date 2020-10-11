import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';

let comp: ErrorComponent;
let fixture: ComponentFixture<ErrorComponent>;
let page: Page;

describe('`ErrorComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    beforeEach(() => {
      comp.type = 'type' as any;
      fixture.detectChanges();
    });

    it('should display web component', () => {
      expect(page.component).toBeTruthy();
    });

    describe('App button', () => {
      it('should set `type`', () => {
        page.appButton.click();
        fixture.detectChanges();

        expect(comp.type).toBe('app');
        expect((page.component as any).type).toBe('app');
      });
    });

    describe('Global button', () => {
      it('should set `type`', () => {
        page.globalButton.click();
        fixture.detectChanges();

        expect(comp.type).toBe('global');
        expect((page.component as any).type).toBe('global');
      });
    });

    describe('Reset button', () => {
      it('should set `type`', () => {
        page.resetButton.click();
        fixture.detectChanges();

        expect(comp.type).toBe(undefined);
        expect((page.component as any).type).toBe(undefined);
      });
    });
  });
});

class Page {
  get component(): HTMLElement {
    return this.query<HTMLElement>('component-error');
  }
  get appButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('#button-app');
  }
  get globalButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('#button-global');
  }
  get resetButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('#button-reset');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(ErrorComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
