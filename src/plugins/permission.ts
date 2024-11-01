import router from '@/router'
import { useAppStore } from '@/store'
// 白名单路由
export function setupPermission() {
  router.beforeEach(async (to, _from, next) => {
    const appStore = useAppStore()

    if (to.fullPath === '/cesium' || to.fullPath === '/openlayers') {
      appStore.setLoading(true)
    }

    next()
  })

  router.afterEach(() => {
    const appStore = useAppStore()
    appStore.setLoading(false)
  })
}
