<template>
  <div class="main">
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="l1Value"
      placeholder="请选择"
      size="small"
    >
      <el-option
        v-for="item in l1Options"
        :key="item.bianMa"
        :label="item.mingCheng"
        :value="item.bianMa"
      >
      </el-option>
    </el-select>
    <el-select
      v-show="l2Options.length > 0"
      style="width: 130px; margin-right: 10px"
      v-model="l2Value"
      placeholder="请选择"
      size="small"
    >
      <el-option
        v-for="item in l2Options"
        :key="item.bianMa"
        :label="item.mingCheng"
        :value="item.bianMa"
      >
      </el-option>
    </el-select>
    <el-select
      v-show="l3Options.length > 0"
      style="width: 130px; margin-right: 10px"
      v-model="l3Value"
      placeholder="请选择"
      size="small"
    >
      <el-option
        v-for="item in l3Options"
        :key="item.bianMa"
        :label="item.mingCheng"
        :value="item.bianMa"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { l1Options, l2Options, l3Options } from "./api";

export default {
  name: "qhyy",
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
      l1Options: [],
      l2Options: [],
      l3Options: [],
      l1Value: "",
      l2Value: "",
      l3Value: "",
      initFlag: false,
    };
  },
  mounted() {},
  computed: {},
  watch: {
    l1Value: {
      handler(val) {
        if (val && !this.initFlag) {
          console.log("index.vue", "116", "handler", new Date(), "");
          this.l2Options = [];
          this.l3Options = [];
          this.l2Value = "";
          this.l3Value = "";
          this.getl2Options();
          this.$emit("input", val);
          this.$emit("change", val);
        }
      },
      deep: true,
    },
    l2Value: {
      handler(val) {
        if (val && !this.initFlag) {
          console.log("index.vue", "133", "handler", new Date(), "");
          this.l3Value = "";
          this.l3Options = [];
          this.getl3Options();
          this.$emit("input", val);
          this.$emit("change", val);
        }
      },
      deep: true,
    },
    l3Value: {
      handler(val) {
        if (val && !this.initFlag) {
          console.log("index.vue", "151", "handler", new Date(), "");
          this.$emit("input", val);
          this.$emit("change", val);
        }
      },
      deep: true,
    },
  },
  methods: {
    // 获取l1
    async getl1Options() {
      this.l1Options = (await l1Options()) || [];
    },
    // 获取l2
    async getl2Options() {
      this.l2Options = (await l2Options(this.l1Value)) || [];
    },
    // 获取l3
    async getl3Options() {
      this.l3Options = (await l3Options(this.l2Value)) || [];
    },
  },
  async created() {
    await this.getl1Options();
  },
};
</script>

<style scoped></style>
