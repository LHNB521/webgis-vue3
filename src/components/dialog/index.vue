<template>
  <div v-if="visible" class="modal-overlay" @click="handleClose">
    <div class="modal-content" @click.stop>
      <header class="modal-header">
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
        <button @click="handleClose">X</button>
      </header>
      <main class="modal-body">
        <slot />
      </main>
      <footer class="modal-footer">
        <slot name="footer">
          <button @click="handleClose">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'BaseModal',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (newVal) => {
        visible.value = newVal
      },
    )

    const handleClose = () => {
      emit('update:modelValue', false)
    }

    return {
      visible,
      handleClose,
    }
  },
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 50%);
}

.modal-content {
  width: 400px;
  max-width: 80%;
  padding: 1rem;
  background-color: white;
  border-radius: 5px;
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
