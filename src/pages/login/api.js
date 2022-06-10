import request from '@/common/api/request'

export const toLogin = (params = {}, imgid = '') => {
  return request({
    url: 'public/api/v1/login',
    method: 'post',
    params: params,
    isPublic: true,
    needJwt: false,
    imgid: imgid
  })
}

export const getQrCode = (params = {}) => {
  return request({
    url: 'public/api/v1/login',
    method: 'get',
    params: params,
    isPublic: true,
    needJwt: false
  })
}
