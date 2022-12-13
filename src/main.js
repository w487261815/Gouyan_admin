import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from '@/store'
import '@/icons' 

import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)
new Vue({
  render: h => h(App),
  router,
	store,
}).$mount('#app')
