/**
 * Created by lbp on 2020/9/17
 */
import { cloneDeep } from 'lodash'
import infoItem from '@/components/table/components/infoItem'
import { SD, WD } from '@/common/unit'
import { selfRound, setPercent } from '@/common/baseFunction'
import { yangFangTJData } from '@/common/baseApi/ydApi'
// 未知样方编号
export const wzyf = 'w_z_y_f'
export default {
  data () {
    return {
      // copyData: undefined,
      isArrayType: false,
      objData: {},
      arrData: [],
      dcPhotoList: [],
      // 副table信息
      fuTableData: {
        isShow: false,
        fuListData: [],
        fuPropConfig: []
      }
    }
  },
  // mark - filter
  filters: {
    yfLabel (value) {
      return value === wzyf || !value ? '未知样方' : value
    },
    formatValue (value) {
      if (typeof value === 'string') {
        return value || '暂无'
      } else if (Object.prototype.toString.call(value) === '[object Null]') {
        return '暂无'
      } else if (Object.prototype.toString.call(value) === '[object Undefined]') {
        return '暂无'
      }
      return value
    }
  },
  // mark - probs
  props: {
    selectedForm: {
      type: Object,
      default: () => {}
    },
    rowData: {
      type: [Array, Object],
      default: () => {}
    },
    // 父页面传入数据
    data: {
      type: [Array, Object],
      default: () => []
    },
    // 样地编号
    ydbh: {
      type: [String, Number],
      default: () => ''
    },
    config: {
      type: Array,
      default: () => []
    },
    isDataAudit: {
      type: Boolean,
      default: false
    },
    // 是否显示调查表图片
    showDcPhoto: {
      type: Boolean,
      default: true
    }
  },
  // mark - watch
  watch: {
    data: {
      handler (newValue) {
        if (newValue) {
          if (Array.isArray(newValue)) {
            this.isArrayType = true
            this.arrData = [...newValue]
            if (newValue.length) {
              this.shiNeiWd = newValue[0].shiNeiWd || WD
              this.shiNeiSd = newValue[0].shiNeiSd || SD
            }
            if (this.selectedForm.api.fuName) {
              yangFangTJData({
                tableNo: this.selectedForm.api.name,
                tableTj: this.selectedForm.api.fuName,
                pguid: this.rowData.guid
              }).then((res) => {
                this.fuTableData = {
                  isShow: true,
                  fuListData: [res],
                  fuPropConfig: this.selectedForm.fuConfig
                }
              }).catch(() => {
                this.fuTableData.isShow = false
              })
            } else {
              this.fuTableData.isShow = false
            }
          } else {
            this.isArrayType = false
            this.objData = cloneDeep(newValue)
          }
          this.dcPhotoList = this.getDcPhotoList()
        }
      },
      immediate: true
    }
  },
  // mark - computed
  computed: {
    // 调查员名称
    creationName () {
      if (Array.isArray(this.data) && this.data.length > 0) {
        return this.data[this.data.length - 1].creationName
      } else if (this.data && Object.prototype.hasOwnProperty.call(this.data, 'creationName')) {
        return this.data.creationName
      }
      return ''
    },
    // 调查时间
    creationTime () {
      if (Array.isArray(this.data) && this.data.length > 0) {
        return this.data[this.data.length - 1].creationTime
      } else if (this.data && Object.prototype.hasOwnProperty.call(this.data, 'creationTime')) {
        return this.data.creationTime
      }
      return ''
    },
    // 最后一个数组元素
    lastItem () {
      if (Array.isArray(this.data) && this.data.length > 0) {
        return this.data[this.data.length - 1]
      }
      return '暂无'
    }
  },
  // mark - methods
  methods: {
    setPercent,
    // 构造样方图片数据
    getYFPhotoList () {
      if (this.arrData) {
        return this.arrData.map(v => {
          return [
            { imgUrl: v.jgzImg, imgPre: '景观照：', imgBh: v.jgzBh, yfbh: v.yfbh },
            { imgUrl: v.fsqmzImg, imgPre: '俯视全貌照：', imgBh: v.fsqmzBh, yfbh: v.yfbh },
            { imgUrl: v.jjzImg, imgPre: '近景照：', imgBh: v.jjzBh, yfbh: v.yfbh }
          ]
        })
      } else {
        return []
      }
    },
    // 调查表展示的图片
    getDcPhotoList () {
      let photoList = []
      if (this.showDcPhoto) {
        if (this.isArrayType && this.arrData.length) {
          this.arrData.forEach(item => {
            if (item.imgs) {
              const tempList = item.imgs.split(',')
              photoList = [...photoList, ...tempList]
            }
          })
        } else if (!this.isArrayType && Object.keys(this.objData).length) {
          if (this.objData.imgs) {
            const tempList = this.objData.imgs.split(',')
            photoList = [...photoList, ...tempList]
          }
        }
      }
      return photoList
    },
    // 是否有需要计算的属性(实现了watch协议)
    needComputed (key) {
      return typeof key === 'string' && Object.prototype.hasOwnProperty.call(this, `watch_${key}`)
    },
    updateData (key, index) {
      if (this.needComputed(key)) {
        // watch 协议
        this.arrData = this[`watch_${key}`](cloneDeep(this.arrData), index)
      }
      this.$emit('updateData', cloneDeep(this.arrData))
    },
    changeInput (key, index, watchData = '') {
      this.arrData[index][key] = Number(this.arrData[index][key])
      if (isNaN(this.arrData[index][key])) {
        this.$message({
          message: '请输入正确格式！',
          type: 'warning'
        })
        this.arrData[index][key] = ''
        if (watchData) {
          this.arrData = this[`watch_${watchData}`](cloneDeep(this.arrData), index)
        }
        return
      }
      const temData = this.arrData[index][key]
      this.arrData[index][key] = selfRound(temData)
      if (watchData) {
        this.arrData = this[`watch_${watchData}`](cloneDeep(this.arrData), index)
      }
      this.$emit('updateData', this.arrData)
    }
  },
  // mark - components
  components: {
    infoItem
  }
}
