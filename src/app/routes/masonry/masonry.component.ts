import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-masonry',
  template: `<component-masonry></component-masonry>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryComponent {}
