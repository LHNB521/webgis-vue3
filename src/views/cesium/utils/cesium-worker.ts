// import { useViewerStore } from '@/store'

// const viewerStore = useViewerStore()

self.onmessage = (event: any) => {
  const { type, payload } = event.data
  console.log(type)
  // 示例：在Worker中使用cesium加载一些数据
  switch (type) {
    case 'addEntity':
      addEntity(payload)
      break
    default:
      console.error(`Unknown message type: ${type}`)
  }
}
function addEntity(payload: any) {
  console.log(payload)
  // const entity = viewerStore.viewer.value.entities.add(payload)
  // postMessage({ type: 'entityAdded', entity })
}
