import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HoverDirective } from '../directives/hover.directive';
import { HoverComponent } from './hover.component';

let comp: HoverComponent;
let fixture: ComponentFixture<HoverComponent>;
let hoverDirective: HoverDirective;
let page: Page;

describe('`HoverComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [HoverComponent, HoverDirective],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    describe('Link', () => {
      it('should display link', () => {
        expect(page.link).toBeTruthy();
      });

      it('should set `HoverDirective`', () => {
        expect((hoverDirective as any).el.nativeElement).toBe(page.link);
      });
    });
  });
});

class Page {
  get link(): HTMLAnchorElement {
    return this.query<HTMLAnchorElement>('a');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(HoverComponent);
  comp = fixture.componentInstance;
  hoverDirective = fixture.debugElement
    .query(By.directive(HoverDirective))
    .injector.get<HoverDirective>(HoverDirective);
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
