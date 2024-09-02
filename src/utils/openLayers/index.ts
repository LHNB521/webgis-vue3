import 'ol/ol.css'
import { Map } from 'ol'
import { View, defaults } from './import.ts'
import { createTileLayer } from './createLayers.ts'

interface propIC {
  domId: HTMLElement | undefined
}

export default class olMap {
  domId: HTMLElement | undefined
  constructor(props: propIC) {
    this.domId = props.domId
    if (this.domId) {
      this.initMap()
    }
  }
  // 初始化地图
  initMap() {
    const tdtLayer = createTileLayer()
    console.log(this.domId)
    const viewer = new View({
      projection: 'EPSG:4326',
      center: [120.42, 30.85],
      zoom: 11.5,
      minZoom: 7,
      maxZoom: 18,
    })
    const map = new Map({
      target: this.domId,
      controls: defaults({
        attribution: false,
        rotate: false,
        zoom: false,
      }),
      layers: [tdtLayer],
      view: viewer,
    })
    return map
  }
}
