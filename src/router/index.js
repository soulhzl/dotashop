import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue'),
    children: [{
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    }, {
      path: '/category',
      name: 'category',
      component: () => import('../views/Category.vue'),
    }, {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue'),
    }, {
      path: '/member',
      name: 'member',
      component: () => import('../views/Member.vue'),
    }]
  }, {
    path: '/login',
    name: 'login',
    component: () =>
      import('../views/Login.vue')
  }, {
    path: '/goodsmess',
    name: 'goodsmess',
    component: () =>
      import('../views/GoodsMess.vue')
  }, {
    path: '/categorypage',
    name: 'categorypage',
    component: () =>
      import('../views/CategoryPage.vue')
  }, {
    path: '/address',
    name: 'address',
    component: () =>
      import('../views/Address.vue')
  }, {
    path: '/addaddress',
    name: 'addaddress',
    component: () =>
      import('../views/AddAddress.vue')
  }, {
    path: '/setting',
    name: 'setting',
    component: () =>
      import('../views/Setting.vue')
  }, {
    path: '/order',
    name: 'order',
    component: () =>
      import('../views/Order.vue')
  }, {
    path: '/ticket',
    name: 'ticket',
    component: () =>
      import('../views/Ticket.vue')
  }, {
    path: '*',
    name: 'notfound',
    component: () =>
      import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
