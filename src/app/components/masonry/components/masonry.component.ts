import { Component, ChangeDetectionStrategy } from '@angular/core';

import { BasicProduct } from '@bit/rajansolanki.dev.shared';
import { PRODUCTS } from '../data';

@Component({
  selector: 'component-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryComponent {
  products = PRODUCTS;

  productTrackBy(_index: number, { node: { id } }: BasicProduct): string {
    return id;
  }
}
