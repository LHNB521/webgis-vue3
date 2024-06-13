import { defineStore } from 'pinia'

export const useViewerStore = defineStore('viewer', () => {
  // 初始化cesium viewer
  const viewer = ref<any>(null)

  function setViewer(viewer: any) {
    viewer.value = viewer
  }

  return { viewer, setViewer }
})
