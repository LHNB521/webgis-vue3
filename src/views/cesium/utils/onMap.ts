import * as Cesium from 'cesium'
import { useViewerStore } from '@/store'
const viewerStore = useViewerStore()

// 监听点击事件，拾取坐标

export default class onMap {
  viewer: any
  constructor() {
    this.viewer = viewerStore.viewer
    this.onMap()
  }
  onMap() {
    const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
    handler.setInputAction((e: any) => {
      console.log(e)
      const clickPosition = this.viewer.scene.camera.pickEllipsoid(e.position)
      const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition)
      console.log(
        '经度：' +
          Cesium.Math.toDegrees(randiansPos.longitude) +
          ', 纬度：' +
          Cesium.Math.toDegrees(randiansPos.latitude),
      )
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
}
