import * as Cesium from 'cesium'
import { cesiumOptions, cesiumToken } from './config'
import { ImageryProviderOptions, skyBox } from './settings'

class CesiumMap {
  private static instance: CesiumMap | null = null
  private viewer: Cesium.Viewer | null = null

  private constructor(containerId: string, options: Cesium.Viewer.ConstructorOptions = cesiumOptions) {
    if (!containerId) {
      throw new Error(`Container with ID "${containerId}" not found`)
    }
    Cesium.Ion.defaultAccessToken = cesiumToken
    this.viewer = new Cesium.Viewer(containerId, {
      ...options,
    })

    this.initializeViewer()
  }

  /**
   * 初始化 Cesium Viewer 的设置
   */
  private initializeViewer() {
    if (!this.viewer) return
    // 加载地形
    this.loadWorldTerrain()
    // 启用深度检测
    this.viewer.scene.globe.depthTestAgainstTerrain = true
    // 隐藏版权信息
    this.hideLogo()
    // 显示帧率
    this.enableFrameRateDisplay()
    // 添加天空盒
    this.setSkyBox()
    // 加载天地图影像
    this.addTianDiTu()
  }
  /**
   * 加载全球地形数据
   */
  private async loadWorldTerrain() {
    if (!this.viewer) return
    try {
      // 使用异步加载全球地形
      const terrainProvider = await Cesium.createWorldTerrainAsync()
      // 将地形提供程序赋值给 viewer
      this.viewer.terrainProvider = terrainProvider
    } catch (error) {
      console.error('Error loading terrain provider:', error)
    }
  }
  /**
   * 使用单例模式获取 CesiumMap 的实例
   * @param containerId 地图容器 ID（初始化时必须提供）
   * @param options Cesium.Viewer 初始化参数
   */
  public static getInstance(containerId?: string, options?: Cesium.Viewer.ConstructorOptions): CesiumMap {
    if (!CesiumMap.instance) {
      if (!containerId) {
        throw new Error('Container ID must be provided when creating the instance for the first time.')
      }
      CesiumMap.instance = new CesiumMap(containerId, options || cesiumOptions)
    }
    return CesiumMap.instance
  }
  /**
   * 销毁 CesiumMap 实例
   */
  public destroy() {
    if (this.viewer) {
      this.viewer.destroy()
      this.viewer = null
      CesiumMap.instance = null
    }
  }
  /**
   * 获取 Viewer 实例
   */
  public getViewer(): Cesium.Viewer | null {
    return this.viewer
  }
  /**
   * 隐藏 Cesium 的默认 Logo
   */
  private hideLogo() {
    if (this.viewer) {
      ;(this.viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none'
    }
  }
  /**
   * 显示帧率
   */
  private enableFrameRateDisplay() {
    if (this.viewer) {
      this.viewer.scene.debugShowFramesPerSecond = true
    }
  }
  /**
   * 设置天空盒
   */
  private setSkyBox() {
    if (this.viewer) {
      this.viewer.scene.skyBox = new Cesium.SkyBox(skyBox)
    }
  }
  /**
   * 加载天地图影像
   */
  private addTianDiTu() {
    if (this.viewer) {
      this.viewer.imageryLayers.removeAll()
      this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider(ImageryProviderOptions))
    }
  }
}

export default CesiumMap
