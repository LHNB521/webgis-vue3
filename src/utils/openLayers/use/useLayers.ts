import { TileLayer, WMTS, WMTSTileGrid, getProjection, getWidth, getTopLeft } from '../config/import'

const wmtsTileGrid = (): WMTSTileGrid => {
  const projection = getProjection('EPSG:4326') // 获取投影对象
  const projectionExtent = projection?.getExtent() // 获取投影范围

  if (!projectionExtent) {
    throw new Error('无法确定投影范围。')
  }

  const resolutions: any = [] // 瓦片地图分辨率
  const matrixIds: any = []
  const width = getWidth(projectionExtent) // 水平宽度，单位米
  // 只加载缩放级别0到12
  for (let z = 0; z < 20; z++) {
    resolutions[z] = width / (256 * Math.pow(2, z))
    matrixIds[z] = z.toString()
  }

  return new WMTSTileGrid({
    origin: getTopLeft(projectionExtent), // 原点（左上角）
    resolutions, // 瓦片分辨率
    matrixIds, // 矩阵ID，就是瓦片坐标系z维度各个层级的标识
  })
}
export const useLayers = () => {
  const createTdtLayer = (): TileLayer => {
    return new TileLayer({
      source: new WMTS({
        url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=397cffd9753bbc7d1a5c5ab9be1a986b', // WMTS服务的URL
        layer: 'img', // 图层名
        matrixSet: 'c', // 使用的坐标系
        format: 'tiles', // 图片格式
        projection: 'EPSG:4326', // 投影坐标系,
        requestEncoding: 'KVP',
        style: 'default', // 图层风格，默认值
        tileGrid: wmtsTileGrid(), // 投影坐标系
        tileLoadFunction: (imageTile: any, src) => {
          imageTile.getImage().src = src + '&cachebuster=' + new Date().getTime() // 添加缓存破坏策略
        },
      }),
    })
  }

  return {
    createTdtLayer,
  }
}

export default useLayers
