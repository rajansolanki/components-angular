import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryComponent } from './masonry.component';

let comp: MasonryComponent;
let fixture: ComponentFixture<MasonryComponent>;
let page: Page;

describe('`MasonryComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [MasonryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

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
    return this.query<HTMLDivElement>('component-masonry');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(MasonryComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
