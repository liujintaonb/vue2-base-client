import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
import {
  filterParams,
  // checkLogin,
  loginOut
} from '@/common/util'
import Storage from '@/common/storage'
import { getCache, setCache } from './cache'
// 携带cookie
axios.defaults.withCredentials = true

// 添加一个响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response && response.data && response.data.code === 200) {
      const responseURL = response.request.responseURL
      setCache(responseURL, response.data)
      return response.data || {}
    }
    if (response && response.data && response.data.code === 401) {
      loginOut()
      return response
    }
    if (typeof response === 'object') {
      return response
    }
    let message = response.data.message
    if (message.indexOf('\n') !== -1) {
      message = message.replace(/\n/g, '<br>')
    }
    Vue.prototype.$notify({
      title: '请求错误',
      type: 'error',
      dangerouslyUseHTMLString: true,
      message: message || '接口错误'
    })
    return message || '接口错误'
  },
  function (error) {
    return Promise.reject(error)
  }
)

const request = function ({
  url,
  params = {},
  headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  needJwt = true,
  method = 'get',
  noBase = false,
  isPublic = false,
  isFullUrl = false,
  sendAllResponse = false,
  isGeoServerApi = false,
  isAffix = false,
  isBase2 = false,
  // 是否为评估系统api
  isPGApi = false,
  // 屏蔽错误获取错误信息
  needErrorMessage = false,
  imgid = ''
}) {
  let BASE_API = process.env.VUE_APP_BASE_API
  // 评估系统api
  if (isPGApi) {
    BASE_API = process.env.VUE_APP_BASE_API_PG
  }
  // geoServer详情api
  if (isGeoServerApi) {
    BASE_API = process.env.VUE_APP_MAP_VIEW
  }
  // 附件api
  if (isAffix) {
    BASE_API = process.env.VUE_APP_AFFIX
  }
  // Base2地址(减灾 房屋)
  if (isBase2) {
    BASE_API = process.env.VUE_APP_BASE2__API
  }
  if (!isPublic) {
    // checkLogin();
  }
  const mock = process.env.VUE_APP_MOCK_API || ''
  let baseUrl = BASE_API + '/'
  params = filterParams(params)

  // 标识不用baseUrl
  if (params.noBase || noBase) {
    baseUrl = ''
  }
  let sendUrl = baseUrl + mock + url

  const hasGetParams = sendUrl.indexOf('?') !== -1
  if (hasGetParams) {
    sendUrl = sendUrl + '&'
  } else {
    sendUrl = sendUrl + '?'
  }
  method = method.toLocaleLowerCase()
  if (method === 'get') {
    params = qs.stringify(params)
    sendUrl += params
  }
  if (isFullUrl) {
    sendUrl = url
  }
  // jwt
  if (needJwt) {
    const JWT = Storage.get('fjwt')
    headers = Object.assign(headers, {
      Authorization: `${JWT}`
    })
  }
  if (imgid) {
    headers = Object.assign(headers, { imgid: imgid })
  }
  // 缓存层， 避免数据重复请求
  const cacheData = getCache(sendUrl)
  if (cacheData) {
    return new Promise(resolve => {
      resolve(cacheData)
    })
  }
  Vue.prototype.$xLoading.show()
  return axios({
    method,
    url: sendUrl,
    data: method === 'get' ? null : params,
    headers
  })
    .then(response => {
      if (sendAllResponse) {
        return response
      }
      if (response.data) {
        return response.data
      }
      return response
    })
    .catch(err => {
      // 用于账户被顶之后
      if (+err.response.data.code === 401) {
        loginOut()
        return
      }

      if (needErrorMessage) {
        return err.response.data
      }
      Vue.prototype.$notify({
        title: '请求错误',
        type: 'error',
        message: err.response ? err.response.data.message : err
      })
      // 如果是不需要jwt的接口报错，应该就是tikict错误，需要重新登录
      if (!needJwt) {
        // loginOut(1500);
      }
    })
    .finally(() => {
      Vue.prototype.$xLoading.hide(sendUrl)
    })
}

export default request
