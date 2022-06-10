
import { cloneDeep } from 'lodash'

const baseFilterConfig = [
  {
    label: '登录名',
    type: 'input',
    prop: 'userName',
    placeholder: '请输入登录名',
    size: 'medium',
    width: '56px'
  },
  {
    label: '真实姓名',
    type: 'input',
    prop: 'realName',
    placeholder: '请输入真实姓名',
    size: 'medium',
    width: '70px'
  },
  {
    label: '手机号',
    type: 'input',
    prop: 'mobileNumber',
    placeholder: '请输入手机号',
    size: 'medium',
    width: '56px'
  },
  {
    label: '状态',
    type: 'select',
    prop: 'status',
    placeholder: '请选择状态',
    size: 'medium',
    width: '42px'
  },
  {
    label: '用户级别',
    type: 'select',
    prop: 'type',
    options: [
      { label: '国家', value: '0' },
      { label: '省', value: '1' },
      { label: '市', value: '2' },
      { label: '县', value: '3' },
      { label: '乡', value: '4' },
      { label: '村', value: '5' }
    ],
    placeholder: '请选择用户级别',
    size: 'medium',
    width: '70px'
  },
  {
    label: '',
    type: 'button',
    arr: [
      {
        text: '查 询',
        type: 'primary',
        action: 'query'
      },
      {
        text: '清 空',
        type: 'primary',
        action: 'clear'
      },
      {
        text: '新 增',
        type: 'primary',
        action: 'add'
      }
    ]
  }
]

export const listPropsConfig = [
  {
    label: '登录名',
    prop: 'userName'
  },
  {
    label: '真实姓名',
    prop: 'realName'
  },
  {
    label: '行政区域',
    prop: 'xzCodeName'
  },
  {
    label: '手机号',
    prop: 'mobileNumber'
  },
  {
    label: '状态',
    width: 100,
    prop: 'statusText'
  },
  {
    label: '类别',
    width: 170,
    prop: 'leiBieText'
  },
  {
    label: '工作单位',
    width: 170,
    prop: 'companyName'
  },
  {
    label: '操作',
    prop: 'action',
    width: 150,
    formatActions(row) {
      if (row.status === '0') {
        return [
          {
            label: '更新',
            action: 'flexible'
          },
          {
            label: '一键开通',
            action: 'enable'
          },
          {
            label: '删除',
            action: 'delete'
          },
          {
            label: '重置密码',
            action: 'reset'
          }
        ]
      }
      return [
        {
          label: '更新',
          action: 'flexible'
        },
        {
          label: '禁用',
          action: 'disable'
        },
        {
          label: '删除',
          action: 'delete'
        },
        {
          label: '重置密码',
          action: 'reset'
        }
      ]
    }
  }
]

export const userFormConfig = [
  {
    label: '登录名',
    type: 'input',
    prop: 'userName',
    placeholder: '登录名',
    size: 'medium',
    span: 24
  },
  {
    label: '真实姓名',
    type: 'input',
    prop: 'realName',
    placeholder: '请输入真实姓名',
    size: 'medium',
    span: 24
  },
  {
    label: '手机号',
    type: 'input',
    prop: 'mobileNumber',
    placeholder: '请输入手机号',
    size: 'medium',
    span: 24
  },
]
