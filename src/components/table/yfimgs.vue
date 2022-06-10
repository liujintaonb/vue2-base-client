<!--样方图片表-->
<template>
  <div class="c-table">
    <div v-for="yfPhoto in yfPhotoList" :key="yfPhoto.label">
      <h3 class="yf-title">{{ yfPhoto.label }}</h3>
      <dc-img-list :photo-list="yfPhoto.imgList"></dc-img-list>
    </div>
    <div v-if="!yfPhotoList.length" class="empty">暂无图片</div>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import DcImgList from "@/components/table/components/dcImgList";
export default {
  name: "yfimgs",
  components: { DcImgList },
  mixins: [tableMixin],
  // mark -- data
  data() {
    return {};
  },
  // mark --c
  computed: {
    yfPhotoList() {
      return this.getYfPhotoList();
    },
  },
  // mark -- methods
  methods: {
    getYfPhotoList() {
      let photoList = [];
      if (this.arrData.length) {
        this.arrData.forEach((item) => {
          if (item.imgs) {
            const tempList = item.imgs.split(",");
            if (tempList) {
              photoList = [
                ...photoList,
                {
                  label: `样方号：${item.yfbh}`,
                  imgList: tempList,
                },
              ];
            }
          }
        });
      }
      return photoList;
    },
  },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
.yf-title{
  font-size 16px;
  font-weight bold;
  color #101010;
}
  .empty{
    text-align center;
  }
</style>
