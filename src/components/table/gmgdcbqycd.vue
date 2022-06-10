<!-- 灌木（高大草本）取样测定表-->
<template>
  <div>
    <div class="c-table" v-for="(item, index) in arrData" :key="index">
      <div class="table-header" v-show="arrData.length > 1">
        灌木（高大草本）取样测定表 {{ index + 1 }}
      </div>
      <div class="flex-row pd15">
        <info-item label="检查日期" :value="item.jianchaTime" />
        <info-item label="检查员" :value="item.jianchaName" />
      </div>
      <table border="1" rules="all" border-collapse="collapse" width="100%">
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <!--            1-->
        <tr>
          <td class="info-title" colspan="2">样地编号</td>
          <td colspan="8">{{ item.ydBh | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title" colspan="2">灌木（高大草本）种名</td>
          <template v-if="item.cbzm">
            <td colspan="3">{{ item.gmzm | formatValue }}</td>
            <td class="info-title" colspan="2">草本种名</td>
            <td colspan="3">{{ item.cbzm | formatValue }}</td>
          </template>
          <template v-else>
            <td colspan="8">{{ item.gmzm | formatValue }}</td>
          </template>
        </tr>
        <tr>
          <td class="info-title" colspan="2">覆盖面积(㎡)</td>
          <td colspan="3">{{ item.fgmj | formatValue }}</td>
          <td class="info-title" colspan="2">平均高度(cm)</td>
          <td colspan="3">{{ item.pjgd | formatValue }}</td>
        </tr>
        <!-- 大株丛 -->
        <tr>
          <td class="info-title" rowspan="2">大株丛-灌木(高大草本)</td>
          <td class="info-title">编号</td>
          <td class="info-title">丛径(cm)</td>
          <td class="info-title">株丛数</td>
          <td class="info-title">单株鲜重(g)</td>
          <td class="info-title">单株干重(g)</td>
          <td class="info-title">样品编号</td>
          <td class="info-title">样品鲜重(g)</td>
          <td class="info-title">样品干重(g)</td>
          <td class="info-title">干鲜比(%)</td>
        </tr>
        <tr>
          <td>{{ item.dzcGmbh | formatValue }}</td>
          <td>{{ item.dzcCj | formatValue }}</td>
          <td>{{ item.dzcZcs | formatValue }}</td>
          <td>{{ item.dzcDzxz | formatValue }}</td>
          <td>{{ item.dzcDzgz | formatValue }}</td>
          <td>{{ item.dzcYpbh | formatValue }}</td>
          <td>{{ item.dzcYpxz | formatValue }}</td>
          <td>
            <template v-if="isDataAudit">
              {{ item.dzcYpgz | formatValue }}
            </template>
            <template v-else>
              <el-input
                v-model="item.dzcYpgz"
                size="small"
                class="update-data"
                @input="item.dzcYpgz = updateInputData(item.dzcYpgz)"
                maxLength="20"
                @change="computeData('dzc', index)"
              ></el-input>
            </template>
          </td>
          <td>{{ setPercent(item.dzcYpgxb) | formatValue }}</td>
        </tr>
        <!-- 中株丛 -->
        <tr>
          <td class="info-title" rowspan="2">中株丛-灌木(高大草本)</td>
          <td class="info-title">编号</td>
          <td class="info-title">丛径(cm)</td>
          <td class="info-title">株丛数</td>
          <td class="info-title">单株鲜重(g)</td>
          <td class="info-title">单株干重(g)</td>
          <td class="info-title">样品编号</td>
          <td class="info-title">样品鲜重(g)</td>
          <td class="info-title">样品干重(g)</td>
          <td class="info-title">干鲜比(%)</td>
        </tr>
        <tr>
          <td>{{ item.zzcGmbh | formatValue }}</td>
          <td>{{ item.zzcCj | formatValue }}</td>
          <td>{{ item.zzcZcs | formatValue }}</td>
          <td>{{ item.zzcDzxz | formatValue }}</td>
          <td>{{ item.zzcDzgz | formatValue }}</td>
          <td>{{ item.zzcYpbh | formatValue }}</td>
          <td>{{ item.zzcYpxz | formatValue }}</td>
          <td>
            <template v-if="isDataAudit">
              {{ item.zzcYpgz | formatValue }}
            </template>
            <template v-else>
              <el-input
                v-model="item.zzcYpgz"
                size="small"
                class="update-data"
                @input="item.zzcYpgz = updateInputData(item.zzcYpgz)"
                maxLength="20"
                @change="computeData('zzc', index)"
              ></el-input>
            </template>
          </td>
          <td>{{ setPercent(item.zzcYpgxb) | formatValue }}</td>
        </tr>
        <!-- 小株丛 -->
        <tr>
          <td class="info-title" rowspan="2">小株丛-灌木(高大草本)</td>
          <td class="info-title">编号</td>
          <td class="info-title">丛径(cm)</td>
          <td class="info-title">株丛数</td>
          <td class="info-title">单株鲜重(g)</td>
          <td class="info-title">单株干重(g)</td>
          <td class="info-title">样品编号</td>
          <td class="info-title">样品鲜重(g)</td>
          <td class="info-title">样品干重(g)</td>
          <td class="info-title">干鲜比(%)</td>
        </tr>
        <tr>
          <td>{{ item.xzcGmbh | formatValue }}</td>
          <td>{{ item.xzcCj | formatValue }}</td>
          <td>{{ item.xzcZcs | formatValue }}</td>
          <td>{{ item.xzcDzxz | formatValue }}</td>
          <td>{{ item.xzcDzgz | formatValue }}</td>
          <td>{{ item.xzcYpbh | formatValue }}</td>
          <td>{{ item.xzcYpxz | formatValue }}</td>
          <td>
            <template v-if="isDataAudit">
              {{ item.xzcYpgz | formatValue }}
            </template>
            <template v-else>
              <el-input
                v-model="item.xzcYpgz"
                size="small"
                class="update-data"
                @input="item.xzcYpgz = updateInputData(item.xzcYpgz)"
                maxLength="20"
                @change="computeData('xzc', index)"
              ></el-input>
            </template>
          </td>
          <td>{{ setPercent(item.xzcYpgxb) | formatValue }}</td>
        </tr>
        <tr>
          <td colspan="5">
            单位面积灌木（高大草本）鲜重（大、中、小之和）(kg/hm²)
          </td>
          <td colspan="5">{{ item.dwmjGmxz | formatValue }}</td>
        </tr>
        <tr>
          <td colspan="5">
            单位面积灌木（高大草本）干重（大、中、小之和）(kg/hm²)
          </td>
          <td colspan="5">{{ item.dwmjGmgz | formatValue }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// mark - script
import tableMixin from "@/components/table/tableMixin";
import { REGEXP_NUM_DIAN } from "@/common/unit";
import { math } from "@/common/math";

// 草原高大样地大样方样方面积为100㎡，三个大样方面积为300㎡
const yfmjOfSum = 300;

export default {
  name: "gmgdcbqycd",
  mixins: [tableMixin],
  props: {
    type: {
      type: [Object, String],
      default: "1",
    },
  },
  // mark -- data
  data() {
    return {
      leiXing: {
        dzc: "大株丛-灌木(高大草本)",
        zzc: "中株丛-灌木(高大草本)",
        xzc: "小株丛-灌木(高大草本)",
      },
    };
  },
  // mark -- methods
  methods: {
    /**
     * @param type 灌木（高大草本） 'dcz'=>小株丛  'zzc'=>中株丛 'xzc'=>小株丛
     **/
    computeData(type, index) {
      if (this.arrData[index][type + "Ypgz"] === "") {
        this.arrData[index][type + "Ypgz"] = "";
        this.arrData[index][type + "Ypgxb"] = "";
        this.arrData[index][type + "Dzgz"] = "";
      } else {
        this.arrData[index][type + "Ypgz"] = Number(
          this.arrData[index][type + "Ypgz"]
        );
        if (!this.arrData[index][type + "Ypxz"]) {
          this.$message({
            message: `请先填写${this.leiXing[type]}样品鲜重！`,
            type: "warning",
          });
          this.arrData[index][type + "Ypgz"] = "";
          this.arrData[index][type + "Ypgxb"] = "";
          this.arrData[index][type + "Dzgz"] = "";
        }
        if (isNaN(this.arrData[index][type + "Ypgz"])) {
          this.$message({
            message: "请输入正确格式！",
            type: "warning",
          });
          this.arrData[index][type + "Ypgz"] = "";
          this.arrData[index][type + "Ypgxb"] = "";
          this.arrData[index][type + "Dzgz"] = "";
        }
        if (
          Number(this.arrData[index][type + "Ypgz"]) >
          Number(this.arrData[index][type + "Ypxz"])
        ) {
          this.$message({
            message: `${this.leiXing[type]}样品干重应小于等于${this.leiXing[type]}样品鲜重！`,
            type: "warning",
          });
          this.arrData[index][type + "Ypgz"] = "";
          this.arrData[index][type + "Ypgxb"] = "";
          this.arrData[index][type + "Dzgz"] = "";
        }

        // 干鲜比
        let ypgxb = 0;
        if (Number(this.arrData[index][type + "Ypxz"]) !== 0) {
          ypgxb = math.divide(
            this.arrData[index][type + "Ypgz"],
            this.arrData[index][type + "Ypxz"]
          );
        }
        this.arrData[index][type + "Ypgxb"] = math.round(ypgxb, 4);

        if (
          this.arrData[index][type + "Dzxz"] &&
          this.arrData[index][type + "Ypgxb"]
        ) {
          // 单株干重
          let dzgz = math.multiply(
            this.arrData[index][type + "Dzxz"],
            this.arrData[index][type + "Ypgxb"]
          );
          this.arrData[index][type + "Dzgz"] = math.round(dzgz, 2);
        }
      }

      // 单位面积灌木（高大草本）
      let dwmjGmgz = math.divide(
        math.add(
          math.multiply(
            this.arrData[index]["xzcDzgz"],
            this.arrData[index]["xzcZcs"]
          ),
          math.multiply(
            this.arrData[index]["zzcDzgz"],
            this.arrData[index]["zzcZcs"]
          ),
          math.multiply(
            this.arrData[index]["dzcDzgz"],
            this.arrData[index]["dzcZcs"]
          )
        ),
        yfmjOfSum
      );
      // 单位转换(k/㎡ 转为 kg/hm²)
      dwmjGmgz = dwmjGmgz * 10;
      this.arrData[index].dwmjGmgz = math.round(dwmjGmgz, 2);

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
.table-header {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
}
</style>
