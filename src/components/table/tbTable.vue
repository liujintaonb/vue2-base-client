<!--mark - html -->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td v-for="(item, i) of config" :key="i">
          <info-item :label="item.label" :colon="false" no-value />
        </td>
      </tr>
      <template v-if="data">
        <tr v-for="(item, index) of arrData" :key="index">
          <td v-for="(key, i) of config" :key="i">
            <div v-if="config.type">
              <el-input
                v-model.trim="item[key.prop]"
                size="small"
                class="update-data"
                maxLength="20"
                @input="item[key.prop] = updateInputData(item[key.prop])"
                @change="changeInputData(item[key.prop], i, key)"
              ></el-input>
            </div>
            <div v-else>
              <template v-if="key.format"> {{ key.format(item) }}</template>
              <template v-else>{{ item[key.prop] | formatValue }}</template>
            </div>
          </td>
        </tr>
      </template>
      <tr v-if="!arrData.length">
        <td :colspan="config.length">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
    <div v-if="yfPhotoListShow && arrData.length > 0" class="pt20">
      <yf-photo-list :photo-list="yfPhotoList" />
    </div>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import yfPhotoList from "@/components/table/components/yfPhotoList";
import { REGEXP_NUM_DIAN } from "@/common/unit";
import { math } from "@/common/math";
export default {
  name: "tbTable",
  mixins: [tableMixin],
  props: {
    yfPhotoListShow: {
      type: Boolean,
      defalut: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    changeInputData(value, index, itemConfig) {
      // this.copyData[index][itemConfig.prop] = Number(this.copyData[index][itemConfig.prop]);
      // if (!this.copyData[index][itemConfig.prop]) {
      //   this.$message({
      //     message: "请先填写样品鲜重！",
      //     type: "warning",
      //   });
      //   this.copyData[index].ypgz = "";
      //   return;
      // }
      if (isNaN(this.arrData[index][itemConfig.prop])) {
        this.$message({
          message: "请输入正确格式！",
          type: "warning",
        });
        this.arrData[index][itemConfig.prop] = "";
        return;
      }
      const ypgxb = math.divide(
        this.arrData[index].ypgz,
        this.arrData[index].ypxz
      );
      \;
      this.arrData[index].ypgxb = math.round(ypgxb);
      this.$emit("updateData", this.arrData);
    },
    updateInputData(value) {
      return value.replace(REGEXP_NUM_DIAN, "");
    },
  },
  computed: {
    yfPhotoList() {
      if (this.yfPhotoListShow) {
        return this.getYFPhotoList();
      }
    },
  },
  mounted() {},
  components: { yfPhotoList },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
