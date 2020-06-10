import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  autoCompleteAnimations,
  AutoCompleteComponentAnimationsDirective,
} from './autocomplete.animations';

@Component({
  selector: 'component-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: autoCompleteAnimations,
})
export class AutoCompleteComponent extends AutoCompleteComponentAnimationsDirective {
  @Input() private control: FormControl | undefined;
  @Input() tags: string[] | null | undefined;

  constructor(protected el: ElementRef<HTMLElement>) {
    super(el);
  }

  tagTrackBy(_index: number, tag: string): string {
    return tag;
  }

  handleOptionClick(tag: string): void {
    if (!this.control) throw new Error('No `control`');

    this.control.setValue(tag);
    this.control.markAsPristine();
  }
}
