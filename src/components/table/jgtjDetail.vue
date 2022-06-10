<!--角规数据统计详情 -->
<template>
  <div class="c-table">
    <div class="pr20 pl20" v-if="data">
      <div class="flex-row pd15">
        <info-item label="大样地编号" :value="data.ydbh | formatValue" />
        <info-item label="林分型图斑编号" :value="data.lfx | formatValue" />
      </div>
      <div class="flex-row pd10">
        <info-item label="平均胸径（m）" :value="data.pjxj | formatValue" />
        <info-item label="每公顷蓄积（m³）" :value="data.mgqxj | formatValue" />
      </div>
      <div class="flex-row pd10">
        <info-item label="平均高（m）" :value="data.pjg | formatValue" />
        <info-item
          label="林分型图斑蓄积（m³）"
          :value="data.lfxTbxj | formatValue"
        />
      </div>
      <!--      <div class="flex-row pd10">-->
      <!--        <info-item-->
      <!--          label="每公顷断面积（㎡）"-->
      <!--          :value="data.mgqdmj | formatValue"-->
      <!--        />-->
      <!--        <info-item label="每公顷株数" :value="data.mgqzs | formatValue" />-->
      <!--      </div>-->
    </div>
    <table
      border="1"
      rules="all"
      border-collapse="collapse"
      width="100%"
      v-if="Object.keys(tableData).length > 0"
    >
      <tr>
        <td rowspan="3">角规点号</td>
        <td :colspan="types.size * 3">树种</td>
      </tr>
      <tr>
        <td colspan="3" v-for="item of types" :key="item">
          {{ item }}
        </td>
      </tr>
      <tr>
        <template v-for="i in types.size">
          <td :key="`${i}-0`">平均树高(m)</td>
          <td :key="`${i}-1`">平均胸径(cm)</td>
          <td :key="`${i}-2`">每公顷断面积(㎡)</td>
        </template>
      </tr>
      <tr v-for="(item, key) of tableData" :key="key">
        <!--                编号/表头-->
        <td>{{ key }}</td>
        <template v-for="(obj, i) in item">
          <template v-if="obj.type === '1' || obj.type === '2'">
            <td :key="`${i}-0`">{{ obj.pjsg | formatValue }}</td>
            <td :key="`${i}-1`">{{ obj.pjxj | formatValue }}</td>
            <td :key="`${i}-2`">{{ obj.mgqdmj | formatValue }}</td>
          </template>
          <template v-else>
            <td :key="`${i}-0`" colspan="3">
              {{ obj.data | formatValue }}
            </td>
          </template>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import { getYdTableItem } from "@/common/baseApi/ydApi";
// mark - script
export default {
  name: "jgtjDetail",
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
      tableData: {},
      types: null,
    };
  },
  // mark -- methods
  methods: {
    getDetailData() {
      const vm = this;
      const emptyObj = {
        pjsg: "",
        pjxj: "",
        mgqdmj: "",
        xg: "",
        mgqxj: "",
        mgqzs: "",
      };
      this.tableData = {};
      this.types = new Set();
      getYdTableItem({
        tableNo: "jgtjinfo",
        pguid: this.data.pguid,
      })
        .then((res) => {
          if (Array.isArray(res) && res.length > 0) {
            for (const item of res) {
              // 类型种类
              vm.types.add(item.szmc);
            }
            // 数据处理
            var typeArr = [...vm.types];
            var templateArr = [];
            typeArr.forEach(() => {
              templateArr.push(emptyObj);
            });
            vm.tableData = res.reduce((result, item) => {
              var index = typeArr.indexOf(item.szmc);
              if (result[item.jgdh]) {
                result[item.jgdh][index] = item;
              } else {
                var arr = templateArr.concat();
                arr[index] = item;
                result[item.jgdh] = arr;
              }
              return result;
            }, {});
            // 排序处理
            for (const pro in vm.tableData) {
              const item = vm.tableData[pro];
              item.sort((a, b) => +a.szmc - +b.szmc);
            }
          } else {
            vm.$message.info("暂无详情列表信息");
          }
        })
        .catch((err) => {
          console.log("91", "jgtjDetail.vue", "", err);
          vm.$message.info("暂无详情列表信息");
        })
        .finally(() => {
          vm.$forceUpdate();
        });
    },
    resetData() {
      this.tableData = {};
      this.types = new Set();
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
