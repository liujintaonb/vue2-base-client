// 灌木层调查基本情况表
import { m } from '@/common/unit'

export const config = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '优势种名',
    prop: 'yszm'
  },
  {
    label: '灌木型',
    prop: 'gmx'
  },
  {
    label: '盖度(%)',
    prop: 'gd'
  },
  {
    label: '株数/丛数',
    prop: 'zs'
  },
  {
    label: '平均高' + m,
    prop: 'pjg'
  },
  {
    label: '备注',
    prop: 'bz'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
