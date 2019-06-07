import { Component } from '@angular/core';

import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

import { MapApiService } from '../map';
import { MapOptions, LatLngLiteral } from '../map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly zoom = new BehaviorSubject(3);
  private readonly clicks = new ReplaySubject<LatLngLiteral>(1);
  private readonly latLngObs = this.clicks.pipe(
    scan((acc, latLng) => [...acc, latLng], [] as LatLngLiteral[]),
  );

  readonly locations = [
    {lat: -25, lng: 131},
    {lat: -24, lng: 133},
    {lat: -25, lng: 135},
    {lat: -24, lng: 137},
  ];
  readonly center = { lat: -25.344, lng: 131.036 };

  constructor(private readonly mapApiService: MapApiService) { }

  readonly mapOptions = this.mapApiService.getApi().pipe(
    map(api => ({ mapTypeId: api.MapTypeId.SATELLITE } as MapOptions)),
  );

  onClick(latLng: LatLngLiteral): void {
    this.clicks.next(latLng);
  }
}
