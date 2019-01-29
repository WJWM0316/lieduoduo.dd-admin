<template>
  <div id="login">
    <div class="box">
      <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label-width="0px">
          <h2>登录</h2>
        </el-form-item>
        <el-form-item label="账号" prop="email">
          <el-input type="text" v-model="loginForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button type="primary" @click.stop="login">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { loginApi } from 'API/commont'
import { saveAccessToken } from 'API/cacheService'
@Component({
  name: 'login'
})
export default class login extends Vue{
  loginForm = {
    email: '',
    password: ''
  }
  login () {
    loginApi(this.loginForm).then(res => {
      console.log(res.data.data.adminToken, '登录')
      saveAccessToken(res.data.data.adminToken)
      this.$message({
        message: '登录成功',
        type: 'success'
      })
      this.$router.push({
        path: '/companyCheck'
      })
    }).catch(err => {
      this.$message.error(`${err.data.msg}`);
    })
  }
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
}
</script>

<style lang="less" scoped="scoped">
#login{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #FFFFFF;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .box{
    border: 1px solid #666666;
    border-radius: 10px;
    width: 500px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>