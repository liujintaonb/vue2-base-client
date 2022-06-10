import request from '@/common/api/request'
// 注册
export const registerApi = (params = {}) => {
  return request({
    url: 'public/api/v1/register',
    method: 'post',
    params: params
  })
}
