<template>
  <div id="login" @keyup.enter="login">
    <div class="title">
      <img src="../../assets/logintitle.png">
      <div class="info">机会多，面试多</div>
    </div>
    <div class="box">
      <el-form
        :model="loginForm"
        status-icon
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label-width="0px">
          <h2>猎多多业务后台登录</h2>
        </el-form-item>
        <div class="inpBox">
          <i slot="prefix" class="icon iconfont iconicon_account"></i>
          <input class="inp" placeholder="请输入登录账号" type="tel" v-model="loginForm.email">
        </div>
        <div class="inpBox">
          <i slot="prefix" class="icon iconfont iconicon_password"></i>
          <input class="inp" placeholder="请输入登录密码" type="password" v-model="loginForm.password">
        </div>
        <el-form-item label-width="0px">
          <el-button
            class="longinBtn"
            style="background-color: #652791; color: #FFFFFF;"
            @click.stop="login"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { loginApi } from "API/commont";
import { saveAccessToken } from "API/cacheService";
@Component({
  name: "login"
})
export default class login extends Vue {
  loginForm = {
    email: "",
    password: ""
  };
  login() {
    loginApi(this.loginForm)
      .then(res => {
        let { groupId, isAdmin, isGroupAdmin } = res.data.data;
        sessionStorage.setItem("email", this.loginForm.email);
        sessionStorage.setItem("avar", res.data.data.avatarInfo.smallUrl);
        sessionStorage.setItem("name", res.data.data.realname);
        saveAccessToken(res.data.data.adminToken);
        let AdminShow= this.judge(groupId, isAdmin, isGroupAdmin, res.data.data);
        sessionStorage.setItem("AdminShow", AdminShow);
        this.$store.dispatch("update_userinfo", {
          userinfo:res.data.data
        });
        this.$message({
          message: "登录成功",
          type: "success"
        });
        this.$router.push({
          path: "/index"
        });
      })
      .catch(err => {
        this.$message.error(`用户账号或密码错误`);
      });
  }
  // 等级,身份
  judge(groupId, isAdmin, isGroupAdmin, userinfo) {
    let AdminShow;
    if (isAdmin) {
      console.log("超管");
      AdminShow=0
    } else if (isGroupAdmin && groupId === 2) {
      console.log("客服组长");
      AdminShow=1
    } else if (!isGroupAdmin && groupId === 2) {
      console.log("客服组员");
      AdminShow=2
    } else if (!isGroupAdmin && groupId >= 3) {
      console.log("商务组员");
      AdminShow=3
    } else if (isGroupAdmin && groupId>=3) {
      console.log("商务组长");
      AdminShow=4
    }
    return AdminShow
  }
  resetForm(formName) {
    this.$refs[formName].resetFields();
    this.loginForm.email = "";
  }
  created() {
    const email = sessionStorage.getItem("email") || "";
    if (email) {
      this.loginForm.email = email;
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import "../../style/iconfont.less";
#login {
  background: url(../../assets/loginbg.png);
  background-color: #fbfbff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    img {
      width: 160px;
      height: 58px;
    }
    .info {
      font-weight: 400;
      color: #652791;
      line-height: 33px;
      font-size: 24px;
      margin-top: 14px;
      margin-bottom: 66px;
    }
  }
  .box {
    h2 {
      color: #354048;
      font-size: 20px;
      font-weight: 500;
    }
    .el-form {
      width: 100%;
    }
    padding: 0 95px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    width: 590px;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    .inpBox {
      position: relative;
      width: 100%;
      height: 52px;
      border: 1px solid #000000;
      box-sizing: border-box;
      margin-bottom: 16px;
      border-radius: 4px;
      border: 1px solid rgba(220, 220, 220, 1);
      .inp {
        font-size: 16px;
        width: 100%;
        height: 52px;
        padding: 19px 40px;
        box-sizing: border-box;
        display: inline-block;
        background-color: transparent;
      }
      i {
        position: absolute;
        top: 18px;
        left: 18px;
        color: #929292;
      }
    }
    .longinBtn {
      border: none;
      font-size: 16px;
      height: 52px;
      margin-top: 24px;
      width: 100%;
      box-shadow: 0px 8px 12px 0px rgba(48, 50, 51, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>