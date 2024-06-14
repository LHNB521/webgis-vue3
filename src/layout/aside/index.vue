<template>
  <el-container class="aside">
    <el-header class="aside-header">LOGO</el-header>
    <el-main class="aside-main">
      <el-menu active-text-color="#ffd04b" background-color="transparent" text-color="#8A8C91">
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-main>
    <el-footer class="aside-footer">
      <el-button type="primary" size="mini">Button</el-button>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.aside {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #c0c0c0;
  background: #161a23;
  border-radius: 0 10px 10px 0;

  .aside-header {
    width: 100%;
    height: 72px;
    background: #2d2f39;
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
  }
}
</style>
