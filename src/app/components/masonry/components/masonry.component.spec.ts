import { Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicProduct } from '@bit/rajansolanki.dev.shared';
import { PRODUCTS } from '../data';
import { MasonryComponent } from './masonry.component';

let comp: MasonryComponent;
let fixture: ComponentFixture<MasonryComponent>;
let page: Page;

jest.mock('@bit/rajansolanki.dev.shared', () => ({
  createImageWidth: jest.fn().mockReturnValue('createImageWidthReturn'),
}));

@Directive({
  selector: '[componentMasonry]',
})
export class StubMasonryDirective {}

describe('`MasonryComponent`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [MasonryComponent, StubMasonryDirective],
    }).compileComponents()));

  beforeEach(jest.clearAllMocks);
  afterEach(() => expect.hasAssertions());

  beforeEach(createComponent);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `products`', () => {
    expect(comp.products).toEqual(PRODUCTS);
  });

  describe('`productTrackBy`', () => {
    it('should return `id`', () => {
      const res = comp.productTrackBy(0, {
        node: { id: 'id' },
      } as BasicProduct);

      expect(res).toBe('id');
    });
  });

  describe('Template', () => {
    describe('Div', () => {
      it('should be displayed', () => {
        expect(page.divs).toHaveLength(5);
      });

      it('should call `productTrackBy` for each `products`', () => {
        PRODUCTS.forEach((product, index) =>
          expect(comp.productTrackBy).toHaveBeenCalledWith(index, product)
        );
      });

      describe('Img', () => {
        it('should be displayed', () => {
          expect(page.imgs).toHaveLength(5);
        });

        it('should set `src`', () => {
          expect(page.imgs[0].src).toBe(
            'https://cdn.shopify.com/s/files/1/0058/9683/1043/products/night-spirit-main_createImageWidthReturnx.jpg?v=1584571644'
          );
        });
      });
    });
  });
});

class Page {
  get divs(): HTMLDivElement[] {
    return this.queryAll<HTMLDivElement>('div');
  }
  get imgs(): HTMLImageElement[] {
    return this.queryAll<HTMLImageElement>('img');
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

async function createComponent(): Promise<void> {
  fixture = TestBed.createComponent(MasonryComponent);
  comp = fixture.componentInstance;
  page = new Page();

  jest.spyOn(comp, 'productTrackBy');

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
