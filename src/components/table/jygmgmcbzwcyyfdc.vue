<!--具有灌木及高大草本植物草原样方调查表-->
<!--mark - html -->
<template>
  <div class="c-table">
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
        <td class="info-title">大样方编号</td>
        <td colspan="2">{{ objData.yfBh | formatValue }}</td>
      </tr>
      <tr>
        <td class="info-title">样方规格</td>
        <td colspan="2">{{ objData.yfGg | formatValue }}</td>
        <td class="info-title">样方类型</td>
        <td colspan="2">{{ type.yf | formatValue }}</td>
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
      <tr>
        <td class="info-title" colspan="5">
          <info-item label="海拔(m)" :value="objData.haiba" />
        </td>
      </tr>
      <!--            4-->
      <tr>
        <td class="info-title" colspan="2">灌木及高大草本覆盖面积(㎡)</td>
        <td>{{ objData.gmGdcbFgmj | formatValue }}</td>
        <td class="info-title" colspan="2">草本及矮小灌木平均盖度(%)</td>
        <td>{{ objData.cbAxgmPjgd | formatValue }}</td>
      </tr>
      <tr>
        <td class="info-title" colspan="2">
          单位面积灌木及高大草本载量(kg/hm²)
        </td>
        <td>{{ objData.dwmjGmGdcbZl | formatValue }}</td>
        <td class="info-title" colspan="2">
          单位面积草本及矮小灌木载量(kg/hm²)
        </td>
        <td>{{ objData.dwmjCbAxgmZl | formatValue }}</td>
      </tr>
      <tr>
        <td class="info-title" colspan="2">样方总盖度(%)</td>
        <td>{{ objData.yfzgd | formatValue }}</td>
        <td class="info-title" colspan="2">单位面积样方总载量(kg/hm²)</td>
        <td>{{ objData.dwmjYfzzl | formatValue }}</td>
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
export default {
  name: "jygmgmcbzwcyyfdc",
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
