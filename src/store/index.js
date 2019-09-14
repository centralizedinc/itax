import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import modules from './modules'

Vue.use(Vuex)

const cookies_store = ['account_session']
var local_store = Object.keys(modules).filter(x => !cookies_store.includes(x))

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  // plugins: [createPersistedState()]
  plugins: [
    createPersistedState({
      key: 'itax-reference',
      paths: local_store
    }),
    //store user session in cookiess
    createPersistedState({
      key: 'itax-session',
      paths: cookies_store,
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, {
          expires: 1,
          secure: false
        }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})