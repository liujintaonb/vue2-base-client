<template>
  <div class="photo-content">
    <template v-for="(item, i) of photoList">
      <div v-if="item.imgUrl" class="photo-item">
        <c-image :src="ossObject(item.imgUrl)"></c-image>
        <!--        <el-image-->
        <!--          :src="ossObject(item.imgUrl)"-->
        <!--          class="photo-img"-->
        <!--          :preview-src-list="[ossObject(item.imgUrl)]"-->
        <!--        >-->
        <!--          <div slot="error" class="image-slot">-->
        <!--            <i class="el-icon-picture-outline"></i>-->
        <!--          </div>-->
        <!--        </el-image>-->
        <div class="label">{{ item.imgPre }}{{ item.imgBh || "暂无" }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { ossObject } from "@/common/baseFunction";
import CImage from "@/components/common/image";

export default {
  name: "photoList",
  components: {
    CImage,
  },
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
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped></style>
