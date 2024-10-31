<script setup lang="ts">
import { useViewerStore } from '@/store'
import * as Cesium from 'cesium'
const store = useViewerStore()

// 定义第一个卫星的轨道和第一个卫星的轨道位置（围绕指定地区旋转）
const satellite1 = () => {
  const { viewer } = store

  const satellite1Position = new Cesium.SampledPositionProperty()
  const startTime = Cesium.JulianDate.fromDate(new Date())
  const orbitDuration = Cesium.JulianDate.addSeconds(startTime, 600, new Cesium.JulianDate())
  for (let i = 0; i <= 360; i += 10) {
    const radians = Cesium.Math.toRadians(i)
    const time = Cesium.JulianDate.addSeconds(startTime, i * 10, new Cesium.JulianDate())
    const position = Cesium.Cartesian3.fromDegrees(
      120 + 0.1 * Math.cos(radians), // 根据需要调整经度、纬度
      30 + 0.1 * Math.sin(radians),
      500000, // 设置高度
    )
    satellite1Position.addSample(time, position)
  }
  // 创建第一个卫星实体
  const satellite1 = viewer.entities.add({
    position: satellite1Position,
    point: { pixelSize: 10, color: Cesium.Color.YELLOW },
    path: { show: true, width: 2, material: Cesium.Color.YELLOW },
  })

  // 启动时间
  viewer.clock.startTime = startTime
  viewer.clock.stopTime = orbitDuration
  viewer.clock.currentTime = startTime
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP
  viewer.clock.multiplier = 10
}
nextTick(() => {
  satellite1()
})
</script>
