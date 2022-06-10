<!--
 * @Description: 公共配置框架
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 11:56:14
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-06-16 12:08:52
 -->
<template>
  <el-form
    class="xcy-form-container"
    :model="internalData"
    ref="validateForm"
    :labelWidth="labelWidth"
    :labelPosition="labelPosition"
    :size="size"
    :inline="true"
    :validate-on-rule-change="false"
    :disabled="disabled"
    :hide-required-asterisk="true"
    :rules="rules"
  >
    <div class="group" v-for="(conf, index) in configFormat" :key="index">
      <div class="content">
        <div
          v-if="isFilterForm"
          class="form-flex"
          v-for="(row, index) in conf.list"
          :key="index"
        >
          <div style="width: auto; padding: 0">
            <slot name="header"></slot>
          </div>
          <div
            v-for="(item, key) in row"
            :key="key"
            :style="
              item.colWidth
                ? 'width:' + item.colWidth
                : !item.span
                ? 'width:auto'
                : ''
            "
          >
            <form-base
              :prop="item"
              :data="internalData"
              @input="valueChange"
              @formBtnClick="formBtnClick"
              ref="baseValidateForm"
            ></form-base>
          </div>
          <div v-user-leibie style="width: auto; height: 56px; padding: 0">
            <section>
              <slot></slot>
            </section>
          </div>
        </div>
        <el-row
          v-else
          v-for="(row, index) in conf.list"
          :key="index"
          :gutter="gutter"
          class="from-row"
        >
          <el-col style="width: auto; height: 56px; padding: 0">
            <slot name="header"></slot>
          </el-col>
          <el-col
            v-for="(item, key) in row"
            :key="key"
            :span="item.span"
            class="col"
            :style="
              item.colWidth
                ? 'width:' + item.colWidth
                : !item.span
                ? 'width:auto'
                : ''
            "
          >
            <form-base
              :prop="item"
              :data="internalData"
              @input="valueChange"
              @formBtnClick="formBtnClick"
              ref="baseValidateForm"
            ></form-base>
          </el-col>
          <el-col v-user-leibie style="width: auto; height: 56px; padding: 0">
            <section>
              <slot></slot>
            </section>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-form>
</template>

<script>
import { gridFormat } from "@/common/util";
import { pick, isEmpty, cloneDeep } from "lodash";
import formBase from "./base";

function noop() {}
export default {
  name: "xcyForm",
  provide() {
    return {
      rootValidateField: this.validateField,
      disabled: this.disabled,
      rootForm: this,
    };
  },
  props: {
    config: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    isFilterForm: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    labelPosition: {
      type: String,
      default: "left",
    },
    size: {
      type: String,
      default: "small",
    },
    isChange: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      default: noop,
    },
    gutter: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      internalData: cloneDeep(this.data),
      childFormList: [],
    };
  },
  methods: {
    formBtnClick(action) {
      this.$emit("formBtnClick", action);
    },
    // 通过promise来确定是否全部通过
    validate(callBack) {
      this.$refs.validateForm.validate(callBack);
    },
    validateField(prop) {
      this.$refs.validateForm.validateField(prop);
    },
    resetFields() {
      this.$emit("resetFields");
      this.$refs.validateForm.resetFields();
    },
    clearValidate() {
      this.$emit("clearValidate");
      this.$refs.validateForm.clearValidate();
    },
    reset(data) {
      if (data) {
        this.internalData = cloneDeep(data);
      } else {
        this.internalData = cloneDeep({});
      }
    },
    valueChange(value) {
      this.$emit("input", cloneDeep(value));
      this.$emit("change", cloneDeep(value));
    },
  },
  components: {
    formBase,
  },
  computed: {
    rules() {
      const results = this.config.reduce((result, cur) => {
        const rule = pick(cur, ["required", "message", "trigger"]);
        if ("rules" in cur) {
          result[cur.prop] = [...cur.rules];
          if (rule) {
            result[cur.prop].unshift(rule);
          }
        } else if (!isEmpty(rule)) {
          result[cur.prop] = [rule];
        }
        return result;
      }, {});
      return results;
    },
    configFormat() {
      if (!this.config || !this.config.length || !this.config[0].list) {
        return [
          {
            title: "",
            list: gridFormat(this.config),
          },
        ];
      }
      return this.config.map((item) => {
        return {
          ...item,
          list: gridFormat(item.list),
        };
      });
    },
  },
  created() {
    this.$on("setChildForm", (childForm) => {
      this.childFormList.push(childForm);
    });
  },
  mounted() {},
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function (newValue) {
        this.internalData = cloneDeep(newValue);
      },
    },
  },
};
</script>

<style scoped>
.xcy-form-container {
  width: 100%;
}
.form-flex {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}
.group {
  /* padding: 20px 0; */
  margin-bottom: -18px;
}
.content {
  /* margin-left: 15px; */
}
</style>

<style>
.from-row.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.col.el-col {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.xcy-form-container .col.el-col {
  height: 56px;
  overflow: hidden;
}
</style>
