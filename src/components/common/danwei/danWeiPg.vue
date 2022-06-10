<template>
  <div class="main">
    <el-select
      v-if="level >= 1"
      style="width: 130px; margin-right: 10px"
      v-model="province"
      placeholder="省"
      size="small"
      :disabled="disabledL1"
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
      :disabled="disabledL2"
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
      :disabled="disabledL3"
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
      v-if="level >= 5"
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
import Storage from "@/common/storage";
import { getXzCodeByPg } from "@/common/baseApi/api";
export default {
  name: "XdanWeiPg",
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
      // commissId
      commissId: Storage.get("fuserInfo").commissId || "",
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (this.prop.needAssignment && newVal) {
          this.initByXzCode(newVal.danwei);
        }
        if (!newVal.danwei && oldVal.danwei) {
          this.province = "";
          this.shi = "";
          this.shiOptions = [];
          this.xian = "";
          this.xianOptions = [];
          this.xiang = "";
          this.xiangOptions = [];
          this.cun = "";
          this.cunOptions = [];
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
          this.xianOptions = [];
          this.xiang = "";
          this.xiangOptions = [];
          this.cun = "";
          this.cunOptions = [];
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
          this.xiangOptions = [];
          this.cun = "";
          this.cunOptions = [];
          const obj = this.parseValue(val);
          this.$emit("input", obj);
          this.$emit("change", obj);
        }
      },
      deep: true,
    },
    xian: {
      handler(val) {
        console.log(777);
        console.log(val);
        console.log(this.initFlag);
        if ((val || val === null) && !this.initFlag) {
          console.log(true);
        } else {
          console.log(false);
        }
        if ((val || val === null) && !this.initFlag) {
          console.log(888);
          this.getXiangOptions();
          this.xiang = "";
          this.cun = "";
          this.cunOptions = [];
          const obj = this.parseValue(val);
          console.log(obj);
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
  },
  async created() {
    await this.getProvinceOptions();
    await this.initByXzCode();
  },
  methods: {
    // 获取省
    async getProvinceOptions() {
      const options =
        (await getXzCodeByPg({
          cParentcode: "0",
        })) || [];
      if (this.isShowAll && !this.commissId) {
        options.unshift({
          ccode: null,
          cfrcode: null,
          cmc: "全部",
        });
      }
      this.provinceOptions = options;
    },
    // 获取市
    async getShiOptions() {
      let options = [];
      if (this.province !== null) {
        options =
          (await getXzCodeByPg({
            cParentcode: this.province,
          })) || [];
      }
      if (this.isShowAll) {
        const all = this.parseValue(this.province);
        if (all) {
          options.unshift({
            ...all,
            cmc: "全部",
          });
        }
      }
      this.shiOptions = [...options];
    },
    // 获取县
    async getXianOptions() {
      let options = [];
      if (this.province !== this.shi) {
        options =
          (await getXzCodeByPg({
            cParentcode: this.shi,
          })) || [];
      }
      if (this.isShowAll) {
        const all = this.parseValue(this.shi);
        if (all) {
          options.unshift({
            ...all,
            cmc: "全部",
          });
        }
      }
      this.xianOptions = [...options];
    },
    // 获取乡
    async getXiangOptions() {
      if (this.level < 4) {
        return;
      }
      let options = [];
      if (this.shi !== this.xian) {
        options =
          (await getXzCodeByPg({
            cParentcode: this.xian,
          })) || [];
      }
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
      if (this.level < 5) {
        return;
      }
      let options = [];
      if (this.xian !== this.xiang) {
        options =
          (await getXzCodeByPg({
            cParentcode: this.xiang,
          })) || [];
      }
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
    // 根据行政code初始化
    async initByXzCode(xzCode = "") {
      if (this.initFlag) {
        return;
      }
      if (!xzCode) {
        if (this.commissId) {
          xzCode = this.provinceOptions[0].cfrcode;
          this.province = xzCode.slice(0, 2);
          this.disabledL1 = false;
          this.getShiOptions();
          // 清空所有下级数据
          this.shi = "";
          this.xian = "";
          this.xianOptions = [];
          this.xiang = "";
          this.xiangOptions = [];
        } else {
          // 设置 xzCode 默认值
          xzCode = this.value || Storage.get("fuserInfo").xzCode || "";
        }
      }
      console.log(123123);
      this.$root.pingGuXzCodeObj = { ccode: xzCode };
      this.initFlag = true;
      // 初始化省
      if (!this.commissId && xzCode.length >= 2) {
        this.province = xzCode.slice(0, 2);
        this.disabledL1 = this.allowDisabled && !this.commissId;
        this.getShiOptions();
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
        this.disabledL2 = this.allowDisabled && true;
        this.getXianOptions();
        // 清空所有下级数据
        this.xian = "";
        this.xiang = "";
        this.xiangOptions = [];
      }
      // 初始化县
      if (xzCode.length >= 6) {
        this.xian = xzCode.slice(0, 6);
        this.disabledL3 = this.allowDisabled && true;
        this.getXiangOptions();
        // 清空所有下级数据
        this.xiang = "";
      }
      // 初始化乡
      if (xzCode.length >= 9) {
        this.xiang = xzCode.slice(0, 9);
        this.disabledL4 = this.allowDisabled && true;
        this.getCunOptions();
      }
      // 初始化村
      if (xzCode.length >= 12) {
        this.cun = xzCode.slice(0, 12);
        this.disabledL5 = this.allowDisabled && true;
      }
      const vm = this;
      setTimeout(() => {
        vm.initFlag = false;
      }, 500);
      const obj = this.parseValue(
        this.cun || this.xiang || this.xian || this.shi || this.province
      );
      console.log("obj");
      console.log(obj);
      if (obj) {
        this.$emit("change", obj);
        this.$emit("input", obj);
      }
    },
    parseValue(val) {
      console.log(5);
      console.log(val);
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
      console.log(target);
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
