// 灌木林样方干重统计表
import { kg } from '@/common/unit'
import { setPercent } from '@/common/baseFunction'

export const config = [
  {
    label: '样地编号',
    prop: 'ydbh'
  },
  {
    label: '样方号',
    prop: 'yfbh'
  },
  {
    label: '灌木型',
    prop: 'gmx'
  },
  {
    label: '株数（丛数）',
    prop: 'zs'
  },
  {
    label: '标准灌木（丛）总鲜重' + kg,
    prop: 'bzgmZxz'
  },
  {
    label: '干鲜比(%)',
    prop: 'gxb',
    format: (row) => {
      return setPercent(row.gxb)
    }
  },
  {
    label: '标准灌木（丛）总干重' + kg,
    prop: 'bzgmZgz'
  },
  {
    label: '样方灌木（丛）总干重' + kg,
    prop: 'yfgmZgz'
  }
]
