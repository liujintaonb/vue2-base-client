export default [
  {
    name: 'register',
    path: '/register',
    routeName: 'register',
    icon: 'el-icon-menu',
    meta: { title: '注册', icon: 'el-icon-menu' },
    component: () => import('@/pages/register/index.vue')
  },
  {
    name: 'login',
    path: '/login',
    routeName: 'login',
    icon: 'el-icon-menu',
    meta: { title: '登录', icon: 'el-icon-menu' },
    component: () => import('@/pages/login/index.vue')
  },
  {
    name: 'system',
    path: '/system',
    routeName: 'system',
    meta: { title: '选择系统', icon: 'el-icon-menu' },
    component: () => import('@/pages/system/index.vue')
  },
  {
    name: 'single-login',
    path: '/single-login',
    routeName: 'login',
    icon: 'el-icon-menu',
    meta: { title: '跳转页面', icon: 'el-icon-menu' },
    component: () => import('@/pages/single-login/index.vue')
  }
]
