<template>
  <div style="display: inline-flex">
    <el-select
      v-if="!this.isYd"
      v-model="selectData"
      placeholder="样方号"
      size="small"
      style="width: 120px; margin-right: 10px"
      @change="selectYf"
    >
      <template v-for="item in markData">
        <el-option
          :label="`样方号：${item.yfbh}`"
          :value="item.guid"
        ></el-option>
      </template>
    </el-select>
    <div v-show="isKlw && selectData">
      <el-checkbox-group v-model="checked" style="margin: 5px 10px 0 0">
        <el-checkbox v-show="klwData[0]" label="tianbao1">枯落物1</el-checkbox>
        <el-checkbox v-show="klwData[1]" label="tianbao2">枯落物2</el-checkbox>
        <el-checkbox v-show="klwData[2]" label="tianbao3">枯落物3</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-button
      slot="reference"
      type="primary"
      size="small"
      @click="changeVisible"
      style="margin: 0 10px 10px 0"
      >标记为无相关数据不填报</el-button
    >
  </div>
</template>

<script>
export default {
  name: "TianBao",
  props: {
    markData: {
      type: Array,
      default: () => [],
    },
    isYd: {
      type: Boolean,
      default: false,
    },
    isKlw: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectData: "",
      checked: [],
      klwData: [],
    };
  },
  watch: {
    markData: {
      handler() {
        this.selectData = "";
        this.checked = [];
        this.klwData = [];
      },
    },
  },
  methods: {
    selectYf() {
      if (this.isKlw) {
        const data = this.markData.find(
          (item) => item.guid === this.selectData
        );
        if (data) {
          this.klwData = [
            data.tianbao1 === "2",
            data.tianbao2 === "2",
            data.tianbao3 === "2",
          ];
        }
      } else {
        this.checked = ["tianbao"];
      }
    },
    changeVisible() {
      if (this.selectData || this.isYd) {
        if (this.isKlw && !this.checked.length) {
          this.$message.warning("请勾选枯落物");
          return false;
        }
        this.$confirm("标记为无相关数据不填报！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$emit("update", this.selectData, this.checked);
            this.selectData = "";
            this.checked = [];
            this.klwData = [];
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作！",
            });
          });
      } else {
        this.$message.warning("请先选择样方号");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.tips {
  line-height 28px;
  .status-message {
    color #e6a23c;
    font-size 18px;
    vertical-align middle;
    padding-right 6px;
  }
}
</style>
