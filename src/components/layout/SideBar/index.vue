<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      class="el-menu-caiji"
      :unique-opened="true"
      :collapse="isCollapse"
      :default-active="activeMenu"
    >
      <el-menu-item @click="openOrClose">
        <span slot="title">网页导航</span>
        <i :class="(isCollapse && 'el-icon-right') || 'el-icon-back'"></i>
      </el-menu-item>
      <sidebar-item
        v-for="meun in meuns"
        :key="meun.path"
        :item="meun"
        :base-path="meun.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from "@/components/layout/SideBar/SidebarItem";
export default {
  components: { SidebarItem },
  props: {
    meuns: Array,
    default: () => [],
  },
  data() {
    return {
      meunWidth: "250px",
      isCollapse: false,
    };
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    },
  },
  methods: {
    openOrClose() {
      this.meunWidth = this.meunWidth === "250px" ? "65px" : "250px";
      this.isCollapse = !this.isCollapse;
      this.$emit("actionMeuns", this.meunWidth);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-menu-caiji {
  transition: all 0s;
  background-color: #fafafa;
}
</style>

<style>
.el-submenu .el-menu-item {
  height: auto !important;
  padding-right: 0 !important;
  white-space: normal;
}
.el-menu--collapse .el-menu-item span,
.el-menu--collapse .el-submenu > .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse .el-menu-item .el-submenu__icon-arrow,
.el-menu--collapse .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
