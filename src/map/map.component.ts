import { Component, Input, ViewChild, ElementRef, OnDestroy, ContentChildren, QueryList  } from '@angular/core';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { publishReplay, refCount, map, switchMap, takeUntil, debounceTime } from 'rxjs/operators';

import { MapApiService } from './map-api.service';
import { GoogMap } from './map-api.interface';
import { MapMarker } from './map-marker.component';

const DEFAULT_CENTER = { lat: 0, lng: 0 };
const DEFAULT_ZOOM = 4;

@Component({
  selector: 'matMap',
  templateUrl: './map.component.html',
  styleUrls: [
    './map-component.css',
  ],
})
export class MatMap implements OnDestroy {
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
    this.withMap(this.zoomObs,
               (map, zoom) => {
                 map.setZoom(zoom);
               });

    this.withMap(this.mapMarkers, (map, mapMarkers) => {
      mapMarkers.forEach(marker => {
        marker.setMap(map);
      });
    });

    const centerObs = combineLatest(this.latObs, this.lngObs).pipe(
      debounceTime(10), // in case of any Angular weirdness
      map(([lat, lng]) => ({lat, lng})),
    );

    this.withMap(centerObs, (map, center) => {
      map.setCenter(center);
    });
  }

  private readonly onDestroy = new ReplaySubject<void>();
  private readonly mapContents = new ReplaySubject<ElementRef>(1);
  private readonly mapMarkers = new ReplaySubject<MapMarker[]>(1);
  private readonly latObs = new ReplaySubject<number>(1);
  private readonly lngObs = new ReplaySubject<number>(1);
  private readonly zoomObs = new ReplaySubject<number>(1);
  private readonly mapObs = combineLatest(
    this.mapApiService.getApi(),
    this.mapContents).pipe(
      map(([api, elem]) => new api.Map(elem.nativeElement, {zoom: DEFAULT_ZOOM, center: DEFAULT_CENTER})),
      publishReplay(1),
      refCount(),
    );
  
  @ViewChild('mapContents') set _mapContents(el: ElementRef) {
    this.mapContents.next(el);
  }

  @ContentChildren(MapMarker) set _mapMarker(markers:  QueryList<MapMarker>) {
    this.mapMarkers.next(markers.toArray());
  }

  @Input() set zoom(n: number) {
    this.zoomObs.next(n);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
