<template>
  <div>
    <template v-if="menuConfig.children && menuConfig.children.length > 0">
      <el-submenu :index="`${index}`">
        <template slot="title">
          <span slot="title">{{ menuConfig.title }}</span>
        </template>
        <div v-for="(item, i) in menuConfig.children" :key="i">
          <sub-menu :menu-config="item" :index="`${index}-${i}`"></sub-menu>
        </div>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="`${index}`">{{ menuConfig.title }}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "subMenu",
  props: {
    menuConfig: {
      type: [Array, Object],
      required: true,
    },
    index: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>

<style scoped></style>
