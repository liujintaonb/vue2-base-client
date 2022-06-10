<!--mark - html -->
<template>
  <div style="padding: 15px 0">
    <div class="flex-row">
      <info-item
        label="省（市/自治区）"
        :value="data.sheng || data.shi || '暂无'"
      />
      <info-item label="县（旗）" :value="data.xian" />
      <info-item label="乡（林场）" :value="data.xiang" />
      <info-item label="村（林区）" :value="data.cun" />
    </div>
    <div
      style="
        box-sizing: border-box;
        height: 1px;
        background-color: #d4d4d4;
        padding: 0px;
        margin: 14px -5px;
      "
    ></div>
    <div class="flex-row">
      <info-item label="经度" :value="Number(data.lon).toFixed(6) || '暂无'" />
      <info-item label="纬度" :value="Number(data.lat).toFixed(6) || '暂无'" />
    </div>
  </div>
</template>

<script>
import infoItem from "@/components/table/components/infoItem";
// mark - script
export default {
  name: "geographyInfo",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {},
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
  components: {
    infoItem,
  },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "../table.styl"
</style>
