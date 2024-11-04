<template>
  <div class="home">
    <div class="title-box">
      <div class="title">基于Vue3全功gis项目</div>
      <div class="desc">cesium and all</div>
    </div>
    <div class="box">
      <Ponint class-name="item" />
      <Card class="item" w="300px" h="300px" bg="#fff" route="/cesium">
        <div class="card-content">cesium</div>
      </Card>
      <Card class="item" w="300px" h="300px" bg="#fff" route="/openlayers">
        <div class="card-content">openlayers</div>
      </Card>
    </div>
    <a href="https://beian.miit.gov.cn/#/" target="_blank" class="footer"> ICP主体备案号: 豫ICP备2021007222号 </a>
  </div>
</template>
<script setup lang="ts">
import Card from '@/components/card/index.vue'
import Ponint from '@/components/point/index.vue'
</script>
<style lang="scss" scoped>
.home {
  position: relative;
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

.box {
  position: relative;
  display: flex;
  flex-flow: row wrap;
  gap: 40px;
}

.footer {
  position: absolute;
  bottom: 10px;
  font-size: 11px;
  color: #fff;
}
</style>
