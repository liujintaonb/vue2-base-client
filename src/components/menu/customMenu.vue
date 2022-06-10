<template>
  <div class="custom-menu">
    <el-menu
      id="left-menu"
      @select="handleSelect"
      @open="opened"
      @close="close"
      :default-active="activeIndex"
    >
      <el-menu-item index="-2">
        <i class="el-icon-back"></i>
        <span slot="title">返回列表</span>
      </el-menu-item>
      <el-menu-item index="-1">
        <i class="el-icon-map-location"></i>
        <span slot="title">地图</span>
      </el-menu-item>
      <sub-menu
        v-for="(item, i) in menuConfig"
        :key="i"
        :menu-config="item"
        :index="i"
      />
    </el-menu>
  </div>
</template>

<script>
import subMenu from "@/components/menu/subMenu";
export default {
  name: "customMenu",
  props: {
    menuConfig: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      activeIndex: "-1",
    };
  },
  methods: {
    openIndex(index) {
      if (`${index}` !== `${this.activeIndex}`) {
        this.activeIndex = `${index}`;
      }
    },
    opened(index) {
      this.$emit("subMenuOpened", index);
    },
    close(index) {
      this.$emit("subMenuClose", index);
    },
    handleSelect(index) {
      this.openIndex(index);
      if (index === "-1" || index === "-2") {
        this.$emit("clickItem", {}, index);
        return false;
      }
      const path = `${index}`.split("-");
      let config = Array.from(this.menuConfig);
      path.forEach((v) => {
        config = Array.isArray(config) ? config[v] : config.children[v];
      });
      this.$emit("clickItem", config, index);
    },
  },
  computed: {},
  mounted() {},
  components: {
    subMenu,
  },
};
</script>

<style scoped lang="stylus">
.custom-menu {
  height 100%
  overflow auto
  background-color #fafafa;
}
.el-menu{
  background-color #fafafa;
}
</style>

<style>
#left-menu .el-menu-item.is-active {
  background-color: #ecf7f8;
}
#left-menu .el-menu-item {
  height: 42px;
  line-height: 42px;
}
</style>
