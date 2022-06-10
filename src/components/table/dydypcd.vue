<!--大样地干鲜比样品测定表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td
          v-for="(item, i) of [
            ['林分型编号'],
            ['序号'],
            ['样品类型'],
            ['灌木种名'],
            ['样品编号'],
            ['样品鲜重', 'g'],
            ['样品干重', 'g'],
            ['干鲜比', '%'],
            ['取样标记'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <tr v-for="(item, i) in arrData" :key="i">
        <td>{{ item.fcbh | formatValue }}</td>
        <td>{{ item.xh | formatValue }}</td>
        <td>{{ item.yplx | formatValue }}</td>
        <td>{{ item.gmzm | formatValue }}</td>
        <td>{{ item.ypbh | formatValue }}</td>
        <td>{{ item.ypxz | formatValue }}</td>
        <td>
          <span v-if="isDataAudit">{{ item.ypgz | formatValue }}</span>
          <el-input
            v-else
            v-model="item.ypgz"
            size="small"
            class="update-data"
            @input="item.ypgz = updateInputData(item.ypgz)"
            maxLength="20"
            @change="changeYpgz(i, item)"
          ></el-input>
        </td>
        <td>{{ setPercent(item.ypgxb) | formatValue }}</td>
        <td>
          <template v-if="item.yplxbm === '1'">
            {{ item.quyang === "0" ? "无需取样" : "已取样" }}
          </template>
          <template v-else> - </template>
        </td>
      </tr>
      <tr v-if="!arrData.length">
        <td :colspan="9">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
    <div class="pt10">
      <p class="pt5">样品干鲜比=(样品干重÷样品鲜重)×100%</p>
    </div>
    <div v-if="qyPhotoList.length" style="margin-top: 24px">
      <div v-for="qyPhoto in qyPhotoList" :key="qyPhoto.label">
        <h3 class="qy-title">{{ qyPhoto.label }}</h3>
        <dc-img-list :photo-list="qyPhoto.imgList"></dc-img-list>
      </div>
    </div>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import { REGEXP_NUM_DIAN } from "@/common/unit";
import DcImgList from "@/components/table/components/dcImgList";
import { math } from "@/common/math";

export default {
  name: "dydypcd",
  mixins: [tableMixin],
  props: {},
  // mark -- data
  data() {
    return {};
  },
  created() {},
  // mark -- methods
  methods: {
    changeYpgz(index) {
      if (this.arrData[index].ypgz === "") {
        this.arrData[index].ypgz = "";
        this.arrData[index].ypgxb = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      this.arrData[index].ypgz = Number(this.arrData[index].ypgz);
      if (!this.arrData[index].ypxz) {
        this.$message({
          message: "请先填写样品鲜重！",
          type: "warning",
        });
        this.arrData[index].ypgz = "";
        this.arrData[index].ypgxb = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      if (isNaN(this.arrData[index].ypgz)) {
        this.$message({
          message: "请输入正确格式！",
          type: "warning",
        });
        this.arrData[index].ypgz = "";
        this.arrData[index].ypgxb = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      if (this.arrData[index].ypgz > Number(this.arrData[index].ypxz)) {
        this.$message({
          message: "样品干重应小于等于样品鲜重！",
          type: "warning",
        });
        this.arrData[index].ypgz = "";
        this.arrData[index].ypgxb = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      let ypgxb = 0;
      if (Number(this.arrData[index].ypxz)) {
        ypgxb = math.divide(this.arrData[index].ypgz, this.arrData[index].ypxz);
      }
      this.arrData[index].ypgxb = math.round(ypgxb, 4);
      if (this.arrData[index].ypgxb < 0.05) {
        this.$message({
          message: "干鲜比小于5%为错误数据！",
          type: "warning",
        });
        this.arrData[index].ypgz = "";
        this.arrData[index].ypgxb = "";
        this.$emit("updateData", this.arrData);
        return;
      }
      this.$emit("updateData", this.arrData);
    },
    updateInputData(value) {
      return value.replace(REGEXP_NUM_DIAN, "");
    },
    getQyPhotoList() {
      let photoList = [];
      if (this.arrData.length) {
        this.arrData.forEach((item) => {
          if (item.imgs) {
            const tempList = item.imgs.split(",");
            if (tempList) {
              photoList = [
                ...photoList,
                {
                  label: item.gmzm
                    ? `${item.yplx} - ${item.gmzm}`
                    : `${item.yplx}`,
                  imgList: tempList,
                },
              ];
            }
          }
        });
      }
      return photoList;
    },
  },
  // mark -- computed
  computed: {
    qyPhotoList() {
      return this.getQyPhotoList();
    },
  },
  // mark -- mounted
  mounted() {},
  components: { DcImgList },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
.qy-title{
  font-size 16px;
  font-weight bold;
  color #101010;
}
</style>
