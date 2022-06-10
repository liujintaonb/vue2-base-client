// 大样地因子调查记录表
import { cm, m, m2, m3, hm2 } from '@/common/unit'

export const config = [
  {
    label: '地类',
    prop: 'dl'
  },
  {
    label: '地貌',
    prop: 'diMao'
  },
  {
    label: '林业局',
    prop: 'linYeJu'
  },
  {
    label: '林场',
    prop: 'linChang'
  },
  {
    label: '省（市/自治区）',
    prop: 'sheng'
  },
  {
    label: '县（旗）',
    prop: 'xian'
  },
  {
    label: '乡',
    prop: 'xiang'
  },
  {
    label: '村（林区）',
    prop: 'cun'
  },
  {
    label: '立地类型',
    prop: 'ldlx'
  },
  {
    label: '平均海拔' + m,
    prop: 'pjhb'
  },
  {
    label: '平均胸径' + cm,
    prop: 'pjxj',
    markValue: 'dydyz_pjxj'
  },
  {
    label: '平均树高' + m,
    prop: 'pjsg'
  },
  {
    label: '平均年龄',
    prop: 'pjnl'
  },
  {
    label: '健康状况',
    prop: 'jkzk'
  },
  {
    label: '每公顷断面积' + m2,
    prop: 'mgqqdmj',
    markValue: 'dydyz_mgqqdmj'
  },
  {
    label: '每公顷株数',
    prop: 'mgqzs',
    markValue: 'dydyz_mgqzs'
  },
  {
    label: '每公顷蓄积' + m3,
    prop: 'mgqxj',
    markValue: 'dydyz_mgqxj'
  },
  {
    label: '树种组成',
    prop: 'szzc',
    markValue: 'dydyz_szzc'
  },
  {
    label: '起源',
    type: 'input',
    prop: 'qy',
    placeholder: '请输入起源',
    span: 8,
    width: '150px'
  },
  {
    label: '郁闭度',
    prop: 'ybd'
  },
  {
    label: '优势木平均高' + m,
    prop: 'ysmpjg'
  },
  {
    label: '自然度',
    prop: 'zrd'
  },
  {
    label: '坡度',
    prop: 'pd'
  },
  {
    label: '坡位',
    prop: 'pw'
  },
  {
    label: '坡向',
    prop: 'poXiang'
  },
  {
    label: '枝下高(cm)',
    prop: 'zxg'
  },
  {
    label: '林分型图斑面积' + hm2,
    prop: 'mj'
  },
  {
    label: '优势树种(组)',
    prop: 'yssz',
    markFill: 'yssz'
  },
  {
    label: '群落结构',
    prop: 'qunluoLx'
  },
  {
    label: '备注',
    prop: 'bz'
  }
]
