import {
  REGEXP_EFFECT_NUM,
  REGEXP_EFFECT_NUM_SI,
  REGEXP_PHONE,
  REGEXP_LON_E,
  REGEXP_LAT_N,
  REGEXP_EFFECT_NUM_12_4,
  REGEXP_EFFECT_SHISHU_SI,
  REGEXP_EFFECT_WHOLE_NUM,
  REGEXP_TEL, REGEXP_FCM,
  REGEXP_EFFECT_SHISHU_ER,
  REGEXP_EFFECT_Z_WHOLE_NUM
} from '@/common/unit'

export const ruleLength = {
  max: 20,
  message: '长度不能超过20个字符',
  trigger: ['blur', 'change']
}
export const ruleNumber = {
  pattern: REGEXP_EFFECT_NUM,
  message: '请填写正确格式,保留6位小数',
  trigger: ['blur', 'change']
}
export const rulePhone = {
  pattern: REGEXP_PHONE,
  message: '请输入正确的手机号',
  trigger: 'blur'
}

export const ruleTel = {
  pattern: REGEXP_TEL,
  message: '请输入正确的手机号或电话',
  trigger: 'blur'
}

export const ruleLengthMax = {
  max: 50,
  message: '长度不能超过50个字符',
  trigger: ['blur', 'change']
}

export const ruleLengthMax100 = {
  max: 100,
  message: '长度不能超过100个字符',
  trigger: ['blur', 'change']
}

export const ruleLengthMax500 = {
  max: 500,
  message: '长度不能超过500个字符',
  trigger: ['blur', 'change']
}

export const ruleNumberSi = {
  pattern: REGEXP_EFFECT_NUM_SI,
  message: '请填写正确格式,保留4位小数',
  trigger: ['blur', 'change']
}

export const ruleNumberEr = {
  pattern: REGEXP_EFFECT_SHISHU_ER,
  message: '请填写正确格式,保留2位小数',
  trigger: ['blur', 'change']
}

export const LON = {
  pattern: REGEXP_LON_E,
  message: '东经为0到180,小数部分为0到8位!',
  trigger: ['blur', 'change']
}
export const LAT = {
  pattern: REGEXP_LAT_N,
  message: '北纬为0到90,小数部分为0到8位!',
  trigger: ['blur', 'change']
}

export const wholeNumRule = {
  pattern: REGEXP_EFFECT_WHOLE_NUM,
  message: '请填写整数',
  trigger: ['blur', 'change']
}

export const zWholeNumRule = {
  pattern: REGEXP_EFFECT_Z_WHOLE_NUM,
  message: '请填写正整数',
  trigger: ['blur', 'change']
}

export const ruleUnit10 = {
  max: 10,
  message: '位数不能超过10位',
  trigger: ['blur', 'change']
}

export const ruleLength16 = {
  max: 16,
  message: '长度不能超过16位',
  trigger: ['blur', 'change']
}
export const ruleNumber1204 = {
  pattern: REGEXP_EFFECT_NUM_12_4,
  message: '整数部分不超过12位,小数部分保留4位',
  trigger: 'blur'
}

export const ruleNumberShishu = {
  pattern: REGEXP_EFFECT_SHISHU_SI,
  message: '小数部分不超过保留4位',
  trigger: 'blur'
}

export const ruleFCM = {
  pattern: REGEXP_FCM,
  message: '第一位1-8、第二位1-3、第三位0-4、第四位1-3、第五、六01-99',
  trigger: 'blur'
}
