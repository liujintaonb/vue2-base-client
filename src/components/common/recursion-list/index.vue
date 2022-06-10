<template>
  <div>
    <el-table-column
      v-for="(item, index) in list"
      v-bind:key="index"
      :label="item.label"
      align="center"
      :prop="item.prop || null"
      :width="item.width"
      :render-header="item.renderHeader"
    >
      <template slot-scope="scope">
        <p v-if="item.format">
          {{ item.format(scope.row[item.prop], scope.row, scope) }}
        </p>
        <p v-else>{{ scope.row[item.prop] }}</p>
      </template>
      <recursion-list v-if="item.option" :list="item.option"></recursion-list>
    </el-table-column>
  </div>
</template>
<script>
export default {
  name: "recursionList",
  props: {
    list: Array,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {},
  created() {},
};
</script>
