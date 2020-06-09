import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingBarComponent, Status } from './loading-bar.component';

let compHost: TestHostComponent;
let comp: LoadingBarComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<component-loading-bar [status]="status"></component-loading-bar>',
})
class TestHostComponent {
  status: Status | undefined;
}

describe('`LoadingBarComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, LoadingBarComponent],
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

  describe('Template', () => {
    it('should set class as `status`', () => {
      compHost.status = 'status' as any;
      fixture.detectChanges();

      expect(page.status.className).toBe('status');
    });
  });
});

class Page {
  get status(): HTMLDivElement {
    return this.query<HTMLDivElement>('div');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement
    .query(By.directive(LoadingBarComponent))
    .injector.get<LoadingBarComponent>(LoadingBarComponent);
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
