<template>
  <div
    class="login-container"
    :style="{ backgroundImage: 'url(' + srcImgUrl + ')' }"
  >
    <el-header class="not-print" height="60px">
      <div class="title">
        <div class="zh-CN-left">
          <img
            src="../../assets/logo.png"
            alt
            style="width: 48px; height: 48px; vertical-align: middle"
          />
        </div>
        <div class="zh-CN">
          <p class="title-big">
            {{ xzTitle }}<span class="check-title">{{ checkTitle }}</span>
          </p>
        </div>
        <div class="en-US"></div>
      </div>
      <div>
        <el-popover
          placement="bottom-start"
          popper-class="popover-class"
          width="100"
          trigger="click"
        >
          <div slot="reference" class="more">更多</div>
          <div class="more-list">
            <div @click="downloadDoc('cj')" class="more-list-item">
              采集系统说明文档
            </div>
            <div @click="downloadDoc('zj')" class="more-list-item">
              质检系统说明文档
            </div>
            <div @click="updateLog" class="more-list-item">更新日志</div>
            <div @click="downloadApk" class="more-list-item">
              安卓平板客户端
            </div>
            <div @click="erWeiMa" class="more-list-item">二维码扫描下载</div>
          </div>
        </el-popover>
      </div>
    </el-header>
    <div class="login-form">
      <div class="form-title"></div>
      <div class="form-box">
        <div class="form-left">
          <img src="../../assets/logo_big.png" alt />
        </div>
        <div class="form-right">
          <el-form
            :model="formData"
            :rules="rules"
            :hide-required-asterisk="true"
            ref="registerForm"
            label-position="right"
            class="demo-ruleForm"
            label-width="80px"
          >
            <el-form-item prop="userType" label="用户类型：">
              <el-radio-group
                v-model="formData.userType"
                @change="selectedUserType"
                style="margin-right: 30px"
              >
                <el-radio label="2">实验室测定</el-radio>
                <el-radio label="3">系统管理员</el-radio>
                <el-radio label="4">野外火源填报</el-radio>
                <el-radio label="5">核查用户</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="userName" label="登录名：">
              <el-input
                class="form-width"
                v-model="formData.userName"
                placeholder="请输入登录名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
              <el-input
                class="form-width"
                v-model="formData.password"
                placeholder="请输入密码"
                show-password
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="dengLuMmAgain" label="确认密码：">
              <el-input
                class="form-width"
                v-model="formData.dengLuMmAgain"
                placeholder="请再次输入密码"
                show-password
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="realName" label="真实姓名：">
              <el-input
                class="form-width"
                v-model="formData.realName"
                placeholder="请输入真实姓名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="mobileNumber" label="手机号：">
              <el-input
                class="form-width"
                v-model="formData.mobileNumber"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="companyName" label="工作单位：">
              <el-tooltip
                content="示例：XX单位-职称-职务"
                placement="top-start"
              >
                <el-input
                  class="form-width"
                  v-model="formData.companyName"
                  placeholder="请输入工作单位"
                ></el-input>
              </el-tooltip>
            </el-form-item>
            <el-form-item prop="type" label="行政级别：">
              <el-select
                class="form-width"
                v-model="formData.type"
                placeholder="请选择行政级别"
                style="width: 300px"
              >
                <el-option
                  v-for="item in userType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="showProvinceForm">
              <el-select
                class="form-width"
                v-model="formData.province"
                placeholder="省"
                @change="provinceChange"
                style="width: 300px"
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
            <el-form-item v-if="showCityForm">
              <el-select
                class="form-width"
                v-model="formData.city"
                placeholder="市"
                @change="cityChange"
                style="width: 300px"
              >
                <el-option
                  v-for="item in cities"
                  :key="item.cfrcode"
                  :label="item.cmc"
                  :value="item.cfrcode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="showCountityForm">
              <el-select
                class="form-width"
                v-model="formData.countity"
                placeholder="县"
                @change="xiangChange"
                style="width: 300px"
              >
                <el-option
                  v-for="item in countities"
                  :key="item.cfrcode"
                  :label="item.cmc"
                  :value="item.cfrcode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="showXiangForm">
              <el-select
                class="form-width"
                v-model="formData.xiang"
                placeholder="乡"
                @change="cunChange"
                style="width: 300px"
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
            <el-form-item v-if="showCunForm">
              <el-select
                class="form-width"
                v-model="formData.cun"
                placeholder="村"
                style="width: 300px"
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
            <div class="ml80">
              <div class="pt10">
                <el-button
                  class="form-width form-btn"
                  @click="hanleRegister"
                  type="primary"
                  >注册</el-button
                >
              </div>
              <div class="pt10">
                <el-button
                  style="color: #ffffff"
                  class="form-width form-btn"
                  @click="goBack"
                  >登录</el-button
                >
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      v-dialogDrag
      :modal="false"
      :close-on-click-modal="false"
      title="二维码查看"
      :visible.sync="erWerMashow"
      width="400px"
    >
      <div style="width: 200px; height: 200px; margin: 0 auto">
        <div id="erWeiMa"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formConfig, typeOptions } from "./config";
import { cloneDeep } from "lodash";
import { registerApi } from "./api";
import { ruleTel } from "@/common/rules";
import QRCode from "qrcodejs2";
import { getRegion } from "@/common/baseApi/api";
export default {
  data() {
    return {
      xzTitle: process.env.VUE_APP_TITLE,
      checkTitle: process.env.VUE_APP_CHECK,
      srcImgUrl: `./img/${process.env.VUE_APP_BG_NAME}`,
      formConfig,
      formData: {
        userName: "",
        password: "",
        dengLuMmAgain: "",
        realName: "",
        mobileNumber: "",
        companyName: "",
        userType: "2",
        type: "",
        province: "",
        city: "",
        countity: "",
        xiang: "",
      },
      erWerMashow: false,
      cjDocDowloadUrl: process.env.VUE_APP_CJ_DOC_URL,
      zjDocDowloadUrl: process.env.VUE_APP_ZJ_DOC_URL,
      updateLogUrl: process.env.VUE_APP_UPDATE_LOG_URL,
      apkDowloadUrl: process.env.VUE_APP_APK_URL,
      erWeiMaUrl: process.env.VUE_APP_ERWEIMA_URL,
      userType: [],
      rules: {
        userName: [
          {
            required: true,
            message: "请输入登录名",
          },
          {
            max: 20,
            message: "20字以内，可字母、数字、下划线",
            trigger: "blur",
          },
        ],
        userType: [
          {
            required: true,
            message: "请选择用户类别",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
          {
            min: 6,
            max: 16,
            message: "6-16位字符",
            trigger: "blur",
          },
        ],
        dengLuMmAgain: [
          {
            required: true,
            message: "请确认密码",
          },
          {
            min: 6,
            max: 16,
            message: "6-16位字符",
            trigger: "blur",
          },
        ],
        realName: [
          {
            required: true,
            message: "请输入真实姓名",
          },
          {
            max: 10,
            message: "10字以内",
            trigger: "blur",
          },
        ],
        mobileNumber: [
          {
            required: true,
            message: "请输入电话",
          },
          ruleTel,
        ],
        companyName: [
          {
            required: true,
            message: "请输入工作单位",
          },
          {
            max: 30,
            message: "30字以内",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择用户所在行政级别后，再选择所属区域",
          },
        ],
      },
      provinces: [],
      cities: [],
      countities: [],
      xiangs: [],
      cuns: [],
    };
  },
  components: {},
  async created() {
    this.selectedUserType(this.formData.userType);
    let shengOptions = await getRegion({}, false);
    this.provinces = shengOptions;
    const isNation = process.env.VUE_APP_BASE_AREA === "nation";
    if (isNation) {
      this.provinces = shengOptions;
    } else {
      const xzCode = process.env.VUE_APP_XZCODE;
      const item = shengOptions.find((item) => item.cfrcode === xzCode);
      this.provinces = [item];
    }
  },
  methods: {
    downloadDoc(name) {
      let url = "";
      switch (name) {
        case "cj":
          url = this.cjDocDowloadUrl;
          break;
        case "zj":
          url = this.zjDocDowloadUrl;
          break;
      }
      window.open(url);
    },
    updateLog() {
      window.open(this.updateLogUrl);
    },
    downloadApk() {
      window.open(this.apkDowloadUrl);
    },
    erWeiMa() {
      this.erWerMashow = true;
      setTimeout(() => {
        new QRCode("erWeiMa", {
          width: 200,
          height: 200,
          text: this.apkDowloadUrl,
        });
      }, 600);
    },
    handleEditUpdate(formData) {
      this.formData = formData;
    },
    goBack() {
      this.$router.back();
    },
    async provinceChange(val) {
      this.cities = await getRegion({ parentCode: val }, false);
    },
    async cityChange(val) {
      this.countities = await getRegion({ parentCode: val }, false);
    },
    async xiangChange(val) {
      this.xiangs = await getRegion({ parentCode: val }, false);
    },
    async cunChange(val) {
      this.cuns = await getRegion({ parentCode: val }, false);
    },
    hanleRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          let copyData = cloneDeep(this.formData);
          if (copyData.password !== copyData.dengLuMmAgain) {
            this.$message("两次密码不一致");
            return;
          }
          // 验证密码之后 删除无用字段
          delete copyData.dengLuMmAgain;
          // 匹配行政级别和所属区域关系
          // 设置默认个人注册字段
          // copyData.type = '0';
          // if (copyData.registerLink.yongHuLx) {
          //     copyData.type = copyData.registerLink.yongHuLx;
          // }
          // if(copyData.registerLink.sheng) {
          //   copyData.provinces = copyData.registerLink.sheng
          // }
          // if(copyData.registerLink.shi) {
          //   copyData.cities = copyData.registerLink.shi
          // }
          // if(copyData.registerLink.xian) {
          //   copyData.xzCode = copyData.registerLink.xian
          // })
          if (!copyData.type) {
            copyData.type = "0";
          }
          if (copyData.type === "1") {
            copyData.xzCode = copyData.province;
          } else if (copyData.type === "2") {
            copyData.xzCode = copyData.city;
          } else if (copyData.type === "3") {
            copyData.xzCode = copyData.countity;
          } else if (copyData.type === "4") {
            copyData.xzCode = copyData.xiang;
          } else if (copyData.type === "5") {
            copyData.xzCode = copyData.cun;
          }
          copyData.leiBie = copyData.userType;
          delete copyData.userType;
          delete copyData.province;
          delete copyData.city;
          delete copyData.countity;
          delete copyData.xiang;
          delete copyData.cun;
          const res = await registerApi(copyData);
          if (res) {
            this.$notify({
              title: "提示",
              type: "success",
              message: "注册成功",
            });
            setTimeout(() => {
              this.$router.back();
            }, 500);
          } else {
            this.$notify({
              title: "提示",
              type: "error",
              message: "注册失败",
            });
          }
        }
      });
    },
    keyHandler(e) {
      if (e.keyCode === 13) {
        this.hanleRegister();
      }
    },
    selectedUserType(val) {
      this.formData.type = "";
      const startSub = process.env.VUE_APP_BASE_AREA === "nation" ? 0 : 1;
      switch (val) {
        case "2":
        case "3":
          this.userType = typeOptions.slice(startSub, typeOptions.length - 2);
          break;
        case "4":
          this.userType = typeOptions.slice(startSub, typeOptions.length);
          break;
        case "5":
          this.userType = typeOptions.slice(1, 2);
          break;
      }
    },
  },
  computed: {
    showProvinceForm() {
      return parseInt(this.formData.type, 10) > 0;
    },
    showCityForm() {
      return parseInt(this.formData.type, 10) > 1;
    },
    showCountityForm() {
      return parseInt(this.formData.type, 10) > 2;
    },
    showXiangForm() {
      return parseInt(this.formData.type, 10) > 3;
    },
    showCunForm() {
      return parseInt(this.formData.type, 10) > 4;
    },
  },
  mounted() {
    document.addEventListener("keyup", this.keyHandler, false);
  },
  destroyed() {
    document.removeEventListener("keyup", this.keyHandler, false);
  },
  beforeDestroy: () => {},
};
</script>

<style lang="stylus">
.form-box .el-form-item__label {
  color: #004D22;
  font-size: 16px;
  font-weight: 700;
}
</style>

<style lang="stylus" scoped>
.login-container {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0; // 这里是设置与顶部的距离
  left: 0; // 这里是设置与左边的距离
  background-size: cover;
  overflow: auto;
}

.form-title {
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  height: 60px;
  width: 100%;
  line-height: 60px;
  font-family: 'Microsoft YaHei UI';
  font-weight: bold;
  letter-spacing: 2px;
}

.form-box {
  width: 100%;
  padding: 30px 0 40px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pt10 {
  padding-top: 10px;
}

.ml80 {
  margin-left: 80px;
}

.el-header {
  background-image: url('../../assets/bg_title.png');
  text-align: right;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.title {
  text-align: left;
}

.zh-CN {
  display: inline-block;
  letter-spacing: 4px;
  vertical-align: middle;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Microsoft YaHei UI';
}

.title-big {
  font-size: 26px;
}

.zh-CN-left {
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

.cursor {
  cursor: pointer;
}

.login-form {
  margin-top: 6%;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  background-image: url('../../assets/bg_form_big.png');
  background-repeat: no-repeat;
  background-size: 800px auto;
}

.form-left {
  width: 240px;
  margin-left: 42px;
  text-align: center;
}

.form-right {
  width: 418px;
  text-align: left;
  flex: 1;
}

.form-width {
  width: 300px;
}

.form-btn {
  background-image: url('../../assets/bg_btn.png');
  height: 38px;
  background-size: 300px 38px;
}

.verification-code {
  width: 100px;
  height: 38px;
  border: 1px #A8A8A8 solid;
  border-radius: 0 5px 5px 0;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10vh;
}

.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-type {
  text-align: center;
  font-size: 20px;
  margin-bottom: 5vh;
}

.register-person {
  width: 400px;
  margin: 20px auto;
}

.register-type {
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  color: #2d885f;
}

/deep/.el-radio {
  margin: 12px 20px 0 0;
}

.footer {
  margin: 0 auto;
  margin-bottom: 30px;
  text-align: center;

  > button {
    display: block;
    width: 90%;
    margin: 0 auto;

    &:first-child {
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }
}

.register-main {
  margin-bottom: 0;
}

.registerForm {
  margin: 10px 0;
}

.more-list {
  list-style-type: none;
}

.more {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}

.more-list-item {
  line-height: 35px;
  height: 35px;
  padding-left: 15px;
  cursor: pointer;
}

.more-list-item:hover {
  background-color: #eee;
}
</style>
