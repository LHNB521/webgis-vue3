<template>
  <div class="operation">
    <button @click="show">显示</button>
    <button @click="hide">隐藏</button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
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
