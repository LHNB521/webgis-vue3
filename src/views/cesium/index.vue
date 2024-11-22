<template>
  <Layout>
    <div id="cesium-container" class="cesium-container"></div>
    <keep-alive :max="10">
      <router-view></router-view>
    </keep-alive>
  </Layout>
</template>

<script setup lang="ts">
import CesiumMap from '@/utils/cesium/CesiumMap'
import Layout from '@/layout/index.vue'
import { useCesiumMapStore } from '@/store'

const { setCesiumMap } = useCesiumMapStore()

onMounted(() => {
  // 单例模式
  const cesiumMap = CesiumMap.getInstance('cesium-container')
  // 状态管理
  setCesiumMap(cesiumMap)

  // // 添加点
  // cesiumMap.points.addPoint([116.391, 39.907], 'Beijing')

  // cesiumMap.views.flyTo([116.391, 39.907, 10000])
})
onUnmounted(() => {
  // 仅在完全销毁时销毁实例
  CesiumMap.getInstance().destroy()
})
</script>

<style scoped lang="scss">
.cesium-container {
  width: 100%;
  height: 100vh;
}
</style>
