import { defineStore } from 'pinia'
import CesiumMap from '@/utils/cesium/CesiumMap'
import * as Cesium from 'cesium'

// 定义store模块
export const useCesiumMapStore = defineStore('viewer', () => {
  const cesiumMap = ref<CesiumMap | null>()
  const viewer = ref<Cesium.Viewer>()
  const setCesiumMap = (map: CesiumMap) => {
    if (!cesiumMap.value) {
      cesiumMap.value = map
    }
  }

  const getCesiumMap = (): CesiumMap => {
    if (!cesiumMap.value) {
      throw new Error('CesiumMap is not initialized')
    }
    return cesiumMap.value
  }

  const setViewer = (v: Cesium.Viewer) => {
    if (!viewer.value) {
      viewer.value = v
    }
  }
  const getViewer = (): Cesium.Viewer => {
    if (!viewer.value) {
      throw new Error('Cesium.Viewer is not initialized')
    }
    return viewer.value
  }

  return {
    setCesiumMap,
    cesiumMap,
    getCesiumMap,
    setViewer,
    getViewer,
  }
})
