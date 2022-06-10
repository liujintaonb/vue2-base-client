<template>
  <div :id="chartId"></div>
</template>

<script>
import echarts from "echarts";
import { option } from "@/components/EChart/config";

export default {
  name: "LvEchart",
  props: {
    chartId: {
      type: String,
      default: "chart",
    },
    echartObj: {
      typs: Object,
      default: () => {},
    },
  },
  data() {
    return {
      option,
      myChart: {},
    };
  },
  created() {
    this.$nextTick(() => {
      this.loadEchart();
    });
  },
  mounted() {
    let _this = this;
    window.onresize = function () {
      _this.myChart.resize();
    };
  },
  watch: {
    echartObj(value) {
      this.option.title.text = value.chartTitle;
      this.option.legend.data = [].concat(value.legendData);
      this.option.series[0].name = value.seriesTitle;
      this.option.series[0].data = [].concat(value.seriesData);
      this.option.color = value.color;
      this.loadEchart();
    },
  },
  methods: {
    initEcharts() {
      // 动态绑定Id名这样就能解决传多个Echarts过来后只显示一个问题
      const chart = document.getElementById(this.chartId);
      this.myChart = echarts.init(chart);
    },
    loadEchart() {
      this.initEcharts();
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style scoped></style>
