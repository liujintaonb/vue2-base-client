// 基础通用功能
import {
  statisticsFormConfig,
  expFormConfig
} from '@/common/baseData'
import { cloneDeep } from 'lodash'
import { menuItemConfig } from '@/components/menu/tool'
import { SzCode } from '@/common/BaseCode'
import {
  AUDIT_SATUS_CHONGXIN_SHIYANSHI,
  AUDIT_SATUS_CHONGXIN_SHIYANSHI_WANCHENG, AUDIT_SATUS_CHONGXIN_WAIYE,
  AUDIT_SATUS_DAI_SHENG, AUDIT_SATUS_DAI_SHI, AUDIT_SATUS_DAI_WAIYE, AUDIT_SATUS_SHIYANSHI,
  AUDIT_SATUS_SHIYANSHIWANCHENG, AUDIT_SATUS_TONGGUO, USER_LEIBIE_GUANLI, USER_LEIBIE_SYS
} from '@/common/unit'
import { fetchLeibieList, fetchLeibieZiList, getXzCodeInfo } from '@/common/baseApi/api'

export const filterdParams = (params = {}) => {
  if (params.county) {
    params.xzCode = params.county
  } else if (params.city) {
    params.xzCode = params.city
  } else if (params.province) {
    params.xzCode = params.province
  }
  if (params.danwei) {
    params.xzCode = params.danwei.cfrcode
  }
  if (params.yssz3) {
    params.ysszbm = params.yssz3
  } else if (params.yssz2) {
    params.ysszbm = params.yssz2
  } else if (params.yssz1) {
    params.ysszbm = params.yssz1
  }
  // 优势树种
  if (params.treeType) {
    params.ysszbm = params.treeType
  }
  // 树种组
  if (params.szzTreeType) {
    params.szzbm = params.szzTreeType
  }
  // 树种
  if (params.szTreeType) {
    params.szbm = params.szTreeType
  }
  delete params.yssz1
  delete params.yssz2
  delete params.yssz3
  delete params.province
  delete params.city
  delete params.county
  delete params.danwei
  delete params.treeType
  delete params.szzTreeType
  delete params.szTreeType
  return params
}

/**
 * 根据父级判断优势数组的是否是父级的子集
 * @param options {Array}
 * @param parent {string}
 * @return {boolean|*}
 */
const validateOptions = (options, parent) => {
  return (
    Array.isArray(options) &&
    options.length > 0 &&
    options[0].value.includes(parent)
  )
}

export const filteredFormChanged = async (config, data) => {
  const { danwei, yssz1, yssz2, yssz3, sgXzCode } = data
  if (danwei) {
    // 行政code编码处理
    data.xzCode = danwei.cfrcode
    delete data.danWei
  }
  if (sgXzCode) {
    // 行政code编码处理
    data.sgXzCode = sgXzCode.sgXzCode
    // delete data.sgArea
  }
  // 优势树种处理
  if (
    yssz1 !== undefined &&
    yssz2 !== undefined &&
    yssz3 !== undefined &&
    !yssz3.includes(yssz2)
  ) {
    delete data.yssz3
  }
  if (yssz1 !== undefined && yssz2 !== undefined && !yssz2.includes(yssz1)) {
    delete data.yssz3
    delete data.yssz2
  }
  if (data.yssz2 && !data.yssz3) {
    const yssz3Item = config.find((e) => e.prop === 'yssz3')
    if (yssz3Item && !validateOptions(yssz3Item.options, data.yssz2)) {
      const options = await fetchLeibieZiList({
        leiBie: SzCode,
        fuBianMa: data.yssz2
      })
      yssz3Item.options = options.map((e) => ({
        label: e.mingCheng,
        value: e.bianMa
      }))
    }
  } else if (data.yssz1 && !data.yssz2) {
    const yssz2Item = config.find((e) => e.prop === 'yssz2')
    if (yssz2Item && !validateOptions(yssz2Item.options, data.yssz1)) {
      const options = await fetchLeibieZiList({
        leiBie: SzCode,
        fuBianMa: data.yssz1
      })
      // 初始化二级
      yssz2Item.options = options.map((e) => ({
        label: e.mingCheng,
        value: e.bianMa
      }))
      // 初始化三级
      const yssz3Item = config.find((e) => e.prop === 'yssz3')
      yssz3Item.options = []
    }
  }
}

/**
 * 筛选数据格式化
 * @param data {Object}
 * @param config {Object}
 * @return {Object}
 */
export const filteredFormFormmat = (data, config = {}) => {
  const { danwei, sgArea, treeType, szzTreeType, szTreeType } = data
  if (danwei) {
    // 行政code编码处理
    data.xzCode = danwei.cfrcode
    delete data.danwei
  }
  if (sgArea) {
    // 森工行政code编码处理
    if (sgArea.sgXzCode) {
      data.sgXzCode = sgArea.sgXzCode
    } else {
      data.forestSheng = sgArea.forestSheng
      data.forestShi = sgArea.forestShi
      data.forestXian = sgArea.forestXian
      data.forestXiang = sgArea.forestXiang
    }
    delete data.sgArea
  }
  // 优势树种
  if (treeType) {
    data.ysszbm = treeType
    delete data.treeType
  }
  // 树种组
  if (szzTreeType) {
    data.szzbm = szzTreeType
    delete data.szzTreeType
  }
  // 树种
  if (szTreeType) {
    data.szbm = szTreeType
    delete data.szTreeType
  }
  return data
}

/**
 * 为基础表单的状态添加options值
 * @param data { Object }提供状态选项
 * @param filterConfig { Array }提供基础表单数据
 */
export const filterConfigWithData = (
  data = {},
  filterConfig = []
) => {
  const config = cloneDeep(filterConfig)
  const item = config.find(e => e.prop === 'status')
  if (item) {
    item.options = data.statusArray
  }
  return config
}

// 是否是大样地
export const isDaYangDi = (config) => {
  return +config.leiBie === 2
}

// 是否是标准地
export const isBiaoZhunDi = (config) => {
  return +config.leiBie === 1
}

// 是否是乔木林标准地
export const isQiaoMu = (config) => {
  return isBiaoZhunDi(config) && +config.type === 1
}
// 是否是灌木林标准地
export const isGunaMu = (config) => {
  return isBiaoZhunDi(config) && +config.type === 2
}

// 审核中的统计表
export const menuConfigOfSH = (yd) => {
  let list = []
  if (isBiaoZhunDi(yd)) {
    if (isQiaoMu(yd)) {
      list = cloneDeep(statisticsFormConfig.bzd.qm)
    } else if (isGunaMu(yd)) {
      list = cloneDeep(statisticsFormConfig.bzd.gm)
    }
  } else {
    list = cloneDeep(statisticsFormConfig.dyd)
  }
  list = list.filter(item => item.api.isCanAudit)
  return list.map(menuItemConfig)
}

// 实验室-样地
export const menuConfigOfYangDi = (yd) => {
  let list = []
  if (isBiaoZhunDi(yd)) {
    if (isQiaoMu(yd)) {
      list = cloneDeep(expFormConfig.qm)
    } else if (isGunaMu(yd)) {
      list = cloneDeep(expFormConfig.gm)
    }
  } else {
    list = cloneDeep(expFormConfig.dyd)
  }
  return list.map(menuItemConfig)
}

export const yangDiListByLeiBie = (yd) => {
  return cloneDeep(expFormConfig.yd.dyd)
}

// 获取指定类别样方
export const yangFangListByLeiBie = (yf) => {
  return cloneDeep(expFormConfig.yf[yf.leiBie])
}

/**
 * 获取样地统计表
 * @param yd {Object} 样地信息，至少包含样地类别和样地类型
 * @return {Array}
 */
export const getformList = (yd) => {
  // 类别leiBie：1标准地，2大样地
  // 类型type：1乔木，2灌木
  const leiBie = parseInt(yd.leiBie, 10)
  let list = []
  if (leiBie === 1) {
    list = cloneDeep(statisticsFormConfig.bzd)
    const type = parseInt(yd.type, 10)
    if (type === 1) {
      list = cloneDeep(statisticsFormConfig.bzd.qm)
    } else {
      list = cloneDeep(statisticsFormConfig.bzd.gm)
    }
  } else {
    list = cloneDeep(statisticsFormConfig.dyd)
  }
  return list.filter(item => !item.isNotStatistics)
}

function fixOrder (list) {
  for (const item of list) {
    if (item.option) {
      const last = item.option.pop()
      item.option.unshift(last)
    }
  }
}

function handleConfigItemWithType1 (list, item) {
  const subLabels = item.label.split('-')
  const title = subLabels[0]
  const subTitle = subLabels[1]
  const findItem = list.find((e) => e.label === title)
  if (findItem) {
    if (findItem.option) {
      findItem.option.push({
        label: subTitle,
        prop: item.prop,
        renderHeader: item.renderHeader
      })
    }
  } else {
    const optionList = [
      {
        label: subTitle,
        prop: item.prop,
        renderHeader: item.renderHeader
      }
    ]
    const ele = {
      label: title,
      option: optionList
    }
    list.push(ele)
  }
}

function isKuluowuBzdzgz (label) {
  return (
    label === '枯落物1标准地总干重' ||
    label === '枯落物2标准地总干重' ||
    label === '枯落物3标准地总干重'
  )
}
function isKrwzl (label) {
  return (
    label === '枯落物1单位面积可燃物载量' ||
    label === '枯落物2单位面积可燃物载量' ||
    label === '枯落物3单位面积可燃物载量'
  )
}

function handleKuluowu (list, item) {
  const title = item.label.substring(4)
  const subTitle = item.label.substring(0, 4)
  const findItem = list.find((e) => e.label === title)
  if (findItem) {
    if (findItem.option) {
      findItem.option.push({ label: subTitle, prop: item.prop })
    }
  } else {
    const optionList = [
      {
        label: subTitle,
        prop: item.prop
      }
    ]
    const ele = {
      label: title,
      option: optionList
    }
    list.push(ele)
  }
}

export const propConfigWithForm = (form) => {
  if (!form.config) {
    return []
  }
  if (!Array.isArray(form.config)) {
    return []
  }
  const list = []

  for (const item of form.config) {
    if (item.label.includes('-')) {
      handleConfigItemWithType1(list, item)
    } else if (isKuluowuBzdzgz(item.label)) {
      handleKuluowu(list, item)
    } else if (isKrwzl(item.label)) {
      handleKuluowu(list, item)
    } else {
      list.push({
        ...item,
        label: item.label,
        prop: item.prop,
        renderHeader: item.renderHeader
      })
    }
  }
  fixOrder(list)
  return list
}

/**
 * 判断是否有景观图
 * @param item {string}
 * @return {boolean}
 */
export const isHasJingguanImg = (item) => {
  const picArr = ['bzdyz', 'gmlyf', 'gmdcjl', 'gmcdc']
  return picArr.indexOf(item) !== -1
}

/**
 * 返回图片路径（公共路径+图片返回路径）
 * @param path {string} 图片路径
 * @return {string}
 */
export const ossObject = (path) => {
  const BASE_API = process.env.VUE_APP_AFFIX
  let temp = path + ''
  if (path && path.startsWith('/')) {
    temp = temp.substring(1)
  }
  if (temp) {
    return `${BASE_API}/api/v1/oss/${temp}`
  }
  return ''
}

export const filterField = async (config, data) => {
  const { danwei, treeType } = data
  if (danwei) {
    data.xzCode = danwei.cfrcode
  }
  if (treeType) {
    data.yssz = treeType
  }
}
/**
 * 根据基础编码类别获取基础编码列表
 * @param leiBie {string} 基础编码类别
 * @return {Promise<*[]|*>}
 */
export const fetchLeibieListWithCode = async leiBie => {
  const res = await fetchLeibieList({ leiBie })
  if (res) {
    return res.map((e) => {
      const v = {
        mingCheng: e.mingCheng,
        bianMa: e.bianMa
      }
      const value = JSON.stringify(v)
      return {
        label: e.mingCheng,
        value
      }
    })
  }
  return []
}

/**
 * 删除对象中的无用值
 * @param { Object } data 目标对象
 * @param { Array } noUseKey 需要删除的key值
 **/
export const deleteNoUse = (data = {}, noUseKey = []) => {
  noUseKey.forEach(item => {
    delete data[item]
  })
}

/**
 * 数据回显值
 * @param value 绑定值
 * @param type 数据绑定类型
 * @return {String}
**/
export const getShowValue = async (value, type) => {
  let data = ''
  let info
  if (!value) {
    return data
  }
  if (type === 'xzCode') {
    const len = value.length
    let xzCodeMinlength = 12 // 行政代码长度
    while (xzCodeMinlength >= 2) {
      if (len >= xzCodeMinlength) {
        info = await getXzCodeInfo({ cfrcode: value.slice(0, xzCodeMinlength) })
        data = info.cmc + data
        xzCodeMinlength = info.cparentcode.length
      }
    }
  } else if (type === 'jichuBm') {
    const len = value.length
    const leiBie = value.slice(0, 2)
    let bianMaMaxlength = 4 // 基础编码长度
    let bianMa = value.slice(0, bianMaMaxlength)

    info = await fetchLeibieList({ leiBie })
    data = len > bianMaMaxlength ? '' : info.find(item => item.bianMa === bianMa).mingCheng

    while (bianMaMaxlength < len) {
      const fuBianMa = value.slice(0, bianMaMaxlength)
      bianMaMaxlength += 2
      bianMa = value.slice(0, bianMaMaxlength)

      info = await fetchLeibieZiList({ leiBie, fuBianMa })
      data = len > bianMaMaxlength ? '' : info.find(item => item.bianMa === bianMa).mingCheng
    }
  } else if (type === 'text') {
    data = value
  }
  return new Promise(resolve => {
    resolve(data)
  })
}

/**
 * 添加全部选项
 * @param { array } arrConfig 需要添加全部选项值
 * @param { object } data 全部选项值
 * @return { string } 返回添加宣布选项值
 **/
export const allOption = async (arrConfig, data = {
  label: '全部',
  value: null
}) => {
  arrConfig.unshift(data)
  return arrConfig
}

/**
 * 多边形计算中心点左边
 * @param pts {Array} 多边形各个点的左边集合
**/
export const findCenterPoint = (pts) => {
  const nPts = pts.length - 1
  const ptsArr = pts.splice(0, nPts)
  let x = 0
  let y = 0
  let f
  let j = nPts - 1
  let p1
  let p2
  let area = 0
  console.log(ptsArr)
  for (let i = 0; i < nPts; j = i++) {
    p1 = ptsArr[i]
    p2 = ptsArr[j]
    area += p1[0] * p2[1]
    area -= p1[1] * p2[0]
    f = p1[0] * p2[1] - p2[0] * p1[1]
    x += (p1[0] + p2[0]) * f
    y += (p1[1] + p2[1]) * f
  }

  f = area / 2 * 6
  return [x / f, y / f]
}

/**
 * 自定义保留小数点后N位 ()
 * @param target { number/string } 操作数
 * @param num { number } 保留位数  默认保留两位小数
 * @param zeroFill { boolean } 是否补零, 默认不补0
 * zeroFill 为ture放回值为字符串  为false放回值为数字类型
**/
export const selfRound = (target, num = 2, zeroFill = false) => {
  const targetNum = Number(target).toFixed(10)
  const curNum = Math.round(targetNum * Math.pow(10, num)) / Math.pow(10, num)
  if (zeroFill) {
    let tempNum = curNum.toString()
    if (tempNum.indexOf('.') === -1) {
      tempNum += '.'
    }
    for (let i = tempNum.length - tempNum.indexOf('.'); i <= num; i++) {
      tempNum += '0'
    }
    return tempNum
  } else {
    return curNum
  }
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 * @param num1 { string, number }
 * @param num2 { string, number }
 * @return { number } arg1加上arg2的精确结果
 **/
export const accAdd = (num1, num2) => {
  let arg1 = Number(num1 || 0) || 0
  let arg2 = Number(num2 || 0) || 0
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  // 两个数相差位数的绝对值
  const c = Math.abs(r1 - r2)
  // 小数点后的10的n次方
  const m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    const cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

/**
* 转为百分数
**/
export const setPercent = (value) => {
  if (value) {
    return Math.round(Number(value) * 10000) / 100
  }
  return value
}
/**
 * 审核汇报
 **/
export const isPass = (xzCode, status) => {
  return (xzCode.length === 2 && status === AUDIT_SATUS_DAI_SHENG) ||
    (xzCode.length === 4 && status === AUDIT_SATUS_DAI_SHI) ||
    (xzCode.length === 6 && status === AUDIT_SATUS_SHIYANSHIWANCHENG) ||
    (xzCode.length === 6 && status === AUDIT_SATUS_CHONGXIN_SHIYANSHI_WANCHENG)
}

/**
 * 返回实验室
 **/
export const isBackSYS = (xzCode, status) => {
  return (xzCode.length === 2 && status === AUDIT_SATUS_DAI_SHENG) ||
    (xzCode.length === 4 && status === AUDIT_SATUS_DAI_SHI) ||
    (xzCode.length === 6 && status === AUDIT_SATUS_SHIYANSHIWANCHENG) ||
    (xzCode.length === 6 && status === AUDIT_SATUS_CHONGXIN_SHIYANSHI_WANCHENG)
}

/**
 * 返回外业
 **/
export const isBackWY = (xzCode, status) => {
  return (
    (xzCode.length === 2 && status === AUDIT_SATUS_DAI_SHENG) ||
    (xzCode.length === 4 && status === AUDIT_SATUS_DAI_SHI) ||
    (xzCode.length === 6 &&
      status !== AUDIT_SATUS_DAI_SHENG &&
      status !== AUDIT_SATUS_DAI_SHI &&
      status !== AUDIT_SATUS_TONGGUO)
  )
}

/**
 * 撤销审核
 **/
export const isCancelExamine = (xzCode, status) => {
  return (xzCode.length === 2 && status === AUDIT_SATUS_TONGGUO) ||
  (xzCode.length === 4 && status === AUDIT_SATUS_DAI_SHENG)
}

/**
 * 填报
 **/
export const isFill = (status) => {
  return status === AUDIT_SATUS_SHIYANSHI ||
    status === AUDIT_SATUS_CHONGXIN_SHIYANSHI
}

export const canHandle = (userLeiBie, status, xzCode) => {
  const handleArr = []
  if (userLeiBie === USER_LEIBIE_SYS) {
    if (isFill(status)) {
      handleArr.push('confirm', 'wy')
    }
  } else if (userLeiBie === USER_LEIBIE_GUANLI) {
    if (isPass(xzCode, status)) {
      handleArr.push('pass')
    }
    if (isBackSYS(xzCode, status)) {
      handleArr.push('sys')
    }
    if (isBackWY(xzCode, status)) {
      handleArr.push('wy')
    }
    if (isCancelExamine(xzCode, status)) {
      handleArr.push('cancel')
    }
  }
  return handleArr
}

export const createBtn = action => {
  let btn
  switch (action) {
    case 'confirm':
      btn = { label: '填报', action: 'confirm' }
      break
    case 'pass':
      btn = { label: '审核通过', action: 'pass' }
      break
    case 'sys':
      btn = { label: '退回实验室', action: 'sys' }
      break
    case 'wy':
      btn = { label: '退回外业', action: 'wy' }
      break
    case 'cancel':
      btn = { label: '撤销审核', action: 'cancel' }
      break
  }
  return btn
}

/**
 * 样地操作样地变更状态
 * @param action { string } 操作行为
 * @param xzCodeLen { number } 行政代码长度
 * @param currentStatus { string } 当前样地状态
 **/
export const changeStatus = (action, xzCodeLen, currentStatus) => {
  let toStatus = ''
  if (action === 'pass') {
    // 通过
    if (xzCodeLen === 2) {
      toStatus = AUDIT_SATUS_TONGGUO
    } else if (xzCodeLen === 4) {
      toStatus = AUDIT_SATUS_DAI_SHENG
    } else {
      toStatus = AUDIT_SATUS_DAI_SHI
    }
  } else if (action === 'sys') {
    // 退回实验室
    toStatus = currentStatus === AUDIT_SATUS_SHIYANSHIWANCHENG
      ? AUDIT_SATUS_SHIYANSHI
      : AUDIT_SATUS_CHONGXIN_SHIYANSHI
  } else if (action === 'wy') {
    // 退回外业
    toStatus = currentStatus === AUDIT_SATUS_SHIYANSHI ||
    currentStatus === AUDIT_SATUS_CHONGXIN_SHIYANSHI
      ? AUDIT_SATUS_CHONGXIN_WAIYE
      : AUDIT_SATUS_DAI_WAIYE
  } else if (action === 'cancel') {
    // 撤销审核
    if (xzCodeLen === 2) {
      toStatus = AUDIT_SATUS_DAI_SHENG
    } else if (xzCodeLen === 4) {
      toStatus = AUDIT_SATUS_DAI_SHI
    }
  }
  return toStatus
}
/**
 * 字符串中是否包含指点字符串
 * @param selfStr{string} 可有可用分割符号分割字符串
 * @param targetStr{string} 所包含的指定字符串
 * @param separator{string} 分割符
 **/
export const isIncludeString = (selfStr, targetStr, separator = ',') => {
  return selfStr.split(separator).includes(targetStr)
}
