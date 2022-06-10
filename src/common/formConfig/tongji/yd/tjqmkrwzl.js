// 乔木层可燃物载量统计表（大样地）
import { cm, kg, m, m3, m3hm2, thm2 } from '@/common/unit'

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
    label: '林分型图斑编号',
    type: 'select',
    prop: 'lfx',
    span: 8
  },
  {
    label: '平均胸径' + cm,
    prop: 'pjxj'
  },
  {
    label: '平均高' + m,
    prop: 'pjg'
  },
  {
    label: '每公顷蓄积' + m3hm2,
    prop: 'mgqxj'
  },
  {
    label: '总蓄积量' + m3,
    prop: 'zxj'
  },
  {
    label: '每公顷可燃物载量' + thm2,
    prop: 'mgqkrwzl'
  },
  {
    label: '总可燃物载量' + kg,
    prop: 'zkrwzl'
  }
]
