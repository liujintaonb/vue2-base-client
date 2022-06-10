// 草本层可燃物载量统计表
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
    label: '优势树种(组)',
    prop: 'yssz'
  },
  {
    label: `样地草本层总载量${kg}`,
    prop: 'ydcbcZzl'
  },
  {
    label: `单位面积草本层可燃物载量${thm2}`,
    prop: 'dwmjCbkrwzl'
  }
]
