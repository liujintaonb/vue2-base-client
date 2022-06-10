// 森林可燃物时滞测定表
import { fetchLeibieListWithCode } from '@/common/baseFunction'

import { celsius, h, percentage } from '@/common/unit'

export const config = [
  {
    label: '样品类型',
    type: 'select',
    prop: 'yplx',
    placeholder: '请输入样品类型',
    span: 8,
    async fetchOption () {
      return await fetchLeibieListWithCode('51')
    }
    //   rules: [{ required: true, message: "请输入样品类型", trigger: "blur" }],
  },
  {
    label: '时间t含水率Mt' + percentage,
    type: 'input',
    prop: 'mt',
    placeholder: '请输入时间t含水率Mt',
    span: 8
    //   rules: [{ required: true, message: "请输入时间t含水率Mt", trigger: "blur" }],
  },
  {
    label: '比例系数k',
    type: 'input',
    prop: 'blxs',
    placeholder: '请输入比例系数k',
    span: 8,
    disabled: true
    //   rules: [{ required: true, message: "请输入比例系数", trigger: "blur" }],
  },
  {
    label: '初始含水率Mo' + percentage,
    type: 'input',
    prop: 'csHsl',
    placeholder: '请输入初始含水率Mo',
    span: 8
    //   rules: [{ required: true, message: "请输入初始含水率", trigger: "blur" }],
  },
  {
    label: '平均平衡含水率Me' + percentage,
    type: 'input',
    prop: 'phHsl',
    placeholder: '请输入平均平衡含水率Me',
    span: 8,
    disabled: true
    //   rules: [{ required: true, message: "请输入平均平衡含水率Me", trigger: "blur" }],
  },
  {
    label: '时间t' + h,
    type: 'input',
    prop: 'datet',
    placeholder: '请输入时间t',
    span: 8
  },
  {
    label: '培养箱温度' + celsius,
    type: 'input',
    prop: 'shiNeiWd',
    placeholder: '请输入培养箱温度',
    span: 8
    //   rules: [{ required: true, message: "请输入培养箱温度", trigger: "blur" }],
  },
  {
    label: '培养箱湿度' + percentage,
    type: 'input',
    prop: 'shiNeiSd',
    placeholder: '请输入培养箱湿度',
    span: 8
    //   rules: [{ required: true, message: "请输入培养箱湿度", trigger: "blur" }],
  },
  {
    label: '时滞',
    type: 'input',
    prop: 'sz',
    placeholder: '请输入时滞',
    span: 8,
    disabled: true
    //   rules: [{ required: true, message: "请输入时滞", trigger: "blur" }],
  }
]
