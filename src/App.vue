<template>
  <el-config-provider :locale="locale" :size="size">
    <Loading v-if="appStore.isLoading" />
    <router-view v-else />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { SizeEnum } from '@/enums/SizeEnum'
import Loading from '@/components/loading/index.vue'

const appStore = useAppStore()
const locale = computed(() => appStore.locale)
const size = computed(() => appStore.size as SizeEnum)
</script>
