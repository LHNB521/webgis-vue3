// 点操作模块

import * as Cesium from 'cesium'

class PointOperations {
  private viewer: Cesium.Viewer

  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer
  }

  /**
   * 添加一个点
   * @param position 经纬度位置 [longitude, latitude, height]
   * @param label 点的标注
   */
  addPoint(position: [number, number], label: string) {
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(...position),
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // Cesium 提供了直接将点贴合到地形的方法，即设置 heightReference 为 Cesium.HeightReference.CLAMP_TO_GROUND。
      },
      label: {
        text: label,
        font: '14pt sans-serif',
        fillColor: Cesium.Color.WHITE,
      },
    })
  }
  // 采样地形高度并调整点位置
  async addPointWithTerrainHeight(position: [number, number], label: string) {
    const terrainProvider = this.viewer.terrainProvider
    // 确保 terrainProvider 支持 tile availability
    if (!terrainProvider.availability) {
      console.error('The terrain provider does not support tile availability.')
      return
    }
    // 使用 Cesium.sampleTerrain 方法采样地形高度
    const postitions = [Cesium.Cartographic.fromDegrees(position[0], position[1])]
    const updatedPositions = await Cesium.sampleTerrainMostDetailed(terrainProvider, postitions)
    const height = updatedPositions[0].height
    // 添加点到地形高度之上
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(position[0], position[1], height),
      point: {
        pixelSize: 10,
        color: Cesium.Color.BLUE,
      },
      label: {
        text: label,
        font: '14pt sans-serif',
        fillColor: Cesium.Color.WHITE,
      },
    })
  }
  // 批量加点采样地形高度来优化性能
  async addPointsWithTerrainHeight(coordinates: [number, number][]) {
    const terrainProvider = this.viewer.terrainProvider
    // 确保 terrainProvider 支持 tile availability
    if (!terrainProvider.availability) {
      console.error('The terrain provider does not support tile availability.')
      return
    }
    // 转换为 Cartographic 格式
    const cartographics = coordinates.map(([longitude, latitude]) => {
      return Cesium.Cartographic.fromDegrees(longitude, latitude)
    })
    // 批量采样地形高度
    const updatedPositions = await Cesium.sampleTerrainMostDetailed(terrainProvider, cartographics)
    // 添加每个点到地图
    updatedPositions.forEach((carto, index) => {
      const [lon, lat] = coordinates[index]
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat, carto.height),
        point: {
          pixelSize: 8,
          color: Cesium.Color.YELLOW,
        },
      })
    })
  }

  /**
   * 删除所有点
   */
  clearPoints() {
    this.viewer.entities.removeAll()
  }
}

export default PointOperations
