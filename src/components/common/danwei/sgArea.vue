<template>
  <div class="main" style="text-align: left">
    <div
      v-if="prop.showRadio"
      :class="{ 'label-position': prop.labelPosition }"
    >
      <el-radio-group
        class="fill-radio"
        v-model="fillWay"
        @change="changeFillWay"
      >
        <el-radio :label="1">手动填写</el-radio>
        <el-radio :label="2">下拉选择</el-radio>
      </el-radio-group>
    </div>
    <template v-if="fillWay === 1">
      <el-input
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="forestSheng"
        placeholder="森工集团"
        size="small"
        clearable
        @change="getInputData"
      ></el-input>
      <el-input
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="forestShi"
        placeholder="林业管理局"
        size="small"
        clearable
        @change="getInputData"
      ></el-input>
      <el-input
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="forestXian"
        placeholder="林业局"
        size="small"
        clearable
        @change="getInputData"
      ></el-input>
      <el-input
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="forestXiang"
        placeholder="林场"
        size="small"
        clearable
        @change="getInputData"
      ></el-input>
    </template>
    <template v-else>
      <el-select
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="senGongJiTuan"
        placeholder="森工集团"
        size="small"
        clearable
        @change="changeCode(senGongJiTuan, 2)"
      >
        <el-option
          v-for="item in sgjtOptions"
          :key="item.guid"
          :label="item.c_mc"
          :value="item.c_frcode"
        >
        </el-option>
      </el-select>
      <el-select
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="linYeGuanLiJu"
        placeholder="林业管理局"
        size="small"
        clearable
        @change="changeCode(linYeGuanLiJu, 4)"
      >
        <el-option
          v-for="item in lygljOptions"
          :key="item.guid"
          :label="item.c_mc"
          :value="item.c_frcode"
        >
        </el-option>
      </el-select>
      <el-select
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="linYeJu"
        placeholder="林业局"
        size="small"
        clearable
        @change="changeCode(linYeJu, 6)"
      >
        <el-option
          v-for="item in lyjOptions"
          :key="item.guid"
          :label="item.c_mc"
          :value="item.c_frcode"
        >
        </el-option>
      </el-select>
      <el-select
        :class="{
          'label-value-inline': prop.labelPosition,
          'label-value-block': !prop.labelPosition,
        }"
        v-model="linChang"
        placeholder="林场"
        size="small"
        clearable
        @change="changeCode(linChang, 9)"
      >
        <el-option
          v-for="item in lcOptions"
          :key="item.guid"
          :label="item.c_mc"
          :value="item.c_frcode"
        >
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
import Storage from "@/common/storage";
import { getSgXzCode } from "@/common/baseApi/api";

export default {
  name: "sgArea",
  props: {
    value: {
      type: [String, Object],
      default() {
        return "";
      },
    },
    data: {
      type: Object,
      default: () => {},
    },
    prop: {
      type: Object,
      default: () => {
        return {
          showRadio: true,
          labelPosition: false,
        };
      },
    },
  },
  data() {
    return {
      // 填写方式
      fillWay: 1,
      // 下拉选择
      senGongJiTuan: "",
      linYeGuanLiJu: "",
      linYeJu: "",
      linChang: "",
      sgjtOptions: [],
      lygljOptions: [],
      lyjOptions: [],
      lcOptions: [],
      // 手动填写
      forestSheng: "",
      forestShi: "",
      forestXian: "",
      forestXiang: "",
      // 初始化
      initFlag: false,
    };
  },
  created() {
    this.fillWay = this.value || !this.prop.showRadio ? 2 : 1;
    if (this.fillWay === 1) {
      this.forestSheng = this.data.forestSheng;
      this.forestShi = this.data.forestShi;
      this.forestXian = this.data.forestXian;
      this.forestXiang = this.data.forestXiang;
    } else {
      this.getSgXzCode("0");
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!newVal.sgArea && oldVal.sgArea) {
          if (this.fillWay === 2) {
            this.changeCode("", 2);
          } else {
            this.forestSheng = "";
            this.forestShi = "";
            this.forestXian = "";
            this.forestXiang = "";
            this.getInputData();
          }
        }
      },
    },
  },
  methods: {
    /**
     * @param { number } 1为手动填写, 2为下拉选择
     **/
    changeFillWay(val) {
      if (val === 1) {
        const obj = this.parseValue(this.value);
        this.forestSheng = obj.forestSheng;
        this.forestShi = obj.forestShi;
        this.forestXian = obj.forestXian;
        this.forestXiang = obj.forestXiang;
        this.getInputData();
      } else {
        this.getSgXzCode("0");
      }
    },
    getInputData() {
      this.$emit("change", {
        sgXzCode: "",
        forestSheng: this.forestSheng,
        forestShi: this.forestShi,
        forestXian: this.forestXian,
        forestXiang: this.forestXiang,
      });
      this.$emit("input", {
        sgXzCode: "",
        forestSheng: this.forestSheng,
        forestShi: this.forestShi,
        forestXian: this.forestXian,
        forestXiang: this.forestXiang,
      });
    },
    /**
     *@param val 森工代码
     * @param key 级别 (2为森工集团 4为林业管理局 6为林业局 9为林场)
     **/
    changeCode(val, key) {
      let obj;
      if (val) {
        this.getSgXzCode(val);
        obj = this.parseValue(val);
      } else {
        let tempVal;
        if (key <= 9) {
          this.linChang = "";
          tempVal = this.linYeJu;
        }
        if (key <= 6) {
          this.linYeJu = "";
          this.lcOptions = [];
          tempVal = this.linYeGuanLiJu;
        }
        if (key <= 4) {
          this.linYeGuanLiJu = "";
          this.lyjOptions = [];
          tempVal = this.senGongJiTuan;
        }
        if (key <= 2) {
          this.senGongJiTuan = "";
          this.lygljOptions = [];
          tempVal = "";
        }
        obj = this.parseValue(tempVal);
      }
      if (obj) {
        this.$emit("change", obj);
        this.$emit("input", obj);
      }
    },
    async initByXzCode() {
      if (this.initFlag) {
        return;
      }
      let xzCode = this.value || "";
      this.initFlag = true;
      if (xzCode.length >= 2) {
        this.senGongJiTuan = xzCode.slice(0, 2);
        await this.getSgXzCode(this.senGongJiTuan);
      }
      if (xzCode.length >= 4) {
        this.linYeGuanLiJu = xzCode.slice(0, 4);
        await this.getSgXzCode(this.linYeGuanLiJu);
      }
      if (xzCode.length >= 6) {
        this.linYeJu = xzCode.slice(0, 6);
        await this.getSgXzCode(this.linYeJu);
      }
      if (xzCode.length >= 9) {
        this.linChang = xzCode.slice(0, 9);
      }
      const vm = this;
      setTimeout(() => {
        vm.initFlag = false;
      }, 500);
      const obj = this.parseValue(
        this.linChang ||
          this.linYeJu ||
          this.linYeGuanLiJu ||
          this.senGongJiTuan ||
          ""
      );
      if (obj) {
        this.$emit("change", obj);
      }
    },
    async getSgXzCode(value) {
      // 林场不要获取下级或者森工集团有下拉不需要重新加载
      if (value.length > 6 || (value.length === 1 && this.sgjtOptions.length)) {
        return false;
      }
      const res = await getSgXzCode({
        cParentcode: value,
      });
      switch (value.length) {
        case 1:
          // this.senGongJiTuan = '';
          // this.linYeJu = '';
          // this.linChang = '';
          this.sgjtOptions = [...res];
          // this.lyjOptions = [];
          // this.lcOptions = [];
          break;
        case 2:
          this.linYeGuanLiJu = "";
          this.linYeJu = "";
          this.linChang = "";
          this.lygljOptions = [...res];
          this.lyjOptions = [];
          this.lcOptions = [];
          break;
        case 4:
          this.linYeJu = "";
          this.linChang = "";
          this.lyjOptions = [...res];
          this.lcOptions = [];
          break;
        case 6:
          this.linChang = "";
          this.lcOptions = [...res];
      }
    },
    parseValue(val) {
      const obj = {
        sgXzCode: "",
        forestSheng: "",
        forestShi: "",
        forestXian: "",
        forestXiang: "",
      };
      if (val.length > 1) {
        const item = this.sgjtOptions.find((v) => {
          return v.c_frcode === this.senGongJiTuan;
        });
        obj.sgXzCode = this.senGongJiTuan;
        obj.forestSheng = item.c_mc;
      }
      if (val.length > 2) {
        const item = this.lygljOptions.find((v) => {
          return v.c_frcode === this.linYeGuanLiJu;
        });
        obj.sgXzCode = this.linYeGuanLiJu;
        obj.forestShi = item.c_mc;
      }
      if (val.length > 4) {
        const item = this.lyjOptions.find((v) => {
          return v.c_frcode === this.linYeJu;
        });
        obj.sgXzCode = this.linYeJu;
        obj.forestXian = item.c_mc;
      }
      if (val.length > 6) {
        const item = this.lcOptions.find((v) => {
          return v.c_frcode === this.linChang;
        });
        obj.sgXzCode = this.linChang;
        obj.forestXiang = item.c_mc;
      }
      return obj;
    },
  },
  mounted() {
    this.initByXzCode();
  },
};
</script>

<style lang="stylus" scoped>
.fill-radio{
  margin: 0 15px;
}
.label-position {
  display inline-block;
}
.label-value-inline {
  width: 150px;
  margin-right: 10px;
}
.label-value-block {
  width: 164px;
  margin-right: 10px;
}
</style>
