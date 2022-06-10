// 枯倒木基本密度汇总表
import { gcm3 } from '@/common/unit'

export const config = [
  {
    label: '行政区划',
    prop: 'xzCodeName'
  },
  {
    label: '树种(组)名',
    prop: 'szz'
  },
  {
    label: '密度级',
    prop: 'mdj'
  },
  {
    label: '基本密度' + gcm3,
    prop: 'mcmd'
  }
]
