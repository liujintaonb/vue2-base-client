import { xzJibieMap } from '@/common/baseData'
import Storage from '@/common/storage'

/**
 * 根据xzJibieMap中xzJibie值
 * @param { value } 行政级别显示
 * 0为国家、1为省依次类推
 **/
function checkPermission (el, binding) {
  const { value } = binding
  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value
      const xzCode = Storage.get('userXzcode')
      const codeInfo = xzJibieMap.find(item => item.xzCodeLength === xzCode.length)

      const hasPermission = permissionRoles.includes(codeInfo.xzJibie)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error('need xzCode! Like v-permission="[0,1]"')
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
