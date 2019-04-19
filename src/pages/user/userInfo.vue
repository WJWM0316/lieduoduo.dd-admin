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
          <!-- <el-input v-model="phone.mobile" placeholder="请输入手机号码" :maxlength="11" style="width: 250px;"></el-input> -->
        </el-form-item>
      </el-form>

      <el-form class="edit-form" ref="personalInfo" :model="personalInfo" label-width="150px" label-suffix="：">
        <h3>个人信息</h3>
        <el-form-item label="姓名" prop="name">
          <span>{{personalInfo.name}}</span>
          <!-- <el-input v-model="personalInfo.name" placeholder="请输入姓名" :maxlength="20" style="width: 215px;"></el-input> -->
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <span v-if="personalInfo.gender === 1">男</span>
          <span v-else>女</span>
          <!-- <el-select class="selectState" v-model="personalInfo.gender" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select> -->
        </el-form-item>
        
        <h3>身份信息
          <span class="status" v-show="personalInfo.identityAuth === 1"><i class="el-icon-success" style="color: #67C23A;"></i> 验证通过</span>
          <span class="status" v-show="personalInfo.identityAuth === 0"><i class="el-icon-error" style="color: #F56C6C;"></i> 验证失败</span>
        </h3>
        <el-form-item label="真实姓名" prop="realname">
          <span>{{personalInfo.realname}}</span>
          <!-- <el-input v-model="personalInfo.realname" placeholder="请输入真实姓名" :maxlength="20" style="width: 400px;"></el-input> -->
        </el-form-item>
        
        <el-form-item label="身份证号码" prop="idNum">
          <span>{{personalInfo.idNum}}</span>
          <!-- <el-input v-model="personalInfo.idNum" placeholder="请输入身份证号码" :maxlength="18" style="width: 400px;"></el-input> -->
        </el-form-item>
        
        <!--身份证正面-->
        <el-form-item class="full" label="身份证正面" prop="icon">
          <img class="frontImg" :src="personalInfo.passportFront" alt="">
          <!-- <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          :tips="iconUploader.tips"
                          type="front"
                          v-model="form.icon3"
                          @loaded="handleIconLoaded"/> -->
        </el-form-item>
        <!-- <el-button class="detection" type="danger" round @click.stop="detectionInfo">提交校验身份证信息</el-button> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageUploader from '@/components/imageUploader'
import { fieldApi, uploadIdcardApi } from 'API/commont'
import { detectionMobileApi, checkUserauthApi, createdUserApi, getUserInfoApi } from 'API/recruiter'
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
    // .el-steps{
    //   text-align: left;
    //   width: 500px;
    // }
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
}
</style>