// 腐殖质调查记录表

import { g, cm } from '@/common/unit'

export const config = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '优势树种(组)',
    prop: 'yssz'
  },
  {
    label: '平均厚度' + cm,
    type: 'input',
    prop: 'fzzChd',
    placeholder: '请输入平均厚度',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入平均厚度", trigger: "blur" }],
  },
  {
    label: '样方鲜重' + g,
    type: 'input',
    prop: 'yfFzzXz',
    placeholder: '请输入样方鲜重',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入样方鲜重", trigger: "blur" }],
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]

/* export const config = [
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
    label: '平均厚度' + cm,
    type: 'input',
    prop: 'pjhd',
    placeholder: '请输入平均厚度',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入平均厚度", trigger: "blur" }],
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
    label: '样品干鲜比',
    type: 'input',
    prop: 'ypgxb',
    placeholder: '请输入样品干鲜比',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入样品干鲜比", trigger: "blur" }],
  },
  {
    label: '含水率',
    type: 'input',
    prop: 'yphsl',
    placeholder: '请输入含水率',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入含水率", trigger: "blur" }],
  },
  {
    label: '样方鲜重' + g,
    type: 'input',
    prop: 'yfxz',
    placeholder: '请输入样方鲜重',
    span: 8,
    width: '150px',
    disabled: true
    // rules: [{ required: true, message: "请输入样方鲜重", trigger: "blur" }],
  },
  {
    label: '样方干重' + g,
    type: 'input',
    prop: 'yfgz',
    placeholder: '请输入样方干重',
    span: 8,
    width: '150px',
    disabled: true

    // rules: [{ required: true, message: "请输入样方干重", trigger: "blur" }],
  }
] */
