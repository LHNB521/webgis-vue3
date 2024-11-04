import * as Cesium from 'cesium'
import { ImageryProviderOptions } from './settings'

import { useViewerStore, CesiumViewer } from '@/store'
import { cesiumOptions } from './config'

const viewerStore = useViewerStore()

export default class addEye {
  viewer: CesiumViewer['viewer']
  viewer1: CesiumViewer['viewer'] | any
  syncViewer: (() => void) | null = null

  constructor() {
    this.viewer = viewerStore.getViewer()
    if (this.viewer) {
      this.init()
    } else {
      console.log('请先初始化地图')
    }
  }
  init() {
    //1.创建双球
    this.viewer1 = new Cesium.Viewer('eye', {
      ...cesiumOptions,
    }) as any
    // 天地图影像
    this.viewer1.imageryLayers.removeAll()
    this.viewer1.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider(ImageryProviderOptions))
    // 去除logo
    this.viewer1.cesiumWidget.creditContainer.style.display = 'none'
    //2.设置鹰眼图中球属性
    const control: any = this.viewer1.scene.screenSpaceCameraController
    control.enableRotate = false
    control.enableTranslate = false
    control.enableZoom = false
    control.enableTilt = false
    control.enableLook = false

    // 同步主视图和鹰眼图的相机位置
    this.syncViewer = () => {
      if (this.viewer1 && this.viewer) {
        this.viewer1.camera.flyTo({
          destination: this.viewer.camera.position,
          orientation: {
            heading: this.viewer.camera.heading,
            pitch: this.viewer.camera.pitch,
            roll: this.viewer.camera.roll,
          },
          duration: 0.0,
        })
      }
    }
    //3.同步
    this.viewer.camera.changed.addEventListener(this.syncViewer)
    this.viewer.scene.preRender.addEventListener(this.syncViewer)
  }
  remove() {
    // 移除事件监听器
    if (this.viewer && this.syncViewer) {
      this.viewer.camera.changed.removeEventListener(this.syncViewer)
      this.viewer.scene.preRender.removeEventListener(this.syncViewer)
    }

    // 销毁鹰眼视图
    if (this.viewer1) {
      this.viewer1.destroy()
      this.viewer1 = null
    }
  }
}
