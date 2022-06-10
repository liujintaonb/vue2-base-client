<template>
  <div class="dc-photo-list" v-show="photoList.length">
    <p class="tips">照片信息（点击照片可放大查看）</p>
    <el-divider />
    <div class="photo-content">
      <div class="photo-item" v-for="item of photoList" :key="item">
        <c-image :src="ossObject(item)"></c-image>
        <div class="label">编号：{{ picName(item) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ossObject } from "@/common/baseFunction";
import CImage from "@/components/common/image/index";

export default {
  name: "dcImgList",
  components: { CImage },
  props: {
    photoList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    ossObject,
    picName(item) {
      if (item) {
        let temp = item.split("/").pop();
        const index = temp.lastIndexOf(".");
        return temp.slice(0, index);
      }
      return "暂无";
    },
  },
};
</script>

<style lang="stylus" scoped>
.dc-photo-list {
  margin-top: 20px;
  .tips{
    font-size 14px;
  }
}
</style>
