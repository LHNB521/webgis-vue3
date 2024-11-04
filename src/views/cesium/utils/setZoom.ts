import * as Cesium from 'cesium'

import { useViewerStore, CesiumViewer } from '@/store'
const viewerStore = useViewerStore()
// 放大缩小
export default class SetZoom {
  private viewer: CesiumViewer['viewer']
  constructor() {
    this.viewer = viewerStore.getViewer()
  }
  setZoomIn(zoomAmount: number) {
    zoomAmount = 1000 * zoomAmount // 转化千米
    this.viewer.camera.zoomIn(zoomAmount) // 放大单位米
  }
  setZoomOut(zoomAmount: number) {
    zoomAmount = 1000 * zoomAmount // 转化千米
    this.viewer.camera.zoomOut(zoomAmount)
  }
  setPositionIn(zoomAmount: number) {
    // 获取相机当前位置
    const cameraPosition = this.viewer.camera.positionCartographic
    // 放大
    this.viewer.camera.position = Cesium.Cartesian3.fromDegrees(
      cameraPosition.longitude,
      cameraPosition.latitude,
      cameraPosition.height - zoomAmount,
    )
  }
  setPositionOut(zoomAmount: number) {
    // 获取相机当前位置
    const cameraPosition = this.viewer.camera.positionCartographic
    // 缩小
    this.viewer.camera.position = Cesium.Cartesian3.fromDegrees(
      cameraPosition.longitude,
      cameraPosition.latitude,
      cameraPosition.height + zoomAmount,
    )
  }
  flyTo(height?: number) {
    height = height || 20000000
    // 获取相机当前位置
    const cameraPosition = this.viewer.camera.positionCartographic
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(cameraPosition.longitude, cameraPosition.latitude, height),
    })
  }
}
