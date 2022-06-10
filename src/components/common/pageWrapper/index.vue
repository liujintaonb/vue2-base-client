<template>
  <el-breadcrumb
    class="breadcrumb"
    separator="/"
    v-if="$route.matched[0].meta.breadcrumb !== false"
  >
    <i class="el-icon-s-home"></i>
    <el-breadcrumb-item
      v-for="(matched, key) in $route.matched"
      :key="key"
      :to="{ path: matched.path }"
      >{{ matched.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script>
export default {
  name: "PageWrapper",
  data() {
    return {
      breadcrumbs: [],
    };
  },
  components: {},
  async created() {},
  methods: {},
};
</script>

<style lang="stylus" scoped></style>
