import * as Cesium from 'cesium'
import { useViewerStore, CesiumViewer } from '@/store'

// 单个添加点位
type Point = {
  lon: number
  lat: number
  name: string
  description?: string
}
// 批量添加点位
interface Props {
  list: Point[]
  type?: string
}

export default class AddPoint {
  viewer: CesiumViewer['viewer']
  list: Point[]
  pointsCollection: Cesium.PointPrimitiveCollection | null = null

  constructor(props: Props) {
    const viewerStore = useViewerStore()
    this.viewer = viewerStore.getViewer()
    if (!this.viewer) {
      console.log('请先初始化地图')
    }
    this.list = props.list
    this.pointsCollection = null
  }
  addEntities() {
    if (!this.viewer) return // 安全检查
    this.list.forEach((item) => {
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat),
        point: {
          pixelSize: 10,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        label: {
          text: item.name,
          font: '14px sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
        },
        description: item.description || '无描述信息',
      })
    })
  }
  addCustomDataSource() {
    if (!this.viewer) return // 安全检查
    const dataSource = new Cesium.CustomDataSource('points')
    this.list.forEach((item) => {
      dataSource.entities.add({
        position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 0),
        point: {
          pixelSize: 10,
          color: Cesium.Color.BLUE,
          outlineColor: Cesium.Color.fromCssColorString('#000000'),
          outlineWidth: 2,
        },
      })
    })
    this.viewer.dataSources.add(dataSource)
  }
  addPrimitives() {
    if (!this.viewer) return // 安全检查

    this.pointsCollection = new Cesium.PointPrimitiveCollection()
    this.list.forEach((item) => {
      const point: any = this.pointsCollection?.add({
        position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat), // 经纬度转为 Cartesian3 坐标
        color: Cesium.Color.RED, // 点的颜色
        pixelSize: 10, // 点的大小
        outlineColor: Cesium.Color.WHITE, // 边框颜色
        outlineWidth: 2, // 边框宽度
      })

      const pointId = `point_${item.lon}_${item.lat}`
      point.id = pointId // 为每个点设置唯一 ID
      point.name = item.name
      point.description = item.description || '无描述信息'
    })
    this.viewer.scene.primitives.add(this.pointsCollection)
    // 添加点击事件
    this.addClickEvent(this.pointsCollection)
  }
  /**
   * 添加点击事件
   * @param points Primitive 集合
   */
  private addClickEvent(points: Cesium.PointPrimitiveCollection): void {
    if (!this.viewer) return // 安全检查

    this.viewer.screenSpaceEventHandler.setInputAction((click: any) => {
      const pickedObject = this.viewer.scene.pick(click.position)
      if (Cesium.defined(pickedObject)) {
        console.log('点击到点位', pickedObject)
      } else {
        console.log('未点击到任何点位')
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  /**
   * 清除所有点
   */
  clearPrimitives(): void {
    if (this.viewer && this.pointsCollection) {
      this.viewer.scene.primitives.remove(this.pointsCollection)
      this.pointsCollection = null
    }
  }
}
