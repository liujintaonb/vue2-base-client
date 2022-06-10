//  枯倒木调查表
import { cm, m } from '@/common/unit'

export const config = [
  {
    label: '枯倒木编号',
    prop: 'xh',
    width: '100px'
  },
  {
    label: '枯倒木树名',
    prop: 'kdmzm'
  },
  {
    label: '直径' + cm,
    prop: 'zj'
  },
  {
    label: '长度' + m,
    prop: 'cd'
  },
  {
    label: '密度级',
    prop: 'mdj'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
