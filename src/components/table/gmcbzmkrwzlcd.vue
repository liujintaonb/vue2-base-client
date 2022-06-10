<!--灌木层标准木可燃物载量测定记录表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <table
      border="1"
      rules="all"
      border-collapse="collapse"
      width="100%"
      v-if="data"
    >
      <tr>
        <td
          v-for="(item, i) of [
            ['样方号'],
            ['灌木号'],
            ['灌木种名'],
            ['灌木型'],
            ['地径', 'cm'],
            ['冠幅（南北和东西方向平均值）', 'm'],
            ['高', 'm'],
            ['鲜重', 'g'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <tr v-for="(item, i) in arrData" :key="i">
        <td>{{ item.yfbh | yfLabel }}</td>
        <td>{{ item.gmh | formatValue }}</td>
        <td>{{ item.gmzm | formatValue }}</td>
        <td>{{ item.gmx | formatValue }}</td>
        <td>{{ item.dj | formatValue }}</td>
        <td>{{ item.gf | formatValue }}</td>
        <td>{{ item.gao | formatValue }}</td>
        <td>{{ item.xz | formatValue }}</td>
      </tr>
      <tr v-if="!arrData.length">
        <td colspan="8">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";

// mark - script
export default {
  name: "",
  mixins: [tableMixin],
  props: {},
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {},
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
  components: {},
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
