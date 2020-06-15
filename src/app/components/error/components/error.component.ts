import { Component, Input } from '@angular/core';

import { errorAnimations } from './error.animations';

export type ErrorType = 'app' | 'global';

@Component({
  selector: 'component-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: errorAnimations,
})
export class ErrorComponent {
  @Input() type: ErrorType | undefined;
}
