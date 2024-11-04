import { defineStore } from 'pinia'
import { Viewer } from 'cesium'

export type CesiumViewer = {
  viewer: Viewer
  // 这里可以添加更多属性和方法，以符合你项目中Viewer的使用情况
}
// 定义store模块
export const useViewerStore = defineStore('viewer', () => {
  const viewer = ref<CesiumViewer['viewer']>()
  const setViewer = (v: CesiumViewer['viewer']) => {
    viewer.value = v
  }
  const getViewer = (): CesiumViewer['viewer'] => {
    if (!viewer.value) {
      throw new Error('Viewer is not initialized')
    }
    return viewer.value
  }
  return {
    viewer,
    setViewer,
    getViewer,
  }
})
