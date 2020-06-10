import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OptionComponent } from './option.component';

let comp: OptionComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

jest.mock('./option.animations', () => {
  class StubOptionComponentAnimationsDirective {}

  return {
    OptionComponentAnimationsDirective: StubOptionComponentAnimationsDirective,
  };
});

@Component({
  selector: 'app-host',
  template: '<component-option><h1>tag</h1></component-option>',
})
export class TestHostComponent {}

describe('`OptionComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, OptionComponent],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(expect.hasAssertions);

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    it('should display projected content', () => {
      expect(page.option.innerHTML).toBe('<h1>tag</h1>');
    });
  });
});

class Page {
  get option(): HTMLDivElement {
    return this.query<HTMLDivElement>('div');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  comp = fixture.debugElement
    .query(By.directive(OptionComponent))
    .injector.get<OptionComponent>(OptionComponent);
  page = new Page();

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
