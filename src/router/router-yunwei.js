export default [
  {
    name: 'manage-yunwei',
    path: '/manage-yunwei',
    routeName: 'manage-yunwei',
    meta: { title: '系统管理', icon: 'el-icon-notebook-2', userType: '3', user: 'yunwei', isCommiss: false },
    component: () => import('@/components/layout/index.vue'),
    redirect: '/manage-yunwei/user',
    children: [
      {
        name: 'user',
        path: 'user',
        meta: { title: '用户管理', icon: 'el-icon-setting' },
        component: () => import('@/pages/manage/user/User.vue')
      },
    ]
  },
]
