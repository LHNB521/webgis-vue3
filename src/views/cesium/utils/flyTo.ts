import * as Cesium from 'cesium'
import { useViewerStore, CesiumViewer } from '@/store'
const viewerStore = useViewerStore()

interface IFlyTo {
  longitude: number
  latitude: number
  height: number
}
export default class flyTo {
  viewer: CesiumViewer['viewer']
  longitude: number = 120.36
  latitude: number = 36.09
  height: number = 40000
  constructor(props?: IFlyTo) {
    if (props) {
      this.longitude = props.longitude
      this.latitude = props.latitude
      this.height = props.height
    }

    this.viewer = viewerStore.getViewer()
    if (this.viewer) {
      this.init()
    } else {
      console.log('请先初始化地图')
    }
  }
  init() {
    this.viewer.camera.flyTo({
      // 从以度为单位的经度和纬度值返回笛卡尔3位置。
      destination: Cesium.Cartesian3.fromDegrees(this.longitude, this.latitude, this.height),
      orientation: {
        // heading：默认方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角。
        // pitch：默认角度为-90，即朝向地面，正角度在平面之上，负角度为平面下，即上下旋转，也叫俯仰角。
        // roll：默认旋转角度为0，左右旋转，正角度向右，负角度向左，也叫翻滚角
        heading: Cesium.Math.toRadians(0.0), // 正东，默认北
        pitch: Cesium.Math.toRadians(-90), // 向正下方看
        roll: 0.0, // 左右
      },
      duration: 3, // 飞行时间（s）
    })
  }
}
