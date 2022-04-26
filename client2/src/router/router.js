import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SellView from '../views/SellView.vue';
import NftsView from '../views/NftsView.vue';

const routes = [
  // redirect url
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path: '/sell',
    component: SellView,
  },
  {
    path: '/nfts',
    component: NftsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavour(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

export default router;
