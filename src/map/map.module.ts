/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatMap } from './map.component';
import { MapMarker } from './map-marker.component';
import { MapApiModule } from './map-api.module';

@NgModule({
  imports: [ CommonModule, MatCommonModule, MapApiModule ],
  exports: [ MatMap, MapMarker ],
  declarations: [ MatMap, MapMarker ],
})
export class MatMapModule {}
