<template>
  <div class="main">
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="dataTypeBm"
      placeholder="数据类型"
      size="small"
    >
      <el-option
        v-for="item in dataTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <span>数据表：</span>
    <el-select
      style="width: 130px; margin-right: 10px"
      v-model="table1Guid"
      placeholder="数据表"
      no-data-text="请选择数据类型"
      size="small"
    >
      <el-option
        v-for="item in dataTableOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { fetchLeibieList } from "@/common/baseApi/api";
import { getTableData } from "./api";
import { DataTypeCode } from "@/common/BaseCode";
export default {
  name: "DataContent",
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
      dataTypeOptions: [],
      dataTableOptions: [],
      dataTypeBm: null,
      table1Guid: null,
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!newVal.data && oldVal.data) {
          this.dataTypeBm = null;
          this.table1Guid = null;
          this.dataTableOptions = [];
        }
      },
    },
    dataTypeBm: {
      handler(val) {
        if (val) {
          this.getDataTableOptions(val);
          this.table1Guid = null;
        } else {
          this.table1Guid = null;
          this.dataTableOptions = [];
        }
        this.$emit("input", {
          dataTypeBm: val,
          table1Guid: this.table1Guid,
        });
        this.$emit("change", {
          dataTypeBm: val,
          table1Guid: this.table1Guid,
        });
      },
      deep: true,
    },
    table1Guid: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit("input", {
            dataTypeBm: this.dataTypeBm,
            table1Guid: newVal,
          });
          this.$emit("change", {
            dataTypeBm: this.dataTypeBm,
            table1Guid: newVal,
          });
        }
      },
      deep: true,
    },
  },
  created() {
    this.getDataTypeOptions();
  },
  methods: {
    async getDataTypeOptions() {
      const res = await fetchLeibieList({ leiBie: DataTypeCode });
      let options = res.map((e) => {
        return {
          label: e.mingCheng,
          value: e.bianMa,
        };
      });
      options.unshift({
        label: "全部",
        value: "",
      });
      this.dataTypeOptions = options;
    },
    async getDataTableOptions(val) {
      const res = await getTableData({ size: 9999, dataTypeBm: val });
      let options = res.content.map((r) => {
        return { value: r.guid, label: r.dataTableContent };
      });
      options.unshift({
        label: "全部",
        value: "",
      });
      this.dataTableOptions = options;
    },
  },
};
</script>

<style scoped></style>
