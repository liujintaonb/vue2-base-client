<template>
  <div class="main">
    <el-select
      v-if="level >= 1"
      style="width: 130px; margin-right: 10px"
      v-model="province"
      placeholder="省"
      size="small"
      :disabled="disabledL1 || disabled"
    >
      <el-option
        v-for="item in provinceOptions"
        :key="item.guid"
        :label="item.cmc"
        :value="item.cfrcode"
      >
      </el-option>
    </el-select>
    <el-select
      v-if="level >= 2"
      style="width: 130px; margin-right: 10px"
      v-model="shi"
      placeholder="市"
      size="small"
      :disabled="disabledL2 || disabled"
    >
      <el-option
        v-for="item in shiOptions"
        :key="item.guid"
        :label="item.cmc"
        :value="item.cfrcode"
      >
      </el-option>
    </el-select>
    <el-select
      v-if="level >= 3"
      style="width: 130px; margin-right: 10px"
      v-model="xian"
      placeholder="县"
      size="small"
      :disabled="disabledL3 || disabled"
    >
      <el-option
        v-for="item in xianOptions"
        :key="item.guid"
        :label="item.cmc"
        :value="item.cfrcode"
      >
      </el-option>
    </el-select>
    <el-select
      v-if="level >= 4"
      style="width: 130px; margin-right: 10px"
      v-model="xiang"
      placeholder="乡"
      size="small"
      :disabled="disabledL4 || disabled"
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
      v-if="level >= 5"
      style="width: 130px; margin-right: 10px"
      v-model="cun"
      placeholder="村"
      size="small"
      :disabled="disabledL5 || disabled"
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
import Storage from "@/common/storage";
import { getXzCode } from "@/common/baseApi/api";
export default {
  name: "LvAera",
  props: {
    value: {
      type: String,
      default: "",
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initDefault: false,
      level: this.prop.level || 4,
      provinceOptions: [],
      shiOptions: [],
      xianOptions: [],
      xiangOptions: [],
      cunOptions: [],
      province: "",
      shi: "",
      xian: "",
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
  computed: {},
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!newVal.danwei) {
          this.province = "";
          this.shi = "";
          this.xian = "";
          this.xiang = "";
          this.cun = "";
          this.getProvinceOptions();
          this.initByXzCode();
        }
      },
    },
    province: {
      handler(val) {
        if ((val || val === null) && !this.initFlag) {
          this.getShiOptions();
          this.shi = "";
          this.xian = "";
          this.xiang = "";
          this.cun = "";
          const obj = this.parseValue(val);
          this.$emit("input", obj);
          this.$emit("change", obj);
        }
      },
      deep: true,
    },
    shi: {
      handler(val) {
        if ((val || val === null) && !this.initFlag) {
          this.getXianOptions();
          this.xian = "";
          this.xiang = "";
          this.cun = "";
          const obj = this.parseValue(val);
          this.$emit("input", obj);
          this.$emit("change", obj);
        }
      },
      deep: true,
    },
    xian: {
      handler(val) {
        if ((val || val === null) && !this.initFlag) {
          this.getXiangOptions();
          this.xiang = "";
          this.cun = "";
          const obj = this.parseValue(val);
          this.$emit("input", obj);
          this.$emit("change", obj);
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
          this.$emit("input", obj);
          this.$emit("change", obj);
        }
      },
      deep: true,
    },
    // value: {
    //   handler(val, old) {
    //     console.log(val, old);
    //     if (val) {
    //       this.initByXzCode();
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
    // 获取省
    async getProvinceOptions() {
      const options =
        (await getXzCode({
          cParentcode: "0",
        })) || [];
      this.provinceOptions = [...options];
    },
    // 获取市
    async getShiOptions() {
      let options = [];
      if (this.province) {
        options =
          (await getXzCode({
            cParentcode: this.province,
          })) || [];
      }
      this.shiOptions = [...options];
    },
    // 获取县
    async getXianOptions() {
      let options = [];
      if (this.shi) {
        options =
          (await getXzCode({
            cParentcode: this.shi,
          })) || [];
      }
      this.xianOptions = [...options];
    },
    // 获取乡
    async getXiangOptions() {
      if (this.level < 4) {
        return;
      }
      let options = [];
      if (this.xian) {
        options =
          (await getXzCode({
            cParentcode: this.xian,
          })) || [];
      }
      this.xiangOptions = [...options];
    },
    // 获取cun
    async getCunOptions() {
      if (this.level < 5) {
        return;
      }
      let options = [];
      if (this.xiang) {
        options =
          (await getXzCode({
            cParentcode: this.xiang,
          })) || [];
      }
      this.cunOptions = [...options];
    },
    // 根据行政code初始化
    async initByXzCode() {
      let temCode = Storage.get("fuserInfo").xzCode || "";
      if (this.initFlag) {
        return;
      }
      let xzCode = this.value || Storage.get("fuserInfo").xzCode || "";
      this.initFlag = true;
      // 初始化省
      if (xzCode.length >= 2) {
        this.province = xzCode.slice(0, 2);
        this.disabledL1 = this.allowDisabled && temCode.length >= 2;
        await this.getShiOptions();
        // 清空所有下级数据
        this.shi = "";
        this.xian = "";
        this.xianOptions = [];
        this.xiang = "";
        this.xiangOptions = [];
      }
      // 初始化市
      if (xzCode.length >= 4) {
        this.shi = xzCode.slice(0, 4);
        this.disabledL2 = this.allowDisabled && temCode.length >= 4;
        await this.getXianOptions();
        // 清空所有下级数据
        this.xian = "";
        this.xiang = "";
        this.xiangOptions = [];
      }
      // 初始化县
      if (xzCode.length >= 6) {
        this.xian = xzCode.slice(0, 6);
        this.disabledL3 = this.allowDisabled && temCode.length >= 6;
        await this.getXiangOptions();
        // 清空所有下级数据
        this.xiang = "";
      }
      // 初始化乡
      if (xzCode.length >= 9) {
        this.xiang = xzCode.slice(0, 9);
        this.disabledL4 = this.allowDisabled && temCode.length >= 9;
        await this.getCunOptions();
      }
      // 初始化村
      if (xzCode.length >= 12) {
        this.cun = xzCode.slice(0, 12);
        this.disabledL5 = this.allowDisabled && temCode.length >= 12;
      }
      const vm = this;
      setTimeout(() => {
        vm.initFlag = false;
      }, 500);
      const obj = this.parseValue(
        this.cun || this.xiang || this.xian || this.shi || this.province
      );
      if (obj) {
        this.$emit("change", obj);
        this.$emit("input", obj);
      }
      this.initDefault = true;
    },
    parseValue(val) {
      let target = [];
      if (val === null) {
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
      return (
        target.find((v) => {
          return v.cfrcode === val;
        }) || null
      );
    },
  },
  created() {
    this.getProvinceOptions();
    // this.initByXzCode()
  },
  mounted() {
    this.initByXzCode();
  },
};
</script>

<style scoped></style>
