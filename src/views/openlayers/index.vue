<template>
  <Layout>
    <div id="openlayers"></div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { useMap } from '@/utils/openLayers'

const map = useMap({})

map.init()

onMounted(() => {
  map.setTarget('openlayers')
})
</script>
<style lang="scss" scoped>
#openlayers {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
