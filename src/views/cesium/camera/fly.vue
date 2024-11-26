<script setup lang="ts">
import { useCesiumMapStore } from '@/store'
import { ViewOperations } from '@/utils/cesium/index'
const cesiumMap = useCesiumMapStore()

let view: any
nextTick(() => {
  view = new ViewOperations(cesiumMap.getViewer())
})
onBeforeUnmount(() => {})

const show = () => {
  view.flyTo([113.945, 22.546, 500000])
}
const hide = () => {
  view.resetView()
}
</script>
<template>
  <Operation @show="show" @hide="hide" />
</template>
