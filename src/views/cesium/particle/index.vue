<script setup lang="ts">
import flyTo from '../utils/flyTo'
import Particle from '../utils/particle'

nextTick(() => {
  new Particle()
  new flyTo({
    longitude: 120.36,
    latitude: 36.09,
    height: 400000,
  })
})
</script>
