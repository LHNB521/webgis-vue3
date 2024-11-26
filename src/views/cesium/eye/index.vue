<script name="eye" setup lang="ts">
import { EyeViewerOperations } from '@/utils/cesium/index'
import { useCesiumMapStore } from '@/store'
import Operation from '@/components/operation/index.vue'

const { getCesiumMap, getViewer } = useCesiumMapStore()
const visible = ref(false)
let eyeViewer: any
nextTick(() => {
  eyeViewer = new EyeViewerOperations(getViewer())
})
const show = () => {
  visible.value = true
  eyeViewer.init('eye')
}
const hide = () => {
  visible.value = false
  eyeViewer.remove()
}
</script>
<template>
  <Operation @show="show" @hide="hide" />
  <div v-show="visible" id="eye"></div>
</template>
<style lang="scss" scoped>
#eye {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 20%;
  height: 20%;
  border: solid blue 1px;
}
</style>
