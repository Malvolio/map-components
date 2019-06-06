/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * this is a hand-written Typescript translation of the parts 
 * of the Google Maps Js API.  It is incomplete but rather than
 * completing it, it should be *automated*.
 */

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

/**
 * This is a little nominal-typing trick.  It guarantees that the only
 * way, short of deliberate casting, to get constants of this type
 * (ControlPosition in this case) is by actually loading the library
 * and consulting its dictionary.
 */
export type ControlPosition = number & { __brand: "ControlPosition" };

interface ControlPositionValues {
  BOTTOM_CENTER: ControlPosition;
  BOTTOM_LEFT: ControlPosition;
  BOTTOM_RIGHT: ControlPosition;
  LEFT_BOTTOM: ControlPosition;
  LEFT_CENTER: ControlPosition;
  LEFT_TOP: ControlPosition;
  RIGHT_BOTTOM: ControlPosition;
  RIGHT_CENTER: ControlPosition;
  RIGHT_TOP: ControlPosition;
  TOP_CENTER: ControlPosition;
  TOP_LEFT: ControlPosition;
  TOP_RIGHT: ControlPosition;
}

export interface FullscreenControlOptions {
  position: ControlPosition;
}

export type MapTypeControlStyle = number & { __brand: "MapTypeControlStyle" };

interface MapTypeControlStyleValues {
  DEFAULT: MapTypeControlStyle;
  DROPDOWN_MENU: MapTypeControlStyle;
  HORIZONTAL_BAR: MapTypeControlStyle;
}

export type MapTypeId = string & { __brand: "MapTypeId" };

interface MapTypeIdValues  {
  HYBRID: MapTypeId;
  ROADMAP: MapTypeId;
  SATELLITE: MapTypeId;
  TERRAIN: MapTypeId;
}

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

export type ScaleControlStyle = number & { __brand: "ScaleControlStyle" };

interface ScaleControlStyleValues {
DEFAULT: ScaleControlStyle;
};

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

/**
 * the Point class, like several others, is declared with a private
 * constructor because no Typescript code should be constructing it.
 * It should only be made by the constructors in the library.
 */ 
export class Point {
  private constructor(
    readonly x:  number,
    readonly y:  number) { }
}

export interface MarkerShape  {
  coords:  number[];
  type:  string;
}

export type Animation = number & { __brand: "Animation" };
interface AnimationValues {
  BOUNCE: Animation;
  DROP: Animation;
}

export type SymbolPath = number & { __brand: "SymbolPath" };
interface SymbolPathValues {
  BACKWARD_CLOSED_ARROW: SymbolPath;
  BACKWARD_OPEN_ARROW: SymbolPath
  CIRCLE: SymbolPath
  FORWARD_CLOSED_ARROW: SymbolPath
  FORWARD_OPEN_ARROW: SymbolPath
}

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

export class Size {
  private constructor(
    width:  number,
    height:  number,
    widthUnit?:  string,
    heightUnit?:  string,
  ) { }
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

export interface GoogMapApi {
  Map: {
    new (nativeElement: any, options?: MapOptions): GoogMap
  };
  Marker: {
    new(options?: MarkerOptions): GoogMarker
  };
  Size: {
    new(
      width:  number,
      height:  number,
      widthUnit?:  string,
      heightUnit?:  string,
    ): Size
  };
  Point: {
    new(
      x:  number,
      y:  number): Point
  };
  LatLng: {
    new(
      lat:  number,
      lng:  number,
    ): LatLngLiteral;
  };
  ControlPosition: ControlPositionValues;
  MapTypeControlStyle: MapTypeControlStyleValues;
  MapTypeId: MapTypeIdValues;
  ScaleControlStyle: ScaleControlStyleValues;
  Animation: AnimationValues;
  SymbolPath: SymbolPathValues;
}
