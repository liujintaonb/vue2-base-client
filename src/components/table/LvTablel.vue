<!--相关调查表（标记填报相关）-->
<template>
  <div id="cd-table">
    <tian-bao
      v-if="markData.length"
      :mark-data="markData"
      :is-yd="selectedForm.type === 'yd'"
      :is-klw="
        selectedForm.api.name === 'klwdc' || selectedForm.api.name === 'klwdcjl'
      "
      @update="updateData"
    ></tian-bao>
    <xcy-list
      ref="lvTable"
      :config="propConfig"
      :data="showData"
      :props="headerConfig"
      :hasPager="false"
      :is-filter="true"
    ></xcy-list>
    <xcy-list
      v-if="fuTableData.isShow"
      :config="fuConfig"
      :data="fuTableData.fuListData"
      :props="fuTableData.fuPropConfig"
      :hasPager="false"
      :is-filter="true"
      style="margin-top: 15px"
    ></xcy-list>
    <div v-if="yfPhotoList && data.length > 0" class="pt20">
      <yf-photo-list :photo-list="yfPhotoList" />
    </div>
    <dc-img-list :photo-list="dcPhotoList"></dc-img-list>
  </div>
</template>

<script>
import tableMixin from "@/components/table/tableMixin";
import DcImgList from "@/components/table/components/dcImgList";
import yfPhotoList from "@/components/table/components/yfPhotoList";
import { isHasJingguanImg } from "@/common/baseFunction";
import TianBao from "@/components/table/components/TianBao";
import { cloneDeep } from "lodash";
import { USER_LEIBIE_SYS } from "@/common/unit";
import Storage from "@/common/storage";

export default {
  name: "LvTablel",
  mixins: [tableMixin],
  props: {
    selectedForm: {
      type: [Array, Object],
      default: {},
    },
    isSelect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fuConfig: {
        stripe: false,
        hasIndex: false,
        hasSelection: false,
        celStyle: {
          borderColor: "#d4d4d4",
        },
        headerCelStyle: {
          borderColor: "#d4d4d4",
        },
      },
    };
  },
  computed: {
    showData() {
      if (
        this.selectedForm.api.name === "klwdc" ||
        this.selectedForm.api.name === "klwdcjl"
      ) {
        return this.data.filter((item) => {
          return (
            item.tianbao1 !== "2" ||
            item.tianbao2 !== "2" ||
            item.tianbao3 !== "2"
          );
        });
      } else {
        return this.data.filter((item) => {
          return item.tianbao !== "2";
        });
      }
    },
    // 实验室用户实验室填报完成、实验室重新填报完成、待实验室填报、待实验室重新填报, 填报状态为2的
    markData() {
      const hasPromise = Storage.get("fuserInfo").leiBie === USER_LEIBIE_SYS;
      if (hasPromise) {
        if (
          this.selectedForm.api.name === "klwdc" ||
          this.selectedForm.api.name === "klwdcjl"
        ) {
          return this.data.filter((item) => {
            return (
              item.tianbao1 === "2" ||
              item.tianbao2 === "2" ||
              item.tianbao3 === "2"
            );
          });
        } else {
          return this.data.filter((item) => {
            return item.tianbao === "2";
          });
        }
      } else {
        return [];
      }
    },
    yfPhotoList() {
      if (isHasJingguanImg(this.selectedForm.api.name)) {
        return this.getYFPhotoList();
      }
    },
    headerConfig() {
      return this.config.filter((item) => {
        return !item.isTjTaleShow;
      });
    },
    propConfig() {
      return {
        stripe: false,
        hasIndex: false,
        hasSelection: false,
        celStyle: {
          borderColor: "#d4d4d4",
        },
        headerCelStyle: {
          borderColor: "#d4d4d4",
        },
      };
    },
  },
  methods: {
    /**
     * @param guid 更新数据的guid
     * @param keyArr 修改字段默认值为
     **/
    updateData(guid, keyArr) {
      if (this.selectedForm.type === "yd") {
        this.data.forEach((item, index) => {
          this.modifyData(index, ["tianbao"]);
        });
      } else {
        const index = this.data.findIndex((item) => item.guid === guid);
        if (index !== -1) {
          this.modifyData(index, keyArr);
        }
      }
      this.$emit("updateData", cloneDeep(this.data));
      this.$nextTick(() => {
        this.$emit("saveData");
      });
    },
    modifyData(index, keyArr) {
      keyArr.forEach((key) => {
        this.data[index][key] = "0";
      });
    },
  },
  components: { TianBao, DcImgList, yfPhotoList },
};
</script>

<style scoped lang="stylus">
@import 'table.styl';
</style>

<style>
#cd-table .xcy-list-table {
  border: 1px solid #d4d4d4;
}
#cd-table .xcy-list-table th {
  color: #353535;
}
#cd-table .xcy-list-table tr {
  color: #5f5f5f;
  font-weight: bolder;
}
#cd-table .xcy-list-table tr:hover {
  background-color: transparent;
}
#cd-table .xcy-list-table tbody tr:hover > td {
  background-color: transparent;
}
</style>
