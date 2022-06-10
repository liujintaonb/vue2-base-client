<!--灌木林灌木层调查基本情况表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td
          v-for="(item, i) of [
            ['样方号'],
            ['灌木型'],
            ['盖度', '%'],
            ['优势种名'],
            ['样方总株数/丛数'],
            ['平均高', 'm'],
            ['面积', 'm2'],
            ['备注'],
            ['状态'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <template v-if="data">
        <tr v-for="(item, i) of arrData" :key="i">
          <td>{{ item.yfbh | formatValue }}</td>
          <td>{{ item.gmx | formatValue }}</td>
          <td>{{ item.gd | formatValue }}</td>
          <!--                    优势种名-->
          <td>{{ item.yszm | formatValue }}</td>
          <td>{{ item.zs | formatValue }}</td>
          <td>{{ item.pjg | formatValue }}</td>
          <td>{{ item.mj | formatValue }}</td>
          <td>{{ item.bz | formatValue }}</td>
          <td>{{ item.tianbao === "0" ? "无相关数据，不填报" : "已填报" }}</td>
        </tr>
      </template>
      <tr v-if="!arrData.length">
        <td colspan="9">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
    <div class="pt20">
      <yf-photo-list :photo-list="yfPhotoList" />
    </div>
    <dc-img-list :photo-list="dcPhotoList"></dc-img-list>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import yfPhotoList from "@/components/table/components/yfPhotoList";
import DcImgList from "@/components/table/components/dcImgList";
// mark - script
export default {
  name: "gmlyf",
  mixins: [tableMixin],
  props: {},
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {},
  // mark -- computed
  computed: {
    yfPhotoList() {
      return this.getYFPhotoList();
    },
  },
  // mark -- mounted
  mounted() {},
  components: {
    DcImgList,
    yfPhotoList,
  },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import 'table.styl';
</style>
