import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

document.title = "ml_result_dashboard"

Vue.use(VueAxios, axios)
Vue.use(VModal);


new Vue({
  render: h => h(App),
}).$mount('#app')
