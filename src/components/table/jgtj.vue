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
            ['总蓄积', 'm3'],
            ['每公顷可燃物载量', 'thm2'],
            ['总可燃物载量', 'kg'],
            ['操作'],
          ]"
          :key="i"
        >
          <!--                <td v-for="(item, i) of [['序号'],['样地编号'],['林分型图斑号'],['平均胸径', 'cm'],['平均高', 'm'],['每公顷蓄积', 'm3'],['总蓄积', 'm3'],['每公顷可燃物载量', 'thm2'],['总可燃物载量', 'kg']]" :key='i'>-->
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
          <td>{{ item.zxj | formatValue }}</td>
          <td>{{ item.mgqkrwzl | formatValue }}</td>
          <td>{{ item.zkrwzl | formatValue }}</td>
          <td>
            <el-button type="text" size="small" @click="handleDetail(item)"
              >详情</el-button
            >
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
import tableMixin from "@/components/table/tableMixin";
import tableDetail from "@/components/table/tableDetail";
// mark - script
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
      this.tableDetailData.title = "乔木可燃物详细信息";
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
