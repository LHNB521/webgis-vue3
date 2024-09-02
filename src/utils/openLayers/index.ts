import 'ol/ol.css'
import { View, defaults, Map } from './import.ts'
import { createTileLayer } from './createLayers.ts'

export * from './mapOn.ts'

interface propIC {
  domId: HTMLElement | undefined
}

export default class olMap {
  domId: HTMLElement | undefined
  /**
   * 构造函数，接收一个包含地图容器 DOM 元素的属性对象
   * @param props - 包含地图容器 DOM 元素的属性对象
   */
  constructor(props: propIC) {
    this.domId = props.domId // 保存传入的 DOM 元素
  }
  /**
   * 初始化地图
   * @returns Map - 返回初始化后的 OpenLayers 地图对象
   */
  initMap() {
    // 创建 WMTS 图层
    const tdtLayer = createTileLayer()

    // 创建视图，并设置初始投影、中心点和缩放级别
    const viewer = new View({
      projection: 'EPSG:4326',
      center: [120.42, 30.85],
      zoom: 11.5,
      minZoom: 7,
      maxZoom: 18,
    })

    // 初始化 OpenLayers 地图对象
    const map = new Map({
      target: this.domId, // 指定地图容器的 DOM 元素
      controls: defaults({
        attribution: false, // 禁用属性控制
        rotate: false, // 禁用旋转控制
        zoom: false, // 禁用缩放控制
      }),
      layers: [tdtLayer], // 添加 WMTS 图层
      view: viewer, // 设置地图视图
    })
    return map // 返回地图对象
  }
}
