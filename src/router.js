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
  routes: [
    {
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
      path: '/app',
      name: 'Secured',
      beforeEnter: isAuthenticated,
      component: Home,
      children: [{
        // Testing purpose
        path: '',
        name: 'Logout',
        component: () => import('./views/secured/logout.vue')
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
