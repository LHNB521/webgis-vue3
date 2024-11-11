import * as Cesium from 'cesium'
import { CesiumViewer, useViewerStore } from '@/store'
import img from '@/assets/images/map/particle.png'

const viewerStore = useViewerStore()

export default class Particle {
  viewer: CesiumViewer['viewer']
  // 粒子的位置
  longitude: number = 120.36
  latitude: number = 36.09
  height: number = 40000
  // 粒子的生命周期
  constructor(props?: any) {
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
    // 配置并创建粒子系统
    const createParticleSystem = () => {
      return new Cesium.ParticleSystem({
        image: img, // 粒子图片路径
        startColor: Cesium.Color.WHITE.withAlpha(0.7),
        endColor: Cesium.Color.YELLOW.withAlpha(0.3),
        startScale: 1.0,
        endScale: 6.0,
        minimumSpeed: 2.0,
        maximumSpeed: 10.0,
        lifetime: 2.0,
        emissionRate: 30,
        emitter: new Cesium.CircleEmitter(3.0),
        modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
          Cesium.Cartesian3.fromDegrees(this.longitude, this.latitude, this.height),
        ),
      })
    }
    console.log('粒子系统')
    console.log(this.viewer)

    // 添加粒子系统到场景
    const particleSystem = this.viewer.scene.primitives.add(createParticleSystem())
    particleSystem.emitter = new Cesium.ConeEmitter(Cesium.Math.toRadians(45)) // 锥形发射器
  }
}
