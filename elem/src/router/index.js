import Vue from 'vue'
import Seller from '../components/seller/seller'
import Goods from '../components/goods/goods'
import Rating from '../components/rating/rating'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {path: '/seller', component: Seller},
    {path: '/goods', component: Goods},
    {path: '/rating', component: Rating},
    {path: '*', redirect: '/goods'}
  ]

})
