// 竹林调查表

import { cm } from '@/common/unit'
export const config = [
  {
    label: '竹林编号',
    prop: 'zlbh'
  },
  {
    label: '竹林树种（组）',
    type: 'input',
    prop: 'zlszz',
    span: 8
  },
  {
    label: '竹度（度）',
    type: 'input',
    prop: 'zd',
    span: 8
  },
  {
    label: '平均胸径' + cm,
    type: 'input',
    prop: 'pjxj',
    span: 8
  },
  {
    label: '活立竹株数（株）',
    type: 'input',
    prop: 'hlmzs',
    span: 8
  },
  {
    label: '枯立竹株数（株）',
    type: 'input',
    prop: 'klmzs',
    span: 8
  },
  {
    label: '枯立竹平均分解状态',
    type: 'input',
    prop: 'pjfjzt',
    span: 8
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
