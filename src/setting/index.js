import { sysHasAccess } from '@/setting/setting'

/**
 * 判断当前系统是否有切换页
 * @param leiBie { string } 用户信息中的leibie字段
 * @return { object,undefined } 没有返回undefined，如果有会返回对象
 **/
export const hasSystemPage = (leiBie) => {
  return sysHasAccess.find(item => item.leiBie === leiBie)
}

/**
 * 当前系统是否权限
 * @param leiBie { string } 用户信息中的leibie字段
 * @param systemName { string } 切换到的系统
 * @return { boolean } 当前系统是否求权限
 **/
export const hasSystemAccess = (leiBie, systemName) => {
  const systemInfo = hasSystemPage(leiBie)
  return systemInfo && systemInfo.includeSystemName.includes(systemName)
}
