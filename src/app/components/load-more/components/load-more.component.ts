import { Component, Input, EventEmitter, Output } from '@angular/core';

export type Status = 'loading' | 'error' | 'idle';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
})
export class LoadMoreComponent {
  @Input() status: Status = 'idle';
  @Output() retryClick = new EventEmitter<void>();

  handleClick(): void {
    this.retryClick.next();
  }
}
