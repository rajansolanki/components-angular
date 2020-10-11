import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverComponent } from './hover.component';

let comp: HoverComponent;
let fixture: ComponentFixture<HoverComponent>;
let page: Page;

describe('`HoverComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [HoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    it('should display web component', () => {
      expect(page.component).toBeTruthy();
    });
  });
});

class Page {
  get component(): HTMLDivElement {
    return this.query<HTMLDivElement>('component-hover');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(HoverComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
