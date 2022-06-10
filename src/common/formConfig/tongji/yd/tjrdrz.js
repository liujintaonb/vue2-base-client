import { celsius, kjg } from '@/common/unit'

export const config = [
  {
    label: '行政区域',
    prop: 'sheng'
  },
  {
    label: '分层码',
    prop: 'fcbh'
  },
  {
    label: '优势树种(组)',
    prop: 'yssz'
  },
  {
    label: '样品类型',
    prop: 'yplx'
  },
  {
    label: '燃点' + celsius,
    prop: 'rdjz'
  },
  {
    label: '热值' + kjg,
    prop: 'rzjz'
  }
]
