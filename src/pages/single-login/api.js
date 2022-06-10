import request from '@/common/api/request'

// 获取用户信息（单点登录）
export const getUserInfoAndJwt = (params = {}) => {
  return request({
    url: 'service/login/integrate',
    method: 'get',
    needJwt: false,
    params
  })
}
