// 腐殖质调查表
import { cm, g } from '@/common/unit'

export const config = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '优势树种(组)',
    prop: 'yssz'
  },
  {
    label: '腐殖质层厚度' + cm,
    prop: 'fzzChd'
  },
  {
    label: '样方腐殖质鲜重' + g,
    prop: 'yfFzzXz'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]
