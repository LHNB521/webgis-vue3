<template>
  <div></div>
</template>

<script setup lang="ts">
import flyTo from '../../utils/flyTo'
import SetZoom from '../../utils/setZoom'
import AddPoint from '../../utils/addPonit'
// 坐标列表
const coordinates = [
  { lon: 116.39125, lat: 39.9075, name: '天安门', description: '这是天安门。' },
  { lon: 121.4737, lat: 31.2304, name: '上海', description: '这是上海。' },
  { lon: 114.3055, lat: 30.5928, name: '武汉', description: '这是武汉。' },
]
let a

nextTick(() => {
  new flyTo({ lon: 116.39125, lat: 39.9075, height: 40000 })
  a = new AddPoint({ list: coordinates })
  // a.entieiesAdd()
  a.addPrimitives()
  // a.addCustomDataSource()
})
onBeforeUnmount(() => {
  a.clearPrimitives()
  new SetZoom().flyTo()
})
</script>
