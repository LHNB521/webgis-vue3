<script setup lang="ts">
import flyTo from '../utils/flyTo'

nextTick(() => {
  new flyTo()
})
onBeforeUnmount(() => {
  // viewerStore.getViewer().destroy()
})
</script>
