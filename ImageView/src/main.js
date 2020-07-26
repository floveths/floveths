import Vue from 'vue'
import App from './App.vue'
import Echarts from 'echarts'
import Store from './stores/store'
import Router from './router/router'
import './plugins/element.js'
import I18n from './lang/i18n'
import ReSource from 'vue-resource'
import '../src/assets/css/bootstrap.css'
import '../src/assets/js/jquery.ztree.core.js'
import '../src/assets/js/jquery.ztree.exedit.js' 

Vue.use(Echarts);
Vue.use(ReSource);
Vue.prototype.$echarts = Echarts
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.config.productionTip = false

new Vue({
  store: Store,
  i18n : I18n,
  router: Router,
  render: h => h(App),
}).$mount('#app') 
