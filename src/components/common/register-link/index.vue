<!--
 * @Description: 组册页面的联动选择器
 -->
<template>
  <div class="main">
    <div>
      <div class="controlName">
        {{ prop.controlName || "用户所在行政级别:" }}
      </div>
      <el-select v-model="registerLink.yongHuLx" placeholder="请选择">
        <el-option
          v-for="item in yongHuLxOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="select-c">
      <div class="controlName">
        {{ prop.runName || "所属区域:" }}
      </div>
      <el-select
        v-if="registerLink.yongHuLx > 0"
        @change="shengChange"
        class="register-select"
        v-model="registerLink.sheng"
        placeholder="请选择省"
      >
        <el-option
          v-for="(v, k) in shengOptions"
          :key="k"
          :label="v.cmc"
          :value="v.cfrcode"
        >
        </el-option>
      </el-select>
      <el-select
        v-if="registerLink.yongHuLx > 1"
        @change="shiChange"
        class="register-select"
        v-model="registerLink.shi"
        placeholder="请选择市"
      >
        <el-option
          v-for="(v, k) in shiOptions"
          :key="k"
          :label="v.cmc"
          :value="v.cfrcode"
        >
        </el-option>
      </el-select>
      <el-select
        v-if="registerLink.yongHuLx > 2"
        @change="xianChange"
        class="register-select"
        v-model="registerLink.xian"
        placeholder="请选择县"
      >
        <el-option
          v-for="(v, k) in xianOptions"
          :key="k"
          :label="v.cmc"
          :value="v.cfrcode"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { getRegion } from "@/common/baseApi/api";
export default {
  name: "register-link",
  props: {
    value: {
      type: [Object],
      default() {
        return {};
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
  async mounted() {},
  data() {
    return {
      yongHuLxOptions: [
        {
          label: "国家",
          value: "0",
        },
        {
          label: "省",
          value: "1",
        },
        {
          label: "市",
          value: "2",
        },
        {
          label: "县",
          value: "3",
        },
      ],
      registerLink: cloneDeep(this.value),
      xzCode: [],
      shengOptions: [],
      shiOptions: [],
      xianOptions: [],
      xiangOptions: [],
    };
  },
  computed: {
    rules: function () {
      if (
        this.prop.rules instanceof Array &&
        this.prop.rules.length &&
        this.prop.rules[0].required === true
      ) {
        return true;
      }
      return false;
    },
  },
  async created() {
    let shengOptions = await getRegion();
    this.shengOptions = shengOptions;
  },
  methods: {
    async shengChange(value) {
      const shi = await getRegion({
        parentCode: value,
      });
      this.shiOptions = shi;
    },
    async shiChange(value) {
      const xian = await getRegion({
        parentCode: value,
      });
      this.xianOptions = xian;
    },
    async xianChange(value) {
      // this.xiangOptions = this.xzCode[value];
    },
  },
  watch: {
    registerLink: function (value) {
      this.$emit("change", value);
    },
    "registerLink.yongHuLx": function (value) {
      let copyValue = cloneDeep(this.registerLink);
      if (+value === 0) {
        copyValue.yongHuLx = value;
      }
      if (+value === 1) {
        delete copyValue.shi;
        delete copyValue.xian;
      }
      if (+value === 2) {
        delete copyValue.xian;
      }
      this.registerLink = copyValue;
    },
  },
};
</script>
<style scoped>
.controlName {
  padding: 10px 0;
  padding-right: 30px;
  display: inline-block;
  color: #606266;
}
.register-select {
  display: inline-block;
  padding-bottom: 8px;
  margin-right: 8px;
}
.select-c {
  width: 700px;
}
</style>
