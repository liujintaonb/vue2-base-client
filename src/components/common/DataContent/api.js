import request from '@/common/api/request'

// 查询数据表
export const getTableData = (params = {}) => {
  return request({
    url: 'api/v1/jichudata-table',
    method: 'get',
    params
  })
}
