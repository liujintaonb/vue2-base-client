<template>
  <div class="main">
    <el-select
      v-if="prop.selfShow"
      style="width: 130px; margin-right: 10px"
      v-model="yh"
      placeholder="野外用火"
      size="small"
    >
      <el-option label="经批准" value="1"></el-option>
      <el-option label="违规" value="0"></el-option>
    </el-select>
    <span>用火类型：</span>
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="leiXingBm"
      placeholder="用火类型"
      size="small"
    >
      <el-option
        v-for="item in fireOptions"
        :key="item.bianMa"
        :label="item.mingCheng"
        :value="item.bianMa"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { fetchLeibieList } from "@/common/baseApi/api";
import { PzYhCode, WgYhCode } from "@/common/BaseCode";
export default {
  name: "FireType",
  props: {
    value: {
      type: [String, Object],
      default() {
        return "";
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    prop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      fireOptions: [],
      yh: "",
      leiXingBm: "",
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!newVal.leiXingBm && oldVal.leiXingBm) {
          this.yh = "";
          this.leiXingBm = "";
        }
      },
    },
    yh: {
      handler(val) {
        if (val) {
          this.getOptions(val);
          this.leiXingBm = "";
        }
      },
      deep: true,
    },
    leiXingBm: {
      handler(val) {
        if (val) {
          this.$emit("input", val);
          this.$emit("change", val);
        }
      },
      deep: true,
    },
  },
  created() {
    this.getOptions();
  },
  methods: {
    async getOptions(val = "1") {
      if (this.prop.selfShow) {
        let bianhao = val === "1" ? PzYhCode : WgYhCode;
        this.fireOptions = await fetchLeibieList({ leiBie: bianhao });
      } else {
        let arr1 = await fetchLeibieList({ leiBie: PzYhCode });
        let arr2 = await fetchLeibieList({ leiBie: WgYhCode });
        this.fireOptions = arr1.concat(arr2);
      }
    },
  },
};
</script>

<style scoped></style>
