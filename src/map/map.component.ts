import { Component, Input, ViewChild, ElementRef, OnDestroy, ContentChildren, QueryList, Output, EventEmitter  } from '@angular/core';
import { Observable, ReplaySubject, combineLatest, merge, fromEventPattern } from 'rxjs';
import { publishReplay, refCount, map, switchMap, takeUntil, debounceTime, scan } from 'rxjs/operators';

import { MapApiService } from './api.service';
import { GoogMapApi, GoogMap, MapOptions, LatLng, LatLngLiteral } from './api.interface';
import { MapMarker } from './marker.component';



@Component({
  selector: 'matMap',
  templateUrl: './map.component.html',
  styleUrls: [
    './map-component.css',
  ],
})
export class MatMap implements OnDestroy {
  /* 
     the private properties are place at the top because they are used
     in the construction of the public properties
  */
  
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

  /**
   * The user clicked on the map
   * emits a LatLngLiteral
   */
  @Output() locationClick = this.fromMapEvent(
    'click',
    ({latLng}: { latLng: LatLng }) => (
      {
        lat: latLng.lat(), 
        lng: latLng.lng(),
      })
  );
  
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

  private withMap<T>(obs: Observable<T>, f: ((m: GoogMap, t: T, api: GoogMapApi) => void)) {
    combineLatest(
      this.mapObs,
      obs,
      this.mapApiService.getApi(),
    ).pipe(
      takeUntil(this.onDestroy),
    ).subscribe(([map, t, api]) => {
      f(map, t, api);
    });
  }

  private fromMapEvent<T, U>(eventName: string, f:((u:U) => T)): EventEmitter<T> {
    const emitter = new EventEmitter<T>();

    combineLatest(this.mapApiService.getApi(), this.mapObs).pipe(
      switchMap(([api, map]) => fromEventPattern(
        handler => api.event.addListener(map, 'click', handler),
        (_, token) => token.remove(),
      )),
      map(f),
    ).subscribe(emitter);
    return emitter;
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
