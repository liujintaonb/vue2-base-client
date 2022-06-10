import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/theme/element-variables.scss'
import xLoading from '@/components/loading'
import xcyForm from '@/components/xcy-form'
import xcylist from '@/components/xcy-list'
import * as fundebug from 'fundebug-javascript'
import fundebugVue from 'fundebug-vue'
import '@/assets/common.styl'
// 减灾能力调查与野外火源icon
import '@/assets/icon/iconfont.css'
// 引入拖拽指令
import '@/common/dialogdrag'
// 引入权限指令
import permission from '@/directive/permission'
// 引入无操作权限用户
import user from '@/directive/user'
// eslint-no-import-assign
fundebug.init({
  apikey: 'd51cef0f61b7db2df7138a82f0ee71befa6bdc0d80dbee8a0f8c48ec06e20be5'
})
fundebugVue(fundebug, Vue)

Vue.use(permission)
Vue.use(user)
Vue.use(xLoading)
// 引入element-ui
Vue.use(ElementUI)
// 全局引入配置化table和form
Vue.use(xcyForm)
Vue.use(xcylist)

Vue.config.productionTip = false

const BaseVue = new Vue({
  router,
  render: h => h(App)
})
Vue.prototype.BaseVue = BaseVue
BaseVue.$mount('#app')
