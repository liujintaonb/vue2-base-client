<template>
  <div class="main">
    <div style="display: inline-block">
      <el-upload
        class="upload-demo"
        :action="prop.actionUrl"
        :on-progress="handleProgress"
        :headers="uploadHeader"
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">{{ prop.text }}</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import Storage from "@/common/storage";
export default {
  name: "xUpload",
  props: {
    prop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  async mounted() {},
  data() {
    return {
      loadingShow: null,
      uploadHeader: {
        Authorization: Storage.get("fjwt"),
        ContentType: "application/x-www-form-urlencoded",
      },
    };
  },
  computed: {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleProgress(file) {
      console.log("this");
      console.log(this);
      this.loadingShow = this.$loading({
        lock: true,
        text: "正在上传中....",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    handleSuccess() {
      this.loadingShow.visible = false;
      this.$message.success("上传成功");
    },
    handleError() {
      this.loadingShow.visible = false;
      this.$message.error("上传失败");
    },
  },
  watch: {},
};
</script>
<style>
.main .el-input--small .el-input__inner {
  /* max-width: 140px; */
  height: 36px;
}
</style>
