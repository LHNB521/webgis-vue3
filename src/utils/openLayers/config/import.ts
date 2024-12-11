import { Map, View, Feature } from 'ol'
import { defaults } from 'ol/control'
import WMTS from 'ol/source/WMTS'
import * as Project from 'ol/proj'
import { get as getProjection } from 'ol/proj'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import * as Extent from 'ol/extent'
import Point from 'ol/geom/Point'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { Style, Circle as CircleStyle, Fill, Stroke, Icon as IconStyle, Text as TextStyle } from 'ol/style'
import VectorSource from 'ol/source/Vector'
import { Draw } from 'ol/interaction'
import { getLength as GetLength, getDistance, getArea } from 'ol/sphere'
import GeoJson from 'ol/format/GeoJSON'
import { getWidth, getTopLeft } from 'ol/extent'

export {
  Map,
  View,
  Feature,
  defaults,
  WMTS,
  Project,
  WMTSTileGrid,
  Extent,
  Point,
  TileLayer,
  VectorLayer,
  Style,
  CircleStyle,
  Fill,
  Stroke,
  VectorSource,
  IconStyle,
  TextStyle,
  Draw,
  GetLength,
  getDistance,
  getArea,
  GeoJson,
  getProjection,
  getWidth,
  getTopLeft,
}
