import * as Cesium from 'cesium'
import { cesiumOptions, cesiumToken } from './config'
import { skyBox, ImageryProviderOptions } from './settings'

interface IMap {
  id: string
}

export default class initMap {
  private id: string
  public viewer: Cesium.Viewer | null = null
  constructor(params: IMap) {
    this.id = params.id
    if (this.id) {
      this.init()
    }
  }

  async init() {
    Cesium.Ion.defaultAccessToken = cesiumToken
    const terrainProvider = await Cesium.createWorldTerrainAsync() // 使用异步方法加载地形
    this.viewer = new Cesium.Viewer(this.id, {
      terrainProvider, // 使用Cesium默认地形
      ...cesiumOptions,
    }) as any
    this.removeLogo()
    this.showZL()
    this.addSkyBox()
    this.addTianDiTu()
  }

  /**
   * 获取 Viewer 实例
   * @returns Viewer 实例
   */
  getViewer(): Cesium.Viewer | null {
    return this.viewer
  }
  // 去除logo
  removeLogo() {
    if (!this.viewer) {
      throw new Error('Cesium Viewer is not initialized')
    }
    ;(this.viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none'
  }
  // 显示帧率
  showZL = () => {
    if (!this.viewer) throw new Error('Cesium Viewer is not initialized')
    // 显示帧率
    this.viewer.scene.debugShowFramesPerSecond = true
    this.viewer.scene.globe.depthTestAgainstTerrain = true
  }
  addSkyBox() {
    if (!this.viewer) throw new Error('Cesium Viewer is not initialized')
    this.viewer.scene.skyBox = new Cesium.SkyBox(skyBox)
  }
  // 天地图影像
  addTianDiTu() {
    if (!this.viewer) throw new Error('Cesium Viewer is not initialized')
    this.viewer.imageryLayers.removeAll()
    this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider(ImageryProviderOptions))
  }
  destroyMap() {
    if (this.viewer) {
      this.viewer.destroy()
      this.viewer = null
    }
  }
}
