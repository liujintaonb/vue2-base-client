// 枯落物层可燃物载量统计表
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
