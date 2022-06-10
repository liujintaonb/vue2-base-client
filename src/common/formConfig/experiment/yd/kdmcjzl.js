// 枯倒木材积和载量计算表

import { fetchLeibieListWithCode } from '@/common/baseFunction'
import { kgm3, m, m3, kg } from '@/common/unit'

export const config = [
  {
    label: '枯倒木编号',
    type: 'input',
    prop: 'kdmbh',
    placeholder: '请输入枯倒木编号',
    span: 8,
    disabled: true
    // rules: [{ required: true, message: "请输入枯倒木编号", trigger: "blur" }],
  },
  {
    label: '枯倒木种名',
    type: 'input',
    prop: 'kdmzm',
    placeholder: '请输入枯倒木种名',
    span: 8,
    disabled: true
    // rules: [{ required: true, message: "请输入枯倒木种名", trigger: "blur" }],
  },
  {
    label: '枯倒木长' + m,
    type: 'input',
    prop: 'kdmc',
    placeholder: '请输入枯倒木长',
    span: 8,
    disabled: true
    //   rules: [{ required: true, message: "请输入枯倒木长", trigger: "blur" }],
  },
  {
    label: '枯倒木可燃物载量' + kg,
    type: 'input',
    prop: 'kdmkrwzl',
    placeholder: '请输入枯倒木可燃物载量',
    span: 8,
    disabled: true
    // rules: [{ required: true, message: "请输入枯倒木可燃物载量", trigger: "blur" }],
  },
  {
    label: '枯倒木木材密度' + kgm3,
    type: 'input',
    prop: 'kdmmcmd',
    placeholder: '请输入枯倒木木材密度',
    span: 8
    // rules: [{ required: true, message: "请输入枯倒木木材密度", trigger: "blur" }],
  },
  {
    label: '枯倒木材积' + m3,
    type: 'input',
    prop: 'kdmcj',
    placeholder: '请输入枯倒木材积',
    span: 8,
    disabled: true
    // rules: [{ required: true, message: "请输入枯倒木材积", trigger: "blur" }],
  },
  {
    label: '密度级',
    type: 'select',
    prop: 'mdj',
    placeholder: '请输入密度级',
    span: 8,
    disabled: true,
    async fetchOption () {
      return await fetchLeibieListWithCode('35')
    }
    // rules: [{ required: true, message: "请输入密度级", trigger: "blur" }],
  }
]
