import {
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';

import { getPagePosition } from './hover.directive.helpers';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective implements OnDestroy {
  private handleMoveBound = this.handleMove.bind(this);

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.addListeners();
  }

  private setStyles(x: number, y: number): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      '--x',
      `${x}px`,
      RendererStyleFlags2.DashCase
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      '--y',
      `${y}px`,
      RendererStyleFlags2.DashCase
    );
  }

  private handleMove(event: MouseEvent | TouchEvent): void {
    if (!event.target || !(event.target instanceof HTMLElement)) return;

    const { pageX, pageY } = getPagePosition(event);
    const { left, top, width, height } = event.target.getBoundingClientRect();

    const x = pageX - left - width;
    const y = pageY - window.scrollY - top - height;

    this.setStyles(x, y);
  }

  private addListeners(): void {
    this.el.nativeElement.addEventListener('touchmove', this.handleMoveBound, {
      passive: true,
    });
    this.el.nativeElement.addEventListener('mousemove', this.handleMoveBound, {
      passive: true,
    });
  }

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener(
      'touchmove',
      this.handleMoveBound,
      { capture: false }
    );
    this.el.nativeElement.removeEventListener(
      'mousemove',
      this.handleMoveBound,
      { capture: false }
    );
  }
}
