import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

function isAuthenticated(to, from, next) {
  const status = store.state.account_session && store.state.account_session.account && store.state.account_session.account.status ? parseInt(store.state.account_session.account.status) : 0;
  const is_authenticated = store.state.account_session.is_authenticated && store.state.account_session.token && status > 0;
  console.log('to.matched[0].name :', to.matched[0].name);
  if (to.matched[0].name === "Home")
    next(is_authenticated && status > 0 ? (status === 1 ? "/app/setup" : "/app") : true);
  else if (to.matched[1].name === "Setup")
    next(is_authenticated && status === 1 ? true : '/');
  else if (to.matched[0].name === "Secured")
    next(is_authenticated && status > 0 ? (status === 1 ? "/app/setup" : true) : "/");
  //  next("/")
}

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
    children: [{
      path: '',
      name: "Login",
      beforeEnter: isAuthenticated,
      component: () => import('./views/Login.vue')
    }]
  },
  {
    path: '/app',
    name: 'Secured',
    component: () => import( /* webpackChunkName: "main" */ '@/views/Main.vue'),
    children: [{
      path: '',
      name: 'Dashboard',
      beforeEnter: isAuthenticated,
      component: () => import( /* webpackChunkName: "dash" */ '@/views/app/Dashboard.vue'),
    },
    {
      path: 'setup',
      name: 'Setup',
      beforeEnter: isAuthenticated,
      component: () => import( /* webpackChunkName: "dash" */ '@/views/setup/Setup.vue'),
    },
    {
      path: 'taxpayer',
      name: 'Taxpayers',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/Taxpayers.vue'),
    },
    {
      path: 'taxpayer/network',
      name: 'Taxpayer Network',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/Network.vue'),
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
    // {
    //   path: '/tax/form',
    //   name: "Tax Form",
    //   component: () => import('@/views/app/forms/FormPage.vue'),
    //   children: [{
    //       name: 'Dashboard',
    //       // beforeEnter: isAuthenticated,
    //       component: () => import( /* webpackChunkName: "dash" */ '@/views/app/Dashboard.vue'),
    //     },
    //     {
    //       path: 'setup',
    //       name: 'Setup',
    //       // beforeEnter: isAuthenticated,
    //       component: () => import( /* webpackChunkName: "dash" */ '@/views/setup/Setup.vue'),
    //     },
    //     {
    //       path: 'taxpayer',
    //       name: 'Taxpayers',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/Taxpayers.vue'),
    //     },
    //     {
    //       path: 'taxpayer/network',
    //       name: 'Taxpayer Network',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/Network.vue'),
    //     },
    //     {
    //       path: 'taxpayer/new',
    //       name: 'Create New Taxpayer',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/CreateTaxpayer.vue'),
    //     },
    //     {
    //       path: 'taxpayer/upload',
    //       name: 'Upload Taxpayers',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/UploadTaxpayers.vue'),
    //     },
    //     {
    //       path: 'taxpayer/search',
    //       name: 'Search Taxpayer',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/SearchTaxpayer.vue'),
    //     },
    //     {
    //       path: 'tax',
    //       name: 'Tax Returns',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/TaxReturns.vue'),
    //     },
    // {
    //   path: 'tax/form',
    //   name: "Tax Form",
    //   component: () => import('@/views/app/forms/FormPage.vue'),
    //   children: [{
    //       path: '2550m',
    //       name: 'Form 2550m',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2550m/2550m.vue'),
    //     },
    //     {
    //       path: '1601e',
    //       name: 'Form 1601e',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601e/1601e.vue')
    //     },
    //     {
    //       path: '1701q',
    //       name: 'Form 1701q',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1701q/1701q.vue')
    //     },
    //     {
    //       path: '2551q',
    //       name: 'Form 2551q',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2551q/2551q.vue')
    //     },
    //     {
    //       path: '1700',
    //       name: 'Form 1700',
    //       component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1700/1700.vue')
    //     }
    //   ]
    // },
    //     {
    //       path: 'pay',
    //       name: 'Payments',
    //       component: () => import( /* webpackChunkName: "dash" */ '@/views/app/Payments.vue'),
    //     },
    //     {
    //       path: 'user',
    //       name: 'User Profile',
    //       component: () => import( /* webpackChunkName: "dash" */ '@/views/app/User.vue'),
    //     },
    //     {
    //       path: 'security',
    //       name: 'Security Settings',
    //       component: () => import( /* webpackChunkName: "dash" */ '@/views/app/Security.vue'),
    //     }
    //   ]
    // },
    {
      path: 'tax',
      name: 'Tax Returns',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/TaxReturns.vue'),
    },
    {
      path: 'tax/form',
      name: "Tax Form",
      component: () => import('@/views/app/forms/FormPage.vue'),
      children: [{
        path: '2550m',
        name: 'Form 2550m',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2550m/2550m.vue'),
      },
      {
        path: '1601e',
        name: 'Form 1601e',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601e/1601e.vue')
      },
      {
        path: '1601c',
        name: 'Form 1601C',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601c/1601c.vue')
      },
      {
        path: '2551q',
        name: 'Form 2551q',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2551q/2551q.vue')
      },
      {
        path: '1700',
        name: 'Form 1700',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1700/1700.vue')
      }, {
        path: '1701q',
        name: 'Form 1701Q',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1701q/1701q.vue')
      },
      {
        path: '1701a',
        name: 'Form 1701A',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1701a/1701a.vue')
      },
      {
        path: '2550q',
        name: 'Form 2550q',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2550q/2550q.vue')
      },
      {
        path: '2000ot',
        name: 'Form 2000-OT',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2000ot/2000ot.vue')
      },
      {
        path: '1600wp',
        name: 'Form 1600-WP',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1600wp/1600wp.vue')
      },
      {
        path: '1604e',
        name: 'Form 1604e',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1604e/1604e.vue')
      },
      {
        path: '1606',
        name: 'Form 1606',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1606/1606.vue')
      },
      {
        path: '1601f',
        name: 'Form 1601f',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601f/1601f.vue')
      },
      {
        path: '1601fq',
        name: 'Form 1601fq',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601fq/1601fq.vue')
      },
      {
        path: '1601c',
        name: 'Form 1601c',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601c/1601c.vue')
      },
      {
        path: '1706',
        name: 'Form 1706',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1706/1706.vue')
      },
      {
        path: '1604c',
        name: 'Form 1604c',
        component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1604c/1604c.vue')
      },
      ]
    },
    {
      path: 'pay',
      name: 'Payments',
      component: () => import( /* webpackChunkName: "dash" */ '@/views/app/Payments.vue'),
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
    path: '/tax/form',
    name: "Tax Form",
    component: () => import('@/views/app/forms/FormPage.vue'),
    children: [{
      path: '2550m',
      name: 'Form 2550m',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2550m/2550m.vue'),
    },
    {
      path: '1601e',
      name: 'Form 1601e',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601e/1601e.vue')
    },
    {
      path: '1601c',
      name: 'Form 1601C',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601c/1601c.vue')
    },
    {
      path: '2551q',
      name: 'Form 2551q',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2551q/2551q.vue')
    },
    {
      path: '1700',
      name: 'Form 1700',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1700/1700.vue')
    }, {
      path: '1701q',
      name: 'Form 1701Q',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1701q/1701q.vue')
    },
    {
      path: '1701a',
      name: 'Form 1701A',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1701a/1701a.vue')
    },
    {
      path: '2550q',
      name: 'Form 2550Q',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2550q/2550q.vue')
    },
    {
      path: '2000ot',
      name: 'Form 2000-OT',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/2000ot/2000ot.vue')
    },
    {
      path: '1600wp',
      name: 'Form 1600-WP',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1600wp/1600wp.vue')
    },
    {
      path: '1604e',
      name: 'Form 1604e',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1604e/1604e.vue')
    },
    {
      path: '1601f',
      name: 'Form 1601f',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601f/1601f.vue')
    },
    {
      path: '1606',
      name: 'Form 1606',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1606/1606.vue')
    },
    {
      path: '1601fq',
      name: 'Form 1601fq',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601fq/1601fq.vue'),
    },
    {
      path: '1601c',
      name: 'Form 1601c',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1601c/1601c.vue')
    },
    {
      path: '1706',
      name: 'Form 1706',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1706/1706.vue')
    },
    {
      path: '1604c',
      name: 'Form 1604c',
      component: () => import( /* webpackChunkName: "tax" */ '@/views/app/forms/1604c/1604c.vue')
    },

    ]
  },
  {
    path: '/confirmation/:code',
    name: "Confirmation",
    component: () => import('./views/confirmation/Confirmation.vue')
  }, {
    path: '/confirmation/facebook/:code',
    name: "Facebook",
    component: () => import('./views/confirmation/Facebook.vue')
  }, {
    path: '/confirmation/google/:code',
    name: "Google",
    component: () => import('./views/confirmation/Google.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('./views/admin/Home.vue'),
    children: [{
      path: '',
      name: "Login",
      component: () => import('./views/admin/Login.vue')
    }]
  },
  {
    path: '/admin/app',
    name: 'Admin',
    component: () => import('./views/admin/Main.vue'),
    children: [{
      path: '',
      name: "Dashboard",
      component: () => import('./views/admin/dashboard/Dashboard.vue')
    }]
  }
  ]
})