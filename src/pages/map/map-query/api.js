import request from '@/common/api/request'
import Storage from '@/common/storage'

// 大样地、标准地
export const getMapDataOfDaYangDi = (params) => {
  let viewparams = ''
  if (params.status) {
    viewparams += `status:${params.status};`
  }
  if (params.xzCode) {
    viewparams += `xzcode:${params.xzCode};`
  }
  if (params.type) {
    viewparams += `type:${params.type};`
  }
  const leiBie = Storage.get('fuserInfo').leiBie
  if (+leiBie === 2) {
    // 实验室;
    viewparams += "status:'3'\\,'5'\\,'6'\\,'7'\\,'8'\\,'9'\\,'10'\\,'11';"
    // viewparams += "status:'3','5','6','7','8','9','10','11';";
  }
  return request({
    url: `${process.env.VUE_APP_MAP_VIEW}/cite/ows`,
    method: 'GET',
    isGeoServerApi: true,
    needJwt: false,
    showLoading: false,
    noBase: true,
    params: {
      typeName: `cite:${params.typeName}`,
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      maxFeatures: '50000',
      outputFormat: 'application/json',
      viewparams: viewparams
    }
  })
}
