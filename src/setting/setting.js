// 页面的配置文件
import { USER_LEIBIE_GUANLI, USER_LEIBIE_WYHC } from '@/common/unit'

/**
 * 没有操作权限用信息
 * leiBie String 对应用户信息中leiBie
 * includeXzCode String 对应当前用户信息的xzCode
 **/
export const noAccessUserInfoMap = [
  {
    leiBie: USER_LEIBIE_WYHC,
    includeXzCodeLength: [0, 2, 4, 6]
  }
]

/**
 * 切换页面开放系统
 * leiBie String 对应用户信息中leiBie
 * includeSystemName String 对应当前包含的系统名称
 **/
export const sysHasAccess = [
  {
    leiBie: USER_LEIBIE_WYHC,
    includeSystemName: ['caiji', 'zhijian', 'diaodu']
  },
  {
    leiBie: USER_LEIBIE_GUANLI,
    includeSystemName: ['caiji', 'zhijian', 'pinggu', 'moxing', 'diaodu', 'yinhuan', 'zhitu', 'yunwei']
  }
]
