// 统计表 - 样地 （没有样方）
import { config as tjqmckrwzlConfig } from '@/common/formConfig/tongji/yd/tjqmckrwzl'
import { config as tjqmkrwzlConfig } from '@/common/formConfig/tongji/yd/tjqmkrwzl'
import { config as tjgmckrwzlConfig } from '@/common/formConfig/tongji/yd/tjgmckrwzl'
import { config as gmqytjlConfig } from '@/common/formConfig/tongji/yd/gmqytj'
// import { config as tjgmlyfgzConfig } from '@/common/formConfig/tongji/yd/tjgmlyfgz'
import { config as tjgmlkrwzlConfig } from '@/common/formConfig/tongji/yd/tjgmlkrwzl'
import { config as tjklwckrwzlConfig } from '@/common/formConfig/tongji/yd/tjklwckrwzl'
import { config as tjcbckrwzlConfig } from '@/common/formConfig/tongji/yd/tjcbckrwzl'
import { config as tjfzzckrwzlConfig } from '@/common/formConfig/tongji/yd/tjfzzckrwzl'
import { config as tjphhslConfig } from '@/common/formConfig/tongji/yd/tjphhsl'
import { config as tjrdrzConfig } from '@/common/formConfig/tongji/yd/tjrdrz'
import { config as tjkdmjbmdConfig } from '@/common/formConfig/tongji/yd/tjkdmjbmd'
import { config as tjkdmkrwzlszConfig } from '@/common/formConfig/tongji/yd/tjkdmkrwzlsz'

// import { config as tjgmyfgzConfig } from '@/common/formConfig/tongji/yd/tjgmyfgz'
import { config as tjgmkrwzlConfig } from '@/common/formConfig/tongji/yd/tjgmkrwzl'
import { config as tjklwkrwzlConfig } from '@/common/formConfig/tongji/yd/tjklwkrwzl'
import { config as tjcbkrwzlConfig } from '@/common/formConfig/tongji/yd/tjcbkrwzl'
import { config as tjfzzkrwzlConfig } from '@/common/formConfig/tongji/yd/tjfzzkrwzl'
import { config1 as gxbhzConfig, config2 as dydgxbhzConfig } from '@/common/formConfig/tongji/yd/gxbhz'
import { config as tjklmkrwzlConfig } from '@/common/formConfig/tongji/yd/tjklmkrwzl'
// 实验表 - 样地
import { config as dydyzConfig } from '@/common/formConfig/experiment/yd/dydyz'
import { config as kdmConfig } from '@/common/formConfig/experiment/yd/kdm'
import { config as zldcConfig } from '@/common/formConfig/experiment/yd/zldc'

// 实验表 - 样方
// import { config as gmcgmbzmConfig } from '@/common/formConfig/experiment/yf/gmcgmbzm'
// import { config as cbdcConfig } from '@/common/formConfig/experiment/yf/gmcgmbzm'
import { config1 as cbdcQmConfig, config2 as cbdcGmConfig } from '@/common/formConfig/experiment/yf/cbdc'
import { config as klwdcConfig } from '@/common/formConfig/experiment/yf/klwdc'
import { config as fzzdcConfig } from '@/common/formConfig/experiment/yf/fzzdc'
// import { config as slkrwphhslConfig } from '@/common/formConfig/experiment/yf/slkrwphhsl'
// import { config as slkrwszcdConfig } from '@/common/formConfig/experiment/yf/slkrwszcd'
// import { config as slkrwrdrzcdConfig } from '@/common/formConfig/experiment/yf/slkrwrdrzcd'
// import { config as gmlgmbzmqyjlConfig } from '@/common/formConfig/experiment/yf/gmlgmbzmqyjl'
import { config as gmcbzmkrwzlcdConfig } from '@/common/formConfig/experiment/yf/gmcbzmkrwzlcd'
import { config as gmcdcConfig } from '@/common/formConfig/experiment/yf/gmcdc'
import { config as gmlbzmkrwzlcdConfig } from '@/common/formConfig/experiment/yf/gmlbzmkrwzlcd'
import { config1 as gmlyfConfig, config2 as gmhzConfig } from '@/common/formConfig/experiment/yf/gmlyf'
import { config as cbdcjlConfig } from '@/common/formConfig/experiment/yf/cbdcjl'
import { config as klwdcjlConfig } from '@/common/formConfig/experiment/yf/klwdcjl'
import { config as fzzdcjlConfig } from '@/common/formConfig/experiment/yf/fzzdcjl'
import { config as gmdcjlConfig } from '@/common/formConfig/experiment/yf/gmdcjl'
import { config as jgrcConfig } from '@/common/formConfig/experiment/yf/jgrc'

// 行政管理
export const xzJibieMap = [
  {
    xzName: '国家',
    xzJibie: 0,
    xzCodeLength: 0
  },
  {
    xzName: '省',
    xzJibie: 1,
    xzCodeLength: 2
  },
  {
    xzName: '市',
    xzJibie: 2,
    xzCodeLength: 4
  },
  {
    xzName: '县',
    xzJibie: 3,
    xzCodeLength: 6
  },
  {
    xzName: '乡镇',
    xzJibie: 4,
    xzCodeLength: 9
  },
  {
    xzName: '村',
    xzJibie: 5,
    xzCodeLength: 12
  }
]

export const statusMap = {
  0: '待开始',
  1: '外业进行中',
  3: '实验室待填报',
  5: '实验室填报完成',
  6: '外业待重新开始',
  7: '外业重新调查中',
  9: '实验室待重新填报',
  10: '实验室重新填报完成',
  11: '待市审核',
  12: '待省审核',
  13: '省审核通过'
}

export const statusCyMap = {
  0: '待开始',
  1: '外业进行中',
  3: '实验室待填报',
  5: '实验室填报完成',
  6: '外业待重新开始',
  7: '外业重新调查中',
  9: '实验室待重新填报',
  10: '实验室重新填报完成',
  11: '待市审核',
  12: '待省审核',
  13: '省审核通过'
}

export const statusArray = [
  { label: '待开始', value: '0' },
  { label: '外业进行中', value: '1' },
  { label: '实验室待填报', value: '3' },
  { label: '实验室填报完成', value: '5' },
  { label: '外业待重新开始', value: '6' },
  { label: '外业重新调查中', value: '7' },
  { label: '实验室待重新填报', value: '9' },
  { label: '实验室重新填报完成', value: '10' },
  { label: '待市审核', value: '11' },
  { label: '待省审核', value: '12' },
  { label: '省审核通过', value: '13' }
]

export const statusCyArray = [
  { label: '待开始', value: '0' },
  { label: '外业进行中', value: '1' },
  { label: '实验室待填报', value: '3' },
  { label: '实验室填报完成', value: '5' },
  { label: '外业待重新开始', value: '6' },
  { label: '外业重新调查中', value: '7' },
  { label: '实验室待重新填报', value: '9' },
  { label: '实验室重新填报完成', value: '10' },
  { label: '待市审核', value: '11' },
  { label: '待省审核', value: '12' },
  { label: '省审核通过', value: '13' }
]

export const fireUserStatus = {
  0: '待提交',
  1: '待县审核',
  3: '县审核不通过',
  2: '待市审核',
  5: '市审核不通过',
  4: '待省审核',
  7: '省审核不通过',
  6: '省审核通过'
}

export const leibieMap = {
  1: '灌木层样方',
  2: '枯草腐样方',
  3: '灌木林样方',
  4: '枯草腐样方',
  5: '角规点',
  6: '灌木样方',
  7: '枯草腐样方',
  // TODO
  10: '林分'
}

export const statusMeasureMap = {
  0: '待提交',
  1: '待审核',
  2: '审核通过',
  3: '审核不通过'
}
export const statusMeasure = [
  { label: '待提交', value: '0' },
  { label: '待审核', value: '1' },
  { label: '审核通过', value: '2' },
  { label: '审核不通过', value: '3' }
]

// 详情表
const tableInfo = {
  bzdyz: {
    label: '标准地因子调查记录表',
    formData: {},
    api: { name: 'bzdyz', title: 'bzdyz' },
    type: 'yd',
    disabled: true
  },
  qmmmjc: {
    label: '乔木每木检尺记录表',
    formData: [],
    api: { name: 'qmmmjc', title: 'qmmmjc' },
    type: 'yd',
    disabled: true
  },
  zldc: {
    label: '竹林调查表',
    formData: [],
    api: { name: 'zldc', title: 'LvTable' },
    type: 'yd',
    config: zldcConfig,
    disabled: true
  },
  kdm: {
    label: '枯倒木调查表',
    formData: [],
    api: { name: 'kdm', title: 'LvTable' },
    type: 'yd',
    config: kdmConfig,
    disabled: true
  },
  kdmcjqf: {
    label: '枯倒木材积区分调查表',
    formData: [],
    api: { name: 'kdmcjqf', title: 'kdmcjqf' },
    type: 'yd',
    disabled: true
  },
  kdmcjzl: {
    label: '枯倒木材积和载量计算表',
    formData: [],
    api: { name: 'kdmcjzl', title: 'kdmcjzl' },
    type: 'yd'
  },
  tdkdmqyjl: {
    label: '特大枯倒木样品测定表',
    formData: [],
    api: { name: 'tdkdmqyjl', title: 'tdkdmqyjl' },
    type: 'yd',
    disabled: true
  },
  tdkdmcjdc: {
    label: '特大枯倒木材积调查表',
    formData: [],
    api: { name: 'tdkdmcjdc', title: 'tdkdmcjdc' },
    type: 'yd',
    disabled: true
  },
  gmcdc: {
    label: '灌木层调查基本情况表',
    formData: [],
    api: { name: 'gmcdc', title: 'LvTable' },
    type: 'yf',
    config: gmcdcConfig,
    disabled: true
  },
  gmcbzmkrwzlcd: {
    label: '灌木层标准木可燃物载量测定记录表',
    formData: [],
    api: { name: 'gmcbzmkrwzlcd', title: 'LvTable' },
    type: 'yf',
    config: gmcbzmkrwzlcdConfig,
    disabled: true
  },
  gmcgmbzm: {
    label: '灌木层灌木标准木取样记录表',
    formData: [],
    api: { name: 'gmcgmbzm', title: 'gmcgmbzm' },
    type: 'yf'
  },
  slkrwphhsl: {
    label: '森林可燃物平衡含水率测定表',
    formData: [],
    api: { name: 'slkrwphhsl', title: 'slkrwphhsl' },
    type: 'yd'
  },
  slkrwszcd: {
    label: '森林可燃物时滞测定表',
    formData: [],
    api: { name: 'slkrwszcd', title: 'slkrwszcd' },
    type: 'yf'
  },
  slkrwrdrzcd: {
    label: '森林可燃物燃点、热值测定表',
    formData: [],
    api: { name: 'slkrwrdrzcd', title: 'slkrwrdrzcd' },
    type: 'yf'
  },
  klwdc: {
    label: '枯落物调查表',
    formData: [],
    api: { name: 'klwdc', title: 'LvTable' },
    config: klwdcConfig,
    type: 'yf',
    disabled: true
  },
  fzzdc: {
    label: '腐殖质调查表',
    formData: [],
    api: { name: 'fzzdc', title: 'LvTable' },
    type: 'yf',
    config: fzzdcConfig,
    disabled: true
  },
  cbdcQm: {
    label: '草本调查表',
    formData: [],
    api: { name: 'cbdc', title: 'LvTable' },
    type: 'yf',
    config: cbdcQmConfig,
    disabled: true
  },
  cbdcGm: {
    label: '草本调查表',
    formData: [],
    api: { name: 'cbdc', title: 'LvTable' },
    type: 'yf',
    config: cbdcGmConfig,
    disabled: true
  },
  // 灌木林灌木层标准木可燃物载量测定记录表
  gmlbzmkrwzlcd: {
    label: '灌木林灌木层标准木可燃物载量测定记录表',
    formData: [],
    api: { name: 'gmlbzmkrwzlcd', title: 'tjTable' },
    type: 'yf',
    config: gmlbzmkrwzlcdConfig,
    disabled: true
  },
  // 灌木林灌木层调查基本情况表
  gmlyf: {
    label: '灌木林灌木层调查基本情况表',
    formData: [],
    api: { name: 'gmlyf', fuName: 'gmhz', title: 'LvTable' },
    config: gmlyfConfig,
    fuConfig: gmhzConfig,
    type: 'yf',
    disabled: true
  },
  // 灌木林灌木层灌木标准木取样记录表
  gmlgmbzmqyjl: {
    label: '灌木林灌木层灌木标准木取样记录表',
    formData: [],
    api: { name: 'gmlgmbzmqyjl', title: 'gmlgmbzmqyjl' },
    type: 'yf'
  },
  // 干鲜比样品测定表
  ypcd: {
    label: '干鲜比样品测定表',
    formData: [],
    api: { name: 'ypcd', title: 'ypcd' },
    type: 'yd'
  },
  // 大样地干鲜比样品测定表
  dydypcd: {
    label: '干鲜比样品测定表',
    formData: [],
    api: { name: 'ypcd', title: 'dydypcd' },
    type: 'yd'
  },
  // 枯倒木样品测定表
  kdmypcd: {
    label: '枯倒木样品测定表',
    formData: [],
    api: { name: 'kdmqyjl', title: 'kdmypcd' },
    type: 'yd',
    disabled: true
  },
  // 样方照片表
  yfimgs: {
    label: '样方图片表',
    formData: [],
    api: { name: 'yfimgs', title: 'yfimgs' },
    type: 'yf',
    disabled: true
  }
}

// 统计表
const tableOfTJ = {
  // 乔木层可燃物载量统计表(标准地)
  tjqmckrwzltj: {
    label: '乔木层可燃物载量统计表',
    name: 'tjqmckrwzltj',
    config: tjqmckrwzlConfig,
    krwzlData: {
      type: 'type',
      yssz: 'yssz',
      szz: 'szz',
      gmzm: 'not',
      zzl: 'bzdKrwzl',
      dwmjkrwzl: 'dwmjkrwzl',
      zxjl: 'zxjl'
    },
    formData: [],
    api: { name: 'tjqmckrwzl', title: 'tjTable' },
    type: 'tj'
  },
  // 乔木层可燃物载量统计表(大样地)
  jgtj: {
    label: '乔木层可燃物载量统计表',
    name: 'jgtj',
    formData: [],
    krwzlData: {
      lfx: 'lfx',
      type: 'type',
      gmzm: 'not',
      zzl: 'zkrwzl',
      dwmjkrwzl: 'mgqkrwzl',
      pjxj: 'pjxj',
      pjg: 'pjg',
      mgqxj: 'mgqxj',
      zxj: 'zxj'
    },
    api: { name: 'jgtj', title: 'tjTable' },
    type: 'tj',
    config: tjqmkrwzlConfig
  },
  // 灌木层可燃物载量统计表(乔木)
  qmgmckrwzltj: {
    label: '灌木层可燃物载量统计表',
    name: 'qmgmckrwzltj',
    config: tjgmckrwzlConfig,
    krwzlData: {
      type: 'type',
      yssz: 'yssz',
      szz: 'not',
      gmzm: 'ysgmz',
      zzl: 'ydgmKrwzl',
      dwmjkrwzl: 'dwmjgmKrwzl',
      zxjl: 'not'
    },
    formData: [],
    api: { name: 'tjgmckrwzl', title: 'tjTable' },
    type: 'tj'
  },
  // 灌木层可燃物载量统计表(灌木)
  gmgmckrwzltj: {
    label: '灌木层可燃物载量统计表',
    name: 'gmgmckrwzltj',
    config: tjgmlkrwzlConfig,
    krwzlData: {
      type: 'type',
      yssz: 'yssz',
      szz: 'not',
      gmzm: 'ysgmz',
      zzl: 'ydgmKrwzl',
      dwmjkrwzl: 'dwmjgmKrwzl',
      zxjl: 'not'
    },
    formData: [],
    api: { name: 'tjgmlkrwzl', title: 'tjTable' },
    type: 'tj'
  },
  // 枯立木可燃物载量统计表
  klmkrwzltj: {
    label: '枯立木可燃物载量统计表',
    name: 'klmkrwzltj',
    krwzlData: {
      type: 'type',
      yssz: 'yssz',
      szz: 'not',
      gmzm: 'not',
      zzl: 'ydKlmzzl',
      dwmjkrwzl: 'dwmjKlmkrwzl',
      zxjl: 'zxjl'
    },
    config: tjklmkrwzlConfig,
    formData: [],
    api: { name: 'tjklmkrwzl', title: 'tjTable' },
    type: 'tj'
  },
  // 枯落物层可燃物载量统计表
  klwckrwzltj: {
    label: '枯落物层可燃物载量统计表',
    name: 'klwckrwzltj',
    config: tjklwckrwzlConfig,
    krwzlData: [
      {
        type: 'type',
        yssz: 'yssz',
        szz: 'not',
        gmzm: 'not',
        zzl: 'ydKlw1Zzl',
        dwmjkrwzl: 'dwmjKlw1Zl',
        zxjl: 'not'
      },
      {
        type: 'type',
        yssz: 'yssz',
        szz: 'not',
        gmzm: 'not',
        zzl: 'ydKlw2Zzl',
        dwmjkrwzl: 'dwmjKlw2Zl',
        zxjl: 'not'
      },
      {
        type: 'type',
        yssz: 'yssz',
        szz: 'not',
        gmzm: 'not',
        zzl: 'ydKlw3Zzl',
        dwmjkrwzl: 'dwmjKlw3Zl',
        zxjl: 'not'
      }
    ],
    formData: [],
    api: { name: 'tjklwckrwzl', title: 'tjTable' },
    type: 'tj'
  },
  // 草本层可燃物载量统计表
  cbckrwzltj: {
    label: '草本层可燃物载量统计表',
    name: 'cbckrwzltj',
    config: tjcbckrwzlConfig,
    krwzlData: {
      type: 'type',
      yssz: 'yssz',
      szz: 'not',
      gmzm: 'not',
      zzl: 'ydcbcZzl',
      dwmjkrwzl: 'dwmjCbkrwzl',
      zxjl: 'not'
    },
    formData: [],
    api: { name: 'tjcbckrwzl', title: 'tjTable' },
    type: 'tj'
  },
  // 腐殖质层可燃物载量统计表
  fzzckrwzltj: {
    label: '腐殖质层可燃物载量统计表',
    name: 'fzzckrwzltj',
    config: tjfzzckrwzlConfig,
    krwzlData: {
      type: 'type',
      yssz: 'yssz',
      szz: 'not',
      gmzm: 'not',
      zzl: 'ydFzzzzl',
      dwmjkrwzl: 'dwmjFzzkrwzl',
      zxjl: 'not'
    },
    formData: [],
    api: { name: 'tjfzzckrwzl', title: 'tjTable' },
    type: 'tj'
  },
  // 枯倒木可燃物载量统计表
  kdmkrwzltj: {
    label: '枯倒木可燃物载量统计表',
    name: 'kdmkrwzltj',
    config: tjkdmkrwzlszConfig,
    formData: [],
    krwzlData: {
      type: 'type',
      yssz: 'yssz',
      szz: 'not',
      gmzm: 'not',
      zzl: 'ydKdmzzl',
      dwmjkrwzl: 'dwmjKdmkrwzl',
      zxjl: 'not'
    },
    api: { name: 'tjkdmkrwzl', title: 'kdmkrwzlsz' },
    type: 'tj'
  },
  // 干鲜比汇总表（标准地）
  gxbhztj: {
    label: '干鲜比汇总表',
    name: 'gxbhztj',
    config: gxbhzConfig,
    formData: [],
    api: { name: 'gxbhz', title: 'tjTable', isCanAudit: true },
    type: 'tj'
  },
  // 干鲜比汇总表(大样地)
  dydgxbhztj: {
    label: '干鲜比汇总表',
    name: 'dydgxbhztj',
    config: dydgxbhzConfig,
    formData: [],
    api: { name: 'gxbhz', title: 'tjTable', isCanAudit: true },
    type: 'tj',
    disabled: true
  },
  // 平衡含水率汇总表
  phhslhztj: {
    label: '平衡含水率汇总表',
    name: 'phhslhztj',
    config: tjphhslConfig,
    formData: [],
    api: { name: 'phhslhz', title: 'tjTable' },
    type: 'tj'
  },
  // 燃点热值汇总表
  rdrzhztj: {
    label: '燃点热值汇总表',
    name: 'rdrzhztj',
    config: tjrdrzConfig,
    formData: [],
    api: { name: 'rdrzhz', title: 'tjTable' },
    type: 'tj'
  },
  // 枯倒木基本密度汇总表
  kdmjbmdhztj: {
    label: '枯倒木基本密度汇总表',
    name: 'kdmjbmdhztj',
    config: tjkdmjbmdConfig,
    formData: [],
    api: { name: 'kdmjbmdhz', title: 'tjTable', isCanAudit: true },
    type: 'tj'
  },
  // 灌木树种取样统计表
  gmqytj: {
    label: '灌木树种取样统计表',
    name: 'gmqytj',
    config: gmqytjlConfig,
    formData: [],
    api: { name: 'gmqytj', title: 'tjTable' },
    type: 'tj'
  },
  // 灌木可燃物载量统计表
  gmkrwzltj: {
    label: '灌木可燃物载量统计表',
    name: 'gmkrwzltj',
    config: tjgmkrwzlConfig,
    krwzlData: {
      lfx: 'fcbh',
      type: 'type',
      gmzm: 'ysgmz',
      zzl: 'ydgmKrwzl',
      dwmjkrwzl: 'dwmjgmKrwzl',
      pjxj: 'not',
      pjg: 'not',
      mgqxj: 'not',
      zxj: 'not'
    },
    formData: [],
    api: { name: 'tjgmkrwzl', title: 'tjTable' },
    type: 'tj',
    disabled: true
  },
  // 枯落物可燃物载量统计表
  klwkrwzltj: {
    label: '枯落物可燃物载量统计表',
    name: 'klwkrwzltj',
    config: tjklwkrwzlConfig,
    krwzlData: [
      {
        lfx: 'fcbh',
        type: 'type',
        gmzm: 'not',
        zzl: 'ydKlw1Zzl',
        dwmjkrwzl: 'dwmjKlw1Zl',
        pjxj: 'not',
        pjg: 'not',
        mgqxj: 'not',
        zxj: 'not'
      },
      {
        lfx: 'fcbh',
        type: 'type',
        gmzm: 'not',
        zzl: 'ydKlw2Zzl',
        dwmjkrwzl: 'dwmjKlw2Zl',
        pjxj: 'not',
        pjg: 'not',
        mgqxj: 'not',
        zxj: 'not'
      },
      {
        lfx: 'fcbh',
        type: 'type',
        gmzm: 'not',
        zzl: 'ydKlw3Zzl',
        dwmjkrwzl: 'dwmjKlw3Zl',
        pjxj: 'not',
        pjg: 'not',
        mgqxj: 'not',
        zxj: 'not'
      }
    ],
    formData: [],
    api: { name: 'tjklwkrwzl', title: 'tjTable' },
    type: 'tj',
    disabled: true
  },
  // 草本可燃物载量统计表
  cbkrwzltj: {
    label: '草本可燃物载量统计表',
    name: 'cbkrwzltj',
    config: tjcbkrwzlConfig,
    krwzlData: {
      lfx: 'fcbh',
      type: 'type',
      gmzm: 'not',
      zzl: 'ydcbcZzl',
      dwmjkrwzl: 'dwmjCbkrwzl',
      pjxj: 'not',
      pjg: 'not',
      mgqxj: 'not',
      zxj: 'not'
    },
    formData: [],
    api: { name: 'tjcbkrwzl', title: 'tjTable' },
    type: 'tj',
    disabled: true
  },
  // 腐殖质可燃物载量统计表
  fzzkrwzltj: {
    label: '腐殖质可燃物载量统计表',
    name: 'fzzkrwzltj',
    config: tjfzzkrwzlConfig,
    krwzlData: {
      lfx: 'fcbh',
      type: 'type',
      gmzm: 'not',
      zzl: 'ydFzzzzl',
      dwmjkrwzl: 'dwmjFzzkrwzl',
      pjxj: 'not',
      pjg: 'not',
      mgqxj: 'not',
      zxj: 'not'
    },
    formData: [],
    api: { name: 'tjfzzkrwzl', title: 'tjTable' },
    type: 'tj',
    disabled: true
  }
}

// 可燃物载量统计
const krwzlOfTj = {
  // 可燃物载量统计表（乔木）
  qmkrwtj: {
    label: '可燃物载量统计表',
    name: 'krwtj',
    config: [
      tableOfTJ.tjqmckrwzltj,
      tableOfTJ.qmgmckrwzltj,
      // tableOfTJ.klmkrwzltj,
      tableOfTJ.klwckrwzltj,
      tableOfTJ.cbckrwzltj,
      tableOfTJ.fzzckrwzltj,
      tableOfTJ.kdmkrwzltj
    ],
    formData: [],
    api: { name: 'krwtj', title: 'krwtj', isCanAudit: true },
    type: 'tj',
    disabled: true,
    isNotStatistics: true
  },
  // 可燃物载量统计表（灌木）
  gmkrwtj: {
    label: '可燃物载量统计表',
    name: 'krwtj',
    config: [
      tableOfTJ.gmgmckrwzltj,
      tableOfTJ.klwckrwzltj,
      tableOfTJ.cbckrwzltj,
      tableOfTJ.fzzckrwzltj
    ],
    formData: [],
    api: { name: 'krwtj', title: 'krwtj', isCanAudit: true },
    type: 'tj',
    disabled: true,
    isNotStatistics: true
  },
  // 可燃物载量统计表（大样地）
  dydkrwtj: {
    label: '可燃物载量统计表',
    name: 'krwtj',
    config: [
      tableOfTJ.jgtj,
      tableOfTJ.gmkrwzltj,
      tableOfTJ.klwkrwzltj,
      tableOfTJ.cbkrwzltj,
      tableOfTJ.fzzkrwzltj
    ],
    formData: [],
    api: { name: 'krwtj', title: 'krwtj', isCanAudit: true },
    type: 'tj',
    disabled: true,
    isNotStatistics: true
  }
}

export const statisticsFormConfig = {
  bzd: {
    qm: [
      // 乔木层可燃物载量统计表
      tableOfTJ.tjqmckrwzltj,
      // 灌木层可燃物载量统计表(乔木)
      tableOfTJ.qmgmckrwzltj,
      // 灌木树种取样统计表
      tableOfTJ.gmqytj,
      // 枯立木可燃物载量统计表（枯立木载量改成在乔木层可燃物载量中与活立木合并计算，不独立显示）
      // tableOfTJ.klmkrwzltj,
      // 枯落物层可燃物载量统计表
      tableOfTJ.klwckrwzltj,
      // 草本层可燃物载量统计表
      tableOfTJ.cbckrwzltj,
      // 腐殖质层可燃物载量统计表
      tableOfTJ.fzzckrwzltj,
      // 枯倒木可燃物载量统计表
      tableOfTJ.kdmkrwzltj,
      // 可燃物载量统计表(审核时显示)
      krwzlOfTj.qmkrwtj,
      // 干鲜比汇总表
      tableOfTJ.gxbhztj,
      // 平衡含水率汇总表
      tableOfTJ.phhslhztj,
      // 燃点热值汇总表
      tableOfTJ.rdrzhztj,
      // 枯倒木基本密度汇总表
      tableOfTJ.kdmjbmdhztj
    ],
    gm: [
      // 灌木层可燃物载量统计表(灌木)
      tableOfTJ.gmgmckrwzltj,
      // 灌木树种取样统计表
      tableOfTJ.gmqytj,
      // 枯落物层可燃物载量统计表
      tableOfTJ.klwckrwzltj,
      // 草本层可燃物载量统计表
      tableOfTJ.cbckrwzltj,
      // 腐殖质层可燃物载量统计表
      tableOfTJ.fzzckrwzltj,
      // 可燃物载量统计表(审核时显示)
      krwzlOfTj.gmkrwtj,
      // 干鲜比汇总表
      tableOfTJ.gxbhztj,
      // 平衡含水率汇总表
      tableOfTJ.phhslhztj,
      // 燃点热值汇总表
      tableOfTJ.rdrzhztj
    ]
  },
  dyd: [
    // 乔木层可燃物载量统计表
    tableOfTJ.jgtj,
    // 灌木树种取样统计表
    tableOfTJ.gmqytj,
    // 灌木可燃物载量统计表
    tableOfTJ.gmkrwzltj,
    // 枯落物可燃物载量统计表
    tableOfTJ.klwkrwzltj,
    // 草本可燃物载量统计表
    tableOfTJ.cbkrwzltj,
    // 腐殖质可燃物载量统计表
    tableOfTJ.fzzkrwzltj,
    // 可燃物载量统计表(审核时显示)
    krwzlOfTj.dydkrwtj,
    // 干鲜比汇总表
    tableOfTJ.dydgxbhztj
  ]
}

// 实验室样地
export const expFormConfig = {
  // 标准地乔木
  qm: [
    // 标准地因子调查表
    tableInfo.bzdyz,
    // 乔木每木检尺记录表
    tableInfo.qmmmjc,
    // 竹林调查表
    tableInfo.zldc,
    // 枯倒木调查表
    tableInfo.kdm,
    // 枯倒木材积区分调查表
    tableInfo.kdmcjqf,
    // 枯倒木材积和载量计算表
    tableInfo.kdmcjzl,
    // 草本调查表
    tableInfo.cbdcQm,
    // 腐殖质调查表
    tableInfo.fzzdc,
    // 枯落物调查表
    tableInfo.klwdc,
    // 灌木层调查基本情况表
    tableInfo.gmcdc,
    // 灌木层标准木可燃物载量测定记录表
    tableInfo.gmcbzmkrwzlcd,
    // 灌木层灌木标准木取样记录表
    // tableInfo.gmcgmbzm,
    // 干鲜比样品测定表
    tableInfo.ypcd,
    // 枯倒木样品测定表
    tableInfo.kdmypcd,
    // 特大枯倒木样品测定表
    tableInfo.tdkdmqyjl
  ],
  // 灌木林标准地
  gm: [
    // 标准地因子调查表
    tableInfo.bzdyz,
    // 草本调查表
    tableInfo.cbdcGm,
    // 腐殖质调查表
    tableInfo.fzzdc,
    // 枯落物调查表
    tableInfo.klwdc,
    // 灌木林灌木层调查基本情况表
    tableInfo.gmlyf,
    // 灌木林灌木层标准木可燃物载量测定记录表
    tableInfo.gmlbzmkrwzlcd,
    // 灌木林灌木层灌木标准木取样记录表
    // tableInfo.gmlgmbzmqyjl,
    // 干鲜比样品测定表
    tableInfo.ypcd
  ],
  dyd: [
    {
      label: '大样地因子调查记录表',
      name: 'ydForm1',
      config: dydyzConfig,
      formData: {},
      api: { name: 'dydyz', title: 'objTable' },
      type: 'yd',
      disabled: true
    },
    {
      label: '竹林调查表',
      formData: [],
      config: zldcConfig,
      api: { name: 'zldc_dyd', title: 'LvTable' },
      type: 'yd',
      disabled: true
    },
    {
      label: '角规数据统计表',
      name: 'ydForm2',
      formData: [],
      api: { name: 'jgtj', title: 'jgsjtj' },
      type: 'yd',
      disabled: true
    },
    tableInfo.dydypcd,
    {
      label: '灌木调查记录表',
      name: 'yf6Form1',
      config: gmdcjlConfig,
      formData: [],
      api: { name: 'gmdcjl', title: 'LvTable' },
      type: 'yf',
      disabled: true
    },
    {
      label: '灌木标准木可燃物载量测定记录表',
      name: 'yf6Form3',
      config: gmlbzmkrwzlcdConfig,
      formData: [],
      api: { name: 'gmbzmkrwzlcd', title: 'LvTable' },
      type: 'yf',
      disabled: true
    },
    {
      label: '草本调查记录表',
      name: 'yf7Form1',
      config: cbdcjlConfig,
      formData: [],
      api: { name: 'cbdcjl', title: 'LvTable' },
      type: 'yf',
      disabled: true
    },
    {
      label: '腐殖质调查记录表',
      name: 'yf7Form2',
      config: fzzdcjlConfig,
      formData: [],
      api: { name: 'fzzdcjl', title: 'LvTable' },
      type: 'yf',
      disabled: true
    },
    {
      label: '枯落物调查记录表',
      name: 'yf7Form3',
      config: klwdcjlConfig,
      formData: [],
      api: { name: 'klwdcjl', title: 'LvTable' },
      type: 'yf',
      disabled: true
    }
  ],
  // 样方
  yf: {
    1: [
      {
        label: '灌木层调查基本情况表',
        name: 'yf1Form1',
        config: gmcdcConfig,
        formData: null,
        api: { name: 'gmcdc', title: 'objTable' },
        type: 'yf',
        disabled: true
      },
      {
        label: '灌木层标准木可燃物载量测定记录表',
        name: 'yf1Form2',
        config: gmcbzmkrwzlcdConfig,
        formData: null,
        api: { name: 'gmcbzmkrwzlcd', title: 'tjTable' },
        type: 'yf',
        disabled: true
      }
      // {
      //   label: '灌木层灌木标准木取样记录表',
      //   name: 'yf1Form3',
      //   config: gmcgmbzmConfig,
      //   formData: null,
      //   api: { name: 'gmcgmbzm', title: 'gmcgmbzm' },
      //   type: 'yf'
      // }
    ],
    2: [
      {
        label: '草本调查表',
        name: 'yf2Form1',
        formData: null,
        api: { name: 'cbdc', title: 'objTable' },
        type: 'yf'
      },
      {
        label: '腐殖质调查表',
        name: 'yf2Form2',
        config: fzzdcConfig,
        formData: null,
        api: { name: 'fzzdc', title: 'objTable' },
        type: 'yf'
      },
      {
        label: '枯落物调查表',
        name: 'yf7Form3',
        config: klwdcjlConfig,
        formData: null,
        api: { name: 'klwdc', title: 'objTable' },
        type: 'yf',
        disabled: true
      }
      // {
      //   label: '枯落物1调查表',
      //   name: 'yf4Form3_1',
      //   config: klwdcConfig,
      //   formData: null,
      //   api: { name: 'klwdc1', title: 'klwdc1' },
      //   type: 'yf'
      // },
      // {
      //   label: '枯落物2调查表',
      //   name: 'yf2Form3_2',
      //   config: klwdcConfig,
      //   formData: null,
      //   api: { name: 'klwdc2', title: 'klwdc2' },
      //   type: 'yf'
      // },
      // {
      //   label: '枯落物3调查表',
      //   name: 'yf2Form3_3',
      //   config: klwdcConfig,
      //   formData: null,
      //   api: { name: 'klwdc3', title: 'klwdc3' },
      //   type: 'yf'
      // }
    ],
    3: [
      {
        label: '灌木林灌木层调查基本情况表',
        name: 'yf3Form1',
        config: gmlyfConfig,
        formData: null,
        api: { name: 'gmlyf', title: 'objTable' },
        type: 'yf',
        disabled: true
      },
      {
        label: '灌木林灌木层标准木可燃物载量测定记录表',
        name: 'yf3Form2',
        config: gmlbzmkrwzlcdConfig,
        formData: null,
        api: { name: 'gmlbzmkrwzlcd', title: 'tjTable' },
        type: 'yf',
        disabled: true
      }
      // {
      //   label: '灌木林灌木层标准木可燃物载量测定记录表',
      //   name: 'yf3Form2',
      //   config: gmlbzmkrwzlcdConfig,
      //   formData: null,
      //   api: { name: 'gmlbzmkrwzlcd', title: 'objTable' },
      //   type: 'yf',
      //   disabled: true
      // }
      // {
      //   label: '灌木林灌木层灌木标准木取样记录表',
      //   name: 'yf3Form3',
      //   config: gmlgmbzmqyjlConfig,
      //   formData: null,
      //   api: { name: 'gmlgmbzmqyjl', title: 'gmlgmbzmqyjl' },
      //   type: 'yf'
      // }
    ],
    4: [
      {
        label: '草本调查表',
        name: 'yf4Form1',
        formData: null,
        api: { name: 'gm_cbdc', title: 'objTable' },
        type: 'yf'
      },
      {
        label: '腐殖质调查表',
        name: 'yf4Form2',
        config: fzzdcConfig,
        formData: null,
        api: { name: 'gm_fzzdc', title: 'objTable' },
        type: 'yf'
      },
      {
        label: '枯落物调查表',
        name: 'yf2Form3',
        config: klwdcConfig,
        formData: null,
        api: { name: 'klwdc', title: 'objTable' },
        type: 'yf'
      }
      // {
      //   label: '枯落物1调查表',
      //   name: 'yf4Form3_1',
      //   config: klwdcConfig,
      //   formData: null,
      //   api: { name: 'gm_klwdc1', title: 'gm_klwdc1' },
      //   type: 'yf'
      // },
      // {
      //   label: '枯落物2调查表',
      //   name: 'yf4Form3_2',
      //   config: klwdcConfig,
      //   formData: null,
      //   api: { name: 'gm_klwdc2', title: 'gm_klwdc2' },
      //   type: 'yf'
      // },
      // {
      //   label: '枯落物3调查表',
      //   name: 'yf4Form3_3',
      //   config: klwdcConfig,
      //   formData: null,
      //   api: { name: 'gm_klwdc3', title: 'gm_klwdc3' },
      //   type: 'yf'
      // }
    ],
    5: [
      {
        label: '角规控制检尺记录表',
        name: 'yf5Form1',
        config: jgrcConfig,
        formData: [],
        api: { name: 'jgrc', title: 'LvTable' },
        type: 'yd',
        disabled: true
      },
      {
        label: '替代角规调查表(样圆、样带)',
        name: 'yf5Form1',
        formData: [],
        api: { name: 'tdjgdc', title: 'tdjgdc' },
        type: 'yd',
        disabled: true
      }
      // 角规控制检尺记录表
    ],
    6: [
      {
        label: '灌木调查记录表',
        name: 'yf6Form1',
        config: gmdcjlConfig,
        formData: null,
        api: { name: 'gmdcjl', title: 'LvTable' },
        type: 'yf',
        disabled: true
      },
      {
        label: '灌木标准木可燃物载量测定记录表',
        name: 'yf6Form3',
        config: gmlbzmkrwzlcdConfig,
        formData: null,
        api: { name: 'gmbzmkrwzlcd', title: 'LvTable' },
        type: 'yf'
      }
      // {
      //   label: '灌木标准木取样记录表',
      //   name: 'yf6Form3',
      //   config: gmbzmqyjlConfig,
      //   formData: null,
      //   api: { name: 'gmbzmqyjl' },
      //   type: 'yf'
      // }
    ],
    7: [
      {
        label: '草本调查记录表',
        name: 'yf7Form1',
        config: cbdcjlConfig,
        formData: null,
        api: { name: 'cbdcjl', title: 'LvTable' },
        type: 'yf',
        disabled: true
      },
      {
        label: '腐殖质调查记录表',
        name: 'yf7Form2',
        config: fzzdcjlConfig,
        formData: null,
        api: { name: 'fzzdcjl', title: 'LvTable' },
        type: 'yf',
        disabled: true
      },
      {
        label: '枯落物调查记录表',
        name: 'yf7Form3',
        config: klwdcjlConfig,
        formData: null,
        api: { name: 'klwdcjl', title: 'LvTable' },
        type: 'yf',
        disabled: true
      }
    ]
  }
}

// 实验室可以填写的表
// 参考幕布文档：https://mubu.com/doc/5R-KVw1RVWH#mindmap
export const sysCanAddChild = (item) => {
  const n = [
    // 森林可燃物时滞测定表
    'slkrwszcd',
    // 森林可燃物燃点热值测定表
    'slkrwrdrzcd',
    // 森林可燃物平衡含水率测定表
    'slkrwphhsl'
  ]
  const apiName = Object.keys(item).length > 0 && item.api && item.api.name
  return n.includes(`${apiName}`)
}

const caoyuanTable = {
  // 草原可燃物样地基本特征调查表
  cyydjbtz: {
    label: '草原可燃物样地基本特征调查表 ',
    formData: {},
    api: { name: 'cyydjbtz', title: 'cyydjbtz' },
    type: 'yd',
    disabled: true
  },
  // 草本及矮小灌木草原样方调查表（草本及矮小灌木草原样地）
  cycbaxyf: {
    label: '草本及矮小灌木草原样方调查表 ',
    formData: [],
    api: { name: 'cycbaxyf', title: 'cbaxgmcyyfdc' },
    type: 'xyf',
    disabled: true
  },
  // 草本样品取样测定表（草本及矮小灌木草原样地）
  cycbqycd: {
    label: '草本样品取样测定表',
    formData: [],
    api: { name: 'cycbqycd', title: 'cbypcd' },
    type: 'yd',
    disabled: false
  },
  // 枯落物样品取样测定表（草本及矮小灌木草原样地）
  cyklwqycd: {
    label: '枯落物样品取样测定表',
    formData: [],
    api: { name: 'cyklwqycd', title: 'klwypdc' },
    type: 'yd',
    disabled: false
  },
  // 具有灌木及高大草本植物草原样方调查表（具有灌木及高大草本植物草原样地）
  cygmgdyf: {
    label: '具有灌木及高大草本植物草原样方调查表 ',
    formData: [],
    api: { name: 'cygmgdyf', title: 'jygmgmcbzwcyyfdc' },
    type: 'dyf',
    disabled: true
  },
  // 灌木（高大草本）取样测定表（具有灌木及高大草本植物草原样地）
  cydyfgmqycd: {
    label: '灌木（高大草本）取样测定表 ',
    formData: {},
    api: { name: 'cydyfgmqycd', title: 'gmgdcbqycd' },
    type: 'dyf',
    disabled: false
  },
  // 草本及矮小灌木草原样方调查表（具有灌木及高大草本植物草原样地）
  cydyfcbaxyf: {
    label: '草本及矮小灌木草原样方调查表 ',
    formData: [],
    api: { name: 'cydyfcbaxyf', title: 'cbaxgmcyyfdc' },
    type: 'xyf',
    disabled: true
  },
  // 草本样品取样测定表（具有灌木及高大草本植物草原样地）
  cydyfcbqycd: {
    label: '草本样品取样测定表',
    formData: [],
    api: { name: 'cydyfcbqycd', title: 'cbypcd' },
    type: 'dyf',
    disabled: false
  },
  // 枯落物样品取样测定表（具有灌木及高大草本植物草原样地）
  cydyfklwqycd: {
    label: '枯落物样品取样测定表',
    formData: [],
    api: { name: 'cydyfklwqycd', title: 'klwypdc' },
    type: 'dyf',
    disabled: false
  }
}

export const caoyuanFormConfig = {
  ax: {
    yd: [
      // 草原可燃物样地基本特征调查表
      caoyuanTable.cyydjbtz,
      // 草本样品取样测定表
      caoyuanTable.cycbqycd,
      // 枯落物样品取样测定表
      caoyuanTable.cyklwqycd
    ],
    xyf: [
      // 草本及矮小灌木草原样方调查表
      caoyuanTable.cycbaxyf
    ]
  },
  gd: {
    yd: [
      // 草原可燃物样地基本特征调查表
      caoyuanTable.cyydjbtz,
      // 灌木（高大草本）取样测定表
      caoyuanTable.cydyfgmqycd,
      // 草本样品取样测定表
      caoyuanTable.cydyfcbqycd,
      // 枯落物样品取样测定表
      caoyuanTable.cydyfklwqycd
    ],
    dyf: [
      // 具有灌木及高大草本植物草原样方调查表
      caoyuanTable.cygmgdyf
    ],
    xyf: [
      // 草本及矮小灌木草原样方调查表
      caoyuanTable.cydyfcbaxyf
    ]
  }
}
