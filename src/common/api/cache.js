// 用于缓存接口, 有些公共配置类接口不需要重复请求，直接在缓存读取就好
const cacheData = {
  'api/test': null
}

export function getCache (url) {
  let data = null
  Object.keys(cacheData).forEach((cacheKey) => {
    const hasKey = url.indexOf(cacheKey) !== -1
    if (hasKey) {
      const findKey = url.slice(url.indexOf(cacheKey))
      data = cacheData[findKey]
    }
  })
  if (data) {
    if (data.data) {
      return data.data
    }
    return data
  }
}

export function setCache (url, response) {
  Object.keys(cacheData).forEach((cacheKey) => {
    const hasKey = url.indexOf(cacheKey) !== -1
    if (hasKey) {
      const findKey = url.slice(url.indexOf(cacheKey))
      cacheData[findKey] = response
    }
  })
}
