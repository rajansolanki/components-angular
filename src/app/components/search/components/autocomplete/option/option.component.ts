import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

import {
  optionAnimations,
  OptionComponentAnimationsDirective,
} from './option.animations';

@Component({
  selector: 'component-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: optionAnimations,
})
export class OptionComponent extends OptionComponentAnimationsDirective {
  constructor(protected el: ElementRef<HTMLElement>) {
    super(el);
  }
}
