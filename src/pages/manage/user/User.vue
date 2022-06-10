<template>
  <div>
    <!--        显示用户列表 -->
    <div v-show="state === 0">
      <div class="filter-form">
        <xcy-form
          :config="filterConfig"
          :data="filterData"
          @input="updateFilterForm"
          @formBtnClick="queryFormBtnClick"
        ></xcy-form>
        <!--                <el-button-->
        <!--                    size="small"-->
        <!--                    type="primary"-->
        <!--                    class="query-button"-->
        <!--                    @click="handleQuery"-->
        <!--                    >查 询</el-button-->
        <!--                >-->
      </div>
      <xcy-list
        :data="listData"
        :props="listPropsConfig"
        :pagerInfo="pageInfo"
        @action="handleAction"
        :hasPager="true"
        @updatePagerInfo="updatePageInfo"
      ></xcy-list>
    </div>
    <!--        编辑/新增用户数据 -->
    <div v-if="state === 1 || state === 2" class="state1">
      <el-button-group class="group-btn">
        <el-button class="back-btn" type="primary" size="small" @click="back"
          >返 回</el-button
        >
      </el-button-group>
      <el-form
        ref="userForm"
        :model="userData"
        :rules="rules"
        class="user-form"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="userName" label="登录名">
          <el-input
            :disabled="state === 1"
            v-model.trim="userData.userName"
            placeholder="请输入登录名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="登录密码" v-if="state === 2">
          <el-input
            v-model.trim="userData.password"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="真实姓名">
          <el-input
            v-model.trim="userData.realName"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobileNumber" label="手机号">
          <el-input
            v-model.trim="userData.mobileNumber"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="companyName" label="工作单位">
          <el-tooltip content="示例：XX单位-职称-职务" placement="top-start">
            <el-input
              v-model.trim="userData.companyName"
              placeholder="请输工作单位"
            ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="leiBie" label="用户类别">
          <el-select
            v-model="userData.leiBie"
            placeholder="请选择用户类别"
            style="width: 100%"
            @change="selectedUserType(userData.leiBie, true)"
          >
            <el-option
              v-for="item in userLeiBieArrayWithoutAll"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="currentCode.length > 2 && item.value === '5'"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="用户状态">
          <el-select
            v-model="userData.status"
            placeholder="请选择用户状态"
            style="width: 100%"
          >
            <el-option
              v-for="item in userStatusArrayWithoutAll"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="type" label="用户级别">
          <el-select
            v-model="userData.type"
            placeholder="请选择用户级别"
            style="width: 100%"
            @change="xzChange"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="province" v-if="showProvinceForm" label="省">
          <el-select
            v-model="userData.province"
            placeholder="省"
            @change="provinceChange"
            style="width: 100%"
            :disabled="userData.currentCode.length >= 2"
          >
            <el-option
              v-for="item in provinces"
              :key="item.cfrcode"
              :label="item.cmc"
              :value="item.cfrcode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="city" v-if="showCityForm" label="市">
          <el-select
            v-model="userData.city"
            placeholder="市"
            @change="cityChange"
            style="width: 100%"
            :disabled="userData.currentCode.length >= 4"
          >
            <el-option
              v-for="item in cities"
              :key="item.cfrcode"
              :label="item.cmc"
              :value="item.cfrcode"
              :disabled="userData.currentCode.length >= 6"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="county" v-if="showCountyForm" label="县">
          <el-select
            v-model="userData.county"
            placeholder="县"
            @change="countyChange"
            style="width: 100%"
            :disabled="userData.currentCode.length >= 6"
          >
            <el-option
              v-for="item in counties"
              :key="item.cfrcode"
              :label="item.cmc"
              :value="item.cfrcode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showXiangForm" label="乡">
          <el-select
            class="form-width"
            v-model="userData.xiang"
            placeholder="乡"
            @change="xiangChange"
            style="width: 100%"
            :disabled="userData.currentCode.length >= 9"
          >
            <el-option
              v-for="item in xiangs"
              :key="item.cfrcode"
              :label="item.cmc"
              :value="item.cfrcode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showCunForm" label="村">
          <el-select
            class="form-width"
            v-model="userData.cun"
            placeholder="村"
            @change="cunChange"
            style="width: 100%"
            :disabled="userData.currentCode.length >= 12"
          >
            <el-option
              v-for="item in cuns"
              :key="item.cfrcode"
              :label="item.cmc"
              :value="item.cfrcode"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div class="buttons">
        <el-button
          type="primary"
          size="small"
          class="button-item"
          @click="update"
          v-if="state === 1"
          >更 新</el-button
        >
        <el-button
          type="primary"
          size="small"
          class="button-item"
          @click="confirmAddUser"
          v-if="state === 2"
          >新 增</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { ruleLength, ruleTel } from "@/common/rules";
import {
  listPropsConfig,
  userStatusMap,
  userLeiBieMap,
  userTypeMap,
  userStatusArrayWithoutAll,
  userLeiBieArrayWithoutAll,
  userTypeArrayWithoutAll,
  filterConfig,
  userFormConfig,
} from "./config";

import Storage from "@/common/storage";
import {
  getUserList,
  postAddUser,
  updateInfoUser,
  updateUser,
} from "@/common/baseApi/userApi";
import { getRegion } from "@/common/baseApi/api";
import { filteredFormFormmat } from "@/common/baseFunction";
export default {
  data() {
    return {
      listPropsConfig,
      listData: {
        list: [],
        total: 0,
      },
      pageInfo: {
        size: 15,
        page: 1,
      },
      filterData: {},
      filterConfig,
      // 0-显示用户列表  1-编辑用户数据 2-新增用户数据
      state: 0,
      rowData: null,
      userData: null,
      userFormConfig,
      userStatusArrayWithoutAll,
      userLeiBieArrayWithoutAll,
      userTypeArrayWithoutAll,
      userTypeList: [],
      typeList: [],
      provinces: [],
      cities: [],
      counties: [],
      xiangs: [],
      cuns: [],
      rules: {
        userName: [
          {
            required: true,
            message: "请输入登录名",
            trigger: "blur",
          },
          ruleLength,
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
        realName: [ruleLength],
        mobileNumber: [ruleTel],
        companyName: [{ max: 30, message: "30字以内", trigger: "blur" }],
        leiBie: [
          {
            required: true,
            message: "请选择用户类别",
            trigger: ["blur", "change"],
          },
        ],
        type: [
          {
            required: true,
            message: "请选择用户级别",
            trigger: ["blur", "change"],
          },
        ],
      },
      currentCode: Storage.get("userXzcode"),
    };
  },
  mixins: [],
  async created() {
    this.handleQuery();
  },
  methods: {
    queryFormBtnClick(action) {
      if (action === "query") {
        this.pageInfo.page = 1;
        this.handleQuery();
      }
      if (action === "clear") {
        this.clearQuery();
      }
      if (action === "add") {
        this.addUser();
      }
    },
    clearQuery() {
      this.pageInfo.page = 1;
      this.filterData = {};
      this.handleQuery();
    },
    validCode() {
      const _this = this;
      if (_this.userData.type >= 1) {
        if (_this.userData.province.length === 0) {
          _this.$message.info("请选择省份");
          return false;
        }
        _this.userData.xzCode = _this.userData.province;
      }
      if (_this.userData.type >= 2) {
        if (_this.userData.city.length === 0) {
          _this.$message.info("请选择市");
          return false;
        }
        _this.userData.xzCode = _this.userData.city;
      }
      if (_this.userData.type >= 3) {
        if (_this.userData.county.length === 0) {
          _this.$message.info("请选择县");
          return false;
        }
        _this.userData.xzCode = _this.userData.county;
      }
      if (_this.userData.type >= 4) {
        if (_this.userData.xiang.length === 0) {
          _this.$message.info("请选择乡");
          return false;
        }
        _this.userData.xzCode = _this.userData.xiang;
      }
      if (_this.userData.type >= 5) {
        if (_this.userData.cun.length === 0) {
          _this.$message.info("请选择村");
          return false;
        }
        _this.userData.xzCode = _this.userData.cun;
      }
      return true;
    },
    // mark add user
    confirmAddUser() {
      const vm = this;
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          if (!vm.validCode()) {
            return;
          }
          // 请求
          postAddUser(vm.userData)
            .then((data) => {
              console.log(data);
              if (data) {
                vm.$message.success("新增用户成功");
                vm.back();
              }
            })
            .catch(() => {
              vm.$message.error("新增用户失败");
            });
        }
      });
    },
    /**
     * 添加用户
     **/
    addUser() {
      const xzCode = Storage.get("fuserInfo").xzCode || "0";
      const type = this.initialXzType();
      const listRegion = this.initialXz(xzCode);
      this.userData = {
        userName: "",
        realName: "",
        mobileNumber: "",
        leiBie: "",
        status: "1",
        type: type,
        province: listRegion.province,
        city: listRegion.city,
        county: listRegion.county,
        currentCode: xzCode,
      };
      this.typeList = this.userTypeList.concat([]);
      this.updateXzList();
      this.state = 2;
    },
    /**
     * 查询列表
     **/
    async handleQuery() {
      const params = filteredFormFormmat(
        Object.assign({}, this.pageInfo, this.filterData)
      );
      if (!params.xzCode) {
        // TODO 统一 设置 XZCode
        params.xzCode = Storage.get("userXzcode");
      }
      const res = await getUserList(params);
      let list = (res && res.content) || [];
      list = list.map((e, index) => {
        e.statusText = userStatusMap[e.status];
        e.typeText = userTypeMap[e.type];
        e.leiBieText = userLeiBieMap[e.leiBie];
        e.index = index + 1;
        return e;
      });
      this.listData = {
        list,
        total: res && res.totalElements,
      };
    },
    /**
     * 返回按钮
     **/
    back() {
      this.rowData = null;
      this.userData = null;
      this.state = 0;
      this.handleQuery();
    },
    /**
     * 用户操作回调
     **/
    handleAction({ action, data }) {
      switch (action) {
        case "flexible":
          this.showUpdateForm(data);
          break;
        case "enable":
          this.handleUpdate(data.guid, "2", "开通用户");
          break;
        case "disable":
          this.handleUpdate(data.guid, "3", "禁用用户");
          break;
        case "reset":
          this.handleUpdate(data.guid, "1", "重置密码");
          break;
        case "delete":
          this.handleUpdate(data.guid, "4", "删除用户");
          break;
      }
    },
    updateForm(data) {
      if (this.userData.province !== data.province) {
        data.city = null;
        data.county = null;
      } else if (this.userData.city !== data.city) {
        data.county = null;
      }
      this.userData = cloneDeep(data);
      this.updateXzList();
    },
    /**
     * 更新事件
     **/
    showUpdateForm(data) {
      this.rowData = data;
      this.rowData.type = Number(data.type);
      this.state = 1;
      this.createUserData();
      if (data.type !== 0) {
        this.updateXzList();
      }
    },
    // 分页触发
    updatePageInfo(pageInfo) {
      this.pageInfo = { ...this.pageInfo, page: pageInfo.currentPage };
      this.handleQuery();
    },
    async updateFilterForm(data) {
      this.filterData = data;
    },
    async update() {
      const params = cloneDeep(this.userData);
      if (!this.validCode()) {
        return false;
      }
      if (this.showCunForm) {
        params.xzCode = params.cun;
        delete params.cun;
      } else if (this.showXiangForm) {
        params.xzCode = params.xiang;
        delete params.xiang;
      } else if (this.showCountyForm) {
        params.xzCode = params.county;
        delete params.county;
      } else if (this.showCityForm) {
        params.xzCode = params.city;
        delete params.city;
      } else if (this.showProvinceForm) {
        params.xzCode = params.province;
        delete params.province;
      } else {
        params.xzCode = null;
      }
      const result = await updateUser(params);
      if (result) {
        this.$notify({
          title: "操作成功",
          type: "success",
          message: "用户数据更新成功",
        });
        this.back();
      } else {
        this.$notify({
          title: "操作失败",
          type: "error",
          message: "用户数据更新失败",
        });
      }
    },
    /**
     * 获取当前用户列表值
     **/
    createUserData() {
      const listRegion = this.initialXz(this.rowData.xzCode || "0");
      this.initialXzType();
      this.selectedUserType(this.rowData.leiBie);
      this.userData = {
        ...this.rowData,
        province: listRegion.province,
        city: listRegion.city,
        county: listRegion.county,
        xiang: listRegion.xiang,
        cun: listRegion.cun,
        currentCode: Storage.get("fuserInfo").xzCode || "0",
      };
    },
    /**
     * 更新省市县列表
     **/
    async updateXzList() {
      this.provinces = await getRegion();
      if (this.showProvinceForm && this.userData.province) {
        this.cities = await getRegion({
          parentCode: this.userData.province,
        });
      }
      if (this.showCityForm && this.userData.city) {
        this.counties = await getRegion({
          parentCode: this.userData.city,
        });
      }
      if (this.showCountyForm && this.userData.county) {
        this.xiangs = await getRegion({
          parentCode: this.userData.county,
        });
      }
      if (this.showXiangForm && this.userData.cun) {
        this.cuns = await getRegion({
          parentCode: this.userData.xiang,
        });
      }
    },
    /**
     * 初始初始化省市县列表
     **/
    initialXz(xzcode = "0") {
      let len = xzcode.length;
      let province = "";
      let city = "";
      let county = "";
      let xiang = "";
      let cun = "";
      if (len >= 12) {
        province = xzcode.substring(0, 2);
        city = xzcode.substring(0, 4);
        county = xzcode.substring(0, 6);
        xiang = xzcode.substring(0, 9);
        cun = xzcode.substring(0, 12);
      } else if (len >= 9) {
        province = xzcode.substring(0, 2);
        city = xzcode.substring(0, 4);
        county = xzcode.substring(0, 6);
        xiang = xzcode.substring(0, 9);
      } else if (len >= 6) {
        province = xzcode.substring(0, 2);
        city = xzcode.substring(0, 4);
        county = xzcode.substring(0, 6);
      } else if (len >= 4) {
        province = xzcode.substring(0, 2);
        city = xzcode.substring(0, 4);
      } else if (len >= 2) {
        province = xzcode.substring(0, 2);
      }
      return {
        province,
        city,
        county,
        xiang,
        cun,
      };
    },
    /**
     * 初始化行政类型
     **/
    initialXzType() {
      const userInfo = Storage.get("fuserInfo");
      const xzcode = userInfo.xzCode || "";
      let len = xzcode.length;
      let type = null;
      this.userTypeList = [
        {
          label: "县",
          value: 3,
        },
      ];
      if (len >= 6) {
        type = 3;
      } else if (len >= 4) {
        this.userTypeList.unshift({ label: "市", value: 2 });
        type = 2;
      } else if (len >= 2) {
        type = 1;
        this.userTypeList.unshift(
          { label: "省", value: 1 },
          { label: "市", value: 2 }
        );
      } else if (len === 0) {
        if (userInfo.commissId) {
          this.userTypeList.unshift(
            { label: "省", value: 1 },
            { label: "市", value: 2 }
          );
        } else {
          this.userTypeList.unshift(
            { label: "国家", value: 0 },
            { label: "省", value: 1 },
            { label: "市", value: 2 }
          );
        }
      }
      return type;
    },
    xzChange(val) {
      if (val !== 0) {
        this.updateXzList();
      }
    },
    async provinceChange(val) {
      this.userData.city = "";
      this.userData.county = "";
      this.userData.xiang = "";
      this.userData.cun = "";
      this.cities = await getRegion({ parentCode: val });
      this.$forceUpdate();
    },
    async cityChange(val) {
      this.userData.county = "";
      this.userData.xiang = "";
      this.userData.cun = "";
      this.counties = await getRegion({ parentCode: val });
      this.$forceUpdate();
    },
    async countyChange(val) {
      this.userData.xiang = "";
      this.userData.cun = "";
      this.xiangs = await getRegion({ parentCode: val });
      this.$forceUpdate();
    },
    async xiangChange(val) {
      this.userData.cun = "";
      this.cuns = await getRegion({ parentCode: val });
      this.$forceUpdate();
    },
    cunChange(val) {
      this.$forceUpdate();
    },
    /**
     * 管理用户操作
     **/
    handleUpdate(guid, action, tips) {
      const _this = this;
      let title = `您将进行${tips}操作，是否继续`;
      if (action === "1") {
        title = "重置后，密码为111111";
      }
      _this
        .$confirm(title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          _this.updateUser(guid, action, tips);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消${tips}操作！`,
          });
        });
    },
    async updateUser(guid, action, tips) {
      const result = await updateInfoUser({
        guid: guid,
        action: action,
      });
      if (result) {
        this.$message.success(`${tips}成功！`);
        this.handleQuery();
      }
    },
    // async cityChange(val) {
    //     this.userData.county = '';
    //     this.counties = await api.getXianOptions({ parentCode: val });
    // }
    selectedUserType(val, changeBtn = false) {
      if (val.toString() === "5") {
        this.typeList = [{ label: "省", value: 1 }];
      } else if (val.toString() === "4") {
        this.typeList = this.userTypeList.concat([
          { label: "乡", value: 4 },
          { label: "村", value: 5 },
        ]);
      } else {
        this.typeList = this.userTypeList.concat([]);
      }
      if (changeBtn) {
        this.userData.type = "";
      }
    },
  },
  mounted() {},
  computed: {
    showProvinceForm() {
      return parseInt(this.userData.type, 10) > 0;
    },
    showCityForm() {
      return parseInt(this.userData.type, 10) > 1;
    },
    showCountyForm() {
      return parseInt(this.userData.type, 10) > 2;
    },
    showXiangForm() {
      return parseInt(this.userData.type, 10) > 3;
    },
    showCunForm() {
      return parseInt(this.userData.type, 10) > 4;
    },
  },
  beforeDestroy: () => {},
};
</script>

<style scoped>
.button-item + .button-item {
  margin-left: 20px;
}
.user-form {
  width: 400px;
}
</style>

<style>
.filter-form {
  display: flex;
  justify-content: center;
}
.state1 .el-form-item__label {
  padding-right: 20px !important;
}
</style>
