<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.show"
    :close-on-click-modal="false"
    :width="dialog.dialogWidth"
    @open="open"
    @close="close"
  >
    <el-form :size="dialog.size" ref="ruleForm" :model="dialog.data">
      <el-row v-for="(items, index) in dialog.forms" :gutter="10" :key="index">
        <el-col v-for="(item, itemInex) in items" :span="24" :key="itemInex">
          <el-form-item
            :label="item.label + '：'"
            :label-width="dialog.labelWidth"
            :prop="item.prop"
            v-if="!item.notShow"
            :rules="validateValueGetter(item)"
          >
            <div v-if="dialog.operateType === 'detail'">
              <span>{{ getDetaiText(item) }}</span>
            </div>
            <el-select
              v-model="dialog.data[item.prop]"
              :placeholder="item.placeholder"
              v-else-if="item.type === 'select'"
              value-key="value"
              clearable
              :disabled="item.disabled"
              :filterable="item.filterable"
              :multiple="item.multiple"
              :collapse-tags="item.collapseTags"
              :allow-create="item.allowCreate"
              :default-first-option="item.defaultFirstOption"
              @change="selectChange($event, index, item)"
              @focus="focusInput(item)"
              :style="{ width: dialog.formWidth ? dialog.formWidth : '70%' }"
            >
              <el-option
                :label="option.label"
                :value="option.value"
                v-for="option in item.options"
                :key="option.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="dialog.data[item.prop]"
              :placeholder="item.placeholder"
              v-else-if="item.type === 'date' || item.type === 'datetime'"
              :disabled="item.disabled"
              :style="{ width: dialog.formWidth ? dialog.formWidth : '70%' }"
              :type="item.type"
            >
            </el-date-picker>
            <el-input
              v-model="dialog.data[item.prop]"
              v-else
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              :maxlength="item.maxLength"
              :show-password="item.type === 'password'"
              :style="{ width: dialog.formWidth ? dialog.formWidth : '70%' }"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        :type="dialog.operateType === 'detail' ? 'primary' : null"
        class="small-btn"
        size="small"
        @click="dialog.show = false"
        >取 消</el-button
      >
      <el-button
        type="primary"
        class="small-btn"
        size="small"
        @click="submit"
        v-if="dialog.operateType !== 'detail'"
        :disabled="processing"
        >确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  $rInteger,
  $rFloat,
  $rPhone,
  $rEmail,
  $rIdentity,
  $rChinese,
  $rEnglish,
  $rBankId,
  $rDecimal,
} from "./validFuns";
import { $dateTimeFormatter, $dateFormatter } from "./formatterFuns";

export default {
  components: {},
  mixins: [],
  props: {
    dialog: Object,
  },
  data() {
    return {
      processing: false,
    };
  },
  mounted() {},
  methods: {
    getDetaiText(item) {
      if (item.type === "select" && item.options) {
        let label = "";
        if (item.multiple) {
          if (this.dialog.data[item.prop]) {
            if (
              typeof this.dialog.data[item.prop] === "string" &&
              this.dialog.data[item.prop].constructor === String
            ) {
              this.dialog.data[item.prop] = this.dialog.data[item.prop].split(
                item.delimiter ? item.delimiter : ";"
              );
            }
            let checkedData = item.options.filter(
              (r) => this.dialog.data[item.prop].indexOf(r.value) > -1
            );
            if (checkedData) {
              for (let i = 0; i < checkedData.length; i++) {
                label += checkedData[i].label;
                if (i !== checkedData.length - 1) {
                  label += item.delimiter ? item.delimiter : ";";
                }
              }
              return label;
            }
          }
        } else {
          label = item.options.filter(
            (r) => r.value === this.dialog.data[item.prop]
          )[0];
          if (label) {
            return label.label;
          }
        }
      }
      return this.dialog.data[item.prop];
    },
    submit() {
      if (this.processing) {
        return;
      }
      this.processing = true;
      for (let i = 0; i < this.dialog.forms.length; i++) {
        for (let j = 0; j < this.dialog.forms[i].length; j++) {
          let form = this.dialog.forms[i][j];
          if (form.prop.indexOf(".") >= 0) {
            let props = form.prop.split(".");
            this.dialog.data[props[0]][props[1]] = this.dialog.data[form.prop];
          }
        }
      }
      this.$refs["ruleForm"].validate((valid, object) => {
        let pass = true;
        for (let prop in object) {
          if (!this.dialog.data[prop]) {
            pass = false;
            break;
          }
        }
        if (pass) {
          this.$refs["ruleForm"].clearValidate();
          valid = true;
        }
        if (valid) {
          let submitData = this.getSubmitData();
          if (submitData.guizeTypeBm === "9709") {
            delete submitData.column1;
          }
          submitData.status = submitData.status
            ? submitData.status.join(",")
            : "";
          let promise;
          if (this.dialog.operateType === "edit") {
            promise = this.dialog.updateMethod(submitData);
          }
          if (this.dialog.operateType === "add") {
            promise = this.dialog.addMethod(submitData);
          }

          promise.then(
            (data) => {
              if (data) {
                this.dialog.show = false;
                this.$message.success("操作成功");
                if (this.dialog.onSuccess) {
                  this.dialog.onSuccess();
                }
              }
              this.processing = false;
            },
            () => {
              this.processing = false;
              this.$message.error("操作失败");
            }
          );
        } else {
          this.processing = false;
          console.warn("表单验证失败!");
        }
      });
    },
    getSubmitData() {
      let submitData = JSON.parse(JSON.stringify(this.dialog.data));
      if (this.dialog.beforeSubmit) {
        this.dialog.beforeSubmit(submitData);
      }
      // 处理数据，包括单位的处理和其他隐含的转换
      for (let i = 0; i < this.dialog.forms.length; i++) {
        for (let j = 0; j < this.dialog.forms[i].length; j++) {
          let form = this.dialog.forms[i][j];
          if (form.type === "date" && form.isEndDate) {
            let endDate = new Date(submitData[form.prop]);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
            submitData[form.prop] = endDate;
          }
          if (
            form.type === "select" &&
            form.multiple &&
            submitData[form.prop]
          ) {
            if (submitData[form.prop].includes("all")) {
              let selectOptions = [];
              if (form.keepAll) {
                selectOptions.push("all");
              } else {
                for (let option of form.options) {
                  if (option.value !== "all") {
                    selectOptions.push(option.value);
                  }
                }
              }
              submitData[form.prop] = selectOptions;
            }
            if (form.convertString) {
              let delimiter = form.delimiter ? form.delimiter : ";";
              submitData[form.prop] = submitData[form.prop].join(delimiter);
            }
          }
        }
      }
      return submitData;
    },
    open() {
      if (this.dialog && this.dialog.operateType === "detail") {
        this.dialog.data = JSON.parse(JSON.stringify(this.dialog.data));
      }
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].clearValidate();
      }
      this.processing = false;
      for (let i = 0; i < this.dialog.forms.length; i++) {
        for (let j = 0; j < this.dialog.forms[i].length; j++) {
          let form = this.dialog.forms[i][j];
          if (form.prop.indexOf(".") >= 0) {
            let props = form.prop.split(".");
            if (!this.dialog.data[props[0]]) {
              this.dialog.data[props[0]] = {};
            }
            if (this.dialog.data[props[0]][[props[1]]]) {
              this.dialog.data[form.prop] = this.dialog.data[props[0]][
                [props[1]]
              ];
            }
          }
          if (this.dialog.operateType === "detail") {
            if (form.type === "date") {
              this.dialog.data[form.prop] = $dateFormatter(
                null,
                null,
                this.dialog.data[form.prop]
              );
            }
            if (form.type === "datetime") {
              this.dialog.data[form.prop] = $dateTimeFormatter(
                null,
                null,
                this.dialog.data[form.prop]
              );
            }
          }
          if (
            form.type === "select" &&
            form.multiple &&
            form.convertString &&
            this.dialog.data[form.prop]
          ) {
            this.dialog.data[form.prop] = this.dialog.data[form.prop].split(
              form.delimiter ? form.delimiter : ";"
            );
          }
          if (
            form.operateType !== "add" &&
            form.type === "select" &&
            form.linkProp
          ) {
            this.selectChange(this.dialog.data[form.prop], null, form);
          }
        }
      }
    },
    close() {},
    validateValueGetter(item) {
      let rules = [];
      if (item.required && this.dialog.operateType !== "detail") {
        rules.push({ required: true, message: "不能为空", trigger: "blur" });
      }
      switch (item.type) {
        case "integer":
          rules.push($rInteger());
          break;
        case "float":
          rules.push($rFloat());
          break;
        case "phone":
          rules.push($rPhone());
          break;
        case "email":
          rules.push($rEmail());
          break;
        case "identity":
          rules.push($rIdentity());
          break;
        case "cn":
          rules.push($rChinese());
          break;
        case "en":
          rules.push($rEnglish());
          break;
        case "bank":
          rules.push($rBankId());
          break;
        case "decimal":
          rules.push($rDecimal());
          break;
      }
      if (item.validate) {
        let data = this.dialog.data;
        rules.push({
          validator: (rule, value, callback) => {
            item.validate(value, data, callback);
          },
          trigger: "blur",
        });
      }
      return rules;
    },
    selectChange(value, index, item) {
      if (item.change) {
        item.change(value, index);
      }
    },
    focusInput(item) {
      if (item.focus) {
        item.focus();
      }
    },
    getFormByProp(linkProp) {
      for (let formArray of this.dialog.forms) {
        for (let formItem of formArray) {
          if (formItem.prop === linkProp) {
            return formItem;
          }
        }
      }
    },
  },
};
</script>
