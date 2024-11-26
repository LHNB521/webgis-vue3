<template>
  <div class="operation">
    <el-button @click="show">{{ showName }}</el-button>
    <el-button @click="hide">{{ hideName }}</el-button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showName: {
    type: String,
    default: '显示',
  },
  hideName: {
    type: String,
    default: '隐藏',
  },
})

const emit = defineEmits(['show', 'hide'])
const show = () => {
  emit('show')
}
const hide = () => {
  emit('hide')
}
</script>

<style lang="scss" scoped>
.operation {
  position: absolute;
  top: 0;
  z-index: 10;
}
</style>
