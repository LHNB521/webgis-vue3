import { Router, createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
