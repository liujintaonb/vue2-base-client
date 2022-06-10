import request from '@/common/api/request'

// 新增用户
export const postAddUser = (params) => {
  const temParams = Object.assign({}, params)
  delete temParams.province
  delete temParams.city
  delete temParams.county
  delete temParams.currentCode
  return request({
    url: 'api/v1/user/add',
    method: 'post',
    params: temParams
  })
}

// 更新用户数据
export const updateUser = (params = {}) => {
  const url = 'api/v1/user'
  return request({
    url,
    method: 'put',
    params
  })
}

/**
 * 获取管理员管理
 **/
export const getUserList = (params = {}) => {
  return request({
    url: 'api/v1/user/account',
    method: 'get',
    params
  })
}
/**
 * 用户管理
 * action: 1.重置密码. 2.开通用户, 3.禁用用户, 4,删除用户
 **/
export const updateInfoUser = (params = {}) => {
  const guid = params.guid
  delete params.guid
  return request({
    url: `api/v1/user/account/${guid}`,
    method: 'put',
    params
  })
}
/**
 * 修改密码
 **/
export const updatePassword = (params = {}) => {
  return request({
    url: 'api/v1/user/msg',
    method: 'put',
    params
  })
}
