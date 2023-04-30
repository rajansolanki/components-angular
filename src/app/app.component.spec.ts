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
export class Page1Component {}

@Component({
  selector: 'page-2',
  template: '<div id="page-2">Page 2</div>',
})
export class Page2Component {}

describe('`AppComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'page-1', component: Page1Component },
          { path: 'page-2', component: Page2Component },
        ]),
      ],
      declarations: [AppComponent, Page1Component, Page2Component],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    beforeEach(() => {
      comp.routes = undefined as any;
      comp.ngOnInit();
    });

    it('should set `routes` as `Router` `config`', () => {
      expect(comp.routes).toEqual([
        { path: 'page-1', component: Page1Component },
        { path: 'page-2', component: Page2Component },
      ]);
    });
  });

  describe('Template', () => {
    describe('Links', () => {
      it('should be displayed', () => {
        expect(page.links).toHaveLength(2);
      });

      it('should display `route` `path` in titlecase', () => {
        expect((page.links[0].textContent as string).trim()).toBe('Page-1');
      });

      it('should set `href`', () => {
        expect(page.links[0].href).toBe('http://localhost/page-1');
      });
    });

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
  get links(): HTMLAnchorElement[] {
    return this.queryAll<HTMLAnchorElement>('a');
  }
  get page1(): HTMLDivElement {
    return this.query<HTMLDivElement>('#page-1');
  }
  get page2(): HTMLDivElement {
    return this.query<HTMLDivElement>('#page-2');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
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
