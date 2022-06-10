// 乔木每木检尺记录表
import { m, cm, kg, m3 } from '@/common/unit'

export const config = [
  {
    label: '乔木编号',
    type: 'input',
    prop: 'qmbh',
    placeholder: '请输入乔木编号',
    span: 8
  },
  {
    label: '树种',
    type: 'input',
    prop: 'sz',
    placeholder: '请输入树种',
    span: 8
  },
  {
    label: '树高' + m,
    type: 'input',
    prop: 'sg',
    placeholder: '请输入树高',
    span: 8
  },
  {
    label: '胸径' + cm,
    type: 'input',
    prop: 'xj',
    placeholder: '请输入胸径',
    span: 8
  },
  {
    label: '生长状况',
    type: 'input',
    prop: 'szzk',
    placeholder: '请输入生长状况',
    span: 8
  },
  {
    label: '单株生物量' + kg,
    type: 'input',
    prop: 'dzswl',
    placeholder: '请输入单株生物量',
    span: 8
  },
  {
    label: '单株立木蓄积量' + m3,
    type: 'input',
    prop: 'dzlmxjl',
    placeholder: '请输入单株立木蓄积量',
    span: 8
  }
]
