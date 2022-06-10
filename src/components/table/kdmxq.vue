<!--枯倒木可燃物详细信息-->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td
          v-for="(item, i) of [
            ['标准地编号'],
            ['树种(组)名'],
            ['密度级'],
            ['基本密度(g/cm³)'],
            ['体积(m³)'],
            ['载量(g)'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <tr v-for="(item, i) of tableData" :key="i">
        <td>{{ item.ydbh | formatValue }}</td>
        <td>{{ item.sz | formatValue }}</td>
        <td>{{ item.mdj | formatValue }}</td>
        <td>{{ item.jbmd | formatValue }}</td>
        <td>{{ item.tj | formatValue }}</td>
        <td>{{ item.zl | formatValue }}</td>
      </tr>
      <tr v-if="!tableData.length">
        <td :colspan="6">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import infoItem from "@/components/table/components/infoItem";
import { getYdTableItem } from "@/common/baseApi/ydApi";
// mark - script
export default {
  name: "kdmxq",
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
      tableData: [],
    };
  },
  // mark -- methods
  methods: {
    getDetailData() {
      const vm = this;
      this.tableData = [];
      getYdTableItem({
        tableNo: "tjkdmkrwzlsz",
        pguid: this.data.guid,
      })
        .then((res) => {
          this.tableData = res || [];
        })
        .catch((err) => {
          console.log("91", "jgtjDetail.vue", "", err);
          vm.$message.info("暂无详情列表信息");
        });
    },
    resetData() {
      this.tableData = [];
    },
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
  components: { infoItem },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
