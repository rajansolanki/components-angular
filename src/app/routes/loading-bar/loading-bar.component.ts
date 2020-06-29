import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBarComponent {
  status: 'loading' | 'error' | 'idle' | undefined;

  handleLoadingClick() {
    this.status = 'loading';
  }

  handleErrorClick() {
    this.status = 'error';
  }

  handleIdleClick() {
    this.status = 'idle';
  }
}
