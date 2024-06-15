<template>
  <el-container class="aside">
    <el-header class="aside-header">LOGO</el-header>
    <el-main class="aside-main" :default-openeds="defaultOpenArr">
      <el-menu active-text-color="#ffd04b" background-color="transparent" text-color="#8A8C91">
        <el-sub-menu v-for="item in cesiumRoutes" :key="item.path" :index="item.path">
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-if="item.children">
            <el-menu-item
              v-for="childrenItem in item.children"
              :key="childrenItem.path"
              :index="childrenItem.path"
              @click="linkTo(childrenItem.path)"
            >
              {{ childrenItem.meta.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </el-main>
    <el-footer class="aside-footer">
      <el-button type="primary">Button</el-button>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import router from '@/router'
import { cesiumRoutes } from '@/router/routes'

const defaultOpenArr = cesiumRoutes.map((item: any) => item.path)

const linkTo = (path: any) => {
  router.push({ path })
}
</script>

<style scoped lang="scss">
.aside {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #c0c0c0;
  background: #161a23;
  border-right: #5c5f65 1px solid;

  .aside-header {
    width: 100%;
    height: 72px;
    background: #2d2f39;
    border-bottom: #5c5f65 1px solid;
  }

  .aside-main {
    width: 100%;
    height: 100%;
    padding: 24px 10px !important;

    :deep(.el-menu) {
      border-right: 0 solid;
    }

    :deep(.el-menu-item.is-active) {
      color: #c0c0c0;
      background: #2d2f39;
      border-radius: 10px;
    }
  }

  .aside-footer {
    width: 100%;
    height: 88px;
    background: #2d2f39;
    border-top: #5c5f65 1px solid;
  }
}
</style>
