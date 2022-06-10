<template>
  <div>
    <el-form-item>
      <el-row :gutter="1">
        <el-col :span="8">
          <el-select
            v-model="sheng"
            placeholder="省级地区"
            @change="changeSheng"
          >
            <el-option
              v-for="(v, k) in shengData"
              :key="k"
              :label="v"
              :value="k"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="shi" placeholder="市级地区" @change="changeShi">
            <el-option
              v-if="sheng.length > 0"
              label="请选择"
              value="null"
            ></el-option>
            <el-option
              v-for="(v, k) in shiData"
              :key="k"
              :label="v"
              :value="k"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="xian" placeholder="县级地区" @change="changeXian">
            <el-option
              v-if="shi.length > 0"
              label="请选择"
              value="null"
            ></el-option>
            <el-option
              v-for="(v, k) in xianData"
              :key="k"
              :label="v"
              :value="k"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
import { getXzCode } from "./api";
const all = "null";
export default {
  name: "index",
  data() {
    return {
      disableCode: "",
      xzCode: {},
      shengData: [],
      shiData: [],
      xianData: [],
      sheng: "",
      shi: "",
      xian: "",
    };
  },
  computed: {},
  watch: {
    sheng(newValue) {
      this.$emit("change", newValue);
    },
    shi(newValue) {
      this.$emit("change", newValue);
    },
    xian(newValue) {
      this.$emit("change", newValue);
    },
  },
  methods: {
    async renderXZCode() {
      let res = await getXzCode();
      this.xzCode = res;
      this.shengData = this.xzCode[0];
    },
    changeSheng(value) {
      // 赋值
      this.sheng = value;
      // 准备下一级数据
      this.shiData = this.xzCode[value];
      // 清空下一级
      this.changeShi("");
    },
    changeShi(value) {
      // 赋值
      this.shi = value;
      if (value === all) {
        this.xianData = {};
        this.changeXian(all);
      } else {
        // 准备下一级数据
        this.xianData = this.xzCode[value];
        // 清空下一级
        this.changeXian("");
      }
    },
    changeXian(value) {
      // 赋值
      this.xian = value;
    },
  },
  async created() {
    this.renderXZCode();
  },
};
</script>

<style scoped></style>
