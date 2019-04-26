<!--创建公司-->
<template>
<div class="createCompany">
    <div class="header">
      <div class="creatTab" @click.stop="tab">
        <div class="userInfo active">基本信息</div>
      </div>
        <el-button @click.stop="saveUser" v-if="!isEdit">保存并通过</el-button>
        <el-button @click.stop="saveUser" v-else>保存编辑</el-button>
    </div>
    <!--身份信息表格-->
    <div class="personalInfo">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
      <el-form class="edit-form" ref="mobile" :rules="mobile" :model="phone" label-width="150px" label-suffix="：">
        <h3>账号信息</h3>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="phone.mobile" placeholder="请输入手机号码" :maxlength="11" style="width: 250px;" v-if="!isEdit"></el-input>
          <el-input v-model="phone.mobile" disabled placeholder="请输入手机号码" :maxlength="11" style="width: 250px;"v-else></el-input>
        </el-form-item>
      </el-form>

      <el-form class="edit-form" ref="personalInfo" :rules="personalInfoRules" :model="personalInfo" label-width="150px" label-suffix="：">
        <h3>个人信息</h3>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="personalInfo.name" placeholder="请输入姓名" :maxlength="20" style="width: 215px;"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select class="selectState" v-model="personalInfo.gender" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        
        <h3>身份信息</h3>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="personalInfo.realname" placeholder="请输入真实姓名" :maxlength="20" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="身份证号码" prop="idNum">
          <el-input v-model="personalInfo.idNum" placeholder="请输入身份证号码" :maxlength="18" style="width: 400px;"></el-input>
        </el-form-item>
        
        <!--身份证正面-->
        <el-form-item class="full" label="身份证正面" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          :tips="iconUploader.tips"
                          type="front"
                          v-model="form.icon3"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
        <el-button class="detection" type="danger" round @click.stop="detectionInfo">提交校验身份证信息</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageUploader from '@/components/imageUploader'
import { fieldApi, uploadIdcardApi } from 'API/commont'
import { detectionMobileApi, checkUserauthApi, createdUserApi, getUserInfoApi, editUserauthApi, editUserApi } from 'API/recruiter'
import { setCompanyInfoApi, setIdentityInfoApi, addCompanyAddressApi, delCompanyAddressApi } from 'API/company'
@Component({
  name: 'addUser',
  components: {
    ImageUploader
  }
})
export default class addUser extends Vue {
  isEdit = false // 是否编辑用户，默认为创建用户
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
  /* 自定义校验手机规则 */
  phoneRule = (rule, value, callback) => {
    detectionMobileApi({mobile: this.phone.mobile}).then(res => {
      if (res.data.data.isExisted) {
        callback(new Error('号码已经被注册'))
      } else {
        callback()
      }
    })
  }
  // 校验手机
  mobile = {
    mobile: [
      { required: true, message: '请输入正确的手机号码', trigger: 'blur', min: 11, max: 11 },
      { validator: this.phoneRule, trigger: 'blur' }
    ]
  }
  // 身份信息表单验证
  personalInfoRules = {
    name: [
      { required: true, message: '请输入姓名，要求2-20个字',trigger: 'blur', max: 20,min: 2 }, 
    ],
    gender: [
      { required: true, message: '请选择性别', trigger: 'blur' }
    ]
  }
  /* 调用创建或编辑 */
  editOrCreat (userInfo) {
    if (this.isEdit) {
      const uid = this.$route.params.id
      return editUserApi(uid, userInfo)
    } else {
      return createdUserApi(userInfo)
    }
  }
  /* 创建或编辑用户 */
  saveUser () {
    let newUser = {}
    if (this.isDetection) {
      newUser = Object.assign({}, this.personalInfo, this.phone)
    } else {
      let param = {
        name: this.personalInfo.name,
        gender: this.personalInfo.gender,
      }
      newUser = Object.assign({}, param, this.phone)
    }
    console.log(newUser)
    this.$refs['personalInfo'].validate(async (valid) => {
      if (valid) {
        this.editOrCreat(newUser).then(res => {
          this.$message({
            message: this.isEdit? '编辑成功' : '用户创建成功',
            type: 'success'
          })
          this.isEdit? this.$router.go(-1) : this.$router.replace({path: `/user`})
          // this.$router.go(-1)
        })
      } else {
        return false
      }
    })
  }

  /* 上传身份证图片 */
  handleIconLoaded (e) {
    let formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img', e)
    uploadIdcardApi(formData).then(res => {
      let { idCardInfo, file } = res.data.data[0]
      this.personalInfo.realname = idCardInfo.name
      this.personalInfo.idNum = idCardInfo.num
      this.personalInfo.passportFront = file.id
    }).catch (err => {
      this.form.icon3 = ''
    })
  }

  checkUserauth (param) {
    if (this.isEdit) {
      let uid = this.$route.params.id
      return editUserauthApi(uid, param)
    } else {
      return checkUserauthApi(param)
    }
  }

  /* 身份证信息校验 */
  async detectionInfo () {
    if (!this.personalInfo.passportFront) {
      this.$message.error(`请上传正确清晰的身份证图片`)
      return
    }
    let param = {
      realname: this.personalInfo.realname,
      idNum: this.personalInfo.idNum,
      passportFront: this.personalInfo.passportFront
    }
    let res = await this.checkUserauth(param)
      if (res.data.data.pass) {
        if (!this.isEdit) this.isDetection = true
        this.$message({
          message: '身份证信息校验成功，校验有效时间为15分钟，请及时提交创建',
          type: 'success'
        })
      } else {
        this.$message.error(`信息校验失败，请确认上传信息无误`)
      }
  }
  /*获取编辑用户的信息 */
  async getUserInfo () {
    let res = await getUserInfoApi(this.$route.params.id)
    let eidtUser = res.data.data
    console.log(res.data.data, '7785458558')
    /* 手机号码 */
    this.phone.mobile = eidtUser.mobile
    /* 身份信息 */
    this.personalInfo = {
      name: eidtUser.name, // 姓名
      gender: String(eidtUser.gender),
      realname : eidtUser.realname, // 真实姓名
      idNum : eidtUser.identityNum, // 身份证号码
      passportFront : eidtUser.passportFrontId, // 身份证正面照片
    }
    this.form.icon3 = eidtUser.passportFront? eidtUser.passportFront.url : ''
  }

  created () {
    if (!this.$route.params.id) return;
    this.isEdit = true;
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
}
</style>