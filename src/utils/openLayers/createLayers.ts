import { Extent, getProjection, TileLayer, WMTS, WMTSTileGrid } from './import'

/**
 * 初始化和配置 WMTS 瓦片网格
 * @returns WMTSTileGrid - 返回配置好的 WMTS 瓦片网格
 */
export function wmtsTileGrid(): WMTSTileGrid {
  // 获取投影的边界范围（通常为地理坐标系范围）
  const projectionExtent = getProjection('EPSG:4326')?.getExtent()
  if (!projectionExtent) {
    throw new Error('无法确定投影范围。')
  }

  // 初始化分辨率数组和矩阵ID数组
  const resolutions: number[] = []
  const matrixIds: string[] = []
  const width = Extent.getWidth(projectionExtent) // 获取投影的宽度（米）

  // 根据缩放级别计算分辨率和矩阵ID
  for (let z = 0; z < 19; z++) {
    resolutions[z] = width / (256 * Math.pow(2, z)) // 计算每一级的分辨率
    matrixIds[z] = z.toString() // 矩阵ID通常是缩放级别的字符串表示
  }

  // 返回配置好的 WMTSTileGrid 对象
  return new WMTSTileGrid({
    origin: Extent.getTopLeft(projectionExtent), // 设置原点为投影边界的左上角
    resolutions, // 设置瓦片分辨率数组
    matrixIds, // 设置矩阵ID数组
  })
}

// 配置天地图 WMTS 图层的选项
const TDTLayerOptions: any = {
  url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=你的token', // WMTS 服务的 URL
  layer: 'img', // 指定要加载的图层名称
  matrixSet: 'c', // 使用的矩阵集（如“c”代表的可能是中国区域的坐标系）
  format: 'tiles', // 指定瓦片的格式
  projection: getProjection('EPSG:4326'), // 设置投影为地理坐标系
  requestEncoding: 'KVP', // 使用键值对（KVP）的请求编码方式
  style: 'default', // 设置图层风格为默认
  tileGrid: wmtsTileGrid(), // 调用函数获取配置好的瓦片网格
}

/**
 * 创建 WMTS 图层
 * @returns TileLayer - 返回配置好的 WMTS 图层
 */
export function createTileLayer(): TileLayer {
  return new TileLayer({
    source: new WMTS(TDTLayerOptions), // 使用配置好的 WMTS 图层选项
  })
}
