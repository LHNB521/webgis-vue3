<template>
  <Layout>
    <div id="openlayers" ref="openLayersRef"></div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue'
import olMap from '@/utils/openLayers'

const openLayersRef = ref<HTMLElement>()

onMounted(() => {
  new olMap({
    domId: openLayersRef.value,
  })
})
</script>
<style lang="scss" scoped>
#openlayers {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
