<template>
  <Layout>
    <div id="cesium"></div>
    <keep-alive :max="10">
      <router-view></router-view>
    </keep-alive>
  </Layout>
</template>

<script setup lang="ts">
import initMap from './utils/index'
import onMap from './utils/onMap'
import Layout from '@/layout/index.vue'

onMounted(() => {
  new initMap({
    id: 'cesium',
  })
  new onMap()
})
</script>

<style scoped lang="scss">
#cesium {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
