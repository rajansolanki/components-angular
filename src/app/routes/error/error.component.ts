import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ErrorType } from 'll-error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  type: ErrorType | undefined;

  handleAppClick() {
    this.type = 'app';
  }

  handleGlobalClick() {
    this.type = 'global';
  }

  handleResetClick() {
    this.type = undefined;
  }
}
