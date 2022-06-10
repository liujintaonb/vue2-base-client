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
          <span class="title-big">森林和草原火灾风险普查数据采集系统</span>
        </div>
        <div class="en-US"></div>
      </div>
    </el-header>
  </div>
</template>
<script>
import { getUserInfoAndJwt } from "./api";
import router, { createDefaultRoutes, resetRouter } from "@/router";
import Storage from "@/common/storage";
import { systemModule } from "./config";
import {
  USER_LEIBIE_GUANLI,
  USER_LEIBIE_HUOYUAN,
  USER_LEIBIE_SYS,
} from "@/common/unit";
export default {
  data() {
    return {
      srcImgUrl: `./img/${process.env.VUE_APP_BG_NAME}`,
    };
  },
  components: {},
  async created() {
    this.login();
  },
  methods: {
    async login() {
      const { uuid } = this.$route.query;
      if (uuid) {
        // 权限在后端验证 不通过不会返回数据
        const resData = await getUserInfoAndJwt({ uuid: uuid });
        console.log("resData");
        console.log(resData);
        if (resData) {
          Storage.set("fjwt", resData.token);
          Storage.set("fuserInfo", resData);
          this.$notify({
            title: "跳转成功",
            type: "success",
            message: "跳转成功",
          });
          setTimeout(() => {
            const { page } = this.$route.query;
            resetRouter();
            if (page) {
              let titleObj = systemModule.filter((i) => {
                return i.name === page;
              });
              this.setRouterPage(resData, page, titleObj[0].title);
            } else {
              //兼容不带page参数
              if (resData.leiBie === USER_LEIBIE_GUANLI) {
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
            }
          }, 1000);
        } else {
          this.$notify({
            title: "跳转失败",
            type: "error",
            message: "跳转失败：未获取到用户信息",
          });
        }
      } else {
        console.log(this.$router);
        this.$router.push("/login");
      }
    },
    setRouterPage(resData, name, title) {
      // 采集
      // public static final String collect="collect";
      // //质检
      // public static final String check="check";
      // //评估与区划系统
      // public static final String evaluation="evaluation";
      // //模型管理系统
      // public static final String model="model";
      // //调度管理系统
      // public static final String dispatch="dispatch";
      // //隐患分析系统
      // public static final String hidden="hidden";
      // //制图管理系统
      // public static final String drawing="drawing";
      // //成果管理系统
      // public static final String achievements="achievements";
      // //集成展示系统
      // public static final String integrate="integrate";
      // //运维管理系统
      // public static final String operations="operations";
      Storage.set("curSystemName", title);
      if (name === "collect") {
        //采集
        if (resData.leiBie === USER_LEIBIE_GUANLI) {
          //管理员
          Storage.set("system", "admin");
        }
        if (resData.leiBie === USER_LEIBIE_HUOYUAN) {
          //野外火源
          Storage.set("system", "ywhy");
        }
        if (resData.leiBie === USER_LEIBIE_SYS) {
          //实验室
          Storage.set("system", "sys");
        }
      }

      if (name === "check") {
        //质检
        if (resData.leiBie === USER_LEIBIE_GUANLI) {
          //管理员
          Storage.set("system", "quality");
        }
      }

      if (name === "model") {
        //模型管理系统
        if (resData.leiBie === USER_LEIBIE_GUANLI) {
          //管理员
          Storage.set("system", "model");
        }
      }

      if (name === "evaluation") {
        //评估子系统
        Storage.set("system", "pinggu");
      }

      if (name === "dispatch") {
        //调度
        Storage.set("system", "diaodu");
      }

      if (name === "operations") {
        //运维
        Storage.set("system", "yunwei");
      }

      //其他系统
      // 结束----
      const defaultRoutes = createDefaultRoutes();
      router.addRoutes(defaultRoutes);
      this.$router.push("/");
    },
  },
  mounted() {},
  destroyed() {},
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
