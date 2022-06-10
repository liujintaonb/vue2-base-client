/**
 * Created by lbp on 2020/8/16
 */

export const menuItemConfig = ({ title, label, children = [], parent = null, ...config }) => {
  if (title || label) {
    return {
      title: title || label,
      children: children.length > 0 ? children.map(menuItemConfig) : [],
      parent,
      ...config
    }
  }
  return false
}

export const menuItemConfigOfIndex = (array, index, endIndex = null) => {
  let targetPath
  if (Array.isArray(index)) {
    targetPath = index
  } else if (typeof index === 'string') {
    targetPath = `${index}`.split('-')
  }
  if (endIndex) {
    targetPath = targetPath.slice(0, endIndex)
  }

  let itemData = Array.from(array)
  targetPath.forEach(v => {
    itemData = Array.isArray(itemData) ? itemData[v] : itemData.children[v]
  })
  return itemData
}

/**
 *
 * @param data 需要添加子节点数据
 * @param index 子节点路径
 * @param children 被添加子节点
 * @returns {unknown[]}
 */
export const addChildren = (data, index, children) => {
  const list = Array.from(data)
  const item = menuItemConfigOfIndex(list, index)
  item.children = children
  return list
}

export const updateMenuData = (menu, index, data) => {
  const list = Array.from(menu)
  const target = menuItemConfigOfIndex(list, index)
  Object.assign(target, data)
  return list
}
