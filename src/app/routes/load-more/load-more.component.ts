import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreComponent {
  status: 'loading' | 'error' | 'idle' | undefined;
  retryClicked = false;

  handleLoadingClick() {
    this.status = 'loading';
  }

  handleErrorClick() {
    this.status = 'error';
  }

  handleIdleClick() {
    this.status = 'idle';
  }

  handleRetryClick() {
    this.retryClicked = true;
  }
}
