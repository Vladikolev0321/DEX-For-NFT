import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BuyView from '../views/BuyView.vue'
import SellView from '../views/SellView.vue'
import NftsView from '../views/NftsView.vue'

// set up routes tha my application needs: home, login, register, data, pipelines, models and their child routes
const routes = [
  // redirect url
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path: '/sell',
    component: SellView
  },
  {
    path: '/nfts',
    component: NftsView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
  // to - the going age properties,
  // from - page came from properties
  // savedPosition - saved scroll level of the left page 
  scrollBehavour(to, from, savedPosition) {
    // if saved position exists then jump to it in the next page
    if (savedPosition) {
      return savedPosition;
    }
    //else set default position on new page 
    return { left: 0, top: 0 };
  }
});


// Deni access to routes who need authentication if user didn't authenticate himself
// router.beforeEach(function (to, from, next) {
//   if (to.meta.needAuthentication && !store.getters.isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;