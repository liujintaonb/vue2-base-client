<template>
  <div>
    <el-table-column
      align="center"
      v-for="(prop, index) in props"
      :key="index"
      :prop="prop.prop"
      :label="prop.label"
      :width="prop.width"
      :min-width="prop.minWidth"
      :fixed="prop.fixed"
      :sortable="getSortableFn(prop.sortable)"
      :filters="prop.filters"
      :filter-method="prop.filterHandler"
      :render-header="prop.randerheader"
      :show-overflow-tooltip="prop.showOverflowTooltip"
    >
      <child-titless
        v-if="prop.needReturnHtml"
        :list="prop.option"
      ></child-titless>
      <child-titles
        v-else-if="!prop.needReturnHtml"
        :list="prop.option"
      ></child-titles>
      <template slot-scope="scope">
        <div v-if="prop.formatActions" class="aliginCenter">
          <el-button
            v-for="(actionItem, index) in prop.formatActions
              ? prop.formatActions(scope.row)
              : prop.actions"
            :key="actionItem.type || index"
            @click.native.prevent="action(scope.row, actionItem, scope.$index)"
            :type="actionItem.type || 'text'"
            :size="actionItem.size || 'small'"
            >{{ actionItem.label }}</el-button
          >
        </div>
        <p v-else-if="prop.format">
          {{ prop.format(scope.row[prop.prop], scope.row, scope) }}
        </p>
        <p v-else-if="prop.component">
          <el-input
            v-model="scope.row[prop.prop]"
            v-if="prop.component === 'input'"
          />
          <el-checkbox
            v-model="scope.row[prop.prop]"
            v-if="prop.component === 'checkbox'"
          ></el-checkbox>
        </p>
        <div v-else-if="prop.returnHtml">
          <div v-html="prop.returnHtml(scope.row, scope.$index)"></div>
        </div>
        <p v-else-if="prop.clickActions">
          <el-button
            v-for="(clickActionsItem, index) in prop.clickActions
              ? prop.clickActions(scope.row)
              : prop.actions"
            :key="clickActionsItem.type || index"
            @click.native.prevent="
              clickAction(scope.row, clickActionsItem, scope.$index)
            "
            :type="clickActionsItem.type || 'text'"
            :size="clickActionsItem.size || 'small'"
            data-clipboard-text="asdadad"
            >{{ scope.row[prop.prop] }}</el-button
          >
        </p>
        <p v-else>{{ scope.row[prop.prop] }}</p>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import childTitles from "../common/recursion-list/index";
import childTitless from "../common/recursion-list2/index";
export default {
  name: "TableColumn",
  props: {
    props: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //定义排序类型
    getSortableFn(type) {
      switch (type) {
        case "default":
          return true;
        case "custom":
          return "custom";
        case true:
          return "custom";
        case false:
          return false;
        default:
          return false;
      }
    },
  },
  components: {
    childTitles,
    childTitless,
  },
};
</script>
