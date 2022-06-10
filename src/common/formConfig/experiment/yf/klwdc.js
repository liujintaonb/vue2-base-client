// 枯落物调查表(1,2,3)

export const config = [
  {
    label: '样方号',
    width: '85px',
    prop: 'yfbh'
  },
  {
    label: '枯落物1样方鲜重(g)',
    prop: 'yfxz1'
  },
  {
    label: '枯落物2样方鲜重(g)',
    prop: 'yfxz2'
  },
  {
    label: '枯落物3样方鲜重(g)',
    prop: 'yfxz3'
  },
  {
    label: '厚度(cm)',
    prop: 'hd'
  },
  {
    label: '状态',
    prop: 'tianbao1',
    format: (item, row) => {
      if (
        row.tianbao1 === '0' &&
        row.tianbao2 === '0' &&
        row.tianbao3 === '0'
      ) {
        return '无相关数据，不填报'
      }
      if (
        row.tianbao1 !== '0' &&
        row.tianbao2 !== '0' &&
        row.tianbao3 !== '0'
      ) {
        return '已填报'
      }
      const tempArr = []
      tempArr[0] = row.tianbao1 === '0' ? '枯落物1不填报' : '枯落物1已填报'
      tempArr[1] = row.tianbao2 === '0' ? '枯落物2不填报' : '枯落物2已填报'
      tempArr[2] = row.tianbao3 === '0' ? '枯落物3不填报' : '枯落物3已填报'
      return tempArr.join(',')
    }
  }
]
