// 灌木林灌木层调查基本情况表
import { m, m2 } from '@/common/unit'

export const config1 = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '灌木型',
    prop: 'gmx'
  },
  {
    label: '盖度(%)',
    prop: 'gd'
  },
  {
    label: '优势种名',
    prop: 'yszm'
  },
  {
    label: '样方株数/丛数',
    prop: 'zs'
  },
  {
    label: '平均高' + m,
    prop: 'pjg'
  },
  {
    label: '面积' + m2,
    prop: 'mj'
  },
  {
    label: '备注',
    prop: 'bz'
  },
  {
    label: '状态',
    prop: 'tianbao',
    format: (item, row) => {
      return row.tianbao === '0' ? '无相关数据，不填报' : '已填报'
    }
  }
]

export const config2 = [
  {
    label: '灌木林平均盖度(%)',
    prop: 'gmpjgd'
  },
  {
    label: '灌木平均高' + m,
    prop: 'gmpjg'
  },
  {
    label: '单位面积灌木株数(株数/平方米)',
    prop: 'dwmjgmzs'
  }
]
