import menus from '@/router/router-config'
import { xzJibieMap } from '@/common/baseData'

/**
 * 使用meta.userType meta.xzJibie mate.systemInfo meta.isCommiss 确定当前用户是否有权限
 * @param meuns 菜单
 * @param userleiBie 账号为管理员，实验员、野外填报
 * @param systemInfo 判断管理员的那个系统的
 * @param xzJibie 不同行政区域（省市县）是否展示
 * @param commissId 六大院账号
 */
function hasPermission(meuns, userleiBie, systemInfo, xzJibie, commissId) {
  if (meuns.meta.userType || meuns.meta.user || meuns.meta.xzJibie || typeof meuns.meta.isCommiss === 'boolean') {
    return (!meuns.meta.userType || meuns.meta.userType.indexOf(userleiBie) !== -1) &&
      (!meuns.meta.user || meuns.meta.user.indexOf(systemInfo) !== -1) &&
      (!meuns.meta.xzJibie || meuns.meta.xzJibie.indexOf(xzJibie) !== -1) &&
      (typeof meuns.meta.isCommiss !== 'boolean' || meuns.meta.isCommiss === !!commissId)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表
 * @param meunsList 当前路由信息
 * @param xzJibie 用户级别
 * @param userleiBie 当前用户的类别（账号为管理员，实验员、野外填报）
 * @param systemInfo 判断管理员的那个系统的
 * @param xzJibie 用户级别
 * @param commissId 六大院账号
 */
function filterAsyncRoutes(meunsList, userleiBie, systemInfo, xzJibie, commissId) {
  const res = []
  const tempMeunList = meunsList.filter(item => item.show !== false)
  tempMeunList.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(tmp, userleiBie, systemInfo, xzJibie, commissId)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(
          tmp.children,
          userleiBie,
          systemInfo,
          xzJibie,
          commissId
        )
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 * @param userInfo 当前用户信息
 * @param systemInfo 判断管理员的那个系统的
 * userType 账号为管理员，实验员、野外填报
 * xzJibie 不同行政区域（省市县）是否展示
 * isCommiss 六大院账号
 */
export default function checkMeunPermission(userInfo, systemInfo) {
  // 当前xzCode
  const xzCode = userInfo.xzCode || ''
  // 当前行政级别
  const xzJibie = xzJibieMap.find(item => item.xzCodeLength === xzCode.length).xzJibie

  const commissId = userInfo.commissId || ''

  const meunsList = [...menus, ...modelMenu, ...qualityMenu, ...pingGuMenu, ...yunweiMenuRouter, ...diaoduMenuRouter, ...yinhuanRouter]

  return filterAsyncRoutes(meunsList, userInfo.leiBie, systemInfo, xzJibie, commissId)
}
