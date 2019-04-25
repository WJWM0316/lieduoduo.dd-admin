<!--创建公司-->
<template>
  <div class="createCompany">
    <div class="officerInfo">
      <div class="title"><span>招聘官信息</span><div class="editOfficer"><i class="el-icon-edit"></i>编辑</div></div>
      <el-form label-suffix="：">
        <el-form-item label-width="150px" label="担任职务" style="width: 500px">
          <el-input v-model="userInfo.position" placeholder="请输入担任职务" :maxlength="20" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="接收简历邮箱" style="width: 500px">
          <el-input v-model="userInfo.email" placeholder="请输入简历接收邮箱" :maxlength="20" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="公司认证邮箱" style="width: 500px">
          <el-input v-model="userInfo.companyEmail" placeholder="请输入公司邮箱" :maxlength="20" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="招聘官头像" style="width: 500px">
          <img class="avar" v-for="item in userInfo.avatars" :src="item.smallUrl">
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getUserInfoApi } from 'API/recruiter'
@Component({
  name: 'editRecruiter'
})
export default class editRecruiter extends Vue {
  pop = {
    isShow: false,
    type: 'position'
  }
  userInfo = {
    uid: '',
    position: '',
    email: '',
    companyEmail: '',
    avatars: ''
  }
  avatarsList = []
  iconUploader = {
    point: '',
    width: 400,
    height: '',
    tips: '建议尺寸400X400px，JPG、PNG格式，图片小于5M。'
  }

  /* 获取用户信息 */
  async getUserInfo () {
    let res = await getUserInfoApi(this.$route.params.id)
    let userInfo = res.data.data
    this.userInfo = {
      uid: this.$route.params.id,
      position: userInfo.position,
      email: userInfo.email,
      companyEmail: userInfo.companyEmail,
      avatars: userInfo.avatars
    }
  }

  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped="scoped">
.createCompany{
  margin-left: 200px;
  padding: 22px;
  .header{
    padding-right: 20px;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    height: 80px;
    border: 1px solid #CCCCCC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .creatTab{
      height: 100%;
      >div{
        cursor: pointer;
        line-height: 80px;
        border: 1px solid #cccccc;
        width: 100px;
        height: 100%;
        display: inline-block;
        &.active{
          background-color: #652791;
          border: none;
          color: #FFFFFF;
        }
      }
    }
  }
  /*公司信息*/
  .companyInfo,
  .personalInfo,
  .sales{
    padding: 0 32px;
    text-align: left;
    border: 1px solid #CCCCCC;
    .point{
      font-size: 14px;
      color: #FFFFFF;
      background-color: #652791;
      padding: 10px;
      text-align: center;
      margin-bottom: 30px;
      margin-left: -32px;
      margin-right: -32px;
    }
  }
  .sales{
    border-radius: 4px;
    padding: 30px 32px;
    h3{
      font-size: 25px;
      font-weight: 500;
      color: #652791;
    }
  }
  .companyInfo,
  .personalInfo{
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    h3{
      color: #354048;
      font-size: 20px;
      padding-bottom: 16px;
      padding-left: 10px;
      border-bottom: 1px solid #EBEEF5;
      margin-bottom: 32px;
    }
  }
  .addAdress{
    cursor: pointer;
  }
  .AdressList{
    cursor: pointer;
    white-space: nowrap;
    i{
      margin-right: 5px;
      cursor: pointer;
    }
    display: block;
  }
  .email{
    color: #652791;
    cursor: pointer;
  }
  .detection{
    margin-left: 120px;
    margin-bottom: 30px;
  }
  .status{
    font-size: 15px;
    padding-left: 10px;
  }
  .companyMessage {
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    padding: 22px;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    .label{
      margin-right: 10px;
      font-weight: 300;
      color: #909399;
    }
  }
  .officerInfo {
    padding: 22px;
    text-align: left;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    .title {
      border-bottom: 1px solid #cccccc;
      padding-bottom: 10px;
      margin-bottom: 10px;
      >span {
        font-weight: 700;
        font-size: 18px;
      }
      .editOfficer {
        float: right;
        cursor: pointer;
      }
    }
    .avar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
}
</style>