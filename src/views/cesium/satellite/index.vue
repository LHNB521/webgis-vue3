<script setup lang="ts">
import { Satellite } from '@/utils/cesium/index'
import { useCesiumMapStore } from '@/store'
const cesiumMapStore = useCesiumMapStore()
let satellite: Satellite
nextTick(() => {
  satellite = new Satellite(cesiumMapStore.getViewer())
})
onBeforeUnmount(() => {
  satellite.remove()
})
const show = () => {
  satellite.init()
}
const hide = () => {
  satellite.remove()
}
</script>
<template>
  <Operation @show="show" @hide="hide" />
</template>
