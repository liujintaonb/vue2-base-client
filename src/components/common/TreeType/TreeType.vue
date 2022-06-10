<template>
  <div class="main">
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="first"
      :placeholder="`${selfTreeTypeName}一级`"
      size="small"
    >
      <el-option
        v-for="item in firstOptions"
        :key="item.bianMa"
        :label="item.mingCheng"
        :value="item.bianMa"
      >
      </el-option>
    </el-select>
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="second"
      :placeholder="`${selfTreeTypeName}二级`"
      size="small"
    >
      <el-option
        v-for="item in secondOptions"
        :key="item.bianMa"
        :label="item.mingCheng"
        :value="item.bianMa"
      >
      </el-option>
    </el-select>
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="third"
      :placeholder="`${selfTreeTypeName}三级`"
      size="small"
    >
      <el-option
        v-for="item in thirdOptions"
        :key="item.bianMa"
        :label="item.mingCheng"
        :value="item.bianMa"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { SzCode } from "@/common/BaseCode";
import { fetchLeibieList, fetchLeibieZiList } from "@/common/baseApi/api";
export default {
  name: "TreeType",
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
      firstOptions: [],
      secondOptions: [],
      thirdOptions: [],
      province: "",
      first: "",
      second: "",
      third: "",
      selfTreeType: "treeType",
    };
  },
  mounted() {},
  computed: {
    selfTreeTypeName() {
      this.selfTreeType = this.prop.selfTreeType || "treeType";
      return this.selfTreeType === "treeType" ? "优势树种" : "树种";
    },
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!newVal[this.selfTreeType] && oldVal[this.selfTreeType]) {
          this.first = "";
          this.second = "";
          this.third = "";
          this.getFirstOptions();
        }
      },
    },
    first: {
      handler(val) {
        if (val) {
          this.getSecondOptions();
          this.second = "";
          this.$emit("input", val);
          this.$emit("change", val);
        } else {
          this.$emit("input", "");
          this.$emit("change", "");
          this.second = "";
          this.secondOptions = [];
        }
      },
      deep: true,
    },
    second: {
      handler(val) {
        if (val) {
          if (val !== this.first) {
            this.third = "";
            this.getThirdOptions();
          } else {
            this.third = "";
            this.thirdOptions = [];
          }
          this.$emit("input", val);
          this.$emit("change", val);
        } else {
          this.third = "";
          this.thirdOptions = [];
        }
      },
      deep: true,
    },
    third: {
      handler(val) {
        if (val && !this.initFlag) {
          this.$emit("handleLast", true);
          this.$emit("input", val);
          this.$emit("change", val);
        }
      },
      deep: true,
    },
  },
  methods: {
    // 获取一级树
    async getFirstOptions() {
      const options = await fetchLeibieList({ leiBie: SzCode });
      this.$emit("handleLast", false);
      if (this.prop.showAll && options.length) {
        options.unshift({
          mingCheng: "全部",
          bianMa: null,
        });
      }
      this.firstOptions = options;
    },
    // 获取二级树
    async getSecondOptions() {
      const options = await fetchLeibieZiList({
        leiBie: SzCode,
        fuBianMa: this.first,
      });
      this.$emit("handleLast", false);
      if (this.prop.showAll && options.length) {
        options.unshift({
          mingCheng: "全部",
          bianMa: this.first,
        });
      }
      this.secondOptions = options;
    },
    // 获取三级树
    async getThirdOptions() {
      const options = await fetchLeibieZiList({
        fuBianMa: this.second,
        leiBie: SzCode,
      });
      this.$emit("handleLast", options.length === 0);
      if (this.prop.showAll && options.length) {
        options.unshift({
          mingCheng: "全部",
          bianMa: this.second,
        });
      }
      this.thirdOptions = options;
    },
    reset() {
      this.first = "";
      this.second = "";
      this.third = "";
    },
  },
  async created() {
    await this.getFirstOptions();
  },
};
</script>

<style scoped></style>
