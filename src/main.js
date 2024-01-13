import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import i18n from './lang'

Vue.config.productionTip = false

// Vue.use(Element, {
//   // size: Cookies.get("size") || "", // set element-ui default size
// })
Vue.use(Element)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
