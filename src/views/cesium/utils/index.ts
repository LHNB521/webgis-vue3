import * as Cesium from 'cesium'
import { cesiumOptions, cesiumToken } from './config'
import { skyBox, ImageryProviderOptions } from './settings'
import { useViewerStore } from '@/store'

const viewerStore = useViewerStore()

interface IMap {
  id: string
}

export default class initMap {
  private id: string
  public viewer: any
  constructor(params: IMap) {
    this.id = params.id
    if (this.id) {
      this.init()
    }
  }

  init() {
    Cesium.Ion.defaultAccessToken = cesiumToken
    this.viewer = new Cesium.Viewer(this.id, {
      ...cesiumOptions,
    }) as any
    viewerStore.setViewer(this.viewer)
    this.removeLogo()
    this.showZL()
    this.addSkyBox()
    this.addTianDiTu()
  }

  removeLogo() {
    // 去除logo
    this.viewer.cesiumWidget.creditContainer.style.display = 'none'
  }
  // 显示帧率
  showZL = () => {
    // 显示帧率
    this.viewer.scene.debugShowFramesPerSecond = true
    this.viewer.scene.globe.depthTestAgainstTerrain = true
  }
  addSkyBox() {
    this.viewer.scene.skyBox = new Cesium.SkyBox(skyBox)
  }
  // 天地图影像
  addTianDiTu() {
    this.viewer.imageryLayers.removeAll()
    this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider(ImageryProviderOptions))
  }
}
