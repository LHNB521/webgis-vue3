<template>
  <Layout>
    <div id="cesium"></div>
    <div id="eye"></div>
  </Layout>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium'
import { cesiumOptions, cesiumToken } from './utils/config'
import { useViewerStore } from '@/store'
import { skyBox, ImageryProviderOptions, handler } from './utils/settings'
import Layout from '@/layout/index.vue'

const viewerStore = useViewerStore()

// 初始化3D地球
const init = () => {
  const viewer = new Cesium.Viewer('cesium', {
    ...cesiumOptions,
  }) as any

  // 去除logo
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  // 显示帧率
  viewer.scene.debugShowFramesPerSecond = true
  viewer.scene.globe.depthTestAgainstTerrain = true

  // 外天空盒
  viewer.scene.skyBox = new Cesium.SkyBox(skyBox)

  // 天地图影像
  viewer.imageryLayers.removeAll()
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider(ImageryProviderOptions))

  viewerStore.viewer = viewer

  //1.创建双球
  const viewer1 = new Cesium.Viewer('eye', {
    ...cesiumOptions,
  }) as any
  // 天地图影像
  viewer1.imageryLayers.removeAll()
  viewer1.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider(ImageryProviderOptions))
  // 去除logo
  viewer1.cesiumWidget.creditContainer.style.display = 'none'
  //2.设置鹰眼图中球属性
  let control = viewer1.scene.screenSpaceCameraController
  control.enableRotate = false
  control.enableTranslate = false
  control.enableZoom = false
  control.enableTilt = false
  control.enableLook = false
  let syncViewer = function () {
    viewer1.camera.flyTo({
      destination: viewer.camera.position,
      orientation: {
        heading: viewer.camera.heading,
        pitch: viewer.camera.pitch,
        roll: viewer.camera.roll,
      },
      duration: 0.0,
    })
  }

  //3.同步
  viewer.camera.changed.addEventListener(syncViewer)
  viewer.scene.preRender.addEventListener(syncViewer)

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(0, 0),
    label: {
      text: new Cesium.CallbackProperty(function () {
        syncViewer()
        return ''
      }, true),
    },
  })

  handler()
}
onMounted(() => {
  Cesium.Ion.defaultAccessToken = cesiumToken
  init()
})
</script>

<style scoped lang="scss">
#cesium {
  position: relative;
  width: 100%;
  height: 100vh;
}

#eye {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 20%;
  height: 20%;
  background: red;
  border: solid blue 1px;
}
</style>
