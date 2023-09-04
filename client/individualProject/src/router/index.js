import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import TourPage from '../views/TourPage.vue'
import TourDetail from '../views/TourDetail.vue'
import CartPage from '../views/CartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'TourPage',
          component: TourPage
        },
        {
          path: 'tourdetail/:id',
          name: 'TourDetail',
          component: TourDetail
        },
        {
          path: 'cart',
          name: 'CartPage',
          component: CartPage
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)

  if (to.name == 'CartPage' && !localStorage.getItem("access_token")) {
    next({ name: 'TourPage' })
  } else if ((to.name === 'LoginPage' || to.name === 'RegisterPage') && localStorage.getItem("access_token")) {
    next({ name: 'TourPage' })
  } else {
    next()
  }
})

export default router
