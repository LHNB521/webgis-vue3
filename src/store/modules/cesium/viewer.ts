import { defineStore } from 'pinia'

// 定义store模块
export const useViewerStore = defineStore('viewer', {
  state: () => ({
    viewer: null as any,
  }),
  actions: {
    async setViewer(e: any) {
      this.viewer = e
    },
  },
})
