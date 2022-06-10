<!--枯倒木可燃物载量统计表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td><info-item label="序号" :colon="false" no-value /></td>
        <td v-for="(item, i) of config" :key="i" v-if="!item.isTjTaleShow">
          <info-item
            v-if="!item.isTjTaleShow"
            :label="item.label"
            :colon="false"
            no-value
          />
        </td>
      </tr>
      <template v-if="data">
        <tr v-for="(item, i) of arrData" :key="i">
          <td>{{ +i + 1 }}</td>
          <td>{{ item.yssz | formatValue }}</td>
          <td>{{ item.ydKdmzzl | formatValue }}</td>
          <td>{{ item.dwmjKdmkrwzl | formatValue }}</td>
          <td>
            <el-button type="text" size="small" @click="handleDetail(item)"
              >详情</el-button
            >
          </td>
        </tr>
      </template>
      <tr v-if="!arrData.length">
        <td colspan="5">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
    <div v-show="showTableDetail">
      <table-detail
        @closeDialog="showTableDetail = false"
        :show-table-detail="showTableDetail"
        :table-detail-data="tableDetailData"
      />
    </div>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import tableDetail from "@/components/table/tableDetail";
// mark - script
export default {
  name: "kdmkrwzlsz",
  mixins: [tableMixin],
  props: {
    data: {
      type: [Object, Array],
      default: () => null,
    },
  },
  // mark -- data
  data() {
    return {
      showTableDetail: false,
      tableDetailData: {},
    };
  },
  // mark -- methods
  methods: {
    handleDetail(data) {
      this.tableDetailData.data = data;
      this.tableDetailData.name = "kdmxq";
      this.tableDetailData.title = "枯倒木可燃物详细信息";
      this.showTableDetail = true;
    },
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
  components: { tableDetail },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
