/**
 * Created by lbp on 2020/8/13
 * 基本单位符合
 * https://www.htmlsymbols.xyz/unit-symbols
 */

export const m2 = '(㎡)'
export const m3 = '(m³)'
export const hm2 = '(hm²)'

export const kg = '(kg)'
export const g = '(g)'

export const m = '(m)'
export const cm = '(cm)'

export const h = '(h)'

export const celsius = '(℃)'
export const percentage = '(%)'

export const kgm3 = '(kg/m³)'
export const thm2 = '(t·hm⁻²)'

export const m3hm2 = '(m³/hm²)'

export const kjg = '(kJ/g)'

export const gcm3 = '(g/cm³)'
// export const grcd = '（轻（<20%），中（20-40%），重（>40%））'
// export const sscd = '（无，中（> 0, =< 50%），重（> 50%））'
// export const grlx = '（天然、人为）'
// export const sllx = '（针叶林、阔叶林（含经济林）、混交林、竹林、特灌）'
// export const ydgg = '（方形、矩形、圆形）'

export const renderHeader = function (h, { column }) {
  return h('div', {
    domProps: {
      innerHTML: column.label
    }
  })
}

/**
 * 用户类别
 **/
// 实验室用户
export const USER_LEIBIE_SYS = '2'
// 管理员
export const USER_LEIBIE_GUANLI = '3'
// 野外火源管理模块
export const USER_LEIBIE_HUOYUAN = '4'
// 外业核查用户
export const USER_LEIBIE_WYHC = '5'

/**
 * 标准地和大样地数据审核状态
 **/
// 待开始
export const AUDIT_SATUS_DAISHI = '0'

// 外业进行中
export const AUDIT_SATUS_WAIYE = '1'

// 实验室待填报
export const AUDIT_SATUS_SHIYANSHI = '3'

// 实验室填报完成
export const AUDIT_SATUS_SHIYANSHIWANCHENG = '5'

// 外业待重新开始
export const AUDIT_SATUS_DAI_WAIYE = '6'

// 外业重新调查中
export const AUDIT_SATUS_CHONGXIN_WAIYE = '7'

// 实验室待重新填报
export const AUDIT_SATUS_CHONGXIN_SHIYANSHI = '9'

// 实验室重新填报完成
export const AUDIT_SATUS_CHONGXIN_SHIYANSHI_WANCHENG = '10'

// 待市审核（森林样地）
export const AUDIT_SATUS_DAI_SHI = '11'

// 待省审核（森林样地）
export const AUDIT_SATUS_DAI_SHENG = '12'

// 审核审核（森林样地）
export const AUDIT_SATUS_TONGGUO = '13'

// 审核通过（草原样地）
export const AUDIT_SATUS_SHENHETONGGUO = '11'

// 非负整数
export const REGEXP_EFFECT_WHOLE_NUM = /^(0|[1-9][0-9]*)$/

// 正整数
export const REGEXP_EFFECT_Z_WHOLE_NUM = /^([1-9][0-9]*)$/

// 匹配零或非零开头的正实数(保留6位)
export const REGEXP_EFFECT_NUM = /^(0|[1-9][0-9]*)(\.\d{1,6})?$/

// 匹配零或非零开头的正实数(保留4位)
export const REGEXP_EFFECT_NUM_SI = /^(0|[1-9][0-9]*)(\.\d{1,4})?$/

// 匹配零或非零开头的正实数(保留2位)
export const REGEXP_EFFECT_NUM_ER = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/

// 实数保留2位小数
export const REGEXP_EFFECT_SHISHU_ER = /^[+-]?(0|[1-9][0-9]*)(\.\d{1,2})?$/

// 实数保留4位小数
export const REGEXP_EFFECT_SHISHU_SI = /^[+-]?(0|[1-9][0-9]*)(\.\d{1,4})?$/

// 匹配零或非零开头的正实数，其中整数部分保留12位，小数部分保留4位
export const REGEXP_EFFECT_NUM_12_4 = /^(0|[1-9][0-9]{0,11})(\.\d{1,4})?$/

// 匹配字符串中每个匹配数字和‘.’
export const REGEXP_NUM_DIAN = /[^\d.]/g
// 匹配手机号
export const REGEXP_PHONE = /^1[3|4|5|7|8]\d{9}$/
// 匹配手机或电话格式
export const REGEXP_TEL = /(^(\d{3,4}-)?\d{7,8})$|(1[3-9]\d{9})$/

// 默认温度
export const WD = '25'
// 默认湿度
export const SD = '30'

// 东经（0-180）小数点后保留8位小数
export const REGEXP_LON_E = /^([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]{1,8})?$/
// 西经（-180-0）小数点后保留8位小数
export const REGEXP_LON_W = /^-([0-9]|[1-9][0-9]|1[0-7][0-9]|180)(\.[0-9]{1,8})?$/
// 北纬 （0-90）小数点后保留8位小数
export const REGEXP_LAT_N = /^([0-9]|[1-8][0-9]|90)(\.[0-9]{1,8})?$/
// 南纬 （-90-0）小数点后保留8位小数
export const REGEXP_LAT_S = /^-([0-9]|[1-8][0-9]|90)(\.[0-9]{1,8})?$/

// 分层码验证
export const REGEXP_FCM = /^([1-8][1-3][0-4][1-3]([1-9][0-9]|0[1-9]))?$/
