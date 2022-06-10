// 乔木层可燃物载量统计表（标准地）
import { m2, kg, thm2, m3 } from '@/common/unit'

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
    label: '树种组',
    prop: 'szz'
  },
  {
    label: '林分活立木蓄积' + m3,
    prop: 'zxjl'
  },
  {
    label: `标准地可燃物载量${kg}`,
    prop: 'bzdKrwzl'
  },
  {
    label: `标准地面积${m2}`,
    prop: 'bzdMj'
  },
  {
    label: `每公顷可燃物载量${thm2}`,
    prop: 'dwmjkrwzl'
  }
]
