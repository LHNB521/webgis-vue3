import * as Cesium from 'cesium'
import { ImageryProviderOptions } from './settings'

import { useViewerStore, CesiumViewer } from '@/store'
import { cesiumOptions } from './config'

const viewerStore = useViewerStore()

export default class addEye {
  viewer: CesiumViewer['viewer']

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
    const viewer1 = new Cesium.Viewer('eye', {
      ...cesiumOptions,
    }) as any
    // 天地图影像
    viewer1.imageryLayers.removeAll()
    viewer1.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider(ImageryProviderOptions))
    // 去除logo
    viewer1.cesiumWidget.creditContainer.style.display = 'none'
    //2.设置鹰眼图中球属性
    const control: any = viewer1.scene.screenSpaceCameraController
    control.enableRotate = false
    control.enableTranslate = false
    control.enableZoom = false
    control.enableTilt = false
    control.enableLook = false
    const syncViewer: any = () => {
      viewer1.camera.flyTo({
        destination: this.viewer.camera.position,
        orientation: {
          heading: this.viewer.camera.heading,
          pitch: this.viewer.camera.pitch,
          roll: this.viewer.camera.roll,
        },
        duration: 0.0,
      })
    }
    //3.同步
    this.viewer.camera.changed.addEventListener(syncViewer)
    this.viewer.scene.preRender.addEventListener(syncViewer)
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(0, 0),
      label: {
        text: new Cesium.CallbackProperty(function () {
          syncViewer()
          return ''
        }, true),
      },
    })
  }
}
