import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

function isAuthenticated(to, from, next) {
  const is_authenticated = store.state.account_session.is_authenticated && store.state.account_session.token;
  if (to.matched[0].name === "Home")
    next(is_authenticated ? "/app" : true)
  else if (to.matched[0].name === "Secured")
    next(is_authenticated ? true : "/")

}

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: '',
        name: "Login",
        beforeEnter: isAuthenticated,
        component: () => import('./views/Login.vue')
      }, {
        path: 'confirmation/:code',
        name: "Confirmation",
        component: () => import('./views/confirmation/Confirmation.vue')
      }, {
        path: 'confirmation/facebook/:code',
        name: "Facebook",
        component: () => import('./views/confirmation/Facebook.vue')
      }, {
        path: 'confirmation/google/:code',
        name: "Google",
        component: () => import('./views/confirmation/Google.vue')
      }]
    },
    {
      path: '/app/test',
      name: 'Secured',
      // Testing purpose
      component: () => import('./components/forms/1601e/Form1601eDisplay.vue')
    },
    {
      path: '/app',
      component: () => import( /* webpackChunkName: "main" */ '@/views/Main.vue'),
      children: [{
          path: '',
          name: 'Dashboard',
          component: () => import( /* webpackChunkName: "dash" */ '@/views/app/Dashboard.vue'),
        },
        {
          path: 'taxpayer',
          name: 'Taxpayers',
          component: () => import( /* webpackChunkName: "tax" */ '@/views/app/Taxpayers.vue'),
        },
        {
          path: 'taxpayer/new',
          name: 'Create New Taxpayer',
          component: () => import( /* webpackChunkName: "tax" */ '@/views/app/CreateTaxpayer.vue'),
        },
        {
          path: 'taxpayer/upload',
          name: 'Upload Taxpayers',
          component: () => import( /* webpackChunkName: "tax" */ '@/views/app/UploadTaxpayers.vue'),
        },
        {
          path: 'taxpayer/search',
          name: 'Search Taxpayer',
          component: () => import( /* webpackChunkName: "tax" */ '@/views/app/SearchTaxpayer.vue'),
        },
        {
          path: 'tax',
          name: 'Tax Returns',
          component: () => import( /* webpackChunkName: "tax" */ '@/views/app/TaxReturns.vue'),
        },
        {
          path: 'tax/form',
          name: "Tax Form",
          component: () => import('@/views/app/forms/FormPage.vue'),
          children: [
          {
            path: '2550m',
            name: 'Form 2550m',
            component: () => import(/* webpackChunkName: "tax" */ '@/views/app/forms/2550m/2550m.vue'),
          },
          {
            path:'1601e',
            name:'Form 1601e',
            component: () => import(/* webpackChunkName: "tax" */ '@/views/app/forms/1601e/1601e.vue')
        }]
        },
        {
          path: 'pay',
          name: 'Payments',
          component: () => import(/* webpackChunkName: "dash" */ '@/views/app/Payments.vue'),
        },
        {
          path: 'user',
          name: 'User Profile',
          component: () => import( /* webpackChunkName: "dash" */ '@/views/app/User.vue'),
        },
        {
          path: 'security',
          name: 'Security Settings',
          component: () => import( /* webpackChunkName: "dash" */ '@/views/app/Security.vue'),
        }
      ]
    },
    {
      path: '/2550m',
      name: 'Form 2550m',
      component: () => import(/* webpackChunkName: "tax" */ '@/views/app/forms/2550m/2550m.vue'),
    },
    {
      path:'/1601e',
      name:'Form 1601e',
      component: () => import(/* webpackChunkName: "tax" */ '@/views/app/forms/1601e/1601e.vue')
    }
  ]
})