<template>
  <div class="yf-photo-list">
    <span class="tips">照片信息（点击照片可放大查看）</span>
    <el-divider />
    <template v-for="(item, i) of photoList">
      <div v-if="item.every((i) => i.imgUrl)">
        <span class="yf-title">{{
          `样方编号：${item[0].yfbh || "暂无"}`
        }}</span>
        <photo-list :photo-list="item" />
      </div>
    </template>
  </div>
</template>

<script>
import photoList from "@/components/table/components/photoList";
export default {
  name: "yfPhotoList",
  props: {
    photoList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
  components: {
    photoList,
  },
};
</script>

<style scoped></style>
