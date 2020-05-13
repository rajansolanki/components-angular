import { Component, ChangeDetectionStrategy } from '@angular/core';

import { errorAnimations } from './error.animations';

@Component({
  selector: 'component-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: errorAnimations,
})
export class ErrorComponent {
  showAppError = true;

  handleAppClick(): void {
    this.showAppError = false;
  }
}
