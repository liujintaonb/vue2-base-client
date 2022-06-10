//  标准地因子调查记录表
import { cm, m, m2 } from '@/common/unit'

export const config = [
  {
    label: '地貌',
    prop: 'diMao'
  },
  {
    label: '地类',
    prop: 'diLei'
  },
  {
    label: '干扰程度',
    prop: 'ganRaoCd'
  },
  {
    label: '干扰类型',
    prop: 'ganRaoLx'
  },
  {
    label: '经营管理措施',
    prop: 'jingYingGl'
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
    label: '林龄',
    prop: 'linLing'
  },
  {
    label: '龄组',
    prop: 'lingZu'
  },
  {
    label: '平均树高' + m,
    prop: 'pingjunSg'
  },
  {
    label: '平均地径' + cm,
    prop: 'pingjunXj'
  },
  {
    label: '坡度',
    prop: 'poDu'
  },
  {
    label: '坡位',
    prop: 'poWei'
  },
  {
    label: '坡向',
    prop: 'poXiang'
  },
  {
    label: '起源',
    prop: 'qiYuan'
  },
  {
    label: '群落类型',
    prop: 'qunluoLx'
  },
  {
    label: '树种组成',
    prop: 'szZc'
  },
  {
    label: '土壤类型',
    prop: 'tuRangLx'
  },
  {
    label: '土壤亚类',
    prop: 'tuRangYl'
  },
  {
    label: '郁闭度',
    prop: 'yuBiDu'
  },
  {
    label: '样地规格',
    prop: 'ydGg'
  },
  {
    label: '样地面积' + m2,
    prop: 'ydMj'
  },
  {
    label: '优势树种',
    prop: 'youShiSz'
  },
  {
    label: '气候分区',
    prop: 'qiHouQu'
  },
  {
    label: '森林类型',
    prop: 'senLinLx'
  },
  {
    label: '枯落物和腐殖质损失程度',
    prop: 'klwFzzSscd'
  },
  {
    label: '备注',
    prop: 'bz'
  }
]
