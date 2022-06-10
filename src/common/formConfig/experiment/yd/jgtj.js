// 角规统计表
import { cm, m, m3 } from '@/common/unit'

export const config = [
  {
    label: '样地编号',
    type: 'input',
    prop: 'ydbh',
    span: 8,
    width: '150px'
  },
  {
    label: '林分型图斑编号',
    type: 'input',
    prop: 'lfx',
    span: 8,
    width: '150px'
  },
  {
    label: '平均胸径' + cm,
    type: 'input',
    prop: 'pjxj',
    span: 8,
    width: '150px'
  },
  {
    label: '平均高' + m,
    type: 'input',
    prop: 'pjg',
    span: 8,
    width: '150px'
  },
  {
    label: '每公顷蓄积' + m3,
    type: 'input',
    prop: 'mgqxj',
    span: 8,
    width: '150px'
  },
  {
    label: '总蓄积' + m3,
    type: 'input',
    prop: 'zxj',
    span: 8,
    width: '150px'
  }
]
