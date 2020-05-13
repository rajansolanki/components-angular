import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorComponent } from './error.component';

let comp: ErrorComponent;
let fixture: ComponentFixture<ErrorComponent>;
let page: Page;

describe('`ErrorComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ErrorComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`handleAppClick`', () => {
    it('should set `showAppError` as `false`', () => {
      comp.showAppError = true;
      comp.handleAppClick();

      expect(comp.showAppError).toBe(false);
    });
  });

  describe('Template', () => {
    describe('Global error', () => {
      it('should not be displayed', () => {
        expect(page.globalError).toBeFalsy();
      });

      it('should be displayed on app error buttons click', () => {
        page.appErrorButtons[0].click();
        fixture.detectChanges();

        expect(page.globalError).toBeTruthy();
      });
    });

    describe('App error', () => {
      it('should be displayed', () => {
        expect(page.appError).toBeTruthy();
      });

      it('should not be displayed on error buttons click', async () => {
        page.appErrorButtons[0].click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(page.appError).toBeFalsy();
      });

      describe('Buttons', () => {
        it('should call `handleAppClick`', () => {
          page.appErrorButtons[0].click();
          expect(comp.handleAppClick).toHaveBeenCalledTimes(1);
          page.appErrorButtons[1].click();
          expect(comp.handleAppClick).toHaveBeenCalledTimes(2);
        });
      });
    });
  });
});

class Page {
  get globalError(): HTMLDivElement {
    return this.query<HTMLDivElement>('#banner-global');
  }
  get appError(): HTMLDivElement {
    return this.query<HTMLDivElement>('#banner-app');
  }
  get appErrorButtons(): HTMLButtonElement[] {
    return this.queryAll<HTMLButtonElement>('#banner-app button');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(ErrorComponent);
  comp = fixture.componentInstance;
  page = new Page();

  jest.spyOn(comp, 'handleAppClick');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
