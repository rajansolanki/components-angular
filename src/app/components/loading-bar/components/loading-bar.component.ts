import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type Status = 'loading' | 'error' | 'idle';

@Component({
  selector: 'component-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBarComponent {
  @Input() status: Status = 'idle';
}
