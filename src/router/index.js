
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import login from '@/views/login.vue';
import home from '@/views/home.vue';
import product from '@/views/product.vue';
// import { useAuthStore } from '@/store/auth';

const routes = [
  { path: '/', component: home },
  { path: '/iniciar-sesion', component: login },
  { path: '/inicio', component: home },
  { path: '/producto', component: product }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   authStore.loadUser();

//   if (to.path !== '/iniciar-sesion' && !authStore.user) {
//     next('/iniciar-sesion');
//   } else {
//     if (routes.includes(to.path)) {
//       next();
//     }
//     else {
//       next('/inicio');
//     }
//   }
// });

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
