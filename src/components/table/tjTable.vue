<!--统计表，调查表-->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td v-for="(item, i) of headerConfig" :key="i">
          <info-item :label="item.label" :colon="false" no-value />
        </td>
      </tr>
      <template v-if="arrData">
        <tr v-for="(item, index) of arrData" :key="index">
          <td v-for="(key, i) of headerConfig" :key="i">
            <template v-if="key.format">
              {{ key.format(item[key.prop], item) }}</template
            >
            <template v-else-if="key.index">{{ index + 1 }}</template>
            <template v-else>{{ item[key.prop] | formatValue }}</template>
          </td>
        </tr>
      </template>
      <tr v-if="!arrData.length">
        <td :colspan="headerConfig.length">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
    <div v-if="yfPhotoListShow && arrData.length > 0" class="pt20">
      <yf-photo-list :photo-list="yfPhotoList" />
    </div>
    <dc-img-list :photo-list="dcPhotoList"></dc-img-list>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import yfPhotoList from "@/components/table/components/yfPhotoList";
import DcImgList from "@/components/table/components/dcImgList";
export default {
  name: "tjTable",
  mixins: [tableMixin],
  props: {
    yfPhotoListShow: {
      type: Boolean,
      defalut: false,
    },
  },
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {},
  // mark -- computed
  computed: {
    yfPhotoList() {
      if (this.yfPhotoListShow) {
        return this.getYFPhotoList();
      }
    },
    headerConfig() {
      return this.config.filter((item) => {
        return !item.isTjTaleShow;
      });
    },
  },
  // mark -- mounted
  mounted() {},
  components: { DcImgList, yfPhotoList },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import 'table.styl';
</style>
