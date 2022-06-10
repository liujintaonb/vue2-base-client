<template>
  <div class="main">
    <div>
      <el-button
        v-user-leibie="item.action === 'query' || item.action === 'clear'"
        :type="item.type ? item.type : 'info'"
        v-for="(item, key) in showArr"
        :key="key"
        @click="queryBtn(item.action)"
        >{{ item.text }}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Xbutton",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    prop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    showArr() {
      return this.prop.arr.filter((item) => item.show !== false);
    },
  },
  watch: {},
  methods: {
    queryBtn(action) {
      this.$emit("formBtnClick", action);
    },
  },
  async created() {},
};
</script>

<style scoped></style>
