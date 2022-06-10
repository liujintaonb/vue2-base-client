<!--特大枯倒木样品测定表-->
<!--mark - html -->
<template>
  <div>
    <div class="c-table">
      <table border="1" rules="all" border-collapse="collapse" width="100%">
        <tr>
          <td
            v-for="(item, i) of [
              ['序号'],
              ['样品鲜重', 'g'],
              ['树种(组)名'],
              ['材积'],
              ['密度级'],
              ['烘箱温度(℃)'],
              ['木材密度/基本密度(g/cm³)'],
            ]"
            :key="i"
          >
            <info-item
              :label="item[0]"
              :unit="item[1]"
              :colon="false"
              no-value
            />
          </td>
          <td v-if="!isDataAudit" width="80">
            <info-item label="操作" :colon="false" no-value />
          </td>
        </tr>
        <tr v-for="(item, i) in arrData" :key="i">
          <td>{{ item.xh | formatValue }}</td>
          <td>{{ item.ypxz | formatValue }}</td>
          <td>{{ item.szz | formatValue }}</td>
          <td>{{ item.cj | formatValue }}</td>
          <td>{{ item.mdj | formatValue }}</td>
          <td>{{ item.kxwd | formatValue }}</td>
          <td>{{ item.mcmd | formatValue }}</td>
          <td v-if="!isDataAudit">
            <el-button
              type="text"
              size="small"
              @click="handleDetail('fill', item)"
              >填报</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDetail('delete', item)"
              >删除</el-button
            >
          </td>
        </tr>
        <tr v-if="!arrData.length">
          <td :colspan="isDataAudit ? 8 : 9">
            <p class="empty">暂无数据</p>
          </td>
        </tr>
      </table>
      <div v-if="ypPhotoList.length" style="margin-top: 24px">
        <div v-for="(ypPhoto, index) in ypPhotoList" :key="index">
          <h3 class="yp-title">{{ ypPhoto.label }}</h3>
          <dc-img-list :photo-list="ypPhoto.imgList"></dc-img-list>
        </div>
      </div>
    </div>
    <el-dialog
      v-dialogDrag
      :visible.sync="fillVisible"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="tdkdmDataForm"
        :model="selectRowData"
        :rules="tdkdmDataRules"
        label-position="right"
        label-width="135px"
      >
        <el-form-item
          v-for="(item, index) in fillConfig"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <el-input
            v-model="selectRowData[item.prop]"
            :disabled="isOnlyRead"
            maxLength="20"
            size="small"
            style="width: 100%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="isOnlyRead" @click="fillVisible = false" size="small"
          >关 闭</el-button
        >
        <template v-else>
          <el-button @click="fillVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="save" size="small">保 存</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import infoItem from "@/components/table/components/infoItem";
import { cloneDeep } from "lodash";
import DcImgList from "@/components/table/components/dcImgList";
import tableMixin from "@/components/table/tableMixin";
import { deleteYdTableItem, updateForm } from "@/common/baseApi/ydApi";

// mark - script
export default {
  name: "tdkdmqyjl",
  mixins: [tableMixin],
  // mark -- data
  data() {
    const MD_RULE = /^(0\.\d{0,10}[1-9])$/;
    const vailWD = (rule, value, callback) => {
      if (value) {
        const valueNum = Number(value);
        this.selectRowData.kxwd = `${valueNum}`;
        if (valueNum > 0) {
          callback();
        } else {
          callback("烘箱温度大于0");
        }
      } else {
        callback();
      }
    };
    const vailMD = (rule, value, callback) => {
      if (value) {
        if (MD_RULE.test(value)) {
          callback();
        } else {
          callback(`基本密度值大于0，小于1！`);
        }
      } else {
        callback();
      }
    };
    return {
      fixedConfig: [
        {
          label: "省份：",
          prop: "sheng",
        },
        {
          label: "树种：",
          prop: "szz",
        },
        {
          label: "标准地编号：",
          prop: "ydbh",
        },
        {
          label: "样品编号：",
          prop: "ypbh",
        },
        {
          label: "密度级：",
          prop: "mdj",
        },
      ],
      fillConfig: [
        {
          label: "烘箱温度(℃)：",
          prop: "kxwd",
        },
        {
          label: "基本密度(g/cm³)：",
          prop: "mcmd",
        },
      ],
      tdkdmDataRules: {
        kxwd: [
          {
            required: true,
            message: "请输入烘箱温度",
            trigger: ["blur", "change"],
          },
          { validator: vailWD, trigger: ["blur", "change"] },
        ],
        mcmd: [
          {
            required: true,
            message: "请输入基本密度",
            trigger: ["blur", "change"],
          },
          { validator: vailMD, trigger: ["blur", "change"] },
        ],
      },
      arrData: this.data.content || [],
      selectRowData: {},
      isOnlyRead: true,
      fillVisible: false,
    };
  },
  // mark -- methods
  methods: {
    handleDetail(action, data) {
      const _this = this;
      this.selectRowData = cloneDeep(data);
      this.$emit("handleAction", {
        table: "kdmqyjl",
        action: action,
        data: data,
      });
      if (action === "fill") {
        this.isOnlyRead = false;
        this.fillVisible = true;
      } else {
        this.$confirm("您将删除此条记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            _this.deleteYdTableItem(data.guid);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    handleChildQuery() {
      this.$emit("select");
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.handleChildQuery();
    },
    save() {
      const _this = this;
      this.$refs.tdkdmDataForm.validate((valid) => {
        if (valid) {
          _this.saveFillTable();
        }
      });
    },
    async saveFillTable() {
      let param = cloneDeep(this.selectRowData);
      let res = await updateForm({
        tableNo: "tdkdmqyjl",
        guid: param.guid,
        kxwd: param.kxwd,
        mcmd: param.mcmd,
      });
      if (res) {
        this.handleChildQuery();
        this.fillVisible = false;
        this.$notify({
          title: "操作成功",
          type: "success",
          message: "填写成功",
        });
      }
    },
    deleteYdTableItem(guid) {
      deleteYdTableItem({
        tableNo: "kdmypcd",
        guid: guid,
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.handleChildQuery();
      });
    },
    getYpPhotoList() {
      let photoList = [];
      if (this.arrData.length) {
        this.arrData.forEach((item) => {
          if (item.imgs) {
            const tempList = item.imgs.split(",");
            if (tempList) {
              photoList = [
                ...photoList,
                {
                  label: `样品编号：${item.ypbh}`,
                  imgList: tempList,
                },
              ];
            }
          }
        });
      }
      return photoList;
    },
  },
  // mark -- computed
  computed: {
    ypPhotoList() {
      return this.getYpPhotoList();
    },
  },
  // mark -- mounted
  mounted() {},
  components: { infoItem, DcImgList },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import 'table.styl';
</style>
