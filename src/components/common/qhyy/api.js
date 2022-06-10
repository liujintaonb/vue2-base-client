import { QhyyCode } from '@/common/BaseCode'
import { fetchLeibieList, fetchLeibieZiList } from '@/common/baseApi/api'

export const l1Options = (params = { leiBie: QhyyCode }) => {
  return fetchLeibieList(params)
}

const lOptions = (code) => {
  return fetchLeibieZiList(
    {
      leiBie: QhyyCode,
      fuBianMa: code
    }
  )
}

export const l2Options = (code) => {
  return lOptions(code)
}

export const l3Options = (code) => {
  return lOptions(code)
}
