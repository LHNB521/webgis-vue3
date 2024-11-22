import { defineStore } from 'pinia'
import CesiumMap from '@/utils/cesium/CesiumMap'

// 定义store模块
export const useCesiumMapStore = defineStore('viewer', () => {
  const cesiumMap = ref<CesiumMap | null>()
  const setCesiumMap = (map: CesiumMap) => {
    if (!cesiumMap.value) {
      cesiumMap.value = map
    }
  }
  const destroyMap = () => {
    cesiumMap.value?.destroy()
    cesiumMap.value = null
  }

  const getCesiumMap = (): CesiumMap => {
    if (!cesiumMap.value) {
      throw new Error('CesiumMap is not initialized')
    }
    return cesiumMap.value
  }

  return {
    setCesiumMap,
    destroyMap,
    cesiumMap,
    getCesiumMap,
  }
})
