import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Variant } from '../../data';

@Component({
  selector: 'component-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnChanges {
  @Input() variant: Variant | null | undefined;
  state: 'loading' | 'loaded' = 'loading';

  handleLoad(): void {
    this.state = 'loaded';
  }

  ngOnChanges({ variant }: SimpleChanges): void {
    if (variant.currentValue) return;

    this.state = 'loading';
  }
}
