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
        }
      ]
    }
  ]
})
