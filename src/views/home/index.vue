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
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: #030914;
}

.title-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 40vh;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #fff;
  text-align: center;

  .title {
    font-size: clamp(1.5rem, 7vw, 3.5rem);
  }

  .desc {
    font-size: clamp(1rem, 7vw, 2.5rem);
  }
}

.box {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 40px;
  width: calc(100% - 60px);
  height: 55vh;
  margin: 0 30px;
}

@media screen and (width <= 768px) {
  .box {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 40px;
    justify-content: center;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
  font-size: 0.8rem;
  color: #fff;
}
</style>
