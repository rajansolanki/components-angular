import { Observable, of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

export type Data = {
  data?: unknown;
  loading: boolean;
};

export const loadMore = (): Observable<Data> =>
  of({ loading: false, data: null }).pipe(
    delay(1000),
    startWith({ loading: true })
  );
