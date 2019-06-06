import { Component, Input, OnDestroy } from '@angular/core';

import { Observable, combineLatest, ReplaySubject, merge } from 'rxjs';
import { map, takeUntil, publishReplay, refCount, debounceTime } from 'rxjs/operators';

import { MapApiService } from './api.service';
import { GoogMap, GoogMarker, MarkerOptions } from './api.interface';
import { teardown } from './teardown';

@Component({
  selector: 'matMapMarker',
  template: '',
  styleUrls: [
  ],
})
export class MapMarker implements OnDestroy {
  /**
   * All marker options
   */
  @Input() set options(options: MarkerOptions) {
    if (options) {
      this.optionsObs.next(options);
    }
  }

  /**
   * The latitude for this marker, expressed as a number.
   */
  @Input() set lat(n: number) {
    this.latObs.next(n);
  }

  /**
   * The longitude for this marker, expressed as a number.
   */
  @Input() set lng(n: number) {
    this.lngObs.next(n);
  }

  /**
   * for private use only
   */
  setMap(map: GoogMap) {
    this.googMapObs.next(map);
  }

  constructor(private readonly mapApiService: MapApiService) {
    const positionObs = combineLatest(this.latObs, this.lngObs).pipe(
      debounceTime(10), // in case of any Angular weirdness
      map(([lat, lng]) => ({position: {lat, lng}}) as MarkerOptions),
    );

    this.withMarker(
      merge(
        positionObs,
        this.optionsObs,
      ),
      (marker, options) => {
      marker.setOptions(options);
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private readonly onDestroy = new ReplaySubject<void>();
  private readonly latObs = new ReplaySubject<number>(1);
  private readonly lngObs = new ReplaySubject<number>(1);
  private readonly optionsObs = new ReplaySubject<MarkerOptions>(1);
  private readonly googMapObs = new ReplaySubject<GoogMap>(1);

  private readonly googMarkerObs = combineLatest(
    this.mapApiService.getApi(),
    this.googMapObs,
  ).pipe(
    map(([api, map]) => {
      const marker = new api.Marker();
      marker.setMap(map);
      return marker;
    }),
    takeUntil(this.onDestroy),
    teardown(marker => marker.setMap(null)),
    publishReplay(),
    refCount(),
  );

  private withMarker<T>(obs: Observable<T>, f: ((m: GoogMarker, t: T) => void)) {
    combineLatest(this.googMarkerObs, obs).pipe(
      takeUntil(this.onDestroy),
    ).subscribe(([marker, t]) => {
      f(marker, t);
    });
  }
}
