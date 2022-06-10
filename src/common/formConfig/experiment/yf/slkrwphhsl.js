// 森林可燃物平衡含水率测定表

import { fetchLeibieListWithCode } from '@/common/baseFunction'

import { celsius, percentage, g, h } from '@/common/unit'

export const config = [
  {
    label: '样品编号',
    type: 'input',
    prop: 'ypbh',
    placeholder: '请输入样品编号',
    span: 8
    //   rules: [{ required: true, message: "请输入样品编号", trigger: "blur" }],
  },
  {
    label: '样品类型',
    type: 'select',
    prop: 'yplx',
    placeholder: '请输入样品类型',
    span: 8,
    // TODO 重复请求
    async fetchOption () {
      return await fetchLeibieListWithCode('51')
    }
    //   rules: [{ required: true, message: "请输入样品类型", trigger: "blur" }],
  },
  {
    label: '可燃物分层编号',
    type: 'input',
    prop: 'krwFcbh',
    placeholder: '请输入可燃物分层编号',
    span: 8
    //   rules: [{ required: true, message: "请输入可燃物分层编号", trigger: "blur" }],
  },
  {
    label: '室内温度' + celsius,
    type: 'input',
    prop: 'shiNeiWd',
    placeholder: '请输入室内温度',
    span: 8
    //   rules: [{ required: true, message: "请输入培养箱温度", trigger: "blur" }],
  },
  {
    label: '室内湿度' + percentage,
    type: 'input',
    prop: 'shiNeiSd',
    placeholder: '请输入室内湿度',
    span: 8
    //   rules: [{ required: true, message: "请输入培养箱湿度", trigger: "blur" }],
  },
  {
    label: '样品干质量' + g,
    type: 'input',
    prop: 'ypgzl',
    placeholder: '请输入样品干质量',
    span: 8
  },
  {
    label: '样品浸水饱和质量' + g,
    type: 'input',
    prop: 'ypqsbhzl',
    placeholder: '请输入样品浸水饱和质量',
    span: 8
    //   rules: [{ required: true, message: "请输入样品浸水饱和质量", trigger: "blur" }],
  },
  {
    label: '时间t' + h,
    type: 'input',
    prop: 'datet',
    placeholder: '请输入时间t',
    span: 8
    //   rules: [{ required: true, message: "请输入时间t", trigger: "blur" }],
  },
  {
    label: '时间t样品湿质量',
    type: 'input',
    prop: 'datetYpszl',
    placeholder: '请输入时间t样品湿质量',
    span: 8
    //   rules: [{ required: true, message: "请输入时间t样品湿质量", trigger: "blur" }],
  },
  {
    label: '时间t含水率Mt' + percentage,
    type: 'input',
    prop: 'datetHsl',
    placeholder: '请输入时间t含水率Mt',
    span: 8,
    disabled: true
    //   rules: [{ required: true, message: "请输入时间t含水率Mt, trigger: "blur" }],
  },
  {
    label: '平衡含水率Me' + percentage,
    type: 'input',
    prop: 'phhsl',
    placeholder: '请输入平衡含水率Me',
    span: 8
    //   rules: [{ required: true, message: "请输入平衡含水率", trigger: "blur" }],
  }
]
