/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MapApiService } from './api.service';

@NgModule({
  imports: [ HttpClientModule, HttpClientJsonpModule],
  providers: [ MapApiService ],
})
export class MapApiModule {}
