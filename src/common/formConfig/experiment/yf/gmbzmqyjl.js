// 灌木标准木取样记录表
import { g, percentage } from '@/common/unit'
import { setPercent } from '@/common/baseFunction'

export const config = [
  {
    label: '样品编号',
    type: 'input',
    prop: 'ypbh',
    placeholder: '请输入样品编号',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入样品编号", trigger: "blur" }],
  },
  {
    label: '样品干重' + g,
    type: 'input',
    prop: 'ypgz',
    placeholder: '请输入样品干重' + g,
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
    placeholder: '请输入样品鲜重' + g,
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
    format: (row) => {
      return setPercent(row.ypgxb)
    }
    // rules: [{ required: true, message: "请输入样品干鲜比", trigger: "blur" }],
  },
  {
    label: '含水率' + percentage,
    type: 'input',
    prop: 'hsl',
    placeholder: '请输入含水率',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入含水率", trigger: "blur" }],
  }
]
