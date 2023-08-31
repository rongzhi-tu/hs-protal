import Vue from 'vue'
import App from './App'
import ElementUI, { Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import axios from 'axios'

require('./global-static').resouceUtils.initConfig()   //先将配置文件初始化
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

