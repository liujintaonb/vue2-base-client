import request from '@/common/api/request'
// 获取行政单位
export const getXzCode = (params = {}) => {
  return request({
    url: 'public/api/v1/xz_code',
    method: 'get',
    params
  })
}
