<script setup lang="ts">
import Satellite from '../utils/satellite'
const map = ref()
nextTick(() => {
  map.value = new Satellite()
})
onBeforeUnmount(() => {
  map.value.remove()
})
</script>
