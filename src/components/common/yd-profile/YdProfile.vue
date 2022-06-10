<template>
  <div class="yd-profile">
    <div class="yd-profile-item">{{ yd.address }}</div>
    <div class="yd-profile-item">{{ getTypeName(yd.type) }}</div>
    <div class="yd-profile-item">
      {{ `编号${yd.bianHao}` }}
    </div>
    <div class="yd-profile-item" v-show="yd.fcBh">
      <span v-html="formatFcbh()"></span>
    </div>
    <div class="yd-profile-item" v-if="yfLabel">{{ yfLabel }}</div>
    <div class="yd-profile-item">{{ yd.statusText }}</div>
    <div class="yd-profile-item" v-show="yd.remark">
      {{ `审核意见：${yd.remark}` }}
    </div>
  </div>
</template>

<script>
import { leibieMap } from "@/common/baseData";
export default {
  name: "YdProfile",
  data() {
    return {};
  },
  props: {
    yd: {
      type: Object,
      required: true,
    },
    yf: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    yfLabel() {
      const item = this.yf;
      if (!item) {
        return null;
      }
      const leibie = leibieMap[item.leiBie];
      const xuHao = item.xuHao;
      if (!leibie || !xuHao) {
        return null;
      }
      return `${leibieMap[item.leiBie]}${item.xuHao}`;
    },
  },
  methods: {
    getTypeName(type) {
      if (type === "1") {
        return "乔木林标准地";
      }
      if (type === "2") {
        return "灌木林标准地";
      }
      if (type === "3") {
        return "大样地";
      }
    },
    formatFcbh() {
      const biaoHaoArr = this.yd.bianHao.split("-");
      return biaoHaoArr[1] !== this.yd.fcBh
        ? `分层码<span style="font-weight:600;">${this.yd.fcBh}</span>`
        : `分层码${this.yd.fcBh}`;
    },
  },
};
</script>

<style>
.yd-profile {
  display: flex;
  font-size: 14px;
  line-height: 20px;
  font-family: sans-serif;
  color: #606266;
}
.yd-profile-item + .yd-profile-item {
  margin-left: 20px;
  position: relative;
}
.yd-profile-item + .yd-profile-item::before {
  position: absolute;
  width: 3px;
  height: 10px;
  background-color: #008f98;
  content: " ";
  left: -10px;
  top: 5px;
}
</style>
