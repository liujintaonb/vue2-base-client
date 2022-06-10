// 灌木林灌木层标准木可燃物载量测定记录表

import { cm, m, g } from '@/common/unit'
export const config = [
  {
    label: '样方号',
    prop: 'yfbh'
  },
  {
    label: '灌木号',
    prop: 'gmh'
  },
  {
    label: '灌木种名',
    prop: 'gmzm'
  },
  {
    label: '灌木型',
    prop: 'gmx'
  },
  {
    label: '地径' + cm,
    prop: 'dj'
  },
  {
    label: '冠幅（南北和东西方向平均值）' + m,
    prop: 'gf'
  },
  {
    label: '高' + m,
    prop: 'gao'
  },
  {
    label: '鲜重' + g,
    prop: 'xz'
  }
]
