<!--用来展示 key value 信息-->
<!--mark - html -->
<template>
  <div>
    <template v-if="unit">
      <span class="info-title" v-html="parseLabel"></span
      ><span class="info-value" v-if="!noValue">{{ value || "暂无" }}</span>
    </template>
    <span class="info-title" v-else>
      {{ parseLabel }}
      <span class="info-value" v-if="!noValue">{{ value || "暂无" }}</span>
    </span>
    <template v-if="isMarkFill">
      <mark-fill></mark-fill>
    </template>
  </div>
</template>

<script>
import {
  cm,
  g,
  m,
  m2,
  m3,
  kg,
  kgm3,
  thm2,
  hm2,
  m3hm2,
  gcm3,
  kjg,
  percentage,
  celsius,
} from "@/common/unit";
import MarkFill from "@/components/table/components/markFill";
// mark - script
export default {
  name: "infoItem",
  components: { MarkFill },
  props: {
    unit: {
      type: String,
      default: () => null,
    },
    label: {
      type: String,
    },
    // 是否展示冒号
    colon: {
      type: Boolean,
      default: () => true,
    },
    value: {
      type: [String, Number],
      default: () => "",
    },
    // 是否展示value值
    noValue: {
      type: Boolean,
      default: () => false,
    },
    isMarkFill: {
      type: Boolean,
      default: false,
    },
  },
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {},
  // mark -- computed
  computed: {
    parseLabel() {
      let l = this.label;
      let unit = "";
      if (this.label.endsWith(":") || this.label.endsWith("：")) {
        // 以冒号结尾
        l = this.label.slice(0, -1);
      }

      switch (this.unit) {
        case "m2":
          unit = m2;
          break;
        case "m3":
          unit = m3;
          break;
        case "hm2":
          unit = hm2;
          break;
        case "g":
          unit = g;
          break;
        case "kg":
          unit = kg;
          break;
        case "cm":
          unit = cm;
          break;
        case "m":
          unit = m;
          break;
        case "kgm3":
          unit = kgm3;
          break;
        case "thm2":
          unit = thm2;
          break;
        case "m3hm2":
          unit = m3hm2;
          break;
        case "kjg":
          unit = kjg;
          break;
        case "gcm3":
          unit = gcm3;
          break;
        case "h":
          unit = h;
          break;
        case "%":
          unit = percentage;
          break;
        case "C":
          unit = celsius;
          break;
        default:
          unit = this.unit ? `(${this.unit})` : "";
          break;
      }
      return `${l}${unit}${this.colon ? "：" : ""}`;
    },
  },
  // mark -- mounted
  mounted() {},
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "../table.styl"
</style>
