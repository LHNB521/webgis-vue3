<template>
  <div class="cesium-app">
    <el-button
      type="primary"
      class="drawer-button"
      :class="drawer ? 'drawer-button-move' : ''"
      @click="drawer = !drawer"
    >
      {{ drawer ? '关闭' : '菜单' }}
    </el-button>

    <div id="cesium"></div>
  </div>
  <div class="drawer-parent">
    <el-drawer v-model="drawer" class="drawer" :modal="false" :show-close="false" direction="ltr">
      <template #header>
        <div class="header"></div>
      </template>
      <span>Hi there!</span>
      <template #footer>
        <div class="footer"></div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium'
import { cesiumToken } from './config'
import { useViewerStore } from '@/store'

const viewerStore = useViewerStore()
const drawer = ref(false)

const init = () => {
  const viewer = new Cesium.Viewer('cesium', {
    infoBox: false,
    timeline: false, // 是否显示时间线控件
  })
  viewerStore.setViewer(viewer)
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
    width: 100%;
    height: 72px;
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
