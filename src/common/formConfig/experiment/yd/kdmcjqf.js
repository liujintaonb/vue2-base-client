// 枯倒木材积区分调查表
import { cm, m, m3 } from '@/common/unit'

export const config = [
  {
    label: '枯倒木编号',
    prop: 'kdmid'
  },
  {
    label: '枯倒木种名',
    prop: 'kdmzm'
  },
  {
    label: '枯倒木长' + m,
    prop: 'kdmc'
  },
  {
    label: '密度级',
    prop: 'mdj'
  },
  {
    label: '区分段编号',
    prop: 'qfdbh'
  },
  {
    label: '区分段长度' + m,
    prop: 'qfdcd'
  },
  {
    label: '区分段材积' + m3,
    prop: 'cfdcj'
  },
  {
    label: '是否为中空腐木',
    prop: 'zkfm'
  },
  {
    label: '区分段中央/梢底直径' + cm,
    prop: 'qfdzyzj'
  },
  {
    label: '区分段中央/梢底中空直径' + cm,
    prop: 'qfdzyzkzj'
  },
  {
    label: '区分段中央/梢底中空外环直径' + cm,
    prop: 'qfdzyzkwhzj'
  },
  {
    label: '备注',
    prop: 'bz'
  }
]
