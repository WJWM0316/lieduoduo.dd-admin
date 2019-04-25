<!--创建公司-->
<template>
<div class="createCompany">
    <div class="header">
      <div class="creatTab" @click.stop="tab">
        <div class="userInfo active">基本信息</div>
      </div>
        <el-button @click.stop="toEdit">编辑</el-button>
    </div>
    <!--身份信息表格-->
    <div class="personalInfo">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
      <el-form class="edit-form" ref="mobile" :model="phone" label-width="150px" label-suffix="：">
        <h3>账号信息</h3>
        <el-form-item label="手机号码" prop="mobile">
          <span>{{phone.mobile}}</span>
        </el-form-item>
      </el-form>

      <el-form class="edit-form" ref="personalInfo" :model="personalInfo" label-width="150px" label-suffix="：">
        <h3>个人信息</h3>
        <el-form-item label="姓名" prop="name">
          <span>{{personalInfo.name}}</span>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <span v-if="personalInfo.gender === 1">男</span>
          <span v-else>女</span>
        </el-form-item>
        
        <h3>身份信息
          <span class="status" v-show="personalInfo.identityAuth === 1"><i class="el-icon-success" style="color: #67C23A;"></i> 验证通过</span>
          <span class="status" v-show="personalInfo.identityAuth === 0"><i class="el-icon-error" style="color: #F56C6C;"></i> 验证失败</span>
        </h3>
        <el-form-item label="真实姓名" prop="realname">
          <span>{{personalInfo.realname}}</span>
        </el-form-item>
        
        <el-form-item label="身份证号码" prop="idNum">
          <span>{{personalInfo.idNum}}</span>
        </el-form-item>
        
        <!--身份证正面-->
        <el-form-item class="full" label="身份证正面" prop="icon">
          <img class="frontImg" :src="personalInfo.passportFront" alt="">
        </el-form-item>
      </el-form>
    </div>
    <div class="companyMessage" v-if="userInfo.companyId">
      <div>所属公司</div>
      <div class="companyName" v-show="companyInfo"><span class="label">公司全称</span><div>{{companyInfo.companyName}}</div></div>
      <div class="companyName" v-show="companyInfo"><span class="label">身份类型</span><div>{{companyInfo.isAdmin === 1? '管理员' : '招聘官'}}</div></div>
      <div class="companyName" v-show="companyInfo"><span class="label">是否可以发布职位</span>
        <el-switch
          v-model="createPositionRight"
          @change="changeRight">
        </el-switch>
      </div>
      <!-- <div class="companyName" v-show="companyInfo">移出公司</div> -->
    </div>
    <div class="companyMessage" v-else>
      <div>所属公司</div>
      <!-- <div class="companyName">绑定公司</div> -->
    </div>
    <div class="officerInfo" v-if="userInfo.companyId">
      <div class="title"><span>招聘官信息</span><div class="editOfficer" v-if="false"><i class="el-icon-edit" @click.stop="toEditRecruiter"></i>编辑</div></div>
      <el-form label-suffix="：">
        <el-form-item label-width="150px" label="担任职务" style="width: 500px">
          {{userInfo.position}}
        </el-form-item>
        <el-form-item label-width="150px" label="接收简历邮箱" style="width: 500px">
          {{userInfo.email}}
        </el-form-item>
        <el-form-item label-width="150px" label="公司认证邮箱" style="width: 500px">
          {{userInfo.companyEmail}}
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
import ImageUploader from '@/components/imageUploader'
import { fieldApi, uploadIdcardApi } from 'API/commont'
import { detectionMobileApi, checkUserauthApi, createdUserApi, getUserInfoApi, onCreatedRightApi, offCreatedRightApi } from 'API/recruiter'
import { setCompanyInfoApi, setIdentityInfoApi, addCompanyAddressApi, delCompanyAddressApi } from 'API/company'
@Component({
  name: 'addUser',
  components: {
    ImageUploader
  }
})
export default class addUser extends Vue {
  pop = {
    isShow: false,
    type: 'position'
  }
  userInfo = '' // 请求回来的所有用户信息
  createPositionRight = false // 是否有职位发布权限
  isDetection = false // 是否已校验身份证信息
  /* 身份证信息对象 */
  iDCard = {}
  /* 手机号码 */
  phone = {
    mobile: ''
  }
  /* 身份信息 */
  personalInfo = {
    name: '', // 姓名
    gender: '',
    realname : '', // 真实姓名
    idNum : '', // 身份证号码
    passportFront : '', // 身份证正面照片
  }
  companyInfo = {}
  iconUploader = {
    point: '',
    width: 400,
    height: '',
    tips: '建议尺寸400X400px，JPG、PNG格式，图片小于5M。'
  }
  form = {
    icon3: '', // 身份证正面
  }
  /* 去编辑用户信息 */
  toEdit () {
    this.$router.push({path: `/user/editUser/${this.$route.params.id}`})
  }

  /* 获取用户信息 */
  async getUserInfo () {
    let res = await getUserInfoApi(this.$route.params.id)
    let userInfo = res.data.data
    this.userInfo = userInfo
    this.companyInfo = userInfo.companyInfo
    this.createPositionRight = userInfo.createPositionRight
    this.phone = {
      mobile: userInfo.mobile
    }
    /* 身份信息 */
    this.personalInfo = {
      name: userInfo.name, // 姓名
      gender: userInfo.gender,
      realname : userInfo.realname || '', // 真实姓名
      idNum : userInfo.identityNum || '', // 身份证号码
      passportFront : userInfo.passportFront ? userInfo.passportFront.middleUrl : '', // 身份证正面照片
      identityAuth: userInfo.identityAuth
    }
  }
  /* 改变招聘官发布职位权限 */
  changeRight () {
    if (!this.createPositionRight) {
      // 关闭
      offCreatedRightApi(this.$route.params.id).then(res => {
        this.$message({type: 'warning', message: '关闭发布权限成功'})
      }).catch(res => {
        this.createPositionRight = true
      })
    } else {
      // 开启
      onCreatedRightApi(this.$route.params.id).then(res => {
        this.$message({type: 'success', message: '开启发布权限成功'})
      }).catch(res => {
        this.createPositionRight = false
      })
    }
    console.log(this.createPositionRight)
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