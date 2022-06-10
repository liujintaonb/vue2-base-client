// 通用 mixin

import * as baseFunction from '@/common/baseFunction'
import { statusMap } from '@/common/baseData'
import Storage from '@/common/storage'
import { getSlYdList } from '@/common/baseApi/ydApi'
import { canHandle } from '@/common/baseFunction'

export default {
  methods: {
    // 获取样地
    async handeleQuery () {
      const params = baseFunction.filteredFormFormmat(
        Object.assign({}, this.pageInfo, this.filterData)
      )
      if (!params.xzCode) {
        // TODO 统一 设置 XZCode
        params.xzCode = Storage.get('userXzcode')
      }
      if (this.ydLeiBie) {
        params.leiBie = this.ydLeiBie
      }
      const res = await getSlYdList(params)
      let list = res ? res.content : []
      list = list.map(e => {
        e.handleBtn = canHandle(this.currentLeiBie, e.status, this.currentXzCode)
        e.statusText = statusMap[e.status]
        return e
      })
      this.listData = {
        list,
        total: res && res.totalElements
      }
    },
    // 图片展示
    getYFPhotoList () {
      const api = this.selectedForm.api && this.selectedForm.api.name
      if (['cbdcjl', 'cbdc', 'gmlyf', 'gmcdc', 'gmdcjl'].includes(api) && this.selectedForm.formData) {
        return [
          { imgUrl: this.selectedForm.formData.jgzImg, imgPre: '景观照：', imgBh: this.selectedForm.formData.jgzBh },
          { imgUrl: this.selectedForm.formData.fsqmzImg, imgPre: '俯视全貌照：', imgBh: this.selectedForm.formData.fsqmzBh },
          { imgUrl: this.selectedForm.formData.jjzImg, imgPre: '近景照：', imgBh: this.selectedForm.formData.jjzBh }
        ]
      }
      return []
    }
  },
  computed: {
    yfPhotoList () {
      return this.getYFPhotoList()
    }
  }
}
