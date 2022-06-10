<template>
  <div class="legend-wrap">
    <div class="legend-head">
      <div class="legend-title">图例</div>
      <div class="legend-close">
        <el-button @click="close" type="text" size="mini">隐藏</el-button>
      </div>
    </div>
    <div class="legend-content">
      <div v-for="(item, index) in list" :key="index" class="legend-item">
        <div class="legend-icon" v-if="item.show">
          <i :class="item.icon"></i>
        </div>
        <div class="legend-name" v-if="item.show">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { isSenGongFn } from "@/common/util";
export default {
  name: "LegendCom",
  data() {
    return {
      list: [
        {
          name: "行政边界",
          icon: "el-icon-my-xing-zheng-sheng",
          show: true,
        },
        {
          name: "森工边界",
          icon: "el-icon-my-sgbj",
          show: isSenGongFn(),
        },
        {
          name: "居民地",
          icon: "el-icon-my-ju-min-di",
          show: true,
        },
        {
          name: "水系",
          icon: "el-icon-my-shui-xi",
          show: true,
        },
        {
          name: "森林分布",
          icon: "el-icon-my-sen-lin-fen-bu",
          show: true,
        },
        {
          name: "大样地",
          icon: "el-icon-my-da-yang-di",
          show: true,
        },
        {
          name: "乔木林标准地",
          icon: "el-icon-my-biao-zhun-di-qiao-mu",
          show: true,
        },
        {
          name: "灌木林标准地",
          icon: "el-icon-my-biao-zhun-di-guan-mu",
          show: true,
        },
      ],
    };
  },
  props: {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.legend-wrap {
  width: 320px;
  background-color: #fafafa;
  padding: 20px 20px;
  border-radius: 2px;
  border: #eeeeee solid 1px;
  box-sizing: border-box;
  /* display: flex; */
}
.legend-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.legend-title {
  font-size: 14px;
  font-weight: bold;
}

.legend-content {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}
.legend-item {
  width: 50%;
  display: flex;
  height: 20px;
  line-height: 20px;
  padding: 3px 0;
}
.legend-icon {
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.legend-name {
  padding-left: 8px;
  font-size: 12px;
}
</style>
