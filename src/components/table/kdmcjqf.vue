<!--枯倒木材积区分调查表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <div class="flex-row pd10">
      <info-item label="调查员" :value="creationName" />
      <info-item label="调查日期" :value="creationTime" />
      <div></div>
    </div>
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
            ['枯倒木编号'],
            ['区分段编号'],
            ['枯倒木种名'],
            ['枯倒木长', 'm'],
            ['密度级'],
            ['区分段长度', 'm'],
            ['区分段材积', 'm3'],
            ['是否为特大枯倒木'],
            ['是否为中空腐木'],
            ['是否为梢底'],
            ['枯倒木直径', 'cm'],
            ['区分段中央/梢底直径', 'cm'],
            ['区分段中央/梢底中空直径', 'cm'],
            ['区分段中央/梢底中空外环直径', 'cm'],
            ['备注'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <tr v-for="(item, i) of arrData" :key="i">
        <td>{{ item.kdmid | formatValue }}</td>
        <td>{{ item.qfdbh | formatValue }}</td>
        <td>{{ item.kdmzm | formatValue }}</td>
        <td>{{ item.kdmc | formatValue }}</td>
        <td>{{ item.mdj | formatValue }}</td>
        <td>{{ item.qfdcd | formatValue }}</td>
        <td>{{ item.cfdcj | formatValue }}</td>
        <td>{{ item.isteda | formatValue }}</td>
        <td>{{ item.zkfm | formatValue }}</td>
        <td>{{ item.sd | formatValue }}</td>
        <td>{{ item.zj | formatValue }}</td>
        <td>{{ item.qfdzyzj || item.qfdsdzj | formatValue }}</td>
        <td>{{ item.qfdzyzkzj || item.qfdsdzkzj | formatValue }}</td>
        <td>{{ item.qfdzyzkwhzj || item.qfdsdzkwhzj | formatValue }}</td>
        <td>{{ item.bz | formatValue }}</td>
      </tr>
      <tr v-if="!arrData.length">
        <td colspan="15">
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
  name: "kdmcjqf",
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
