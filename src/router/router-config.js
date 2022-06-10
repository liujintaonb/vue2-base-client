import layout from '@/components/layout/index.vue'
export default [
  {
    name: 'map',
    path: '/map',
    routeName: 'map',
    meta: { title: '地图浏览', icon: 'el-icon-map-location', userType: ['2', '3', '5'], user: ['admin', 'sys'] },
    component: layout,
    redirect: '/map/query',
    children: [
      {
        name: 'mapquery',
        path: 'query',
        meta: { title: '地图查询', icon: 'el-icon-coordinate' },
        component: () => import('@/pages/map/map-query/index.vue')
      }
    ]
  },
]
