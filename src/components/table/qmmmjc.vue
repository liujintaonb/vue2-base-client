<!--乔木每木检尺记录表-->
<template>
  <div>
    <div>
      <tian-bao
        v-if="markData.length"
        :mark-data="markData"
        :is-yd="true"
        :is-klw="false"
        @update="markUpdateData"
      >
      </tian-bao>
      <download
        v-if="!!showData.length"
        :is-has-data="!!showData.length"
        :pguid="showData.length ? showData[0].pguid : ''"
        :can-export-all-data="false"
        :config="{ size: 'small' }"
      ></download>
      <upload
        :is-show-list="false"
        :config="{ style: 'display: inline-block;' }"
        @update="updateImportData"
      >
        <template v-slot>
          <el-button size="small" type="primary" icon="el-icon-upload"
            >单株立木材积数据导入</el-button
          >
        </template>
      </upload>
    </div>
    <div class="c-table">
      <table border="1" rules="all" border-collapse="collapse" width="100%">
        <tr>
          <td
            v-for="(item, i) of [
              ['序号'],
              ['编号'],
              ['树种'],
              ['胸径', 'cm'],
              ['树高', 'm'],
              ['生长状况'],
              ['单株立木材积', 'm3'],
              ['状态'],
            ]"
            :key="i"
          >
            <info-item
              :label="item[0]"
              :unit="item[1]"
              :colon="false"
              no-value
            />
          </td>
        </tr>
        <tr v-for="(item, i) of showData" :key="i">
          <td>{{ +i + 1 }}</td>
          <td>{{ item.qmbh | formatValue }}</td>
          <td>{{ item.sz | formatValue }}</td>
          <td>{{ item.xj | formatValue }}</td>
          <td>{{ item.sg | formatValue }}</td>
          <td>{{ item.szzk | formatValue }}</td>
          <td>
            <span v-if="isDataAudit">{{
              formatData(item.dzlmxjl) | formatValue
            }}</span>
            <el-input
              v-else
              placeholder="单株立木材积"
              @input="item.dzlmxjl = updateInputData(item.dzlmxjl)"
              @change="changeInput('dzlmxjl', item.guid)"
              v-model="item.dzlmxjl"
              maxLength="20"
              style="width: 100%"
            ></el-input>
          </td>
          <td>{{ item.tianbao === "0" ? "无相关数据，不填报" : "已填报" }}</td>
        </tr>
        <tr v-if="!showData.length">
          <td colspan="8">
            <p class="empty">暂无数据</p>
          </td>
        </tr>
      </table>
    </div>
    <div v-show="showData.length && !isDataAudit" class="buttons">
      <el-button class="button-item" type="primary" @click="saveData"
        >保存数据</el-button
      >
    </div>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import { REGEXP_NUM_DIAN, USER_LEIBIE_SYS } from "@/common/unit";
import Download from "@/components/DownloadUpload/Download";
import Upload from "@/components/DownloadUpload/Upload";
import { math } from "@/common/math";
import { cloneDeep } from "lodash";
import Storage from "@/common/storage";
import TianBao from "@/components/table/components/TianBao";
// mark - script
export default {
  name: "qmmmjc",
  mixins: [tableMixin],
  props: {},
  // mark -- data
  data() {
    return {
      loading: false,
      uploadFiles: [],
      url: `${process.env.VUE_APP_AFFIX}/api/v1/yangdi/import/qmmmjc/check`,
      headerConfig: {
        Authorization: `${window.localStorage.fjwt}`,
      },
      dialogImportVisible: false,
      listData: {
        list: [],
      },
      filePath: "",
    };
  },
  watch: {},
  // mark -- methods
  methods: {
    updateInputData(value) {
      return value.replace(REGEXP_NUM_DIAN, "");
    },
    updateImportData() {
      this.$emit("resetData");
    },
    changeInput(key, guid) {
      const index = this.arrData.findIndex((item) => item.guid === guid);
      this.arrData[index][key] = Number(this.arrData[index][key]);
      if (isNaN(this.arrData[index][key])) {
        this.$message({
          message: "请输入正确格式！",
          type: "warning",
        });
        this.arrData[index][key] = "";
        return false;
      }
      const temData = this.arrData[index][key];
      this.arrData[index][key] = math.round(temData, 3);
      this.$emit("updateData", this.arrData);
    },
    formatData(value) {
      return value ? math.round(value, 3) : value;
    },
    markUpdateData() {
      this.data.forEach((item, index) => {
        item.tianbao = "0";
      });
      this.saveData();
    },
    saveData() {
      this.$emit("updateData", cloneDeep(this.data));
      this.$nextTick(() => {
        this.$emit("saveData");
      });
    },
  },
  // mark -- computed
  computed: {
    showData() {
      return this.data.filter((item) => {
        return item.tianbao !== "2";
      });
    },
    // 实验室用户实验室填报完成、实验室重新填报完成、待实验室填报、待实验室重新填报, 填报状态为2的
    markData() {
      const hasPromise = Storage.get("fuserInfo").leiBie === USER_LEIBIE_SYS;
      if (hasPromise) {
        return this.data.filter((item) => {
          return item.tianbao === "2";
        });
      } else {
        return [];
      }
    },
  },
  // mark -- mounted
  mounted() {},
  components: { TianBao, Download, Upload },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import 'table.styl';
</style>
