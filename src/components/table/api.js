import { fetchLeibieList, fetchLeibieZiList } from '@/common/baseApi/api'
import { SzCode } from '@/common/BaseCode'

// 优势树种一级
export const shuZhongFu = (params = {}) => {
  return fetchLeibieList({ leiBie: SzCode })
}

// 优势树种子级
export const shuZhongZi = (params = {}) => {
  params.leiBie = SzCode
  return fetchLeibieZiList(params)
}
