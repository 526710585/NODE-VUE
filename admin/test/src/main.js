import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  post,
  get,
  put,
  deleteFun
} from './comm/http.js'

Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$get = get;
Vue.prototype.$delete = deleteFun;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')