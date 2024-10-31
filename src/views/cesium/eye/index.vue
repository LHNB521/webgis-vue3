<script name="eye" setup lang="ts">
import addEye from '../utils/addEye'
nextTick(() => {
  new addEye()
})
</script>
<template>
  <div id="eye"></div>
</template>
<style lang="scss" scoped>
#eye {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 20%;
  height: 20%;
  border: solid blue 1px;
}
</style>
