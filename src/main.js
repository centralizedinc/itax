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

Vue.config.productionTip = false
Vue.use(mixins);

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
