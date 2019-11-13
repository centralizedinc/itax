import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/ant-design-vue.js'
import mixins from '@/plugins/mixins.js'
import axios from 'axios'
import aos from 'aos'
import 'aos/dist/aos.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation';
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip = false
Vue.use(mixins);

console.log(' process.env.VUE_APP_GOOGLE_MAP_KEY ::: ', process.env.VUE_APP_GOOGLE_MAP_KEY)

Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    // key: 'AIzaSyCHB6d8PoTLPZ2dtnxSPSHFpeu3pxkiA6s' || process.env.VUE_APP_GOOGLE_MAP_KEY,
    key: process.env.VUE_APP_GOOGLE_MAP_KEY,

  },
  installComponents: true
})

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI
Vue.prototype.$http = axios
Vue.prototype.$aos = aos;
new Vue({
  created(){
    aos.init()
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
