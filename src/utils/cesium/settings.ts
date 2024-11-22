import * as Cesium from 'cesium'

import px1 from '@/assets/images/Standard-Cube-Map/px1.png'
import nx1 from '@/assets/images/Standard-Cube-Map/nx1.png'
import pz from '@/assets/images/Standard-Cube-Map/pz.png'
import nz1 from '@/assets/images/Standard-Cube-Map/nz1.png'
import py from '@/assets/images/Standard-Cube-Map/py.png'
import ny1 from '@/assets/images/Standard-Cube-Map/ny1.png'

// 外天空盒
export const skyBox = {
  sources: {
    positiveX: px1,
    negativeX: nx1,
    positiveY: pz,
    negativeY: nz1,
    positiveZ: py,
    negativeZ: ny1,
  },
}

// 自定义天地图key
export const TDKey = 'b4646942dd645c218ee99b2667e94da6'
const TDT_IMG = 'http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&tk=' + TDKey //在线天地图影像服务地址(经纬度)
export const ImageryProviderOptions = {
  url: TDT_IMG,
  layer: 'tdt_img',
  style: 'default',
  format: 'tiles',
  tileMatrixSetID: 'c',
  subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
  tilingScheme: new Cesium.GeographicTilingScheme(),
  tileMatrixLabels: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ],
  maximumLevel: 19,
}
