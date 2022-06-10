<template>
  <div>
    <el-menu-item
      v-if="item && !item.children"
      :index="resolvePath(item.path)"
      @click="handleGo"
    >
      <i :class="`${item.meta.icon}`"></i>
      <span v-if="item.meta.islink" slot="title">
        <a :href="linkURL(item.meta.islink)" target="_blank" class="meun-a">{{
          item.meta.title
        }}</a>
      </span>
      <span v-else slot="title">{{ item.meta.title }}</span>
    </el-menu-item>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template slot="title">
        <i :class="`${item.meta.icon}`"></i>
        <span v-if="item.meta.islink" slot="title">
          <a :href="item.path" target="_blank" class="meun-a">{{
            item.meta.title
          }}</a>
        </span>
        <span v-else slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-if="item.children && item.children.length > 0"
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
        :base-path="resolvePath(item.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentPath: "",
    };
  },
  methods: {
    linkURL(prop) {
      return process.env[prop];
    },
    resolvePath(routePath) {
      return this.basePath && this.basePath !== routePath
        ? `${this.basePath}/${routePath}`
        : `${routePath}`;
    },
    handleGo() {
      const path = this.resolvePath(this.item.path);
      if (path === this.$route.path) {
        return;
      }
      this.$router.push(path).catch(() => {
        console.log("暂无权限");
      });
    },
  },
};
</script>

<style scoped>
.meun-a {
  color: #303133;
  text-decoration: none;
}
.meun-a:link {
  text-decoration: none;
}
.meun-a:visited {
  text-decoration: none;
}
.meun-a:active {
  text-decoration: none;
}
.meun-a:focus {
  text-decoration: none;
}
</style>
