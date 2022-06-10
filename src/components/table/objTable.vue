<!--纵向table-->
<!--大样地因子调查表-->
<template>
  <div class="c-table">
    <div class="el-row">
      <div class="el-col" v-for="(item, i) in config" :key="item.prop">
        <div class="keyVal">{{ item.label }}</div>
        <div class="valueVal">
          {{ data[item.prop] | formatValue }}
          <template
            v-if="
              item.markValue &&
              isIncludeString(data.yonghutianxie, item.markValue)
            "
          >
            <mark-fill></mark-fill>
          </template>
        </div>
      </div>
      <div class="el-col" v-if="config.length % 2">
        <div class="keyVal"></div>
        <div class="valueVal"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkFill from "@/components/table/components/markFill";
import { isIncludeString } from "@/common/baseFunction";
export default {
  name: "objTable",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Array,
      default: () => [],
    },
  },
  // mark -- data
  data() {
    return {};
  },
  created() {},
  // mark -- methods
  methods: {
    isIncludeString,
  },
  // mark -- computed
  computed: {
    propTable() {
      var arrayTwo = this.config.reduce((res, item, index) => {
        console.log(item);
        console.log(res);
      }, {});
      console.log(arrayTwo);
    },
  },
  // mark -- mounted
  mounted() {},
  components: { MarkFill },
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
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
.c-table{
  .el-row {
    color: #353535;
    font-weight bold;
    font-size: 14px;
    border-top: 1px solid #d4d4d4;
    border-left: 1px solid #d4d4d4;
    display flex;
    flex-wrap wrap;
    .el-col {
      display flex;
      align-items stretch;
      width calc(50% - 2px);
      line-height 24px;
      border-bottom: 1px solid #d4d4d4;
      border-right: 1px solid #d4d4d4;
      .keyVal {
        display inline-flex;
        align-items center;
        justify-content center;
        border-right 1px solid #d4d4d4;
        width 220px;
        text-align center;
        padding 10px 5px;
      }
      .valueVal {
        display inline-flex;
        align-items center;
        justify-content center;
        color #5f5f5f;
        width calc(100% - 222px);
        text-align center;
        padding 10px 5px;
      }
    }
  }
}
</style>
