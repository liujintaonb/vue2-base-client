// 草本调查表（乔木）
import { g } from '@/common/unit'

export const config1 = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '优势种',
    prop: 'cbmc'
  },
  {
    label: '草本盖度(%)',
    prop: 'cbgd'
  },
  {
    label: '样方鲜重' + g,
    prop: 'yfxz'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (value) => {
      return value === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]

// 草本调查表（灌木）
export const config2 = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '草本名称',
    prop: 'cbmc'
  },
  {
    label: '草本盖度(%)',
    prop: 'cbgd'
  },
  {
    label: '样方鲜重' + g,
    prop: 'yfxz'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (value) => {
      return value === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
