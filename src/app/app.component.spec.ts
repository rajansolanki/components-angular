import { Component, NgZone } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { Router } from '@angular/router';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let ngZone: NgZone;
let router: Router;
let page: Page;

@Component({
  selector: 'page-1',
  template: '<div id="page-1">Page 1</div>',
})
export class Page1 {}

@Component({
  selector: 'page-2',
  template: '<div id="page-2">Page 2</div>',
})
export class Page2 {}

describe('`AppComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'page-1', component: Page1 },
          { path: 'page-2', component: Page2 },
        ]),
      ],
      declarations: [AppComponent, Page1, Page2],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    it('should display routed component', async () => {
      expect(page.page1).toBeFalsy();
      expect(page.page2).toBeFalsy();

      await ngZone.run(() => router.navigateByUrl('page-1'));
      expect(page.page1).toBeTruthy();
      expect(page.page2).toBeFalsy();

      await ngZone.run(() => router.navigateByUrl('page-2'));
      expect(page.page1).toBeFalsy();
      expect(page.page2).toBeTruthy();
    });
  });
});

class Page {
  get page1(): HTMLDivElement {
    return this.query<HTMLDivElement>('#page-1');
  }
  get page2(): HTMLDivElement {
    return this.query<HTMLDivElement>('#page-2');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;
  ngZone = fixture.ngZone as NgZone;
  router = TestBed.get(Router);
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
