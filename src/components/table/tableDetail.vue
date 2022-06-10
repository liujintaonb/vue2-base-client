<!--
 * 弹窗
 * 角规数据统计详情（jgtjDetail）
 * 枯倒木可燃物详细信息（kdmxq）
-->
<template>
  <el-dialog
    v-dialogDrag
    :title="tableDetailData.title"
    center
    :close-on-click-modal="false"
    :visible.sync="showTableDetail"
    :show-close="false"
    @opened="dialogOpened"
    @closed="closeDialog"
    width="70%"
  >
    <component
      ref="tableDetail"
      :is="tableDetailData.name"
      :data="tableDetailData.data"
    />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="closeDialog"
        >关 闭</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import jgtjDetail from "@/components/table/jgtjDetail";
import kdmxq from "@/components/table/kdmxq";
// mark - script
export default {
  name: "tableDetail",
  // mark -- props
  props: {
    tableDetailData: {
      type: Object,
      default: () => {},
    },
    showTableDetail: {
      type: Boolean,
      default: () => false,
    },
  },
  // mark -- data
  data() {
    return {};
  },
  // mark -- watcher
  watch: {},
  // mark -- methods
  methods: {
    dialogClosed() {
      this.$refs.tableDetail.resetData();
    },
    // dialog 打开结束的回调
    dialogOpened() {
      this.$refs.tableDetail.getDetailData();
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
  components: {
    jgtjDetail,
    kdmxq,
  },
};
</script>
<!--mark - css -->
<style scoped></style>
