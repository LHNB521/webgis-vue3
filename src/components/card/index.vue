<template>
  <el-card class="card" shadow="never" @click="handleRoter">
    <slot></slot>
  </el-card>
</template>

<script setup lang="ts">
import router from '@/router'

const props = defineProps({
  w: {
    type: String,
    default: '100px',
  },
  h: {
    type: String,
    default: '100px',
  },
  bg: {
    type: String,
    default: 'red',
  },
  route: {
    type: String,
    default: '',
  },
})
const handleRoter = () => {
  if (props.route) {
    router.push(props.route)
  }
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: v-bind(w) !important;
  height: v-bind(h) !important;
  font-size: 26px;
  cursor: pointer;
  background: v-bind(bg) !important;
  border: 0 solid !important;
}

// .card:hover {
//  background: hsl(from color h s l);
//  transform: scale(1.1);
// }

/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-card__body) {
  padding: 0;
}
</style>
