<!-- 替代角规调查表 -->
<template>
  <div>
    <div v-for="(arr, key) in argData" :key="key" class="c-table">
      <table border="1" rules="all" border-collapse="collapse" width="100%">
        <tr>
          <td
            v-for="(item, index1) in arr[0].ydlxbm === '9201'
              ? yyconfig
              : arr[0].ydlxbm === '9202'
              ? ydconfig
              : qtconfig"
            :key="index1"
          >
            <info-item :label="item.label" :colon="false" no-value />
          </td>
        </tr>
        <template v-if="data">
          <tr v-for="(arrOne, index) in arr" :key="index">
            <td
              v-for="(item, index2) in arr[0].ydlxbm === '9201'
                ? yyconfig
                : arr[0].ydlxbm === '9202'
                ? ydconfig
                : qtconfig"
              :key="index2"
            >
              {{ arrOne[item.prop] | formatValue }}
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import {
  yyconfig,
  ydconfig,
  qtconfig,
} from "@/common/formConfig/experiment/yf/tdjgdc";
import infoItem from "@/components/table/components/infoItem";
export default {
  name: "tdjgdc",
  props: {
    // 父页面传入数据
    data: {
      type: [Array, Object],
      default: () => [],
    },
    // 样地编号
    ydbh: {
      type: [String, Number],
      default: () => "",
    },
    config: {
      type: Array,
      default: () => [],
    },
    isDataAudit: {
      type: Boolean,
      default: false,
    },
  },
  // mark -- data
  data() {
    return {
      yyconfig,
      ydconfig,
      qtconfig,
    };
  },
  // mark - filter
  filters: {
    formatValue(value) {
      if (typeof value === "string") {
        return value || "暂无";
      } else if (Object.prototype.toString.call(value) === "[object Null]") {
        return "暂无";
      } else if (
        Object.prototype.toString.call(value) === "[object Undefined]"
      ) {
        return "暂无";
      }
      return value;
    },
  },
  created() {},
  // mark -- methods
  methods: {},
  // mark -- computed
  computed: {
    argData() {
      if (this.data) {
        const res = this.data.reduce((res, item) => {
          res[item.ydlx]
            ? res[item.ydlx].push(item)
            : (res[item.ydlx] = [item]);
          return res;
        }, {});
        return Object.values(res);
      }
    },
  },
  // mark -- mounted
  mounted() {},
  components: { infoItem },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import 'table.styl';
</style>
