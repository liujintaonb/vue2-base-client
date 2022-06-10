<template>
  <div class="login-container">
    <div class="select-contain">
      <div class="container-btn">
        <div class="user_btn" @click="logout()">
          <img src="./img/exit.png" alt="exit" />
          <p>{{ userName || "用户" }}</p>
        </div>
      </div>
      <div class="zh-CN">
        <p class="title-big">
          {{ xzTitle }}<span style="font-size: 18px">{{ checkTitle }}</span>
        </p>
      </div>
      <div class="system-area">
        <ul class="main">
          <li
            v-for="system in mainSystem"
            :key="system.name"
            @click="chooseSystem(system.name, system.title)"
          >
            <div :class="system.name">
              <img
                :src="require(`./img/${system.name}.png`)"
                :alt="system.title"
                :title="system.title"
              />
              <p>{{ system.title }}</p>
            </div>
          </li>
        </ul>
        <ul class="second">
          <li
            v-for="system in secondSystem"
            :key="system.name"
            @click="chooseSystem(system.name, system.title)"
          >
            <div :class="system.name">
              <img
                :src="require(`./img/${system.name}.png`)"
                :alt="system.title"
                :title="system.title"
              />
              <p>{{ system.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import router, { createDefaultRoutes, resetRouter } from "@/router";
import { loginOut } from "@/common/util";
import { systemModule } from "./config.js";
import Storage from "@/common/storage";
import { hasSystemAccess } from "@/setting";

export default {
  data() {
    return {
      xzTitle: process.env.VUE_APP_TITLE,
      checkTitle: process.env.VUE_APP_CHECK,
      userName: "",
      selectedData: "0",
      systemModule,
      userInfo: null,
    };
  },
  computed: {
    mainSystem() {
      return systemModule.filter((system) => system.type === "main");
    },
    secondSystem() {
      return systemModule.filter((system) => system.type === "second");
    },
  },
  mounted() {
    this.userInfo = Storage.get("fuserInfo");
    this.userName = this.userInfo.realName || this.userInfo.userName;
  },
  methods: {
    logout() {
      loginOut();
    },
    chooseSystem(name, title) {
      console.log("name", name, title);
      if (name === "yinhuan" || name === "pinggu") {
        const type = this.userInfo.type;
        const processType = process.env.VUE_APP_BASE_P_TYPE;
        if (!processType.includes(type) || this.userInfo.commissId) {
          this.$notify({
            title: "提示",
            type: "error",
            message: "当前用户无权限",
          });
          return false;
        }
      }

      Storage.set(
        "canEvaluate",
        this.userInfo.type == 0 || this.userInfo.type == 1
      );

      const isHasAccess = hasSystemAccess(this.userInfo.leiBie, name);
      if (
        isHasAccess &&
        (name === "caiji" ||
          name === "zhijian" ||
          name === "yunwei" ||
          name === "diaodu" ||
          name === "yinhuan" ||
          //开放时候解注 所有管理员可以进入评估系统
          name === "pinggu" ||
          name === "moxing")
      ) {
        Storage.set("curSystemName", title);
        resetRouter();
        if (name === "caiji") {
          Storage.set("system", "admin");
        } else if (name === "zhijian") {
          Storage.set("system", "quality");
        } else if (name === "moxing") {
          const xzCode = Storage.get("fuserInfo").xzCode || "";
          if (xzCode.length > 2) {
            this.$notify({
              title: "提示",
              type: "error",
              message: "当前用户暂无权限",
            });
            return false;
          }
          Storage.set("system", "model");
        } else if (name === "yunwei") {
          Storage.set("system", "yunwei");
        } else if (name === "yinhuan") {
          Storage.set("system", "yinhuan");
        } else if (name === "diaodu") {
          Storage.set("system", "diaodu");
        } else if (name === "pinggu") {
          Storage.set("system", "pinggu");
          const defaultRoutes = createDefaultRoutes();
          router.addRoutes(defaultRoutes);
          this.$router.push("/");
          return;
        }
        const defaultRoutes = createDefaultRoutes();
        router.addRoutes(defaultRoutes);
        this.$router.push("/");
      } else {
        this.$notify({
          title: "提示",
          type: "error",
          message: "当前系统暂未开放",
        });
        return false;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.login-container {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0; // 这里是设置与顶部的距离
  left: 0; // 这里是设置与左边的距离
  background-image: url('./img/bg.png');
  background-size: cover;
  overflow: auto;
  color: #fff;

  .select-contain {
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;

    .container-btn {
      display: flex;
      justify-content: flex-end;

      .user_btn {
        display: flex;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 16px;
        align-items: center;
        background-color: #167883;
        margin-right: 20px;

        .icon {
          font-size: 18px;
          font-weight: bold;
          margin-right: 8px;
        }

        img {
          margin-right: 8px;
          height: 18px;
        }
      }
    }

    .system-area {
      width: 1100px;
      margin: 0 auto;

      ul {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        li {
          cursor: pointer;
          list-style: none;

          >div {
            height: 100%;
            text-align: center;
            position: relative;
          }

          img {
            width: 30%;
          }

          p {
            width: 100%;
            position: absolute;
            bottom: 20px;
            font-size: 20px;
          }

          .caiji {
            background-color: #0d8772;
          }

          .zhijian {
            background-color: #CB954B;
          }

          .pinggu {
            background-color: #1062CE;
          }

          .moxing {
            background-color: #136AAF;
          }

          .diaodu {
            background-color: #509920;
          }

          .yinhuan {
            background-color: #B9705F;
          }

          .zhitu {
            background-color: #458B73;
          }

          .chengguo {
            background-color: #7AAF5D;
          }

          .jicheng {
            background-color: #BAB825;
          }

          .yunwei {
            background-color: #BAB825;
          }
        }
      }

      ul.main li {
        display: block;
        min-height: 280px;
        width: 32.2%;

        img {
          margin-top: 80px;
        }
      }

      ul.second li {
        display: block;
        height: 200px;
        width: 19.2%;

        img {
          margin-top: 50px;
        }
      }
    }
  }
}

.title {
  text-align: left;
}

.zh-CN {
  padding: 90px 0 40px 0;
  letter-spacing: 4px;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
  font-family: 'Microsoft YaHei UI';
}

.title-big {
  font-size: 32px;
  text-shadow: 4px 2px 3px #2b2b2b;
}
</style>
