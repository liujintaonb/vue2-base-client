
<script>
import input from "@/components/common/input";
import select from "@/components/common/select";
import radio from "@/components/common/radio";
import dataPickter from "@/components/common/date-picker";
import dataPickter2 from "@/components/common/date-picker2";
import doubleInput from "@/components/common/double-input";
import html from "@/components/common/html";
import table from "@/components/common/table";
import button from "@/components/common/button";
import checkbox from "@/components/common/checkBox";
import postion from "@/components/common/postion";
import TreeType from "@/components/common/TreeType/TreeType";
import BaseCascader from "@/components/BaseCascader";
import uploadFile from "@/components/common/upload-file";

const componentsTypeMap = {
  input,
  select,
  radio,
  dataPickter,
  dataPickter2,
  doubleInput,
  html,
  table,
  button,
  checkbox,
  postion,
  TreeType,
  BaseCascader,
  uploadFile,
};
export default {
  name: "xcyFormBase",
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    prop: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
  },
  methods: {
    formBtnClick(action) {
      this.$emit("formBtnClick", action);
    },
    valueChange(value) {
      this.data[this.prop.prop] = value;
      this.$emit("input", {
        ...this.data,
        [this.prop.prop]: value,
      });
      this.$emit("change", {
        ...this.data,
        [this.prop.prop]: value,
      });
    },
    dataChange(data) {
      Object.assign(this.data, {
        ...this.data,
        ...data,
      });
      this.$emit("input", {
        ...this.data,
        ...data,
      });
      this.$emit("change", {
        ...this.data,
        ...data,
      });
    },
    propFormat(data) {
      if (Array.isArray(data)) {
        return data.reduce((total, item) => {
          return total + "-" + item;
        }, "");
      }
      return data;
    },
    getBaseElem(createElement) {
      let components = componentsTypeMap[this.prop.type] || "";
      if (this.prop.components) {
        components = this.prop.components;
      }
      if (this.prop.type === "text") {
        return createElement("span", {
          domProps: {
            innerHTML: this.prop.format
              ? this.prop.format(this.data[this.prop.prop], this.data)
              : this.data[this.prop.prop] || "--",
          },
        });
      }
      return createElement(components, {
        props: {
          data: this.data,
          value: this.data[this.prop.prop],
          prop: this.prop,
        },
        on: {
          input: this.valueChange,
          change: this.valueChange,
          dataInput: this.dataChange,
          formBtnClick: this.formBtnClick,
        },
      });
    },
    getFormItem(createElement) {
      return createElement(
        "el-form-item",
        {
          class: {
            "is-required": this.prop.required,
            "el-form-item-block": this.prop.elFormItemBlock,
            "el-form-item-none": this.prop.elFormItemNone,
          },
          ref: "baseFormItem",
          props: {
            label: this.prop.label ? this.prop.label + "：" : "",
            prop: this.propFormat(this.prop.prop),
            rules: this.prop.rules,
            key: this.prop.label,
            style: Object.assign({ padding: 0 }, this.prop.style),
            "label-width": this.prop.width ? this.prop.width : "",
            "label-style": this.prop.labelStyle ? this.prop.labelStyle : "",
            "show-message": this.prop.showMessage,
          },
        },
        [
          this.prop.labelMessage ||
            (this.prop.label &&
              (this.prop.label.includes("&#") ||
                this.prop.label.includes("MathML")) &&
              createElement("span", { slot: "label" }, [
                createElement(
                  "span",
                  {
                    domProps: {
                      innerHTML: this.prop.label ? this.prop.label + "：" : "",
                    },
                  },
                  []
                ),
              ])),
          this.getBaseElem(createElement),
        ]
      );
    },
  },
  render(createElement) {
    return createElement(
      "section",
      {
        class: {
          "group-item": true,
        },
        attrs: {
          style: this.prop.style,
        },
      },
      [this.getFormItem(createElement)]
    );
  },
};
</script>
<style>
.el-form-item.is-required.hidden-label .el-form-item__label:before {
  content: "";
}
.el-form-item.is-required.hidden-label .el-form-item__label label {
  padding: 0;
}
.el-form-item-block {
  width: 100%;
}
.el-form-item-block .el-form-item__content {
  width: 100%;
}
.el-form-item-none {
  display: none !important;
}
</style>
<style scoped>
.tips {
  font-size: 12px;
  margin: 0;
}
</style>
