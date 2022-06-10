// 灌木林可燃物载量统计表改为灌木层可燃物载量统计表（灌木）
import { kg, thm2 } from '@/common/unit'

export const config = [
  {
    label: '行政区域',
    prop: 'xzCodeName',
    isTjTaleShow: true
  },
  {
    label: '样地编号',
    prop: 'ydbh',
    isTjTaleShow: true
  },
  {
    label: '灌木种名',
    prop: 'ysgmz'
  },
  {
    label: '样地灌木（丛）总载量' + kg,
    prop: 'ydgmKrwzl'
  },
  {
    label: '单位面积灌木层可燃物载量' + thm2,
    prop: 'dwmjgmKrwzl'
  }
]
