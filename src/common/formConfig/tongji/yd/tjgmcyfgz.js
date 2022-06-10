// 灌木层样方干重统计表
import { kg, percentage } from '@/common/unit'
import { setPercent } from '@/common/baseFunction'

export const config = [
  {
    label: '标准地编号',
    prop: 'ydbh'
  },
  {
    label: '优势灌木种名',
    prop: 'gmzm'
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
    label: `标准灌木（丛）总鲜重${kg}`,
    prop: 'bzgmZxz'
  },
  {
    label: '干鲜比' + percentage,
    prop: 'gxb',
    format: (value) => {
      return setPercent(value)
    }
  },
  {
    label: `标准灌木（丛）总干重${kg}`,
    prop: 'bzgmZgz'
  },
  {
    label: `样方灌木（丛）总干重${kg}`,
    prop: 'yfgmZgz'
  }
]
