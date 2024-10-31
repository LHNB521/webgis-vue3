import { defineStore } from 'pinia'

// 定义store模块
export const useViewerStore = defineStore('viewer', () => {
  const viewer = ref(null)
  const setViewer = (v: any) => {
    viewer.value = v
  }
  const getViewer = () => {
    return viewer.value
  }
  const clearViewer = () => {
    viewer.value = null
  }
  return {
    viewer,
    setViewer,
    clearViewer,
    getViewer,
  }
})
