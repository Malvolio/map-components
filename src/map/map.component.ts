import { Component, Input, ViewChild, ElementRef, OnDestroy, ContentChildren, QueryList  } from '@angular/core';
import { Observable, ReplaySubject, combineLatest, merge } from 'rxjs';
import { publishReplay, refCount, map, switchMap, takeUntil, debounceTime, scan } from 'rxjs/operators';

import { MapApiService } from './api.service';
import { GoogMap, MapOptions } from './api.interface';
import { MapMarker } from './marker.component';


@Component({
  selector: 'matMap',
  templateUrl: './map.component.html',
  styleUrls: [
    './map-component.css',
  ],
})
export class MatMap implements OnDestroy {
  /**
   * All map options
   */
  @Input() set options(options: MapOptions) {
    if (options) {
      this.optionsObs.next(options);
    }
  }

  /**
   * The latitude for the center of this map, expressed as a number.
   */
  @Input() set lat(n: number) {
    this.latObs.next(n);
  }


  /**
   * The longitude for the center of this map, expressed as a number.
   */
  @Input() set lng(n: number) {
    this.lngObs.next(n);
  }


  private withMap<T>(obs: Observable<T>, f: ((m: GoogMap, t: T) => void)) {
    combineLatest(this.mapObs, obs).pipe(
      takeUntil(this.onDestroy),
    ).subscribe(([map, t]) => {
      f(map, t);
    });
  }
  
  constructor(private readonly mapApiService: MapApiService) {
    this.withMap(this.mapMarkers, (map, mapMarkers) => {
      mapMarkers.forEach(marker => {
        marker.setMap(map);
      });
    });

    const centerObs = combineLatest(this.latObs, this.lngObs).pipe(
      map(([lat, lng]) => ({center: {lat, lng}} as MapOptions)),
    );

    const allOptionsObs = merge(
      centerObs,
      this.zoomObs,
      this.optionsObs,
    ).pipe(
      scan((acc, opts) => ( {...acc, ...opts} as MapOptions ),
           {} as MapOptions),
      debounceTime(10), // in case of any Angular weirdness
    );

    this.withMap(allOptionsObs, (map, options) => {
      map.setOptions(options);
    });
  }

  private readonly onDestroy = new ReplaySubject<void>();
  private readonly mapContents = new ReplaySubject<ElementRef>(1);
  private readonly mapMarkers = new ReplaySubject<MapMarker[]>(1);
  private readonly optionsObs = new ReplaySubject<MapOptions>(1);
  private readonly latObs = new ReplaySubject<number>(1);
  private readonly lngObs = new ReplaySubject<number>(1);
  private readonly zoomObs = new ReplaySubject<MapOptions>(1);
  private readonly mapObs = combineLatest(
    this.mapApiService.getApi(),
    this.mapContents).pipe(
      map(([api, elem]) => new api.Map(elem.nativeElement)),
      publishReplay(1),
      refCount(),
    );
  
  @ViewChild('mapContents') set _mapContents(el: ElementRef) {
    this.mapContents.next(el);
  }

  @ContentChildren(MapMarker) set _mapMarker(markers:  QueryList<MapMarker>) {
    this.mapMarkers.next(markers.toArray());
  }

  @Input() set zoom(zoom: number) {
    this.zoomObs.next(({zoom}) as MapOptions);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
