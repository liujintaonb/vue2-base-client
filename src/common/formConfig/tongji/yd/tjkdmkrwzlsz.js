// 枯倒木可燃物载量统计表
import { kg, thm2 } from '@/common/unit'

export const config = [
  {
    label: '行政区域',
    prop: 'xzCodeName',
    isTjTaleShow: true
  },
  {
    label: '标准地编号',
    prop: 'ydbh',
    isTjTaleShow: true
  },
  {
    label: '优势树种（组）',
    prop: 'yssz'
  },
  {
    label: '样地枯倒木总载量' + kg,
    prop: 'ydKdmzzl'
  },
  {
    label: '单位面积枯倒木可燃物载量' + thm2,
    prop: 'dwmjKdmkrwzl'
  },
  {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    width: 150,
    isTjTaleShow: true,
    formatActions () {
      return [
        {
          label: '详情',
          action: 'viewDetail'
        }
      ]
    }
  }
]
