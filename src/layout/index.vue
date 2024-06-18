<template>
  <el-container class="layout">
    <el-aside class="layout-aside" width="300px">
      <Aside />
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
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
</style>
