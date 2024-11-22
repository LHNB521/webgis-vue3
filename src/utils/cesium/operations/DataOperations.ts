import * as Cesium from 'cesium'

class DataOperations {
  private viewer: Cesium.Viewer

  constructor(viewer: Cesium.Viewer) {
    this.viewer = viewer
  }

  /**
   * 加载 GeoJSON 数据
   * @param url GeoJSON 文件的 URL
   */
  addGeoJson(url: string) {
    Cesium.GeoJsonDataSource.load(url).then((dataSource) => {
      this.viewer.dataSources.add(dataSource)
      this.viewer.flyTo(dataSource)
    })
  }

  /**
   * 清除所有数据源
   */
  clearDataSources() {
    this.viewer.dataSources.removeAll()
  }
}

export default DataOperations
