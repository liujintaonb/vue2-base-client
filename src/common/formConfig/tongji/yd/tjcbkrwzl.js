// 草本可燃物载量统计表
import { kg, thm2 } from '@/common/unit'

export const config = [
  {
    label: '行政区域',
    prop: 'xzCodeName',
    isTjTaleShow: true
  },
  {
    label: '样地号',
    prop: 'ydbh',
    isTjTaleShow: true
  },
  {
    label: '林分型图斑编号',
    prop: 'fcbh'
  },
  {
    label: '样地草本层总载量' + kg,
    prop: 'ydcbcZzl'
  },
  {
    label: '单位面积草本层可燃物载量' + thm2,
    prop: 'dwmjCbkrwzl'
  }
]
