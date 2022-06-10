import Storage from '@/common/storage'
import Vue from 'vue'
import { getRegion } from '@/common/baseApi/api'
// import request from '@/common/api/request'

export const checkLogin = () => {
  const ticket = Storage.get('jwt')
  console.log('checkLogin')
  if (!ticket && Vue.prototype.BaseVue.$route.path !== '/login' && Vue.prototype.BaseVue.$route.path !== '/') {
    Vue.prototype.$notify({
      title: '提示',
      type: 'error',
      message: '当前登录信息已过期，请重新登录'
    })

    setTimeout(() => {
      Vue.prototype.BaseVue.$router.push({
        path: '/login'
      })
    }, 1000)
  } else {
    return ticket
  }
  return ''
}
export const isLogin = () => {
  const ticket = Storage.get('fjwt')
  // return ticket ? true : false;
  return !!ticket
}

/**
 * 表单、info 布局结构
 * @param  {[type]} list 配置列表
 * @return {[type]}      结构化后数据
 */
export function gridFormat (list) {
  const gridFormat = []
  let linePointer = 0
  let tempGrid = []
  list.forEach(config => {
    if (config.grid !== linePointer) {
      linePointer = config.grid
      if (tempGrid.length) {
        gridFormat.push(tempGrid)
        tempGrid = []
      }
    }
    tempGrid.push(config)
  })
  gridFormat.push(tempGrid)
  return gridFormat
}

export function showMessage (res, callBack) {
  if (!res) {
    return
  }
  if (res.code === 200) {
    Vue.prototype.$notify({
      title: '提示',
      type: 'success',
      message: res.message
    })
    if (callBack) {
      callBack(res)
    }
  } else {
    Vue.prototype.$notify({
      title: '提示',
      type: 'error',
      message: res.message
    })
  }
}

export const loginOut = waitTime => {
  setTimeout(() => {
    Storage.clear()
    Vue.prototype.BaseVue.$router.push({
      path: '/login'
    })
  }, waitTime || 0)
}

export const getTime = function () {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day
    }`
}

export function getStyle (obj, attr) {
  if (obj.currentStyle) {
    // 兼容IE
    return obj.currentStyle[attr]
  }
  // 兼容火狐谷歌
  return window.getComputedStyle(obj, false)[attr]
}

export function filterParams (params = {}) {
  if (Array.isArray(params)) {
    return params
  }
  // TODO 过滤的目的
  const sendParmas = {}
  for (const k in params) {
    // if (params[k]) {
    sendParmas[k] = params[k]
    // }
  }
  return sendParmas
}

export const setCurrentXzcode = async () => {
  const userInfo = Storage.get('fuserInfo')
  let xzCode = ''
  if (userInfo.commissId) {
    const options = await getRegion()
    xzCode = options[0].cfrcode
  } else {
    xzCode = userInfo.xzCode || ''
  }
  Storage.set('userXzcode', xzCode)
}

export const isSenGongFn = () => {
  const VUE_APP_BASE_AREA = process.env.VUE_APP_BASE_AREA
  const VUE_APP_XZCODE = process.env.VUE_APP_XZCODE
  return VUE_APP_BASE_AREA === 'province' && VUE_APP_XZCODE === '15'
}

export const xStorage = Storage
