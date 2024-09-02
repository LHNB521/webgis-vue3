<template>
  <Layout>
    <div id="openlayers" ref="openLayersRef"></div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue'
import olMap from '@/utils/openLayers'
import { useMapStore } from '@/store'
import onMapClick from '@/utils/openLayers/mapOn'

const openLayersRef = ref<HTMLElement>()
const mapStore = useMapStore()

onMounted(() => {
  const map = new olMap({
    domId: openLayersRef.value,
  }).initMap()

  mapStore.setMap(map)
  onMapClick(() => console.log('----'))
})
</script>
<style lang="scss" scoped>
#openlayers {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
