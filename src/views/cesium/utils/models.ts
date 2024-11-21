import * as Cesium from 'cesium'
import { useViewerStore, CesiumViewer } from '@/store'
import url from '@/assets/cesium/Cesium_Air.glb'

const viewerStore = useViewerStore()

interface IModel {
  longitude: number
  latitude: number
  height: number
}
export default class Model {
  viewer: CesiumViewer['viewer']
  longitude: number = 120.36
  latitude: number = 36.09
  height: number = 40000
  url: string = url
  constructor(props?: IModel) {
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
    this.viewer.entities.removeAll()

    const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, this.height)
    const heading = Cesium.Math.toRadians(135)
    const pitch = 0
    const roll = 0
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

    const entity = this.viewer.entities.add({
      name: this.url,
      position: position,
      orientation: orientation,
      model: {
        uri: this.url,
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    })
    this.viewer.trackedEntity = entity
    // Sandcastle.addToolbarMenu(options)
  }
}
