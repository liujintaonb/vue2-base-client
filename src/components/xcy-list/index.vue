<!--
 * @Description: 公共table
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 14:23:21
 * @LastEditors: litesun
 * @LastEditTime: 2019-07-27 01:09:22
 -->
<template>
  <section class="main">
    <el-table
      :data="list"
      :stripe="listConfig.stripe"
      :size="listConfig.size"
      :style="listConfig.style"
      :height="actionHeight ? tempHeight : height"
      :row-key="listConfig.rowKey"
      lazy
      :load="listConfig.load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :show-header="listConfig.showHeader"
      :span-method="listConfig.arraySpanMethod"
      :max-height="actionHeight ? tempMaxHeight : maxHeight"
      :border="listConfig.border"
      :highlight-current-row="listConfig.highlightCurrentRow"
      @current-change="tableCurrentChange"
      row-class-name="xcy-row"
      class="xcy-list-table"
      id="xcy-table"
      @selection-change="handleSelectionChange"
      @select="handleSelected"
      @select-all="handleSelectAll"
      @sort-change="sortChange"
      ref="elTable"
      :cell-style="listConfig.celStyle"
      :header-cell-style="listConfig.headerCelStyle"
    >
      <!--多选-->
      <el-table-column
        align="center"
        v-if="listConfig.hasSelection"
        type="selection"
        :selectable="checkboxSelect"
      ></el-table-column>
      <!--            序号列-->
      <el-table-column
        label="序号"
        align="center"
        v-if="listConfig.hasIndex"
        type="index"
        :index="indexMethod"
      />
      <!--            展开行-->
      <el-table-column align="center" v-if="listConfig.hasExpand" type="expand">
        <template slot-scope="scope">
          <slot :data="scope.row" />
        </template>
      </el-table-column>
      <!--      v-for 列      -->
      <el-table-column
        :align="prop.align || 'center'"
        :header-align="prop.headerAlign || 'center'"
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
        :render-header="prop.renderHeader"
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
              v-user-leibie="actionItem.action.includes('detail')"
              :key="actionItem.type || index"
              @click.native.prevent="
                action(scope.row, actionItem, scope.$index)
              "
              :type="actionItem.type || 'text'"
              :size="actionItem.size || 'small'"
              :disabled="actionItem.disabled || false"
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
          <p v-else-if="isFilter">{{ formatValue(scope.row[prop.prop]) }}</p>
          <p v-else>
            {{
              prop.decimalPlaces
                ? Number(scope.row[prop.prop] || 0).toFixed(prop.decimalPlaces)
                : scope.row[prop.prop]
            }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!--        分页器-->
    <el-pagination
      v-if="hasPager && data.total > 0"
      class="xcy-list-page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="
        pagerInfo.page || pagerInfo.currentPage || pagerInfo.pageNo
      "
      :page-sizes="pagerInfo.pageSizes || [10, 15, 50, 100, 500]"
      :page-size="pagerInfo.size"
      :layout="pagerInfo.layout || 'total, prev, pager, next, jumper'"
      :total="data.total"
    ></el-pagination>
  </section>
</template>

<script>
import childTitles from "../common/recursion-list/index";
import childTitless from "../common/recursion-list2/index";

export default {
  name: "xcy-list",
  components: {
    childTitles,
    childTitless,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    badge: {
      default: "",
    },
    data: {
      type: [Object, Array],
      default() {
        return {
          list: [],
          total: 0,
        };
      },
    },
    props: {
      type: Array,
      default() {
        return [];
      },
    },
    config: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    hasIndex: {
      type: Boolean,
      default: true,
    },
    hasPager: {
      type: Boolean,
      default: true,
    },
    isPaperSort: {
      type: Boolean,
      default: false,
    },
    pagerInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    height: {
      type: Number,
    },
    maxHeight: {
      type: Number,
    },
    actionHeight: {
      type: Boolean,
      default: false,
    },
    isFilter: {
      type: Boolean,
      default: false,
    },
    checkboxSelectFun: {
      type: Function,
      default: (row, index) => {
        return true;
      },
    },
  },
  data() {
    return {
      selection: [],
      isLayout: false,
      tempHeight: null,
      tempMaxHeight: null,
    };
  },
  computed: {
    listConfig() {
      return {
        size: "media",
        stripe: true,
        style: "width: 100%",
        hasIndex: this.hasIndex,
        hasSelection: false,
        border: true,
        celStyle: {},
        headerCellClass: {},
        ...this.config,
      };
    },
    list() {
      let list = [];
      if (this.data instanceof Array) {
        list = this.data;
      } else if (this.data instanceof Object) {
        list = this.data.list || [];
      }
      return list;
    },
  },
  methods: {
    sortChange({ column, prop, order }) {
      this.$emit("sortChange", { column, prop, order });
    },
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
    formatValue(value) {
      if (typeof value === "string") {
        return value || "暂无";
      } else if (Object.prototype.toString.call(value) === "[object Null]") {
        return "暂无";
      } else if (
        Object.prototype.toString.call(value) === "[object Undefined]"
      ) {
        return "暂无";
      }
      return value;
    },
    handleSizeChange(value) {
      const pagerInfo = {};
      if (this.pagerInfo.pageNo) {
        pagerInfo.pageNo = 1;
      } else {
        pagerInfo.currentPage = 1;
      }
      this.$emit("updatePagerInfo", {
        ...this.pagerInfo,
        ...pagerInfo,
        size: value,
      });
      let dom = document.getElementById("main");
      if (dom !== null) {
        dom.scrollTop = 0;
      }
    },
    handleCurrentChange(value) {
      const pagerInfo = {};
      if (this.pagerInfo.pageNo) {
        pagerInfo.pageNo = value;
      } else {
        pagerInfo.currentPage = value;
      }
      this.$emit("updatePagerInfo", {
        ...this.pagerInfo,
        ...pagerInfo,
      });
      let dom = document.getElementById("main");
      if (dom !== null) {
        dom.scrollTop = 0;
      }
    },
    tableCurrentChange(currentRow) {
      this.$emit("tableCurrentChange", currentRow);
    },
    handleSelectionChange(value) {
      if (!this.config.hasSelection) {
        return;
      }
      this.selection = value;
      this.$emit("selectionChange", value);
    },
    handleSelected(value) {
      if (!this.config.hasSelection) {
        return;
      }
      this.selection = value;
      this.$emit("selected", value);
    },
    handleSelectAll(data) {
      this.$emit("selectAll", data);
    },
    checkboxSelect(row, index) {
      return this.checkboxSelectFun(row);
    },
    /**
     * 向上传递操作时间
     * @param  {[type]} scope list单条数据
     * @param  {[type]} prop  操作类型
     * @param {[index]} index 所引
     */
    action(scope, prop, index) {
      this.$emit("action", {
        ...prop,
        action: prop.action,
        data: scope,
        index,
      });
    },
    clickAction(scope, prop, index) {
      this.$emit("clickAction", {
        action: prop.action,
        data: scope,
        index,
      });
    },
    indexMethod(index) {
      if (this.config.indexMethod) {
        return this.config.indexMethod(index, this.pagerInfo);
      }
      if (this.hasPager && this.isPaperSort) {
        return this.pagerInfo.size * (this.pagerInfo.page - 1) + index + 1;
      } else {
        return 0 + index + 1;
      }
    },
  },
  watch: {
    selection: function (newValue) {
      this.$emit("selectionChange", newValue);
    },
  },
  mounted() {
    if (this.actionHeight) {
      const _this = this;
      let offsetBottom = this.hasPager ? 62 : 20;
      _this.tempMaxHeight =
        window.innerHeight - this.$refs.elTable.$el.offsetTop - offsetBottom;
      window.onresize = () => {
        return () => {
          _this.tempMaxHeight =
            window.innerHeight -
            _this.$refs.elTable.$el.offsetTop -
            offsetBottom;
        };
      };
    }
  },
};
</script>

<style lang="postcss" scoped>
.xcy-list-page {
  margin-top: 10px;
  text-align: right;
}
.main {
  width: 100%;
}
.router-link {
  color: #ff6325;
}
p {
  margin: 0;
  display: inline-block;
}
.tooltip-text {
  display: block;
}
.list-error {
  display: block;
  text-align: center;
  font-size: 14px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.edit-cell {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.edit-input {
  width: 60%;
  min-width: 60px;
}
.edit-btn-group {
  margin-left: 8px;
  /deep/ .el-button--small {
    padding: 0;
  }
}
.aliginCenter {
  align-items: center;
  height: 100%;
}
#xcy-table /deep/ th {
  font-weight: 700;
  height: 48px;
}
</style>

<style>
.xcy-row {
  height: 48px;
}
</style>
