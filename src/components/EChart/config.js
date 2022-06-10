export const option = {
  title: {
    text: '统计图',
    left: 325,
    top: 0
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
    show: true
  },
  itemStyle: {
    normal: {
      label: {
        show: true,
        formatter: '{b} : {c} ({d}%)'
      },
      labelLine: { show: true }
    },
    emphasis: {
      label: {
        show: true,
        formatter: '{b}\n{c} ({d}%)',
        position: 'center',
        textStyle: {
          fontSize: '30',
          fontWeight: 'bold'
        }
      }
    }
  },
  legend: {
    orient: 'vertical',
    // left: 'left',
    bottom: 'middle',
    right: 0,
    // 图例/说明数据
    data: []
  },
  series: [
    {
      name: '统计图',
      type: 'pie',
      radius: '60%',
      center: ['40%', '50%'],
      // 统计数据
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: '{b} : {c} ({d}%)'
          },
          labelLine: { show: true }
        }
      }
    }
  ]
}
