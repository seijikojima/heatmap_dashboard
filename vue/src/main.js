import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' //追記
import VueAxios from 'vue-axios' //追記

Vue.config.productionTip = false

import VModal from 'vue-js-modal'
Vue.use(VModal)

Vue.use(VueAxios, axios) //追記

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
