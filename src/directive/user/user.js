import Storage from '@/common/storage'
import { noAccessUserInfoMap } from '@/setting/setting'

/**
 * 根据noAccessUser中的值（没有操作权限的用户的leiBie）
 * @param { value } 行政级别显示
 **/
function checkPermission (el, binding) {
  const { value } = binding
  if (!value) {
    const xzCodeLenght = Storage.get('userXzcode').length || 0
    const leiBie = Storage.get('fuserInfo').leiBie || ''
    const noAccessUserInfo = noAccessUserInfoMap.find(item => item.leiBie === leiBie)
    if (noAccessUserInfo) {
      const hasPermission = noAccessUserInfo.includeXzCodeLength.includes(xzCodeLenght)
      if (hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}

export default {
  inserted (el, binding) {
    checkPermission(el, binding)
  },
  update (el, binding) {
    checkPermission(el, binding)
  }
}
