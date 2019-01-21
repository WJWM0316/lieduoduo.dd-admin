import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
//import './registerServiceWorker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
// 引入vue实例扩展函数库
//import './util'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
