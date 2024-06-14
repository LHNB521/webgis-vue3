<template>
  <div class="cesium-app">
    <!-- <el-button
      type="primary"
      class="drawer-button"
      :class="drawer ? 'drawer-button-move' : ''"
      @click="drawer = !drawer"
    >
      {{ drawer ? '关闭' : '菜单' }}
    </el-button> -->

    <div id="cesium"></div>
  </div>
  <div class="drawer-parent">
    <el-drawer v-model="drawer" class="drawer" :modal="false" :show-close="false" direction="ltr">
      <template #header>
        <div class="header">LOGO</div>
      </template>
      <div>Hi there!</div>
      <template #footer>
        <div class="footer"></div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium'
import { cesiumOptions, cesiumToken } from './config'
import { useViewerStore } from '@/store'
import { skyBox, ImageryProviderOptions, handler } from './settings'

const viewerStore = useViewerStore()
const drawer = ref(false)

// 初始化3D地球
const init = () => {
  const viewer = new Cesium.Viewer('cesium', {
    ...cesiumOptions,
  }) as any

  viewerStore.viewer = viewer
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

  handler()
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

.drawer-button {
  position: fixed;
  z-index: 10;
}

.drawer-button-move {
  animation-name: move-right-left;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

@keyframes move-right-left {
  from {
    left: 0;
  }

  to {
    left: 300px;
  }
}

.drawer-parent {
  :deep(div) {
    width: 300px !important;
  }

  :deep(.el-drawer) {
    width: 300px !important;
    color: #fff;
    background: #161a23;
    border-right: #5c5f65 1px solid;
    border-radius: 10px;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__body) {
    padding: 0 !important;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__header) {
    padding: 0 !important;
    margin-bottom: 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 72px;
    color: #fff;
    background: #2d2f39;
    border-bottom: #5c5f65 1px solid;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-drawer__footer) {
    padding: 0 !important;
    margin-bottom: 0;
  }

  .footer {
    width: 100%;
    height: 88px;
    background: #2d2f39;
    border-top: #5c5f65 1px solid;
  }
}
</style>
