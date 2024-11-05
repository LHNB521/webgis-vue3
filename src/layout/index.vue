<template>
  <el-container class="layout">
    <el-aside class="layout-aside">
      <Aside />
    </el-aside>
    <el-container>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import Aside from './aside/index.vue'
</script>
<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100vh;
}

.layout-aside {
  width: 300px;
  height: 100vh;
}

@media screen and (width <= 768px) {
  .layout-aside {
    width: 100px;
  }
}
</style>
