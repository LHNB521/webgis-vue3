import { useMapStore } from '@/store'

/**
 * 绑定地图点击事件处理函数
 * @param handler - 点击事件的处理函数。如果未提供，将使用默认处理函数打印事件对象
 */
export default function onMapClick(handler: (event: any) => void = (event) => console.log(event)): void {
  const { map } = useMapStore()

  // 确保 olMap 对象存在，并绑定点击事件
  if (map) {
    map.on('click', handler)
  } else {
    console.warn('olMap 实例未定义，无法绑定点击事件。')
  }
}
