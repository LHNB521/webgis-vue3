import * as Cesium from 'cesium'
import { useViewerStore, CesiumViewer } from '@/store'
const viewerStore = useViewerStore()

export default class Satellite {
  private viewer: CesiumViewer['viewer']
  private postion: any
  private start: any
  private stop: any
  private satelliteEntity: any
  constructor() {
    this.viewer = viewerStore.getViewer()
    if (this.viewer) {
      this.init()
    }
  }
  init() {
    // 添加模拟时间
    this.createTime()
    // 添加卫星轨道
    this.createTrack()
    // 添加卫星
    this.createSateLlite()
  }
  createTime() {
    // 设定了模拟时间的边界
    this.start = Cesium.JulianDate.fromDate(new Date()) // 当前时间
    this.start = Cesium.JulianDate.addSeconds(this.start, 8, new Cesium.JulianDate()) // 东八区时间
    this.stop = Cesium.JulianDate.addSeconds(this.start, 360, new Cesium.JulianDate())
    //确保查看器处于预期的时间
    this.viewer.clock.startTime = this.start.clone()
    this.viewer.clock.stopTime = this.stop.clone()
    this.viewer.clock.currentTime = this.start.clone()
    this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP //循环结束时
    //时间变化来控制速度 // 时间速率，数字越大时间过的越快
    this.viewer.clock.multiplier = 10
  }
  createTrack() {
    // 动态控制模型的位置，达到模型沿轨迹平滑移动的目的 后面优化卫星轨迹会用到这个
    this.postion = new Cesium.SampledPositionProperty()
    const lon = Math.floor(Math.random() * 360)
    const lat = Math.floor(Math.random() * 360)
    const line: any = [] //轨道坐标集合
    for (let k = lat; k <= 360 + lat; k += 30) {
      const obj = {
        lon: lon,
        lat: k,
        time: k - lat,
        alt: 2000000,
      }
      const time = Cesium.JulianDate.addSeconds(this.start, obj.time, new Cesium.JulianDate())
      line.push(Cesium.Cartesian3.fromDegrees(obj.lon, obj.lat, obj.alt))
      // 经纬度转换为世界坐标   轨道坐标
      const position = Cesium.Cartesian3.fromDegrees(obj.lon, obj.lat, obj.alt)
      this.postion.addSample(time, position)
    }
    // 添加轨道
    this.viewer.entities.add({
      id: 'line',
      polyline: {
        positions: line,
        width: 2,
        material: Cesium.Color.fromCssColorString(`rgba(0,255,255,1)`),
      },
    })
  }
  createSateLlite() {
    this.satelliteEntity = this.viewer.entities.add({
      // 将实体availability设置为与模拟时间相同的时间间隔。
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: this.start,
          stop: this.stop,
        }),
      ]),
      position: this.postion,
      //基于位置移动自动计算方向.
      orientation: new Cesium.VelocityOrientationProperty(this.postion),
      point: {
        pixelSize: 30,
        color: Cesium.Color.YELLOW,
      },
    })
    // 设置位置插值，以便在采样点之间平滑移动
    this.satelliteEntity.position.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
    })
    // 可选：设置相机跟随卫星
    // this.viewer.trackedEntity = this.satelliteEntity
  }
}
