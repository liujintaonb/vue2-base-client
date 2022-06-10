// 角规控制检尺记录表

import { m2 } from '@/common/unit'

export const config = [
  {
    label: '序号',
    prop: 'xh'
  },
  {
    label: '树种',
    prop: 'sz'
  },
  {
    label: '角规系数F',
    prop: 'jgCs'
  },
  {
    label: '胸径(cm)',
    prop: 'xj'
  },
  {
    label: '树高(m)',
    prop: 'sg'
  },
  {
    label: '每公顷断面积' + m2,
    prop: 'mgqdmj'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
