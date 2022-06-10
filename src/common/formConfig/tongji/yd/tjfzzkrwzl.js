// 腐殖质可燃物载量统计表
import { kg, thm2 } from '@/common/unit'

export const config = [
  {
    label: '行政区域',
    prop: 'xzCodeName',
    isTjTaleShow: true
  },
  {
    label: '样地编号',
    prop: 'ydbh'
  },
  {
    label: '林分型图斑编号',
    prop: 'fcbh'
  },
  {
    label: '样地腐殖质层总载量' + kg,
    prop: 'ydFzzzzl'
  },
  {
    label: '单位面积腐殖质层可燃物载量' + thm2,
    prop: 'dwmjFzzkrwzl'
  }
]
