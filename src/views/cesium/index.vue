<template>
  <div class="cesium-app">
    <div id="cesium"></div>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium'

import { cesiumToken } from './config'

const init = () => {
  const viewer = new Cesium.Viewer('cesium', {
    infoBox: false,
    timeline: false, // 是否显示时间线控件
  })
  console.log(viewer)
}
onMounted(() => {
  Cesium.Ion.defaultAccessToken = cesiumToken
  init()
})
</script>

<style scoped lang="scss">
.cesium-app {
  position: relative;
  width: 100%;
  height: 100vh;
}

#cesium {
  position: absolute;
  inset: 0;
}
</style>
