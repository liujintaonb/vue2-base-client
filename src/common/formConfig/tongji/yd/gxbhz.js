// 干鲜比汇总表
import { percentage } from '@/common/unit'
import { setPercent } from '@/common/baseFunction'

export const config1 = [
  {
    label: '行政区划',
    prop: 'xzCodeName',
    isTjTaleShow: true
  },
  {
    label: '样地编号',
    prop: 'ydbh',
    isTjTaleShow: true
  },
  {
    label: '样品类型',
    prop: 'yplx'
  },
  {
    label: '优势树种（组）',
    prop: 'yssz'
  },
  {
    label: '灌木树种',
    prop: 'gmsz'
  },
  {
    label: '干鲜比' + percentage,
    prop: 'gxb',
    format: (value) => {
      return setPercent(value)
    }
  }
]
export const config2 = [
  {
    label: '行政区划',
    prop: 'xzCodeName',
    isTjTaleShow: true
  },
  {
    label: '样地编号',
    prop: 'ydbh',
    isTjTaleShow: true
  },
  {
    label: '分层码',
    prop: 'fcbh',
    isTjTaleShow: true
  },
  {
    label: '样品类型',
    prop: 'yplx'
  },
  {
    label: '优势树种（组）',
    prop: 'yssz'
  },
  {
    label: '灌木树种',
    prop: 'gmsz'
  },
  {
    label: '干鲜比' + percentage,
    prop: 'gxb',
    format: (value) => {
      return setPercent(value)
    }
  }
]
