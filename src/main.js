import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 路由
import routes from './example'
// 挂载全局组件
import Components from '@/components'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(iView)
Vue.use(Components)
// 路由配置
const router = new VueRouter({
  esModule: false,
  mode: 'history',
  routes: routes
})
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
