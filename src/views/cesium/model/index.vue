<script setup lang="ts">
import * as Cesium from 'cesium'
import { nextTick, onBeforeUnmount } from 'vue'
import { useViewerStore } from '@/store'
import flyTo from '../utils/flyTo'
import SetZoom from '../utils/setZoom'

// 初始化 ViewerStore
const viewerStore = useViewerStore()
const flightPath = [
  { longitude: -115.0, latitude: 37.0, altitude: 10000 },
  { longitude: 116.39125, latitude: 39.9075, altitude: 15000 },
]
/**
 * 添加 3D 模型到 Cesium 场景
 */
const addModel = async () => {
  const viewer = viewerStore.getViewer()

  if (!viewer) {
    console.error('Viewer 未初始化。请检查 ViewerStore 是否正确配置。')
    return
  }

  // 创建路径插值
  const positionProperty = new Cesium.SampledPositionProperty()
  flightPath.forEach((point, index) => {
    const time = Cesium.JulianDate.addSeconds(Cesium.JulianDate.now(), index * 10, new Cesium.JulianDate())
    const position = Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)
    positionProperty.addSample(time, position)
  })

  // 添加飞机模型
  const airplaneEntity = viewer.entities.add({
    position: positionProperty,
    model: {
      uri: '/feiji.glb', // 替换为飞机模型的路径
      minimumPixelSize: 64,
      scale: 100, // 调整模型大小
    },
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
  })
  // 调整时间轴以适配路径
  viewer.clock.startTime = Cesium.JulianDate.now()
  viewer.clock.stopTime = Cesium.JulianDate.addSeconds(
    Cesium.JulianDate.now(),
    flightPath.length * 10,
    new Cesium.JulianDate(),
  )
  viewer.clock.shouldAnimate = true
  viewer.clock.currentTime = viewer.clock.startTime
  viewer.clock.multiplier = 0.009 // 时间倍速
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP // 循环播放

  // 聚焦到飞机
  viewer.trackedEntity = airplaneEntity
  viewer.entities.add({
    polyline: {
      positions: flightPath.map((point) =>
        Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude),
      ),
      width: 2,
      material: Cesium.Color.YELLOW,
    },
  })

  try {
    // 定义模型的位置和属性
    const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
      Cesium.Cartesian3.fromDegrees(116.39125, 39.9075, 1000), // 模型位置（经度、纬度、高度）
      new Cesium.HeadingPitchRoll(0, 0, 0), // 模型的朝向
    )

    // 加载模型
    const planeModel = await Cesium.Model.fromGltfAsync({
      url: '/feiji.glb', // 模型文件路径
      modelMatrix: modelMatrix, // 模型的位置和方向矩阵
      scale: 100.0, // 模型缩放比例
    })

    // 添加模型到场景
    viewer.scene.primitives.add(planeModel)
    console.log('模型已成功添加到场景！')

    // // 添加粒子系统（喷雾效果）
    // addTrailEffect(viewer, planeModel)
  } catch (error) {
    console.error('加载模型失败:', error)
  }
}
/**
 * 为飞机尾部添加喷雾效果
 */
const addTrailEffect = (viewer: Cesium.Viewer, model: Cesium.Model) => {
  // 计算尾部位置
  const modelMatrix = model.modelMatrix // 模型矩阵
  const tailPosition = Cesium.Matrix4.multiplyByPoint(
    modelMatrix,
    new Cesium.Cartesian3(0, -1, 0), // 相对模型中心的尾部偏移量
    new Cesium.Cartesian3(),
  )

  // 创建粒子系统
  const particleSystem = new Cesium.ParticleSystem({
    modelMatrix: Cesium.Matrix4.IDENTITY, // 使用世界坐标
    emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(15)), // 喷雾锥形角度
    startColor: Cesium.Color.WHITE.withAlpha(0.8), // 粒子起始颜色
    endColor: Cesium.Color.GRAY.withAlpha(0.1), // 粒子结束颜色
    startScale: 10000.0, // 粒子起始大小
    endScale: 3000000.0, // 粒子结束大小
    minimumParticleLife: 100.0, // 粒子最短寿命（秒）
    maximumParticleLife: 20000.0, // 粒子最长寿命（秒）
    minimumSpeed: 100.0, // 粒子最小速度
    maximumSpeed: 20000.0, // 粒子最大速度
    lifetime: 100, // 粒子系统的总生命周期，0 表示无限
    emitterModelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
      tailPosition,
      new Cesium.HeadingPitchRoll(0, 0, 0),
    ),
    sizeInMeters: true, // 粒子大小以米为单位
  })

  // 将粒子系统添加到场景中
  viewer.scene.primitives.add(particleSystem)

  // 动态更新粒子系统的位置（使其跟随飞机移动）
  viewer.scene.preUpdate.addEventListener(() => {
    Cesium.Matrix4.multiplyByPoint(
      model.modelMatrix,
      new Cesium.Cartesian3(0, -1, 0), // 飞机尾部的偏移
      tailPosition,
    )
    Cesium.Matrix4.fromTranslation(tailPosition, particleSystem.modelMatrix)
  })
}

const setMao = () => {
  const viewer = viewerStore.getViewer()

  // 添加裁剪平面
  const clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes: [
      // 定义一个裁剪平面，位置和方向由 Cartesian3 控制
      new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), 20.0), // 向下裁剪 20 米
    ],
    edgeWidth: 1.0, // 裁剪边缘宽度
    edgeColor: Cesium.Color.RED, // 裁剪边缘颜色
  })

  // 将裁剪平面应用到地形
  viewer.scene.globe.clippingPlanes = clippingPlanes

  // 如果需要动态调整平面位置
  const plane = clippingPlanes.get(0)
  viewer.scene.postRender.addEventListener(() => {
    plane.distance += 0.01 // 动态调整裁剪距离
  })
}

/**
 * 页面初始化逻辑
 */
nextTick(() => {
  // setMao()
  // addModel() // 添加模型到场景
  // 飞行到模型位置
  // new flyTo({ lon: -115.0, lat: 37.0, height: 40000 })
})

/**
 * 清理逻辑：页面卸载时调用
 */
onBeforeUnmount(() => {
  const setZoomInstance = new SetZoom()
  setZoomInstance.flyTo() // 假设 flyTo 方法实现了飞行回归逻辑
})
</script>
