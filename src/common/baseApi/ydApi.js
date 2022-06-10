import request from '@/common/api/request'

// 获取森林样地列表
export const getSlYdList = (params = {}) => {
  const leibie = params.leiBie
  let url = 'api/v1/yangdi/list'
  if (leibie) {
    delete params.leiBie
    url = `${url}?leiBie=${leibie}`
  }
  return request({
    url,
    method: 'get',
    params
  })
}

// 实验数据表详情
export const getYdTableData = (params = {}) => {
  const tableNo = params.tableNo
  delete params.tableNo
  return request({
    url: `api/v1/yangdi/data/${tableNo}`,
    method: 'get',
    params
  })
}

/**
 * 根据样地id获取样地表所有样方数据
 **/
export const yangFangData = (params = {}) => {
  const tableNo = params.tableNo
  delete params.tableNo
  return request({
    url: `api/v1/yangdi/data-all/${tableNo}`,
    method: 'get',
    params
  })
}

// 根据样地id获取样地表所有样方统计数据
export const yangFangTJData = (params = {}) => {
  return request({
    url: `api/v1/yangdi/${params.tableNo}/${params.tableTj}`,
    method: 'get',
    params: {
      pguid: params.pguid
    }
  })
}

// 更新单条样地状态
export const updateYangdiStatus = (params = {}) => {
  return request({
    url: 'api/v1/yangdi/update-status',
    method: 'put',
    params
  })
}

// 更新多条森林样地状态
export const updateMultYdStatus = (params = {}) => {
  return request({
    url: 'api/v1/yangdi/update-status-list',
    method: 'put',
    params
  })
}

// 样地相关表-更新（表数据为对象）
export const updateForm = (params = {}) => {
  const tableNo = params.tableNo
  delete params.tableNo
  return request({
    url: `api/v1/yangdi/data/${tableNo}`,
    method: 'post',
    params
  })
}

// 样地相关表-批量更新（表数据为数组）
export const updateTable = (params = {}) => {
  const tableNo = params.tableNo
  delete params.tableNo
  return request({
    url: `api/v1/yangdi/data-list/${tableNo}`,
    method: 'post',
    params
  })
}

// 查看样地中相关表的单条(统计)数据
export const getYdTableItem = (params = {}) => {
  const tableNo = params.tableNo
  delete params.tableNo
  return request({
    url: `api/v1/yangdi/data/${tableNo}`,
    method: 'get',
    params
  })
}

// 删除样地中相关表的单条(统计)数据
export const deleteYdTableItem = (params = {}) => {
  return request({
    url: `api/v1/yangdi/data/${params.tableNo}/${params.guid}`,
    method: 'delete'
  })
}

// 获取草原样地列表
export const getCyYdList = (params = {}) => {
  return request({
    url: 'api/v1/caoyuanyangdi/list',
    method: 'get',
    params
  })
}

// 更新多条草原样地状态
export const updateMultCyYdStatus = (params = {}) => {
  return request({
    url: 'api/v1/caoyuanyangdi/update-status-list',
    method: 'put',
    params
  })
}

// 根据样地查询样方
export const searchYangfangList = (params = {}) => {
  const id = params.id
  delete params.id
  return request({
    url: `public/api/v1/project-gis/yang-fang/${id}`,
    method: 'get',
    params
  })
}

// 根据样地 id 获取林分型列表
export const fetchLfxList = (params = {}) => {
  const id = params.id
  delete params.id
  return request({
    url: `public/api/v1/project-gis/lfx${id}`,
    method: 'get',
    params
  })
}

/**
 * 获取角规点
 * @param guid 样地guid
 **/
export const getJiaoGuiPoint = (params = {}) => {
  return request({
    url: `public/api/v1/project-gis/jgd/${params.guid}`,
    method: 'get',
    params
  })
}

// 获取样地平衡含水率
export const fetchPhhsl = (params = {}) => {
  const pguid = params.pguid
  delete params.pguid
  const url = `api/v1/yangdi/krw-pjphhsl/${pguid}`
  return request({
    url,
    method: 'get',
    params
  })
}
