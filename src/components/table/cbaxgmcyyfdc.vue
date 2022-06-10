<!-- 草本及矮小灌木草原样方调查表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <div class="flex-row pd15">
      <info-item label="检查日期" :value="objData.jianchaTime" />
      <info-item label="检查员" :value="objData.jianchaName" />
    </div>
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <colgroup>
        <col width="16.6%" />
        <col width="16.6%" />
        <col width="16.6%" />
        <col width="16.6%" />
        <col width="16.6%" />
        <col width="16.6%" />
      </colgroup>
      <!--            1-->
      <tr>
        <td class="info-title">样地编号</td>
        <td colspan="2">{{ objData.ydBh | formatValue }}</td>
        <td class="info-title">小样方编号</td>
        <td colspan="2">{{ objData.xyfBh || objData.yfBh }}</td>
      </tr>
      <tr>
        <td class="info-title">样方规格</td>
        <td colspan="2">{{ objData.yfGg | formatValue }}</td>
        <td class="info-title">样方类型</td>
        <td colspan="2">{{ objData.yfLx | formatValue }}</td>
      </tr>
      <tr>
        <td class="info-title">样方面积(㎡)</td>
        <td colspan="2">{{ objData.yfMj | formatValue }}</td>
        <td class="info-title">是否属于禁牧小区</td>
        <td colspan="2">{{ objData.isJinmu | formatValue }}</td>
      </tr>
      <!--            2-->
      <tr>
        <td class="info-title" rowspan="2">样方定位</td>
        <td colspan="5">
          <div class="flex-row">
            <info-item label="经度" :value="objData.lon" />
            <info-item label="纬度" :value="objData.lat" />
          </div>
        </td>
      </tr>
      <!--            3-->
      <tr>
        <td class="info-title" colspan="6">
          <info-item label="海拔(m)" :value="objData.haiba" />
        </td>
      </tr>
      <!--            4-->

      <!--            5-->
      <tr>
        <td class="info-title">平均盖度(%)</td>
        <td colspan="2">{{ objData.pjGaidu | formatValue }}</td>
        <td class="info-title">平均高度(cm)</td>
        <td colspan="2">{{ objData.pjGaodu | formatValue }}</td>
      </tr>
      <!--            6-->
      <tr>
        <td class="info-title" rowspan="2">主要植物种名称</td>
        <td class="info-title">优势种</td>
        <td colspan="4">{{ objData.ysz | formatValue }}</td>
      </tr>
      <!--            7-->
      <tr>
        <td class="info-title">物种数</td>
        <td colspan="4">{{ objData.wzs | formatValue }}</td>
      </tr>
      <!--            8-->
      <tr>
        <td :rowspan="2" :colspan="2">草本样方</td>
        <td>草本样方鲜重(g)</td>
        <td>草本样方干重(g)</td>
        <td>单位面积草本鲜重(kg/hm²)</td>
        <td>单位面积草本干重(kg/hm²)</td>
      </tr>
      <tr>
        <td>{{ objData.cobenYfXz | formatValue }}</td>
        <td>{{ objData.yfgz | formatValue }}</td>
        <td>{{ objData.dwmjCbxz | formatValue }}</td>
        <td>{{ objData.dwmjCbgz | formatValue }}</td>
      </tr>
      <!--            9-->
      <tr>
        <td :rowspan="2" :colspan="2">枯落物样方</td>
        <td>枯落物样方鲜重(g)</td>
        <td>枯落物样方干重(g)</td>
        <td>单位面积枯落物鲜重(kg/hm²)</td>
        <td>单位面积枯落物干重(kg/hm²)</td>
      </tr>
      <tr>
        <td>{{ objData.klwYfxz | formatValue }}</td>
        <td>{{ objData.klwYfgz | formatValue }}</td>
        <td>{{ objData.dwmjKlwxz | formatValue }}</td>
        <td>{{ objData.dwmjKlwgz | formatValue }}</td>
      </tr>
    </table>
    <div v-if="objData.yfImg">
      <el-divider></el-divider>
      <photo-list :photoList="getPhotoList(objData)"></photo-list>
    </div>
  </div>
</template>

<script>
// mark - script
import tableMixin from "@/components/table/tableMixin";
import PhotoList from "@/components/table/components/photoList";
import { REGEXP_NUM_DIAN } from "@/common/unit";
import { math } from "@/common/math";
export default {
  name: "cbaxgmcyyfdc",
  components: { PhotoList },
  mixins: [tableMixin],
  props: {
    type: {
      type: [Object, String],
      default: "1",
    },
  },
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {
    getPhotoList(item) {
      return [
        { imgUrl: item.yfImg, imgPre: `照片编号：`, imgBh: item.yfImgBh },
      ];
    },
    computeData(gz, dwgz) {
      this.objData[gz] = Number(this.objData[gz]);
      if (isNaN(this.objData[gz])) {
        this.$message({
          message: "请输入正确格式！",
          type: "warning",
        });
        this.objData[gz] = "";
        return;
      }
      if (this.objData.yfMj) {
        // 单位面积干重
        const dwgzData = math.divide(
          this.objData[gz] / 1000,
          Number(this.objData.yfMj) / 10000
        );
        this.objData[dwgz] = math.round(dwgzData);
      }
      this.$emit("updateData", this.objData);
    },
    updateInputData(value) {
      return value.replace(REGEXP_NUM_DIAN, "");
    },
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
