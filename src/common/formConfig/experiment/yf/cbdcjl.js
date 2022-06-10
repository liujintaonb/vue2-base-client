//  草本调查记录表
import { g } from '@/common/unit'
export const config = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '草本名称',
    type: 'input',
    prop: 'cbmc',
    placeholder: '请输入草本名称',
    span: 8,
    width: '150px',
    disabled: true
  },
  {
    label: '草本盖度(%)',
    type: 'input',
    prop: 'cbgd',
    placeholder: '请输入样方号',
    span: 8,
    width: '150px',
    disabled: true
  },
  {
    label: '样方鲜重' + g,
    type: 'input',
    prop: 'yfxz',
    placeholder: '请输入样方鲜重',
    span: 8,
    width: '150px',
    disabled: true
  },
  {
    label: '平均高(cm)',
    prop: 'pjg'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (value) => {
      return value === '0' ? '无相关数据，不填报' : '已填报'
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
    label: '覆盖度',
    type: 'select',
    prop: 'fgd',
    placeholder: '请输入覆盖度',
    span: 8,
    width: '150px',
    disabled: true,
    async fetchOption () {
      return await fetchLeibieListWithCode('42')
    }

    //   rules: [{ required: true, message: "请输入覆盖度", trigger: "blur" }],
  },
  {
    label: '平均高' + cm,
    type: 'input',
    prop: 'pjg',
    placeholder: '请输入平均高',
    span: 8,
    width: '150px',
    disabled: true
  },
  {
    label: '优势种',
    type: 'input',
    prop: 'ysz',
    placeholder: '请输入优势种',
    disabled: true,
    span: 8,
    width: '150px'
    // rules: [{ required: true, message: "请输入优势种", trigger: "blur" }],
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
    label: '含水率' + percentage,
    type: 'input',
    prop: 'hsl',
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
