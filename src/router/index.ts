import { createRouter, createWebHistory } from 'vue-router'
import Hotel from '../Hotel.vue'
import Login from '../Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/hotel',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/hotel',
      name: 'Hotel',
      component: Hotel,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

// 未登录用户不能访问房态看板；已登录用户访问登录页时直接进入看板。
router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return {
      name: 'Login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.requiresGuest && token) {
    return { name: 'Hotel' }
  }

  return true
})

export default router
