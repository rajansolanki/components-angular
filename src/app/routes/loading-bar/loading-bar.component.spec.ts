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
    it('should display web component', () => {
      expect(page.component).toBeTruthy();
    });
  });
});

class Page {
  get component(): HTMLDivElement {
    return this.query<HTMLDivElement>('component-loading-bar');
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
