// 枯落物可燃物载量统计表
import { thm2, kg } from '@/common/unit'

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
    label: '样地枯落物1总载量' + kg,
    prop: 'ydKlw1Zzl'
  },
  {
    label: '样地枯落物2总载量' + kg,
    prop: 'ydKlw2Zzl'
  },
  {
    label: '样地枯落物3总载量' + kg,
    prop: 'ydKlw3Zzl'
  },
  {
    label: '枯落物1单位面积可燃物载量' + thm2,
    prop: 'dwmjKlw1Zl'
  },
  {
    label: '枯落物2单位面积可燃物载量' + thm2,
    prop: 'dwmjKlw2Zl'
  },
  {
    label: '枯落物3单位面积可燃物载量' + thm2,
    prop: 'dwmjKlw3Zl'
  }
]
