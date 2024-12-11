import { View, defaults, Map } from '../config/import'
import uselayers from './useLayers'
import useStore from '../useStore'

interface Optinos {
  el?: string
  center?: number[]
  zoom?: number
  minZoom?: number
  maxZoom?: number
  projection?: string
  loading?: boolean
}
export const useMap = (options: Optinos) => {
  const { setMap, getMap } = useStore()
  const init = () => {
    const { el, center = [116.4, 39.92], zoom = 13, minZoom = 7, maxZoom = 18, projection = 'EPSG:4326' } = options
    const view = new View({
      projection,
      center,
      zoom,
      minZoom,
      maxZoom,
    })
    const map = new Map({
      target: el || undefined,
      controls: defaults({
        attribution: false, // 禁用属性控制
        rotate: false, // 禁用旋转控制
        zoom: false, // 禁用缩放控制
      }),
      view,
    })
    setMap(map)
    setLayer(map)
  }

  const setTarget = (id: string) => {
    const map = getMap()
    map.setTarget(id)
  }

  return {
    init,
    setTarget,
  }
}

const setLayer = (map: Map) => {
  const { createTdtLayer } = uselayers()
  requestAnimationFrame(() => {
    const layer = createTdtLayer()
    map.addLayer(layer)
  })
}
export default useMap
