/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


import { interval, Observable, noop, MonoTypeOperatorFunction } from 'rxjs';
import { take } from 'rxjs/operators';

export function teardown<T>(f: ((t:T) => void)): MonoTypeOperatorFunction<T> { 
  return obs => new Observable<T>(observer => {
    let td = noop;
    const subs = obs.subscribe(
      n => {
        td();
        td = () => f(n);
        observer.next(n);
      },
      e => observer.error(e),
      () => observer.complete(),
    );
    return () => {
      td();
      subs.unsubscribe();
    };
  });
}
