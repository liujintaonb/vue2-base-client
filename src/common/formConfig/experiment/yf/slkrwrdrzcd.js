// 森林可燃物燃点热值测定表
import { fetchLeibieListWithCode } from '@/common/baseFunction'
import { celsius, percentage } from '@/common/unit'

export const config = [
  {
    label: '样品编号',
    type: 'input',
    prop: 'ypbh',
    placeholder: '请输入样品编号',
    span: 8
    // rules: [{ required: true, message: "请输入样品编号", trigger: "blur" }],
  },
  {
    label: '可燃物类型',
    type: 'select',
    prop: 'krwlx',
    placeholder: '请输入可燃物类型',
    span: 8,
    async fetchOption () {
      return await fetchLeibieListWithCode('15')
    }
    //   rules: [{ required: true, message: "请输入可燃物类型", trigger: "blur" }],
  },
  {
    label: '燃点测定1',
    type: 'input',
    prop: 'rdcd1',
    placeholder: '请输入燃点测定1',
    span: 8
    // rules: [{ required: true, message: "请输入燃点测定1", trigger: "blur" }],
  },
  {
    label: '燃点测定2',
    type: 'input',
    prop: 'rdcd2',
    placeholder: '请输入燃点测定2',
    span: 8
    // rules: [{ required: true, message: "请输入燃点测定2", trigger: "blur" }],
  },
  {
    label: '燃点测定3',
    type: 'input',
    prop: 'rdcd3',
    placeholder: '请输入燃点测定3',
    span: 8
    // rules: [{ required: true, message: "请输入燃点测定3", trigger: "blur" }],
  },
  {
    label: '燃点均值',
    type: 'input',
    prop: 'rdjz',
    placeholder: '请输入燃点均值',
    span: 8
    // rules: [{ required: true, message: "请输入燃点均值", trigger: "blur" }],
  },
  {
    label: '燃点误差',
    type: 'input',
    prop: 'rdwc',
    placeholder: '请输入燃点误差',
    span: 8
    // rules: [{ required: true, message: "请输入燃点误差", trigger: "blur" }],
  },
  {
    label: '热值测定1',
    type: 'input',
    prop: 'rzcd1',
    placeholder: '请输入热值测定1',
    span: 8
    // rules: [{ required: true, message: "请输入热值测定1", trigger: "blur" }],
  },
  {
    label: '热值测定2',
    type: 'input',
    prop: 'rzcd2',
    placeholder: '请输入热值测定2',
    span: 8
    // rules: [{ required: true, message: "请输入热值测定2", trigger: "blur" }],
  },
  {
    label: '热值测定3',
    type: 'input',
    prop: 'rzcd3',
    placeholder: '请输入热值测定3',
    span: 8
    // rules: [{ required: true, message: "请输入热值测定3", trigger: "blur" }],
  },
  {
    label: '热值均值',
    type: 'input',
    prop: 'rzjz',
    placeholder: '请输入热值均值',
    span: 8
    // rules: [{ required: true, message: "请输入热值均值", trigger: "blur" }],
  },
  {
    label: '热值误差',
    type: 'input',
    prop: 'rzwc',
    placeholder: '请输入热值误差',
    span: 8
    // rules: [{ required: true, message: "请输入热值误差", trigger: "blur" }],
  },
  {
    label: '室内湿度' + percentage,
    type: 'input',
    prop: 'shiNeiSd',
    placeholder: '请输入室内湿度',
    span: 8
    // rules: [{ required: true, message: "请输入室内湿度", trigger: "blur" }],
  },
  {
    label: '室内温度' + celsius,
    type: 'input',
    prop: 'shiNeiWd',
    placeholder: '请输入室内温度',
    span: 8
    // rules: [{ required: true, message: "请输入室内温度", trigger: "blur" }],
  }
]
