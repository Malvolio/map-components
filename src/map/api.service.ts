import { Injectable } from '@angular/core';
import { MatMapCredentials } from './map-credentials';
import { HttpClient } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { publishReplay, refCount, map } from 'rxjs/operators';

import { GoogMapApi, ControlPosition } from './api.interface';

@Injectable({
  providedIn: 'root',
})
export class MapApiService {
  private readonly ready =
    this.http.jsonp("https://maps.googleapis.com/maps/api/js?key=" +
                    this.cred.mapApiKey,
                    "callback")
    .pipe(
      map(() => window['google'].maps as GoogMapApi),
      publishReplay(),
      refCount(),
    );
  
  getApi(): Observable<GoogMapApi> {
    return this.ready;
  }

  constructor(
    private readonly cred: MatMapCredentials,
    private readonly http: HttpClient,
  ) {  }
}
