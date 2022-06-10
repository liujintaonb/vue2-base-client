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
        <div class="form-left" style="margin-left: 42px">
          <img src="../../assets/logo_big.png" alt />
        </div>
        <div class="form-right">
          <el-form
            ref="loginRef"
            :model="zhangHaoForm"
            :rules="zhangHaorules"
            :hide-required-asterisk="true"
            label-width="80px"
          >
            <el-form-item label="登录名：" prop="dengLuMc">
              <el-input
                class="form-width"
                type="input"
                placeholder="请输入登录名"
                v-model="zhangHaoForm.dengLuMc"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="dengLuMm">
              <el-input
                class="form-width"
                placeholder="请输入密码"
                v-model="zhangHaoForm.dengLuMm"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="code">
              <div style="display: flex">
                <el-input
                  style="width: 200px"
                  placeholder="请输入验证码"
                  v-model="zhangHaoForm.code"
                ></el-input>
                <img
                  :src="imgdata"
                  alt="验证码"
                  @click="refreshCaptcha"
                  class="verification-code"
                />
              </div>
            </el-form-item>

            <div class="ml80">
              <div>
                <el-button
                  class="form-width form-btn"
                  type="primary"
                  @click="login()"
                  >登 录</el-button
                >
              </div>
              <div class="pt10">
                <el-button
                  class="form-width form-btn"
                  type="primary"
                  @click.stop="handleRegister"
                  >注 册</el-button
                >
              </div>
            </div>
          </el-form>
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
  </div>
</template>
<script>
import { toLogin } from "./api";
import router, { createDefaultRoutes, resetRouter } from "@/router";
import QRCode from "qrcodejs2";
import Storage from "@/common/storage";
import axios from "axios";
import { USER_LEIBIE_HUOYUAN, USER_LEIBIE_SYS } from "@/common/unit";
import { setCurrentXzcode } from "@/common/util";
import { hasSystemPage } from "@/setting";
const bcryptjs = require("bcryptjs");
export default {
  data() {
    return {
      xzTitle: process.env.VUE_APP_TITLE,
      checkTitle: process.env.VUE_APP_CHECK,
      srcImgUrl: `./img/${process.env.VUE_APP_BG_NAME}`,
      imgdata: "",
      imgid: "",
      zhangHaoForm: {
        dengLuMc: "",
        dengLuMm: "",
        code: "",
      },
      cjDocDowloadUrl: process.env.VUE_APP_CJ_DOC_URL,
      zjDocDowloadUrl: process.env.VUE_APP_ZJ_DOC_URL,
      apkDowloadUrl: process.env.VUE_APP_APK_URL,
      updateLogUrl: process.env.VUE_APP_UPDATE_LOG_URL,
      erWeiMaUrl: process.env.VUE_APP_ERWEIMA_URL,
      erWerMashow: false,
      zhangHaorules: {
        dengLuMc: [
          {
            required: true,
            message: "请输入登录名",
            trigger: "blur",
          },
        ],
        dengLuMm: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  created() {
    this.refreshCaptcha();
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
    async login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (valid) {
          let loginData = {};
          loginData = {
            userName: this.zhangHaoForm.dengLuMc,
            password: bcryptjs.hashSync(this.zhangHaoForm.dengLuMm),
            code: this.zhangHaoForm.code,
          };
          // 目前没有验证码
          let resData = await toLogin(loginData, this.imgid);
          if (!resData) {
            this.refreshCaptcha();
            return;
          }
          Storage.set("fjwt", resData.token);
          Storage.set("fuserInfo", resData);
          setCurrentXzcode();
          setTimeout(() => {
            resetRouter();
            if (hasSystemPage(resData.leiBie)) {
              this.$router.push("/system");
            } else {
              if (resData.leiBie === USER_LEIBIE_HUOYUAN) {
                Storage.set("system", "ywhy");
              }
              if (resData.leiBie === USER_LEIBIE_SYS) {
                Storage.set("system", "sys");
              }
              const defaultRoutes = createDefaultRoutes();
              router.addRoutes(defaultRoutes);
              this.$router.push("/");
            }
          }, 500);
          if (resData.notices) {
            setTimeout(() => {
              this.$alert(
                `<p style="font-size: 14px;font-weight: bold;">${resData.notices}</p>`,
                "公告",
                {
                  dangerouslyUseHTMLString: true,
                }
              );
            }, 1500);
          }
        }
      });
    },
    handleRegister() {
      this.$router.push("/register");
    },
    async refreshCaptcha() {
      let dataUrl = `${
        process.env.VUE_APP_BASE_API
      }/public/api/v1/login?${Math.random()}`;
      axios
        .get(dataUrl, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          this.imgid = res.headers.imgid;
          return (
            "data:image/jpeg;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then((data) => {
          this.imgdata = data;
        })
        .catch((ex) => {
          console.error(ex);
        });
    },
    keyHandler(e) {
      if (e.keyCode === 13) {
        this.login();
      }
    },
  },
  mounted() {
    document.addEventListener("keyup", this.keyHandler, false);
  },
  destroyed() {
    document.removeEventListener("keyup", this.keyHandler, false);
  },
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
  height: 340px;
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
  margin-top: 8%;
  width: 700px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  background-image: url('../../assets/bg_form.png');
  background-size: 700px 400px;
}

.form-left {
  width: 240px;
  form-left: 12px;
  text-align: center;
}

.form-right {
  width: 422px;
  text-align: left;
  flex: 1;
}

.left-logo {
  width: 220px;
  height: 220px;
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
