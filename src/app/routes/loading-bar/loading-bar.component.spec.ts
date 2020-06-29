import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBarComponent } from './loading-bar.component';

let comp: LoadingBarComponent;
let fixture: ComponentFixture<LoadingBarComponent>;
let page: Page;

describe('`LoadingBarComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [LoadingBarComponent],
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

    it('should display web component', () => {
      expect(page.component).toBeTruthy();
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
    return this.query<HTMLElement>('component-loading-bar');
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

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(LoadingBarComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
