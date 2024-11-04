<template>
  <div class="pointer"></div>
</template>

<script setup lang="ts">
interface Props {
  className: string
}

const props = defineProps<Props>()
// 鼠标经过元素时，指针跟随
function pointer() {
  const items: any = document.querySelectorAll(`.${props.className}`)
  const pointer: any = document.querySelector('.pointer')
  for (const i of items) {
    i.onmouseenter = () => {
      pointer.style.setProperty('--s', `${i.clientWidth}px`)
      pointer.style.setProperty('--x', `${i.offsetLeft}px`)
      pointer.style.setProperty('--y', `${i.offsetTop}px`)
    }
  }
}
onMounted(() => {
  pointer()
})
</script>

<style scoped lang="scss">
.pointer {
  --l: 30px; // 线的长度
  --t: 3px; // 线的粗细
  --g: 15px; //线与内容的距离
  --s: 300px; // 内容的尺寸
  --x: 0px; // 内容左上角x坐标
  --y: 0px; // 内容左上角y坐标

  position: absolute;
  top: calc(var(--y) - var(--g));
  left: calc(var(--x) - var(--g));
  width: calc(var(--s) + var(--g) * 2);
  height: calc(var(--s) + var(--g) * 2);
  pointer-events: none;
  cursor: pointer;
  border: var(--t) solid #fff;
  mask: conic-gradient(at var(--l) var(--l), transparent 75%, blue 75% 100%) 0 0 / calc(100% - var(--l))
    calc(100% - var(--l)) repeat;
  transition: 0.3s;
}
</style>
