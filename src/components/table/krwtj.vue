<!--可燃物载量统计表-->
<template>
  <div class="c-table">
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <tr>
        <td v-for="item in tableHeader">
          <info-item :label="item.label" :colon="false" no-value />
        </td>
      </tr>
      <template v-for="itemTable in config">
        <!--枯落物和枯落物层单独统计-->
        <template
          v-if="
            itemTable.name !== 'klwckrwzltj' && itemTable.name !== 'klwkrwzltj'
          "
        >
          <tr v-for="item of itemTable.formData" :key="item.guid">
            <td v-for="(key, i) of tableHeader">
              <template v-if="itemTable.krwzlData[key.prop] === 'type'">{{
                itemTable.label.slice(0, -8)
              }}</template>
              <template v-else-if="itemTable.krwzlData[key.prop] === 'not'"
                >-</template
              >
              <template v-else>{{
                item[itemTable.krwzlData[key.prop]] | formatValue
              }}</template>
            </td>
          </tr>
        </template>
        <template v-else>
          <template v-for="(item, index) of itemTable.formData">
            <tr>
              <td v-for="(key, i) of tableHeader">
                <template v-if="itemTable.krwzlData[0][key.prop] === 'type'"
                  >{{ itemTable.label.slice(0, -8) }}1</template
                >
                <template v-else-if="itemTable.krwzlData[0][key.prop] === 'not'"
                  >-</template
                >
                <template v-else>{{
                  item[itemTable.krwzlData[0][key.prop]] | formatValue
                }}</template>
              </td>
            </tr>
            <tr>
              <td v-for="(key, i) of tableHeader">
                <template v-if="itemTable.krwzlData[1][key.prop] === 'type'"
                  >{{ itemTable.label.slice(0, -8) }}2</template
                >
                <template v-else-if="itemTable.krwzlData[1][key.prop] === 'not'"
                  >-</template
                >
                <template v-else>{{
                  item[itemTable.krwzlData[1][key.prop]] | formatValue
                }}</template>
              </td>
            </tr>
            <tr>
              <td v-for="(key, i) of tableHeader">
                <template v-if="itemTable.krwzlData[2][key.prop] === 'type'"
                  >{{ itemTable.label.slice(0, -8) }}3</template
                >
                <template v-else-if="itemTable.krwzlData[2][key.prop] === 'not'"
                  >-</template
                >
                <template v-else>{{
                  item[itemTable.krwzlData[2][key.prop]] | formatValue
                }}</template>
              </td>
            </tr>
          </template>
        </template>
      </template>
      <tr v-if="isNotData(config)">
        <td :colspan="tableHeader.length">
          <p class="empty">暂无数据</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";

export default {
  name: "krwtj",
  mixins: [tableMixin],
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      qmTableHeader: [
        {
          label: "类型",
          prop: "type",
        },
        {
          label: "优势树种",
          prop: "yssz",
        },
        {
          label: "树种组",
          prop: "szz",
        },
        {
          label: "灌木种名",
          prop: "gmzm",
        },
        {
          label: "总载量(kg)",
          prop: "zzl",
        },
        {
          label: "单位面积可燃物载量(t·hm⁻²)",
          prop: "dwmjkrwzl",
        },
        {
          label: "总蓄积量(m³)",
          prop: "zxjl",
        },
      ],
      gmTableHeader: [
        {
          label: "类型",
          prop: "type",
        },
        {
          label: "优势树种",
          prop: "yssz",
        },
        {
          label: "灌木种名",
          prop: "gmzm",
        },
        {
          label: "总载量(kg)",
          prop: "zzl",
        },
        {
          label: "单位面积可燃物载量(t·hm⁻²)",
          prop: "dwmjkrwzl",
        },
      ],
      dydTableHeader: [
        {
          label: "类型",
          prop: "type",
        },
        {
          label: "林分型图斑编号",
          prop: "lfx",
        },
        {
          label: "灌木种名",
          prop: "gmzm",
        },
        {
          label: "总载量(kg)",
          prop: "zzl",
        },
        {
          label: "单位面积可燃物载量(t·hm⁻²)",
          prop: "dwmjkrwzl",
        },
        {
          label: "平均胸径(cm)",
          prop: "pjxj",
        },
        {
          label: "平均高(m)",
          prop: "pjg",
        },
        {
          label: "每公顷蓄积(m³/hm²)",
          prop: "mgqxj",
        },
        {
          label: "总蓄积量(m³)",
          prop: "zxj",
        },
      ],
      tableHeader: [],
    };
  },
  created() {},
  computed: {},
  watch: {
    type: {
      handler(value) {
        switch (value) {
          case "1":
            this.tableHeader = this.qmTableHeader;
            break;
          case "2":
            this.tableHeader = this.gmTableHeader;
            break;
          case "3":
            this.tableHeader = this.dydTableHeader;
            break;
          default:
            this.tableHeader = this.qmTableHeader;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    isNotData(config) {
      let isNotData = true;
      for (let i = 0; i < config.length; i++) {
        if (config[i].formData.length) {
          isNotData = false;
          break;
        }
      }
      return isNotData;
    },
  },
};
</script>

<style scoped lang="stylus">
@import 'table.styl';
</style>
