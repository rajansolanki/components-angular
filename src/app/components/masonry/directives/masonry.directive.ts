import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  OnDestroy,
  QueryList,
  Renderer2,
} from '@angular/core';

import {
  createDimensions,
  Dimensions,
  initialDimensions,
} from './masonry.directive.helpers';

@Directive({
  selector: '[componentMasonry]',
})
export class MasonryDirective implements AfterViewInit, OnDestroy {
  @ContentChildren('masonry', { read: ElementRef }) children:
    | QueryList<ElementRef<HTMLElement>>
    | undefined;

  private dimensions = new Map<number, Dimensions>();
  private intervalId: number | undefined;

  constructor(private renderer: Renderer2) {}

  private getDimensions(index: number): Dimensions {
    const previousDimensions =
      this.dimensions.get(index - 1) ?? initialDimensions;

    const newDimensions = createDimensions(index, previousDimensions);
    this.dimensions.set(index, newDimensions);

    return newDimensions;
  }

  private setDimensions(el: ElementRef<HTMLElement>, index: number): void {
    const { height, width } = this.getDimensions(index);

    this.renderer.setStyle(
      el.nativeElement,
      'grid-column-end',
      `span ${width}`
    );
    this.renderer.setStyle(el.nativeElement, 'grid-row-end', `span ${height}`);
  }

  private updateChildren(): void {
    if (!this.children) throw new Error('No `children`');

    this.children.forEach((el, index) => this.setDimensions(el, index));
  }

  ngAfterViewInit(): void {
    this.updateChildren();

    const intervalCallback = () => this.updateChildren();
    this.intervalId = window.setInterval(intervalCallback, 2000);
  }

  ngOnDestroy(): void {
    this.intervalId && window.clearInterval(this.intervalId);
  }
}
