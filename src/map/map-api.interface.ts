/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

type ControlPosition = 'BOTTOM_CENTER' |
  'BOTTOM_LEFT' |
  'BOTTOM_RIGHT' |
  'LEFT_BOTTOM' |
  'LEFT_CENTER' |
  'LEFT_TOP' |
  'RIGHT_BOTTOM' |
  'RIGHT_CENTER' |
  'RIGHT_TOP' |
  'TOP_CENTER' |
  'TOP_LEFT' |
  'TOP_RIGHT';

export interface FullscreenControlOptions {
  position: ControlPosition;
}

type MapTypeControlStyle = 'DEFAULT' | 'DROPDOWN_MENU' | 'HORIZONTAL_BAR';

type MapTypeId  = 'HYBRID' | 'ROADMAP' | 'SATELLITE' | 'TERRAIN';

export interface MapTypeStyle  {
  elementType: string;
  featureType: string;
  stylers: Array<object>;
}

export interface MapTypeControlOptions {
  mapTypeIds: string[];
  position: ControlPosition;
  style: MapTypeControlStyle;
}

export interface PanControlOptions {
  position: ControlPosition;
}

export interface RotateControlOptions {
  position: ControlPosition;
}

type ScaleControlStyle = 'DEFAULT';

export interface ScaleControlOptions {
  style: ScaleControlStyle;
}

export interface ZoomControlOptions {
  position: ControlPosition;
}

export interface MapRestriction {
  latLngBounds: LatLngLiteral;
  strictBounds: boolean;
}



export interface MapOptions {
  backgroundColor?: string;
  center?: LatLngLiteral;
  clickableIcons?: boolean;
  controlSize?: number;
  disableDefaultUI?: boolean;
  disableDoubleClickZoom?: boolean;
  draggable?: boolean;
  draggableCursor?: string;
  draggingCursor?: string;
  fullscreenControl?: boolean;
  fullscreenControlOptions?: FullscreenControlOptions;
  gestureHandling?: string;
  heading?: number;
  keyboardShortcuts?: boolean;
  mapTypeControl?: boolean;
  mapTypeControlOptions?: MapTypeControlOptions;
  mapTypeId?: MapTypeId|string;
  maxZoom?: number;
  minZoom?: number;
  noClear?: boolean;
  panControl?: boolean;
  panControlOptions?: PanControlOptions;
  restriction?: MapRestriction;
  rotateControl?: boolean;
  rotateControlOptions?: RotateControlOptions;
  scaleControl?: boolean;
  scaleControlOptions?: ScaleControlOptions;
  scrollwheel?: boolean;
  styles?: Array<MapTypeStyle>;
  tilt?: number;
  zoom?: number;
  zoomControl?: boolean;
  zoomControlOptions?: ZoomControlOptions;
}

export interface MarkerOptions {
  anchorPoint?:  Point;
  animation?:  Animation;
  clickable?:  boolean;
  crossOnDrag?:  boolean;
  cursor?:  string;
  draggable?:  boolean;
  icon?:  string|Icon|Symbol;
  label?:  string|MarkerLabel;
  map?: GoogMarker;
  opacity?:  number;
  optimized?:  boolean;
  position?:  LatLngLiteral;
  shape?:  MarkerShape;
  title?:  string;
  visible?:  boolean;
  zIndex?:  number;
};

export interface Icon {
  anchor:  Point;
  labelOrigin:  Point;
  origin:  Point;
  scaledSize:  Size;
  size:  Size;
  url:  string;
}

export interface MarkerLabel {
  color:  string;
  fontFamily:  string;
  fontSize:  string;
  fontWeight:  string;
  text:  string;
}

export interface Point {
  x:  number;
  y:  number;
}

export interface MarkerShape  {
  coords:  number[];
  type:  string;
}

type Animation = 'BOUNCE' | 'DROP';

type SymbolPath = 'BACKWARD_CLOSED_ARROW' |
  'BACKWARD_OPEN_ARROW' |
  'CIRCLE' |
  'FORWARD_CLOSED_ARROW' |
  'FORWARD_OPEN_ARROW';

export interface MarkerShape {
  anchor:  Point;
  fillColor:  string;
  fillOpacity:  number;
  labelOrigin:  Point;
  path:  SymbolPath|string;
  rotation:  number;
  scale:  number;
  strokeColor:  string;
  strokeOpacity:  number;
  strokeWeight:  number;
}

export interface Size {
  width:  number;
  height:  number;
  widthUnit?:  string;
  heightUnit?:  string;
}

export interface GoogMarker {
  setAnimation(animation:  Animation): void;
  setClickable(flag:  boolean): void;
  setCursor(cursor:  string): void;
  setDraggable(flag:  boolean): void;
  setIcon(icon:  string|Icon|Symbol): void;
  setLabel(label:  string|MarkerLabel): void;
  setMap(map: GoogMap|null): void;
  setOpacity(opacity:  number): void;
  setOptions(options:  MarkerOptions): void;
  setPosition(latlng:  LatLngLiteral): void;
  setShape(shape:  MarkerShape): void;
  setTitle(title:  string): void;
  setVisible(visible:  boolean): void;
  setZIndex(zIndex:  number): void;
}

export interface GoogMap {
  setCenter(center: LatLngLiteral);
  setClickableIcons(value: boolean): void;
  setHeading(heading: number): void;
  setOptions(options: MapOptions): void;
  setZoom(zoom: number): void;
}

export interface MapApi {
  Map: {
    new (nativeElement: any, options?: MapOptions): GoogMap
  };
  Marker: {
    new(options?: MarkerOptions): GoogMarker
  };
}
