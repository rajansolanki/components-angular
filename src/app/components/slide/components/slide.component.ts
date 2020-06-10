import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Subject, of } from 'rxjs';
import { startWith, delay, switchMap } from 'rxjs/operators';

import { Variant, getVariants } from '../data';

@Component({
  selector: 'component-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent {
  variants = getVariants();
  private variantChangeSource = new Subject<Variant>();
  variantChange$ = this.variantChangeSource.pipe(
    switchMap((variant) => of(variant).pipe(delay(750), startWith(null))),
    startWith(this.variants[0])
  );

  variantTrackBy(_index: number, { title }: Variant): string {
    return title;
  }

  handleChange({ target }: Event): void {
    if (!(target instanceof HTMLSelectElement)) return;

    this.variantChangeSource.next(this.variants[+target.value]);
  }
}
