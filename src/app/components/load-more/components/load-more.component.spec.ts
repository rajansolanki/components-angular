import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadMoreComponent, Status } from './load-more.component';

let compHost: TestHostComponent;
let comp: LoadMoreComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template:
    '<app-load-more [status]="status" (retryClick)="handleRetryClick()"></app-load-more>',
})
class TestHostComponent {
  status: Status | undefined;
  handleRetryClick = jest.fn();
}

describe('`LoadMoreComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, LoadMoreComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `status`', () => {
    compHost.status = 'status' as any;
    fixture.detectChanges();

    expect(comp.status).toBe('status');
  });

  describe('`handleClick`', () => {
    beforeEach(() => comp.handleClick());

    it('should emit `retryClick`', () => {
      expect(compHost.handleRetryClick).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    describe('Hexagon', () => {
      describe('`status` is not error', () => {
        beforeEach(() => {
          compHost.status = 'idle';
          fixture.detectChanges();
        });

        it('should be displayed if `status` is not error', () => {
          expect(page.hexagon).toBeTruthy();

          compHost.status = 'loading';
          fixture.detectChanges();
          expect(page.hexagon).toBeTruthy();

          compHost.status = 'error';
          fixture.detectChanges();
          expect(page.hexagon).toBeFalsy();
        });

        it('should have loading class if `status` is loading', () => {
          compHost.status = 'loading';
          fixture.detectChanges();
          expect(page.hexagon.className).toBe('loading');

          compHost.status = 'idle';
          fixture.detectChanges();
          expect(page.hexagon.className).toBe('');
        });

        describe('Svg', () => {
          it('should be displayed', () => {
            expect(page.hexagonSvg).toBeTruthy();
          });
        });
      });
    });

    describe('Error', () => {
      beforeEach(() => {
        compHost.status = 'error';
        fixture.detectChanges();
      });

      it('should be displayed if `status` is error', () => {
        expect(page.error).toBeTruthy();

        compHost.status = 'idle';
        fixture.detectChanges();
        expect(page.error).toBeFalsy();

        compHost.status = 'loading';
        fixture.detectChanges();
        expect(page.error).toBeFalsy();
      });

      describe('Error button', () => {
        it('should be displayed', () => {
          expect(page.errorButton).toBeTruthy();
        });

        it('should call `handleClick` on click', () => {
          page.errorButton.dispatchEvent(new Event('click'));

          expect(comp.handleClick).toHaveBeenCalled();
        });
      });
    });
  });
});

class Page {
  get hexagon(): HTMLDivElement {
    return this.query<HTMLDivElement>('#load-more #hexagon');
  }
  get hexagonSvg(): HTMLElement {
    return this.query<HTMLElement>('#load-more #hexagon svg');
  }
  get error(): HTMLDivElement {
    return this.query<HTMLDivElement>('#load-more div:not(#hexagon)');
  }
  get errorButton(): HTMLElement {
    return this.query<HTMLElement>('#load-more button');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement
    .query(By.directive(LoadMoreComponent))
    .injector.get<LoadMoreComponent>(LoadMoreComponent);
  page = new Page();

  jest.spyOn(comp, 'handleClick');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
