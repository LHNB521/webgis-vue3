import * as Cesium from 'cesium'

class ViewOperations {
  private viewer: Cesium.Viewer

  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer
  }

  /**
   * 飞行到指定位置
   * @param position 经纬度位置 [longitude, latitude, height]
   * @param duration 飞行时间
   */
  flyTo(position: [number, number, number], duration = 3) {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(...position),
      duration,
    })
  }

  /**
   * 重置视图
   */
  resetView() {
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(0, 0, 10000000),
    })
  }
}

export default ViewOperations
