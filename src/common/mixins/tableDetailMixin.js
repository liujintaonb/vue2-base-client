/**
 * Created by lbp on 2020/9/17
 */
import { ossObject } from '@/common/baseFunction'

export default {
  data () {
    return {}
  },
  computed: {
    xnjImg () {
      if (this.selectedForm.formData && this.selectedForm.formData.xnjImg) {
        return ossObject(this.selectedForm.formData.xnjImg)
      }
      return null
    },
    qmImg () {
      if (this.selectedForm.formData && this.selectedForm.formData.qmImg) {
        return ossObject(this.selectedForm.formData.qmImg)
      }
      return null
    },
    qmBh () {
      return `全貌编号:${this.selectedForm.formData.qmBh || '暂无'}`
    },
    xnjBh () {
      return `西南角编号:${this.selectedForm.formData.xnjBh || '暂无'}`
    }
  }
}
