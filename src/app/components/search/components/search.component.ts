import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';

import { getTagStore } from '../data';

@Component({
  selector: 'component-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  control = new UntypedFormControl();
  private tagStore = getTagStore();
  tags$: Observable<string[]> | undefined;

  handleClearClick(): void {
    this.control.reset('');
  }

  private queryTags(query: string): Observable<string[]> {
    const results = this.tagStore.search(query);

    return of(results.map(({ item }) => item));
  }

  ngOnInit(): void {
    this.tags$ = this.control.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((query) => this.queryTags(query)),
      tap((res) => console.error(res))
    );
  }
}
