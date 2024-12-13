import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import { Extent } from 'ol/extent'
import useStore from '../useStore'

interface GeoJsonOptions {
  geoJsonData: object
  style?: object // 可选，定义 GeoJSON 的样式
  layerName?: string // 可选，设置图层名称
}

export const useGeoJson = () => {
  const { getMap } = useStore()

  const loadGeoJson = (options: GeoJsonOptions) => {
    const { geoJsonData, style, layerName } = options
    const map = getMap()

    if (!map) {
      console.error('地图实例未初始化！')
      return
    }

    // 创建 GeoJSON 源
    const source = new VectorSource({
      features: new GeoJSON().readFeatures(geoJsonData, {
        featureProjection: map.getView().getProjection(),
      }),
    })

    // 创建图层并附加样式
    const vectorLayer = new VectorLayer({
      source,
      style: style || undefined,
    })

    // 设置图层名称（可选）
    if (layerName) {
      ;(vectorLayer as any).name = layerName
    }

    // 添加图层到地图
    map.addLayer(vectorLayer)

    // 调整视图到 GeoJSON 数据的范围
    const extent: Extent = source.getExtent()
    if (extent) {
      map.getView().fit(extent, { duration: 1000, padding: [20, 20, 20, 20] })
    }

    console.log('GeoJSON 数据加载完成并视图已调整')
  }

  return {
    loadGeoJson,
  }
}

export default useGeoJson
