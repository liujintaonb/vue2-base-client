import request from '@/common/api/request'

export const getRegion = (params = {}, needJwt = true) => {
  const parentCode = params.parentCode || '0'
  return request({
    url: `public/api/v1/common/xzcode?cParentcode=${parentCode}`,
    method: 'get',
    needJwt: needJwt
  })
}

// 获取下级行政单位列表
export const getXzCode = (params = {}) => {
  return request({
    url: 'public/api/v1/common/xzcode',
    method: 'get',
    params
  })
}

// 内蒙森工地图行政区域
export const getXzCodeBySg = (params = {}) => {
  return request({
    url: 'public/api/v1/common/sengong',
    method: 'get',
    params
  })
}

// 获取下级行政单位列表(评估系统)
export const getXzCodeByPg = (params = {}) => {
  return request({
    url: 'public/api/v1/common/xzcode',
    method: 'get',
    isPGApi: true,
    params
  })
}

export const getSgXzCode = (params = {}) => {
  return request({
    url: 'public/api/v1/common/sengong',
    method: 'get',
    params
  })
}

// 获取指定行政区域信息
export const getXzCodeInfo = (params = {}) => {
  const cfrcode = params.cfrcode
  return request({
    url: `api/v1/xzcode/management/c-frcode/${cfrcode}`,
    method: 'get'
  })
}

// 基础编码列表
export const getJiChuBianMaList = (params = {}) => {
  return request({
    url: 'public/api/v1/common/jichubmlb/list',
    method: 'get',
    params
  })
}

// 根据类别获取编码
export const fetchLeibieList = (params = {}) => {
  return request({
    url: 'public/api/v1/common/jichubm/leibielist',
    method: 'get',
    params
  })
}

// 根据类别父编码获取二级基础编码
export const fetchLeibieZiList = (params = {}) => {
  return request({
    url: 'public/api/v1/common/jichubm/zilist',
    method: 'get',
    params
  })
}

// 减灾能力的导入数据
export const importtData = (url, params = {}) => {
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params,
    isAffix: true
  })
}
