import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { exhaustMap, takeUntil, startWith } from 'rxjs/operators';

import { Data, loadMore } from './load-more.component.helpers';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreComponent implements OnInit, OnDestroy {
  private shouldLoad$ = new Subject<void>();
  data: Data | undefined;
  private onDestroy$ = new Subject<void>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  handleTrigger(): void {
    this.shouldLoad$.next();
  }

  ngOnInit(): void {
    this.shouldLoad$
      .pipe(
        startWith(undefined),
        exhaustMap(loadMore),
        takeUntil(this.onDestroy$)
      )
      .subscribe((data) => {
        this.data = data;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
