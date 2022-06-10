<template>
  <div id="app">
    <el-container>
      <el-header class="not-print">
        <!-- <el-header class="not-print" style="display: none"> -->
        <div class="title">
          <div class="left">
            <img src="./../../assets/logo.png" alt="" />
          </div>
          <div class="right" v-if="reloadVisible">
            <div class="zh-CN">
              {{ curSystemName
              }}<span class="check-title">{{ checkTitle }}</span>
            </div>
            <div class="en-US"></div>
            <div
              class="ping-gu-danwei"
              v-if="system === 'pinggu' || system === 'yinhuan'"
            >
              <dan-wei
                v-if="system === 'pinggu' || system === 'yinhuan'"
                :prop="{ level: 3 }"
                @change="pingGuDanWeiChange"
              ></dan-wei>
            </div>
          </div>
        </div>
        <div>
          <span>欢迎您，{{ userName }}</span>
          <span style="padding: 0 10px"
            >今天是：{{ getTime() }} 星期{{
              "日一二三四五六".charAt(new Date().getDay())
            }}</span
          >
          <span class="partition-icon">|</span>
          <el-popover
            placement="bottom-start"
            popper-class="popover-class"
            width="100"
            trigger="manual"
            v-model="popoverVisible"
          >
            <div
              slot="reference"
              class="more"
              @click="popoverVisible = !popoverVisible"
            >
              更多
            </div>
            <div class="more-list" @click="popoverVisible = !popoverVisible">
              <div class="more-list-item" @click="openUpdatePassword">
                修改密码
              </div>
              <div @click="loginOut" class="more-list-item">退出登录</div>
              <div @click="downloadDoc" class="more-list-item">说明文档</div>
              <div @click="updateLog" class="more-list-item">更新日志</div>
              <div @click="downloadApk" class="more-list-item">
                安卓平板客户端
              </div>
              <div @click="erWeiMa" class="more-list-item">二维码扫描下载</div>
              <div v-if="userInfo && hasSystemPage(userInfo.leiBie)">
                <el-divider></el-divider>
                <div @click="changeSystem()" class="more-list-item" divided>
                  切换系统
                </div>
              </div>
            </div>
          </el-popover>
          <!-- <span class="login-btn"  @click="loginOut">退出</span> -->
        </div>
      </el-header>
      <el-container v-if="reloadVisible" :style="asideStyle">
        <el-aside :style="asideStyle" :width="asideWidth" class="not-print">
          <side-bar :meuns="filterMenus" @actionMeuns="handleFold" />
        </el-aside>
        <el-main id="main">
          <page-wrapper></page-wrapper>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="二维码扫描下载"
      :visible.sync="erWerMashow"
      width="400px"
    >
      <div style="width: 200px; height: 200px; margin: 0 auto">
        <div id="erWeiMa" v-if="erWerMashow"></div>
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="修改密码"
      :visible.sync="updatePasswordVis"
      width="500px"
      @close="closeVis"
    >
      <el-form
        class="new-form"
        ref="userNewForm"
        :model="userNewData"
        :rules="userNewRules"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="登录名">
          <el-input v-model="userNewData.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="password">
          <el-input
            v-model.trim="userNewData.password"
            type="password"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model.trim="userNewData.newPassword"
            type="password"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeVis" size="small">取 消</el-button>
        <el-button type="primary" @click="setPassword" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTime, loginOut, checkLogin } from "@/common/util";
import Storage from "@/common/storage";
import { USER_LEIBIE_GUANLI, USER_LEIBIE_WYHC } from "@/common/unit";
import PageWrapper from "@/components/common/pageWrapper/index";
import checkMeunPermission from "@/common/permission";
import QRCode from "qrcodejs2";
import danWei from "@/components/common/danwei/danWeiPg";
import SideBar from "./SideBar";
import { updatePassword } from "@/common/baseApi/userApi";
import { hasSystemPage } from "@/setting";
import menus from "@/router/router-config";
import yunweiMenuRouter from "@/router/router-yunwei";
export default {
  name: "Layout",
  components: { PageWrapper, danWei, SideBar },
  data() {
    return {
      checkTitle: process.env.VUE_APP_CHECK,
      system: "",
      popoverVisible: false,
      reloadVisible: true,
      curSystemName: "森林和草原火灾风险普查",
      USER_LEIBIE_GUANLI,
      USER_LEIBIE_WYHC,
      userInfo: {},
      systemInfo: "",
      filterMenus: [],
      // loginOut,
      // getTime: getTime(),
      asideHeaderIcon: "el-icon-back",
      asideWidth: "250px",
      asideStyle: {
        height: `${self.innerHeight - 60}px`,
        "border-right": "1px solid rgba(0,0,0,0.05)",
        transition: "all .5s",
      },
      erWerMashow: false,
      cjDocDowloadUrl: process.env.VUE_APP_CJ_DOC_URL,
      zjDocDowloadUrl: process.env.VUE_APP_ZJ_DOC_URL,
      updateLogUrl: process.env.VUE_APP_UPDATE_LOG_URL,
      apkDowloadUrl: process.env.VUE_APP_APK_URL,
      erWeiMaUrl: process.env.VUE_APP_ERWEIMA_URL,
      pgDocDowloadUrl: process.env.VUE_APP_PINGGU_URL,
      yhDocDowloadUrl: process.env.VUE_APP_YINHUAN_URL,
      updatePasswordVis: false,
      userNewData: {
        userName: "",
        password: "",
        newPassword: "",
      },
      userNewRules: {
        password: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.system = Storage.get("system");
    console.log("this.system");
    console.log(this.system);
  },
  computed: {
    userName: function () {
      return this.userInfo.realName;
    },
  },
  watch: {
    $route: {
      handler: function (val, oldValue) {
        if (val.path === "/experiment/standard" && oldValue.path === "/login") {
          window.location.reload();
        }
        if (val.path === "/firesource/ywhydcdw" && oldValue.path === "/login") {
          window.location.reload();
        }
        /**
         * 此处是判断系统切换时的路由变化
         */
        if (
          (val.path === "/progress-query/detail" ||
            val.path === "/progress-audit/yd") &&
          (oldValue.path === "/system" || oldValue.path === "/login")
        ) {
          // 重加载前不显示左边导航栏
          this.reloadVisible = false;
          window.location.reload();
        }
      },
      deep: true,
    },
  },
  async mounted() {
    this.getFilterMenus();
    this.curSystemName =
      `${process.env.VUE_APP_TITLE}` + Storage.get("curSystemName");
  },
  methods: {
    getTime,
    loginOut,
    hasSystemPage,
    pingGuDanWeiChange(value) {
      this.$root.pingGuXzCodeObj = value;
      this.$root.$emit("getPingGuXzCode", value);
    },
    downloadDoc() {
      let sys = Storage.get("system");
      console.log(sys);
      let url = "";
      switch (sys) {
        case "quality":
          url = this.zjDocDowloadUrl;
          break;
        case "admin":
        case "sys":
        case "ywhy":
          url = this.cjDocDowloadUrl;
          break;
        case "pinggu":
          url = this.pgDocDowloadUrl;
          break;
        case "yinhuan":
          url = this.yhDocDowloadUrl;
          break;
        default:
          url = "";
      }
      if (url) {
        window.open(url);
      } else {
        this.$notify({
          title: "提示",
          message: "暂无说明文档",
          type: "warning",
        });
      }
    },
    updateLog() {
      let system = Storage.get("system");
      if (system === "yinhuan" || system === "pinggu") {
        window.open("https://shimo.im/docs/7WeuD2nsQJQ2cR3b");
        return;
      }
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
    changeSystem(systemData) {
      // resetRouter();
      // Storage.set("system", systemData);
      // const defaultRoutes = createDefaultRoutes();
      // console.log(defaultRoutes);
      // router.addRoutes(defaultRoutes);
      // this.$router.push("/");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
      Storage.set("curSystemName", "");
      this.$router.push("/system");
    },
    handleFold(asideWidth, isCollapse) {
      console.log(1, asideWidth, isCollapse);
      this.asideWidth = asideWidth;
    },
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    getFilterMenus() {
      const meunsList = [...menus, ...yunweiMenuRouter];
      this.filterMenus = meunsList;
    },
    openUpdatePassword() {
      const userInfo = Storage.get("fuserInfo");
      this.updatePasswordVis = true;
      this.userNewData.userName = userInfo.userName;
    },
    /**
     * 修改密码
     **/
    setPassword() {
      const _this = this;
      _this.$refs.userNewForm.validate((valid) => {
        if (valid) {
          updatePassword({
            password: this.userNewData.password,
            newPassword: this.userNewData.newPassword,
          }).then((data) => {
            if (data) {
              this.$notify({
                title: "操作成功",
                type: "success",
                message: "密码修改成功，请重新登录！",
              });
              this.closeVis();
              this.loginOut();
            }
          });
        }
      });
    },
    /**
     * 关闭弹窗
     **/
    closeVis() {
      this.$refs.userNewForm.resetFields();
      this.updatePasswordVis = false;
    },
  },
};
</script>
<style lang="stylus">
.group-title {
  font-size: 14px;
  color: #666;
  padding-left: 10px;
  border-left: 4px solid #88b780;
  padding-right: 10px;
  margin-bottom: 15px;
  line-height: 20px;
  overflow: hidden;
}

.con-xz {
  background-color: #fafafa;

  .el-tree-node {
    background-color: #fafafa;
  }
}
</style>

<style lang="stylus" scoped>
.el-form-item__label {
  padding-right: 20px !important;
}

.el-header {
  background-color: #3FB3BA;
  text-align: right;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.title {
  text-align: left;
  display: flex;
}

.left {
  margin-right: 8px;
}

.zh-CN {
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
  line-height: 52px;
}

.en-US {
  display: inline-block;
  font-size: 12px;
}

.ping-gu-danwei {
  padding-left: 10px;
  display: inline-block;
}

.el-icon-setting {
  margin-right: 15px;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  color: #333;
  background-color: #fafafa;
}

.partition-icon {
  padding: 0 20px;
}

.table {
  border-collapse: collapse;
}

.login-btn {
  padding: 0 6px;
  cursor: pointer;
}

.today {
  padding-right: 6px;
}

.more-list {
  list-style-type: none;
}

.more {
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
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

.el-divider--horizontal {
  margin: 8px 0;
}
</style>
