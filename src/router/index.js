import VueRouter from 'vue-router'
import Vue from 'vue'
import common from './common'
import menuRouter from './router-config'
import yunweiMenuRouter from './router-yunwei'
import { isLogin } from '../common/util'
import Storage from '@/common/storage'
import { USER_LEIBIE_GUANLI, USER_LEIBIE_HUOYUAN, USER_LEIBIE_SYS, USER_LEIBIE_WYHC } from '@/common/unit'

Vue.use(VueRouter)

const notFound = {
  path: '*',
  redirect: '/'
}

export const createDefaultRoutes = () => {
  const userInfo = Storage.get('fuserInfo') || {}
  let defaultPath = ''
  if (JSON.stringify(userInfo) === '{}') {
    defaultPath = '/login'
  } else {
    // 实验室端
    if (userInfo.leiBie === USER_LEIBIE_SYS) {
      defaultPath = '/experiment'
    } else if (userInfo.leiBie === USER_LEIBIE_HUOYUAN) {
      // 火源账户
      defaultPath = '/firesource'
    } else if (userInfo.leiBie === USER_LEIBIE_GUANLI || userInfo.leiBie === USER_LEIBIE_WYHC) {
      const user = Storage.get('system')
      switch (user) {
        case 'yunwei':
          // 运维管理系统
          defaultPath = '/manage-yunwei'
          break
        default:
          defaultPath = '/system'
          break
      }
    }
  }
  return [
    {
      path: '/',
      redirect: {
        name: '',
        path: defaultPath
      }
    }
  ]
}

const createRouter = () => new VueRouter({
  routes: [...common, ...menuRouter, ...yunweiMenuRouter, notFound]
})

const router = createRouter()
const defualtPages = createDefaultRoutes()
router.addRoutes(defualtPages)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由钩子
// 校验登录状态，权限，Query是否携带
router.beforeEach(async (to, from, next) => {
  const title = Storage.get('curSystemName')
  next()
})
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
