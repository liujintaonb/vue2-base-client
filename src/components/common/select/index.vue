<!--
 * @Description: 公共select
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 13:07:36
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-06-16 13:32:48
 -->
<template>
  <div class="main">
    <div style="display: inline-block">
      <el-select
        :disabled="prop.disabled"
        v-model="select"
        :multiple="prop.multiple"
        :style="prop.colStyle || { 'max-width': '140px' }"
        :placeholder="prop.placeholder || '请选择'"
      >
        <el-option
          v-for="(item, index) in options"
          :key="item.key || index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <span style="color: red" v-if="rules">*</span>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { allOption } from "@/common/baseFunction";
export default {
  name: "xSelect",
  props: {
    value: {
      type: [String, Number, Object, Boolean, Array],
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
  },
  async mounted() {
    if (this.prop.value) {
      this.select = this.prop.value;
    }
    this.addOption();
  },
  data() {
    return {
      select: cloneDeep(this.value),
      options: [],
      allOption:
        typeof this.prop.allOption === "boolean" ? this.prop.allOption : true,
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
  methods: {
    async addOption() {
      let options = [];
      if (this.prop.options && this.prop.options.length > 0) {
        options = cloneDeep(this.prop.options);
      }
      if (this.prop.fetchOption) {
        options = await this.prop.fetchOption();
      }
      if (this.allOption) {
        this.options = await allOption(options);
        return;
      }
      this.options = options;
    },
  },
  watch: {
    select: function (val, oldValue) {
      if (this.prop.needLabel) {
        let obj;
        this.options.map((x) => {
          if (val === x.value) {
            obj = {
              label: x.label,
              value: val,
            };
          }
        });
        this.$emit("input", obj);
        this.$emit("change", obj);
        return;
      }
      if (typeof val === "string") {
        this.$emit("input", val);
        this.$emit("change", val);
      } else if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
        this.$emit("input", val);
        this.$emit("change", val);
      }
    },
    value: function (val) {
      if (this.prop.needLabel) {
        this.select = val.value;
      } else if (typeof val === "string") {
        this.select = val;
      } else if (val) {
        this.select = val;
      }
    },
    "prop.options": function (options) {
      options.map((x) => {
        if (x.checked) {
          this.select = x.value;
        }
      });
      this.options = options;
    },
  },
};
</script>
<style>
.main .el-input--small .el-input__inner {
  /* max-width: 140px; */
  height: 36px;
}
</style>
