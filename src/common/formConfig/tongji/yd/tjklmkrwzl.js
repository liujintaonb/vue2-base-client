// 枯立木可燃物载量统计表

import { kg, m2, m3, thm2 } from '@/common/unit'

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
    label: '优势树种',
    prop: 'yssz'
  },
  {
    label: '样地枯立木载量' + kg,
    prop: 'ydKlmzzl'
  },
  {
    label: '单位面积枯立木可燃物载量' + thm2,
    prop: 'dwmjKlmkrwzl'
  },
  {
    label: '总蓄积量' + m3,
    prop: 'zxjl'
  },
  {
    label: '标准地面积' + m2,
    prop: 'bzdMj'
  }
]
