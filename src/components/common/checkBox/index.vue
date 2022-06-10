<template>
  <div class="main">
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup1" size="small">
        <el-checkbox
          v-for="(item, key) in options"
          :key="key"
          :label="item.label"
          border
        ></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "XcheckBox",
  props: {
    value: {
      type: [Array],
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
        return {};
      },
    },
  },
  data() {
    return {
      options: this.prop.options,
      checkboxGroup1: [],
    };
  },
  mounted() {},
  computed: {},
  watch: {
    value: function name(value) {
      // if (typeof value === 'object' && value.label && value.label instanceof Array) {
      //     this.checkboxGroup1 = value.label;
      // }
      this.checkboxGroup1 = value;
    },
    checkboxGroup1: {
      handler: function (value, oldValue) {
        if (JSON.stringify(value) === JSON.stringify(oldValue)) {
          return;
        }
        // if (this.prop.needLabel) {
        //     let obj = {
        //         value: [],
        //         label: value
        //     };
        //     this.options.map(x=>{
        //         value.map(y=>{
        //             if (y === x.label) {
        //                 obj.value.push(x.value);
        //             }
        //         });
        //     });
        //     this.$emit('input', obj);
        //     this.$emit('change', obj);
        // } else {
        //     let str = '';
        //     this.options.map(x=>{
        //         value.map(y=>{
        //             if (y === x.label) {
        //                 str += `${x.value},`;
        //             }
        //         });
        //     });
        // console.log(str.substr(0, str.length - 1));
        // console.log(11);
        this.$emit("input", this.checkboxGroup1);
        this.$emit("change", this.checkboxGroup1);
        // }
      },
    },
  },
  methods: {},
  async created() {},
};
</script>

<style scoped></style>
