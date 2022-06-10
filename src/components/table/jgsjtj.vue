<!--乔木层可燃物载量统计表(大样地)-->
<!--mark - html -->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td
          v-for="(item, i) of [
            ['序号'],
            ['样地编号'],
            ['林分型图斑编号'],
            ['平均胸径', 'cm'],
            ['平均高', 'm'],
            ['每公顷蓄积', 'm3'],
            ['林分型图斑蓄积', 'm3'],
            ['操作'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <template v-if="data">
        <tr v-for="(item, i) of arrData" :key="i">
          <td>{{ +i + 1 }}</td>
          <td>{{ item.ydbh | formatValue }}</td>
          <td>{{ item.lfx | formatValue }}</td>
          <td>{{ item.pjxj | formatValue }}</td>
          <td>{{ item.pjg | formatValue }}</td>
          <!--                    每公顷蓄积-->
          <td>{{ item.mgqxj | formatValue }}</td>
          <td>{{ item.lfxTbxj | formatValue }}</td>
          <td>
            <el-button type="text" size="small" @click="handleDetail(item)"
              >详情</el-button
            >
          </td>
        </tr>
        <tr v-if="!arrData.length">
          <td :colspan="8">
            <p class="empty">暂无数据</p>
          </td>
        </tr>
      </template>
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
// mark - script
import tableMixin from "@/components/table/tableMixin";
import tableDetail from "@/components/table/tableDetail";
export default {
  name: "jgtj",
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
      this.tableDetailData.name = "jgtjDetail";
      this.tableDetailData.title = "角规数据统计详情";
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
