import { Extent, getProjection, TileLayer, WMTS, WMTSTileGrid } from './import'

// 初始化和配置 WMTS 瓦片网格
export function wmtsTileGrid() {
  const projectionExtent = getProjection('EPSG:4326')?.getExtent() // web墨卡托投影坐标系的四至范围
  if (!projectionExtent) {
    throw new Error('无法确定投影范围。')
  }

  const resolutions: any = [] // 瓦片地图分辨率
  const matrixIds: any = []
  const width = Extent.getWidth(projectionExtent) // web墨卡托投影坐标系的水平宽度，单位米

  for (let z = 0; z < 19; z++) {
    resolutions[z] = width / (256 * Math.pow(2, z))
    matrixIds[z] = z.toString()
  }

  return new WMTSTileGrid({
    origin: Extent.getTopLeft(projectionExtent), // 原点（左上角）
    resolutions, // 瓦片分辨率
    matrixIds, // 矩阵ID，就是瓦片坐标系z维度各个层级的标识
  })
}

// 天地图
const TDTLayerOptions: any = {
  url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=你的token', // WMTS服务的URL
  layer: 'img', // 图层名
  matrixSet: 'c', // 使用的坐标系
  format: 'tiles', // 图片格式
  projection: getProjection('EPSG:4326'),
  requestEncoding: 'KVP',
  style: 'default', // 图层风格，默认值
  tileGrid: wmtsTileGrid(), // 投影坐标系
}

// 创建WMTS图层
export function createTileLayer() {
  return new TileLayer({
    source: new WMTS(TDTLayerOptions),
  })
}
