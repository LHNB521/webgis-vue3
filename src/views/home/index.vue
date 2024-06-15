<template>
  <div class="home">
    <div class="title-box">
      <div class="title">基于Vue3全功gis项目</div>
      <div class="desc">cesium and all</div>
    </div>
    <Card w="300px" h="300px" bg="#fff" route="/cesium">
      <div class="card-content">cesium</div>
    </Card>
    <Card w="300px" h="300px" bg="#ccc" route="/openlayers">
      <div class="card-content">openlayers</div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/card/index.vue'
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  height: calc(100vh - 40px);
  padding: 20px;
  overflow: auto;
  background: #030914;
}

.title-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 40%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #fff;
  text-align: center;

  .title {
    font-size: 50px;
  }

  .desc {
    font-size: 40px;
  }
}
</style>
