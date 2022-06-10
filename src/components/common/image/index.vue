<template>
  <el-image
    v-loading="loading"
    :src="showImage"
    class="photo-img"
    @load="success"
    @error="fail"
    :preview-src-list="[src]"
  >
    <div slot="error" class="image-slot">
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>
<script>
export default {
  name: "c-image",
  props: {
    src: String,
    showThumb: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showImage: null,
      loading: true,
      loadFlag: false,
    };
  },
  created() {
    this.showImage = this.showThumb ? this.getThumb() : this.src;
    this.loadFlag = true;
  },
  methods: {
    success() {
      this.loading = false;
    },
    fail() {
      if (this.loadFlag) {
        this.loadFlag = false;
        this.showImage = this.src;
      }
    },
    getThumb() {
      let fullpath = this.src.substring(0, this.src.lastIndexOf("."));
      let filetype = this.src.substring(this.src.lastIndexOf(".") + 1);
      let src = `${fullpath}_slt.${filetype}`;
      console.log(src);
      return src;
    },
  },
};
</script>
