// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios

import VueWorker from 'vue-worker';
Vue.use(VueWorker);

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = httpRequest // ajax请求方法
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
