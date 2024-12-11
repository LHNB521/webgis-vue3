import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { Map } from '@/utils/openLayers/config/import'

export const useOlStore = defineStore('map', () => {
  const map = shallowRef() // 地图对象
  // 设置地图
  const setMap = (v: Map) => {
    map.value = v
  }
  const getMap = (): Map => {
    return map.value
  }

  return {
    setMap,
    getMap,
  }
})
