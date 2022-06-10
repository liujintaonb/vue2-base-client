// 灌木调查记录表
import { m2, m, cm } from '@/common/unit'

export const config = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '灌木型',
    prop: 'gmx'
  },
  {
    label: '平均地径' + cm,
    prop: 'pjdj'
  },
  {
    label: '平均高' + m,
    prop: 'pjg'
  },
  {
    label: '平均盖度(%)',
    prop: 'pjgd'
  },
  {
    label: '样方面积' + m2,
    prop: 'mj'
  },
  {
    label: '株数/丛数',
    prop: 'zs'
  },
  {
    label: '优势种',
    prop: 'ysz'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
