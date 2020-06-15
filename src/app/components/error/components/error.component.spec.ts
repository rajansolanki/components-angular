import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ErrorComponent, ErrorType } from './error.component';

let compHost: TestHostComponent;
let comp: ErrorComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<component-error [type]="type"></component-error>',
})
class TestHostComponent {
  type: ErrorType | undefined;
}

describe('`ErrorComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [TestHostComponent, ErrorComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    describe('`type` is global', () => {
      beforeEach(() => {
        compHost.type = 'global';
        fixture.detectChanges();
      });

      it('should display global error', () => {
        expect(page.globalError).toBeTruthy();
      });

      it('should not display app error', () => {
        expect(page.appError).toBeFalsy();
      });
    });

    describe('`type` is app', () => {
      beforeEach(() => {
        compHost.type = 'app';
        fixture.detectChanges();
      });

      it('should display app error', () => {
        expect(page.appError).toBeTruthy();
      });

      it('should not display global error', () => {
        expect(page.globalError).toBeFalsy();
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

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement
    .query(By.directive(ErrorComponent))
    .injector.get<ErrorComponent>(ErrorComponent);
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
