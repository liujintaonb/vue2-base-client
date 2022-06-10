// 灌木林灌木层灌木标准木取样记录表

import { setPercent } from '@/common/baseFunction'
import { celsius, cm, m, g, percentage } from '@/common/unit'

export const config = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '灌木种名',
    type: 'input',
    prop: 'gmzm',
    placeholder: '请输入灌木种名',
    span: 8,
    width: '150px',
    disabled: true
    //   rules: [{ required: true, message: "请输入灌木种名", trigger: "blur" }],
  },
  {
    label: '平均地径' + cm,
    type: 'input',
    prop: 'pjdj',
    placeholder: '请输入平均地径',
    span: 8,
    width: '150px',
    disabled: true
  },
  {
    label: '平均冠幅' + cm,
    type: 'input',
    prop: 'pjgf',
    placeholder: '请输入平均冠幅',
    span: 8,
    width: '150px',
    disabled: true
  },
  {
    label: '平均高' + m,
    type: 'input',
    prop: 'pjg',
    placeholder: '请输入平均高',
    span: 8,
    width: '150px',
    disabled: true
  },
  {
    label: '室内湿度' + percentage,
    type: 'input',
    prop: 'shiNeiSd',
    placeholder: '请输入室内湿度',
    span: 8,
    width: '150px'
    // rules: [{ required: true, message: "请输入室内湿度", trigger: "blur" }],
  },
  {
    label: '室内温度' + celsius,
    type: 'input',
    prop: 'shiNeiWd',
    placeholder: '请输入室内温度',
    span: 8,
    width: '150px'
    // rules: [{ required: true, message: "请输入室内温度", trigger: "blur" }],
  },
  {
    label: '样品干重' + g,
    type: 'input',
    prop: 'ypgz',
    placeholder: '请输入样品干重',
    span: 8,
    width: '150px',
    rules: [
      {
        validator (r, v, b) {
          const numberV = parseFloat(v)
          if (numberV <= 0) {
            b(new Error('样品干重必须大于0'))
          } else {
            b()
          }
        },
        trigger: 'blur'
      }
    ]
  },
  {
    label: '样品鲜重' + g,
    type: 'input',
    prop: 'ypxz',
    placeholder: '请输入样品鲜重',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入样品鲜重", trigger: "blur" }],
  },
  {
    label: '样品干鲜比(%)',
    type: 'input',
    prop: 'ypgxb',
    placeholder: '请输入样品干鲜比',
    span: 8,
    width: '150px',
    disabled: true,
    format: (value) => {
      return setPercent(value)
    }
    // readOnly: true
    // rules: [{ required: true, message: "请输入样品干鲜比", trigger: "blur" }],
  }
]
