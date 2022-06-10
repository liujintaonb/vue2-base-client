<!--灌木林灌木层灌木标准木取样记录表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <div class="flex-row pd20">
      <div class="info-set">
        <p>室内温度（℃）：</p>
        <el-input @input="updateData" v-model="snwd" />
      </div>
      <div class="info-set">
        <p>室内湿度（%）：</p>
        <el-input @input="updateData" v-model="snsd" />
      </div>
    </div>
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td
          v-for="(item, i) of [
            ['样方号'],
            ['灌木种名'],
            ['平均地径', 'cm'],
            ['平均冠幅', 'cm'],
            ['平均高', 'm'],
            ['样品鲜重', 'g'],
            ['样品干重', 'g'],
            ['样品干鲜比', '%'],
          ]"
          :key="i"
        >
          <info-item :label="item[0]" :unit="item[1]" :colon="false" no-value />
        </td>
      </tr>
      <template v-for="(item, i) of arrData">
        <tr :key="`${i}-0`">
          <td>{{ item.yfbh | formatValue }}</td>
          <td>{{ item.gmzm | formatValue }}</td>
          <td>{{ item.pjdj | formatValue }}</td>
          <td>{{ item.pjgf | formatValue }}</td>
          <td>{{ item.pjg | formatValue }}</td>
          <td>{{ item.ypxz | formatValue }}</td>
          <td>
            <el-input
              v-model="item.ypgz"
              @input="updateData('ypgz', i)"
              placeholder="请填写样品干重"
            />
          </td>
          <td>{{ setPercent(item.ypgxb) | formatValue }}</td>
        </tr>
      </template>
      <tr v-if="!arrData.length">
        <td colspan="8">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
// mark - script
export default {
  name: "gmlgmbzmqyjl",
  mixins: [tableMixin],
  props: {
    data: {
      type: [Object, Array],
      default: () => null,
    },
  },
  // mark -- data
  data() {
    return {
      hasWS: true,
    };
  },
  // mark -- methods
  methods: {
    watch_ypgz(data, i) {
      const item = data[i];
      const ypg = parseFloat(item.ypgz);
      const ypx = parseFloat(item.ypxz);

      if (isNaN(ypx)) {
        this.$notify({
          title: "参数错误",
          type: "error",
          message: "样品鲜重参数错误",
        });
        return data;
      }
      if (isNaN(ypg)) {
        this.$notify({
          title: "参数错误",
          type: "error",
          message: "样品干重参数错误",
        });
        return data;
      }
      if (!isNaN(ypx) && +ypx <= 0) {
        this.$notify({
          title: "填写错误",
          type: "error",
          message: "样品鲜重需大于0",
        });
        return data;
      }
      if (!isNaN(ypg) && !isNaN(ypx)) {
        item.ypgxb = parseFloat(ypg / ypx).toFixed(2);
      } else {
        this.$notify({
          title: "填写错误",
          type: "error",
          message: "参数填写错误",
        });
      }
      return data;
    },
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
  components: {},
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
