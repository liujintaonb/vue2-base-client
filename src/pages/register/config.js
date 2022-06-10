import { ruleTel } from '@/common/rules'

export const typeOptions = [
  {
    label: '国家',
    value: '0'
  },
  {
    label: '省',
    value: '1'
  },
  {
    label: '市',
    value: '2'
  },
  {
    label: '县',
    value: '3'
  },
  {
    label: '乡',
    value: '4'
  },
  {
    label: '村',
    value: '5'
  }
]
export const formConfig = [
  {
    label: '登录名',
    prop: 'userName',
    type: 'input',
    width: '100px',
    placeholder: '请输入登录名',
    span: 24,
    rules: [{
      required: true,
      message: '请输入登录名'
    },
    { max: 20, message: '20字以内，可字母、数字、下划线', trigger: 'blur' }
    ]
  },
  {
    label: '密码',
    prop: 'password',
    type: 'input',
    span: 24,
    Attributes: {
      type: 'password',
      placeholder: '请输入密码'
    },
    rules: [{
      required: true,
      message: '请输入密码'
    }, {
      min: 6, max: 16, message: '6-16位字符', trigger: 'blur'
    }
    ]
  },
  {
    label: '确认密码',
    prop: 'dengLuMmAgain',
    Attributes: {
      type: 'password',
      placeholder: '请输入密码'
    },
    type: 'input',
    span: 24,
    rules: [{
      required: true,
      message: '请确认密码'
    }, {
      min: 6, max: 16, message: '6-16位字符', trigger: 'blur'
    }]
  },
  {
    label: '真实姓名',
    prop: 'realName',
    type: 'input',
    span: 24,
    rules: [{
      required: true,
      message: '请输入真实姓名'
    }, {
      max: 10, message: '10字以内', trigger: 'blur'
    }]
  },
  {
    label: '手机',
    prop: 'mobileNumber',
    type: 'input',
    placeholder: '请输入手机号',
    rules: [
      {
        required: true,
        message: '请输入电话'
      },
      ruleTel
    ],
    span: 24
  },
  {
    label: '工作单位',
    prop: 'companyName',
    type: 'input',
    span: 24,
    rules: [{
      required: true,
      message: '请输入工作单位'
    }, {
      max: 30, message: '30字以内', trigger: 'blur'
    }]
  },
  {
    label: '',
    prop: 'registerLink',
    type: 'registerLink',
    span: 24,
    rules: [{
      required: true,
      message: '请选择用户所在行政级别后，再选择所属区域'
    }
    ]
  }
]
