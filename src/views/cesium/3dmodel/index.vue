<template>
  <div></div>
</template>

<script setup lang="ts">
import flyTo from '../utils/flyTo'
import SetZoom from '../utils/setZoom'

nextTick(() => {
  new flyTo()
})
onBeforeUnmount(() => {
  new SetZoom().flyTo()
})
</script>
