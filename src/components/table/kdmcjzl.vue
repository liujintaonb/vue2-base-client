<!--枯倒木材积和载量计算表-->
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
            ['枯倒木编号'],
            ['枯倒木种名'],
            ['枯倒木长', 'm'],
            ['密度级'],
            ['枯倒木材积', 'm3'],
            ['枯倒木木材密度', 'kgm3'],
            ['枯倒木可燃物载量', 'kg'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <tr v-for="(item, i) of arrData" :key="i">
        <td>{{ item.kdmbh | formatValue }}</td>
        <td>{{ item.kdmzm | formatValue }}</td>
        <td>{{ item.kdmc | formatValue }}</td>
        <td>{{ item.mdj | formatValue }}</td>
        <td>{{ item.kdmcj | formatValue }}</td>
        <td>
          <span v-if="isDataAudit">{{ item.kdmmcmd | formatValue }}</span>
          <el-input
            v-else
            v-model="item.kdmmcmd"
            placeholder="请填写枯倒木木材密度"
            @input="item.kdmmcmd = updateInputData(item.kdmmcmd)"
            @change="changeInput('kdmmcmd', i, 'kdmmcmd')"
          ></el-input>
        </td>
        <td>{{ item.kdmkrwzl | formatValue }}</td>
      </tr>
      <tr v-if="!arrData.length">
        <td colspan="7">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
    <div class="pt10">
      <p class="pt5">枯倒木可燃物载量=枯倒木木材密度×枯倒木材积</p>
    </div>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import { REGEXP_NUM_DIAN } from "@/common/unit";
// mark - script
export default {
  name: "kdmcjzl",
  mixins: [tableMixin],
  props: {},
  // mark -- data
  data() {
    return {};
  },
  // mark -- watcher
  // mark -- methods
  methods: {
    // watch 协议
    watch_kdmmcmd(data, index) {
      const item = data[index];
      if (item.kdmmcmd.length === 0) {
        item.kdmcj = "";
      }
      const md = parseFloat(item.kdmmcmd);
      const cj = parseFloat(item.kdmcj);
      if (!isNaN(md) && !isNaN(cj)) {
        item.kdmkrwzl = Number.parseFloat(md * cj).toFixed(2);
      } else {
        item.kdmkrwzl = null;
      }
      return data;
    },
    updateInputData(value) {
      return value.replace(REGEXP_NUM_DIAN, "");
    },
  },
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
