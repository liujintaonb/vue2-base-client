<!-- 草本样品取样测定表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <!--            1-->
      <tr>
        <td class="info-title">草本样品编号</td>
        <td class="info-title">草本样品鲜重(g)</td>
        <td class="info-title">草本样品干重(g)</td>
        <td class="info-title">草本样品干鲜比(%)</td>
        <td class="info-title">草本样品含水率(%)</td>
      </tr>
      <tr v-for="(item, index) in arrData" :key="index">
        <td>{{ item.ypbh | formatValue }}</td>
        <td>{{ item.ypxz | formatValue }}</td>
        <td>
          <template v-if="isDataAudit">
            {{ item.ypgz | formatValue }}
          </template>
          <template v-else>
            <el-input
              v-model="item.ypgz"
              size="small"
              class="update-data"
              @input="item.ypgz = updateInputData(item.ypgz)"
              maxLength="20"
              @change="computeData(index, item)"
            ></el-input>
          </template>
        </td>
        <td>{{ setPercent(item.ypgxb) | formatValue }}</td>
        <td>{{ setPercent(item.yphsl) | formatValue }}</td>
      </tr>
      <tr v-if="!arrData.length">
        <td colspan="5">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// mark - script
import tableMixin from "@/components/table/tableMixin";
import { REGEXP_NUM_DIAN } from "@/common/unit";
import { math } from "@/common/math";
export default {
  name: "cbypcd",
  mixins: [tableMixin],
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {
    computeData(i, item) {
      if (this.arrData[i].ypgz === "") {
        this.arrData[i].ypgz = "";
        this.arrData[i].ypgxb = "";
        this.arrData[i].yphsl = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      this.arrData[i].ypgz = Number(this.arrData[i].ypgz);
      if (!this.arrData[i].ypxz) {
        this.$message({
          message: "请先填写样品鲜重！",
          type: "warning",
        });
        this.arrData[i].ypgz = "";
        this.arrData[i].ypgxb = "";
        this.arrData[i].yphsl = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      /**
       * app没有验证样品鲜重不能为0，暂时样品干重可以为0
       */
      // if (!this.arrData[i].ypgz) {
      //   this.$message({
      //     message: "样品干重不能为0！",
      //     type: "warning",
      //   });
      //   this.arrData[i].ypgz = "";
      //   this.arrData[i].ypgxb = "";
      //   this.arrData[i].yphsl = "";
      //   this.$emit("updateData", this.arrData);
      //   return;
      // }
      if (isNaN(this.arrData[i].ypgz)) {
        this.$message({
          message: "请输入正确格式！",
          type: "warning",
        });
        this.arrData[i].ypgz = "";
        this.arrData[i].ypgxb = "";
        this.arrData[i].yphsl = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      if (this.arrData[i].ypgz > Number(this.arrData[i].ypxz)) {
        this.$message({
          message: "草本样品干重应小于等于草本样品鲜重！",
          type: "warning",
        });
        this.arrData[i].ypgz = "";
        this.arrData[i].ypgxb = "";
        this.arrData[i].yphsl = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      // 干鲜比
      let ypgxb = 0;
      if (Number(this.arrData[i].ypxz)) {
        ypgxb = math.divide(this.arrData[i].ypgz, this.arrData[i].ypxz);
      }
      this.arrData[i].ypgxb = math.round(ypgxb, 4);

      // 含水率
      let yphsl = 0;
      if (this.arrData[i].ypgz) {
        yphsl = math.divide(
          math.subtract(this.arrData[i].ypxz, this.arrData[i].ypgz),
          this.arrData[i].ypgz
        );
      }
      this.arrData[i].yphsl = math.round(yphsl, 4);

      this.$emit("updateData", this.arrData);
    },
    updateInputData(value) {
      return value.replace(REGEXP_NUM_DIAN, "");
    },
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
