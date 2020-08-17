import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue2Editor from "vue2-editor";


import {
  post,
  get,
  put,
  deleteFun,
  upload
} from './comm/http.js'

Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$get = get;
Vue.prototype.$delete = deleteFun;
Vue.prototype.$upload = upload;

Vue.use(ElementUI);
Vue.use(Vue2Editor);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')