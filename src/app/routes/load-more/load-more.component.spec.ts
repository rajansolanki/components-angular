import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreComponent } from './load-more.component';

let comp: LoadMoreComponent;
let fixture: ComponentFixture<LoadMoreComponent>;
let page: Page;

describe('`LoadMoreComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [LoadMoreComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    beforeEach(() => {
      comp.status = 'status' as any;
      fixture.detectChanges();
    });

    describe('Web component', () => {
      it('should be displayed', () => {
        expect(page.component).toBeTruthy();
      });

      it('should show retry clicked on `retryClick`', () => {
        expect(comp.retryClicked).toBe(false);
        expect(page.retryClicked).toBeFalsy();
        page.component.dispatchEvent(new Event('retryClick'));
        fixture.detectChanges();

        expect(comp.retryClicked).toBe(true);
        expect(page.retryClicked).toBeTruthy();
      });
    });

    describe('Loading button', () => {
      it('should set `status`', () => {
        page.loadingButton.click();
        fixture.detectChanges();

        expect(comp.status).toBe('loading');
        expect((page.component as any).status).toBe('loading');
      });
    });

    describe('Error button', () => {
      it('should set `status`', () => {
        page.errorButton.click();
        fixture.detectChanges();

        expect(comp.status).toBe('error');
        expect((page.component as any).status).toBe('error');
      });
    });

    describe('Idle button', () => {
      it('should set `status`', () => {
        page.idleButton.click();
        fixture.detectChanges();

        expect(comp.status).toBe('idle');
        expect((page.component as any).status).toBe('idle');
      });
    });
  });
});

class Page {
  get component(): HTMLElement {
    return this.query<HTMLElement>('component-load-more');
  }
  get loadingButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('#button-loading');
  }
  get errorButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('#button-error');
  }
  get idleButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('#button-idle');
  }
  get retryClicked(): HTMLParagraphElement {
    return this.query<HTMLParagraphElement>('#retry-clicked');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(LoadMoreComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
