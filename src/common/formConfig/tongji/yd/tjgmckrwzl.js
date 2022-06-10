// 灌木层可燃物载量统计表（乔木）
import { kg, thm2 } from '@/common/unit'

export const config = [
  {
    label: '行政区域',
    prop: 'xzCodeName',
    isTjTaleShow: true
  },
  {
    label: '标准地编号',
    prop: 'ydbh',
    isTjTaleShow: true
  },
  {
    label: '优势树种（组）',
    prop: 'yssz'
  },
  {
    label: '灌木种名',
    prop: 'ysgmz'
  },
  {
    label: `样地灌木（丛）总载量${kg}`,
    prop: 'ydgmKrwzl'
  },
  {
    label: `单位面积灌木层可燃物载量${thm2}`,
    prop: 'dwmjgmKrwzl'
  }
]
