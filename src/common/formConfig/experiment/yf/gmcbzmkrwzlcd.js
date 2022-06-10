// 灌木层标准木可燃物载量测定记录表
import { cm, m, g } from '@/common/unit'

export const config = [
  {
    label: '样方号',
    prop: 'yfbh',
    width: '85px'
  },
  {
    label: '灌木号',
    prop: 'gmh',
    width: '85px'
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
    prop: 'dj',
    width: '85px'
  },
  {
    label: '冠幅（南北和东西方向平均值）' + m,
    prop: 'gf'
  },
  {
    label: '高' + m,
    prop: 'gao',
    width: '85px'
  },
  {
    label: '鲜重' + g,
    prop: 'xz',
    width: '85px'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
