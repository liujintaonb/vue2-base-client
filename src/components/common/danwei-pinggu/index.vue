<template>
  <div class="main">
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="xiang"
      placeholder="乡"
      size="small"
      :disabled="disabledL4"
    >
      <el-option
        v-for="item in xiangOptions"
        :key="item.guid"
        :label="item.cmc"
        :value="item.cfrcode"
      >
      </el-option>
    </el-select>
    <el-select
      v-if="prop.cunShow"
      style="width: 130px; margin-right: 10px"
      v-model="cun"
      placeholder="村"
      size="small"
      :disabled="disabledL5"
    >
      <el-option
        v-for="item in cunOptions"
        :key="item.guid"
        :label="item.cmc"
        :value="item.cfrcode"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getXzCodeByPg } from "@/common/baseApi/api";
export default {
  name: "Xdanwei",
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
    isShowAll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      xianOptions: [],
      xiangOptions: [],
      cunOptions: [],
      xiang: "",
      cun: "",
      allowDisabled: this.prop.hasOwnProperty("allowDisabled")
        ? this.prop.allowDisabled
        : true,
      disabledL1: false,
      disabledL2: false,
      disabledL3: false,
      disabledL4: false,
      disabledL5: false,
      initFlag: false,
    };
  },
  watch: {
    data: {
      handler(newVal) {
        if (this.prop.needAssignment && newVal) {
          if (
            !newVal.danwei ||
            !newVal.danwei === "null" ||
            newVal.danwei.length < 6
          ) {
            this.xiangOptions = [];
            this.cunOptions = [];
            this.xiang = "";
            this.cun = "";
          } else if (newVal.danwei.length === 6) {
            this.xiangOptions = [];
            this.cunOptions = [];
            this.xiang = "";
            this.cun = "";
            this.xian = newVal.danwei;
            this.getXiangOptions();
          }
        }
      },
      deep: true,
    },
    xiang: {
      handler(val) {
        if ((val || val === null) && !this.initFlag) {
          this.getCunOptions();
          this.cun = "";
          const obj = this.parseValue(val);
          if (obj === "") {
            return;
          }
          this.$emit("input", obj);
          this.$emit("change", obj);
        }
      },
      deep: true,
    },
    cun: {
      handler(val) {
        if ((val || val === null) && !this.initFlag) {
          const obj = this.parseValue(val);
          if (obj === "") {
            return;
          }
          this.$emit("input", obj);
          this.$emit("change", obj);
        }
      },
      deep: true,
    },
  },
  async created() {
    this.init();
  },
  methods: {
    init() {
      if (this.value && this.value.length === 6) {
        this.xiangOptions = [];
        this.cunOptions = [];
        this.xiang = "";
        this.cun = "";
        this.xian = this.value;
        this.getXiangOptions();
      }
    },
    // 获取乡
    async getXiangOptions() {
      let options = [];
      options =
        (await getXzCodeByPg({
          cParentcode: this.xian,
        })) || [];
      if (this.isShowAll) {
        const all = this.parseValue(this.xian);
        if (all) {
          options.unshift({
            ...all,
            cmc: "全部",
          });
        }
      }
      this.xiangOptions = [...options];
    },
    // 获取cun
    async getCunOptions() {
      let options = [];
      options =
        (await getXzCodeByPg({
          cParentcode: this.xiang,
        })) || [];
      if (this.isShowAll) {
        const all = this.parseValue(this.xiang);
        if (all) {
          options.unshift({
            ...all,
            cmc: "全部",
          });
        }
      }
      this.cunOptions = [...options];
    },
    parseValue(val) {
      let target = [];
      if (val === null && this.isShowAll) {
        return {
          ccode: null,
          cfrcode: null,
          cmc: "全部",
        };
      } else if (val.length === 2) {
        target = this.provinceOptions;
      } else if (val.length === 4) {
        target = this.shiOptions;
      } else if (val.length === 6) {
        target = this.xianOptions;
      } else if (val.length === 9) {
        target = this.xiangOptions;
      } else if (val.length === 12) {
        target = this.cunOptions;
      }
      if (target.length === 0) {
        return "";
      }
      return (
        target.find((v) => {
          return v.cfrcode === val;
        }) || null
      );
    },
  },
};
</script>

<style scoped></style>
