import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path:'',
          component:Login
        }
      ]
    },
    {
      path: '/app',
      component: () => import(/* webpackChunkName: "main" */ '@/views/Main.vue'),
      children:[
        {
          path:'',
          name:'Dashboard',
          component: () => import(/* webpackChunkName: "dash" */ '@/views/app/Dashboard.vue'),
        },
        {
          path:'taxpayer',
          name:'Tax Payers',
          component: () => import(/* webpackChunkName: "tax" */ '@/views/app/Taxpayers.vue'),
        },
        {
          path:'tax',
          name:'Tax Returns',
          component: () => import(/* webpackChunkName: "tax" */ '@/views/app/TaxReturns.vue'),
        },
        {
          path:'pay',
          name:'Payments',
          component: () => import(/* webpackChunkName: "dash" */ '@/views/app/Payments.vue'),
        },
        {
          path:'user',
          name:'User Profile',
          component: () => import(/* webpackChunkName: "dash" */ '@/views/app/User.vue'),
        },
        {
          path:'security',
          name:'Security Settings',
          component: () => import(/* webpackChunkName: "dash" */ '@/views/app/Security.vue'),
        }
      ]
    }
  ]
})
