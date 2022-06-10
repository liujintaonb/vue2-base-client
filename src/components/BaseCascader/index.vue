<template>
  <el-cascader
    v-model="myValue"
    :placeholder="prop.placeholder"
    :props="baseProp"
    ref="baseCascader"
    :show-all-levels="prop.showAllLevels || false"
    style="width: 150px"
    @change="handleChange($event)"
  ></el-cascader>
</template>

<script>
import { fetchLeibieList, fetchLeibieZiList } from "@/common/baseApi/api";
import Storage from "@/common/storage";
const xzCodeLevel = [
  {
    level: 0,
    codeLen: 2,
  },
  {
    level: 1,
    codeLen: 4,
  },
  {
    level: 2,
    codeLen: 6,
  },
  {
    level: 3,
    codeLen: 9,
  },
  {
    level: 5,
    codeLen: 12,
  },
];
export default {
  name: "BaseCascader",
  props: {
    value: {
      type: [String, Object],
      default() {
        return "";
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    prop: {
      type: Object,
      default() {
        return {
          showAllLevels: false,
          baseCode: "",
          level: 2,
          checkStrictly: false,
        };
      },
    },
  },
  watch: {
    value: {
      handler(newValue) {
        if (!newValue) {
          this.myValue = [];
        }
      },
    },
  },
  data() {
    const _this = this;
    return {
      myValue: [],
      firstNode: "",
      firstResolve: "",
      level: this.prop.level || 3,
      baseProp: {
        lazy: true,
        checkStrictly: this.prop.checkStrictly || false,
        lazyLoad(node, resolve) {
          if (!_this.firstNode || !_this.firstResolve) {
            if (node.level === 0) {
              _this.firstNode = node;
              _this.firstResolve = resolve;
            }
            return;
          }
          _this.generateData(node, resolve);
        },
      },
      xzCode: Storage.get("fuserInfo").xzCode || "",
    };
  },
  created() {
    setTimeout(() => {
      this.generateData(this.firstNode, this.firstResolve);
      let temArr = [];
      for (let i = 4; i <= this.value.length; i = i + 2) {
        temArr.push(this.value.slice(0, i));
      }
      this.myValue = [...temArr];
    }, 600);
  },
  methods: {
    handleChange() {
      let pathvalue = this.$refs.baseCascader.getCheckedNodes();
      this.$emit("change", pathvalue[0].data.value);
      this.$emit("input", pathvalue[0].data.value);
    },
    generateData(node, resolve) {
      if (node.level === 0) {
        fetchLeibieList({ leiBie: this.prop.baseCode })
          .then((res) => {
            let fuji;
            fuji = res.map((value, i) => ({
              value: value.bianMa,
              label: value.mingCheng,
              leaf: node.level >= this.level - 1 || value.isLeafNode,
            }));
            console.log(fuji);
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(fuji);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (node.level !== 0) {
        fetchLeibieZiList({ leiBie: this.prop.baseCode, fuBianMa: node.value })
          .then((res) => {
            let ziji;
            ziji = res.map((value, i) => ({
              value: value.bianMa,
              label: value.mingCheng,
              leaf: node.level >= this.level - 1 || value.isLeafNode,
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(ziji);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.el-cascader {
  width 100%
  height 30px
  line-height 30px
}
</style>
