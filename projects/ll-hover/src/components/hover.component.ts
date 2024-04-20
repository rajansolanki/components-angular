import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'component-hover',
  templateUrl: './hover.component.html',
  styleUrls: ['./hover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverComponent {}
