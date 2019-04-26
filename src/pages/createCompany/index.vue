<!--创建公司-->
<template>
 
  <div class="createCompany">
    <div class="header">
      <div class="creatTab" @click.stop="tab">
        <div class="Info" :class="{'active': active === 0 }">公司信息</div>
        <div class="userInfo" :class="{'active': active === 1 }">账户设置</div>
      </div>
      <div>
        <el-button @click.stop="createdCompany" v-show="active === 0 && !isEdit">保存并通过</el-button>
        <el-button @click.stop="createdCompany" v-show="active === 0 && isEdit">保存编辑</el-button>
      </div>
    </div>
     <!--公司信息表格-->
    <div class="companyInfo" v-if="active === 0">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
      <el-form class="edit-form" ref="companyInfo" :rules="companyInfoRules" :model="companyInfo" label-width="150px" label-suffix="：">
        <h3>公司信息</h3>
        <!--工牌/名片/在职证明-->
        <el-form-item class="full" label="公司LOGO" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          type="logo"
                          v-model="form.logo"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
        
        <el-form-item label="公司全称" prop="company_name">
          <el-input v-model="companyInfo.company_name" placeholder="请输入名称" :minlength="2" :maxlength="50" style="width: 400px;" v-if="!isEdit"></el-input>
          <el-input v-model="companyInfo.company_name" placeholder="请输入名称" :minlength="2" disabled :maxlength="50" style="width: 400px;" v-if="isEdit"></el-input>
        </el-form-item>
        
        <el-form-item label="公司简称" prop="company_shortname">
          <el-input v-model="companyInfo.company_shortname" placeholder="请输入名称" :maxlength="10" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="所属行业" prop="industry_id">
          <el-select style="width: 400px;" ref="tagSelector" v-model="companyInfo.industry_id" placeholder="请选择所属行业">
            <el-option v-for="item in industry" :label="item.name" :value="item.labelId" :key="item.id" />
          </el-select> 
        </el-form-item>
        
        <el-form-item label="融资阶段" prop="financing">
          <el-select style="width: 400px;" ref="tagSelector" v-model="companyInfo.financing" placeholder="请选择融资阶段">
            <el-option v-for="item in financing":label="item.name":value="item.id" :key="item.id" />
          </el-select> 
        </el-form-item>
        
        <el-form-item label="人员规模" prop="employees">
          <el-select style="width: 400px;" ref="tagSelector" v-model="companyInfo.employees" placeholder="请选择人员规模">
            <el-option v-for="item in employees":label="item.name":value="item.id" :key="item.id" />
          </el-select> 
        </el-form-item>

        <el-form-item label="公司地址" prop="address_id" style="width: 380px;" v-if="!$route.params.checkId">
          <span class="addAdress" @click.stop="changeAdress"><i class="el-icon-circle-plus" style="color: #67C23A;"></i>点击添加公司地址</span>
          <!--公司地址列表-->
          <span class="AdressList" v-for="(item, index) in adressList">
            <i @click.stop="delAdress(index)" class="el-icon-remove" style="color: rgb(245, 108, 108);"></i>
            {{`${item.address}${item.doorplate}`}}
          </span>
        </el-form-item>
        
        <el-form-item class="" label="公司简介" style="width: 640px;">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            :maxlength="5000"
            v-model="companyInfo.intro">
          </el-input>
        </el-form-item>

        <el-form-item class="" label="公司官网" style="width: 640px;">
          <el-input
            placeholder="请输入官网"
            :maxlength="5000"
            v-model="companyInfo.website">
          </el-input>
        </el-form-item>

        <h3>资质信息</h3>
        <el-form-item class="full" label="营业执照" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          :tips="iconUploader.tips"
                          type="business_license"
                          v-model="form.icon1"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
        <!--工牌/名片/在职证明-->
        <el-form-item class="full" label="工牌/名片/在职证明" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          :tips="iconUploader.tips"
                          type="on_job"
                          v-model="form.icon2"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
        <!-- 邮箱验证 -->
        <el-form-item class="email" label="公司邮箱" prop="icon" v-show="companyInfo.company_name">
          <span @click.stop="email.isShow = true">验证邮箱</span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 跟进销售设置 -->
    <div class="sales"  v-if="active === 1">
      <h3>跟进销售</h3>
      <el-form>
        <el-form-item label="跟进人">
          <el-select style="width: 400px;" ref="salesList" v-model="companyInfo.admin_uid" placeholder="请选择跟进人">
            <el-option label="无" :value="0" />
            <el-option v-for="item in salesList" :label="item.realname" :value="item.id" :key="item.id" />
          </el-select> 
        </el-form-item>
      </el-form>
    </div>
    <!--身份信息表格-->
    <div class="personalInfo" v-if="active === 2">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
      <el-form class="edit-form" ref="personalInfo" :rules="personalInfoRules" :model="personalInfo" label-width="150px" label-suffix="：">
        <h3>个人信息</h3>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="personalInfo.name" placeholder="请输入姓名" :maxlength="20" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="公司职务" prop="user_position">
          <el-input v-model="personalInfo.user_position " placeholder="请输入公司职务" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="公司邮箱" prop="user_email">
          <el-input v-model="personalInfo.user_email" placeholder="请输入邮箱" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="personalInfo.mobile" placeholder="请输入手机号码" :maxlength="11" style="width: 400px;"></el-input>
        </el-form-item>
        
        <h3>身份信息</h3>
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="personalInfo.real_name" placeholder="请输入真实姓名" :maxlength="20" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="身份证号码" prop="identity_num">
          <el-input v-model="personalInfo.identity_num" placeholder="请输入身份证号码" :maxlength="18" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="身份证有效期开始" prop="validity_start">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="personalInfo.validity_start" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <!--有效期结束-->
        <el-form-item label="身份证有效期结束" prop="validity_end">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="personalInfo.validity_end" style="width: 100%;"></el-date-picker>
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
        <!--身份证背面-->
        <el-form-item class="full" label="身份证反面" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          :tips="iconUploader.tips"
                          type="reverse"
                          v-model="form.icon4"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
        <!--手持身份证照-->
        <el-form-item class="full" label="手持身份证照" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          :tips="iconUploader.tips"
                          type="handheld"
                          v-model="form.icon5"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
      </el-form>
    </div>
    <!--添加新公司地址弹窗-->
    <div class="pop" v-show="pop.isShow">
      <map-search
       @popCancel="popCancel"
       @addAdress="addAdress">
      </map-search>
    </div>
    <!-- 添加邮箱 -->
    <div class="emailBox" v-show="email.isShow">
      <email-check
        :companyName="companyInfo.company_name"
        @save="save"
        @close="close">
        </email-check>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageUploader from '@/components/imageUploader'
import emailCheck from '@/components/email/email'
import { fieldApi, uploadApi, getSalerListApi } from 'API/commont'
import { setCompanyInfoApi, addCompanyAddressApi, delCompanyAddressApi, verifyEmailApi, checkCompanyNameApi, getCompanyInfoApi, editCompanyApi, getCheckCompanyInfoApi, editCheckCompanyInfoApi } from 'API/company'
import mapSearch from '@/components/map'
@Component({
  name: 'createCompany',
  components: {
    ImageUploader,
    mapSearch,
    emailCheck
  },
  // watch: {
  //   companyInfo: {
  //     handler(){},
  //     immediatea: true,
  //     deep: true
  //   }
  // }
})
export default class createCompany extends Vue {
  isEdit = false
  active = 0
  adressList = [] // 地址列表
  pop = {
    isShow: false,
    type: 'position'
  }
  email = {
    isShow: false
  }
  /* 自定义公司名称校验规则 */
  companyNameRule = (rule, value, callback) => {
    checkCompanyNameApi(value).then(res => {
      if (res.data.data.exist) {
        callback(new Error('公司名称已被注册，请重新输入'))
      } else {
        callback()
      }
    })
  }
  /* 公司信息 */
  companyInfo = {
    company_name: '', // 公司名称
    company_shortname: '', // 公司简称
    industry_id: '', // 所属行业
    financing: '', // 融资
    employees: '', // 规模
    intro: '', // 公司简介
    business_license: '', // 营业执照
    on_job: '', // 在职证明
    logo: '',
    website: '', // 公司官网
    address: [], // 公司地址
    email: '',
    admin_uid: '' //跟进人员
  }
  /* 身份信息 */
  personalInfo = {
    name: '', // 姓名
    company_id: '', // 公司id
    user_email: '', // 邮箱地址
    user_position: '', // 担任职务
    real_name : '', // 真实姓名
    mobile: '', // 手机号
    identity_num : '', // 身份证号码
    validity: '', // 有效期
    validity_start: '',
    validity_end: '',
    passport_front : '', // 身份证正面照片
    passport_reverse: '', // 身份证反面照
    handheld_passport: '' // 手持身份证照
  }
  /* 融资情况标签 */
  financing = [
    {name: '未融资', id: 1},
    {name: '天使轮', id: 2},
    {name: 'A轮', id: 3},
    {name: 'B轮', id: 4},
    {name: 'C轮', id: 5},
    {name: 'D轮及以上', id: 6},
    {name: '已上市', id: 7},
    {name: '不需要融资', id: 8}
  ]
  /* 规模标签 */
  employees = [
    {name: '0-20人', id: 1},
    {name: '20-99人', id: 2},
    {name: '100-499人', id: 3},
    {name: '500-999人', id: 4},
    {name: '1000-9999人', id: 5},
    {name: '10000人以上', id: 6}
  ]
  /* 销售人员名单 */
  salesList = []
  /* 所属行业 */
  industry = []
  iconUploader = {
    point: '',
    width: 400,
    height: '',
    tips: '建议尺寸400X400px，JPG、PNG格式，图片小于5M。'
  }
  form = {
    logo: '', // logo
    icon1: '', // 营业执照
    icon2: '', // 工牌/名片/在职证明
    icon3: '', // 身份证正面
    icon4: '', // 身份证反面
    icon5: '' // 手持身份证照
  }
  // 公司表单验证规则
  companyInfoRules = {
    company_name: [
      { required: true, message: '公司全称必填，要求2-50个字',trigger: 'blur', max: 50,min: 2 }, 
      { validator: this.companyNameRule, trigger: 'blur' }
    ],
    company_shortname: [
      { required: true, message: '公司简称必填，要求1-10个字', trigger: 'blur', min: 1, max: 10 }
    ],
    industry_id: [
      { required: true, message: '所属行业必选', trigger: 'change' },
    ],
    financing: [
      { required: true, message: '融资情况必选', trigger: 'change' },
    ],
    employees: [
      { required: true, message: '人员规模必选', trigger: 'change' },
    ]
  }
  // 身份信息表单验证
  personalInfoRules = {
    name: [
      { required: true, message: '请输入姓名，要求2-20个字',trigger: 'blur', max: 20,min: 2 }, 
    ],
    user_email: [
      { required: true, message: '请输入公司邮箱', trigger: 'blur' }
    ],
    user_position: [
      { required: true, message: '请输入担任职务', trigger: 'blur', max: 50, min: 2 },
    ],
    mobile: [
      { required: true, message: '请输入联系电话', trigger: 'blur', min: 11, max: 11 },
    ],
    real_name: [
      { required: true, message: '请输入真实姓名', trigger: 'blur' },
    ]
  }
  /* 切换tab */
  tab (e) {
    if (e.target.className === 'userInfo') {
      this.active = 1
      if (this.salesList.length > 0) return
      getSalerListApi().then(res => {
        this.salesList = res.data.data
      })
    } else {
      this.active = 0
    }
  }
  
  last () {
    this.active--
  }
  /* 创建公司 */
  async createdCompany () {
    this.companyInfo.address = this.adressList
    this.$refs['companyInfo'].validate(async (valid) => {
      if (valid) {
        const { id, checkId } = this.$route.params
        if (this.isEdit) {
          // 编辑公司
          if (id) {
            await editCompanyApi(id, this.companyInfo)
          } else {
            
            await editCheckCompanyInfoApi(checkId, this.companyInfo)
          }
        } else {
          // 新建公司
          await setCompanyInfoApi(this.companyInfo)
        }
        this.$message({
          message: this.isEdit ? '编辑成功' : '公司创建成功',
          type: 'success'
        })
        if (checkId) {
          this.$router.push({path: `/companyCheck/verify?id=${checkId}`})
        } else {
          this.$router.go(-1)
          // this.$router.push({path: '/index'})
        }

      } else {
        return false;
      }
    })
  }

  handleIconLoaded (e) {
    console.log(e, 999)
    let formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img', e)
    uploadApi(formData).then(res => {
      if (e.uploadType === 'business_license') {
        this.companyInfo.business_license = res.data.data[0].id
      } else if (e.uploadType === 'on_job') {
        this.companyInfo.on_job = res.data.data[0].id
      } else if (e.uploadType === 'logo') {
        this.companyInfo.logo = res.data.data[0].id
      } else if (e.uploadType === 'front') {
        this.personalInfo.passport_front = res.data.data[0].id
      } else if (e.uploadType === 'reverse') {
        this.personalInfo.passport_reverse = res.data.data[0].id
      } else if (e.uploadType === 'handheld') {
        this.personalInfo.handheld_passport = res.data.data[0].id
      }
    })
  }

  /* 所属行业标签 */
  getfieldList () {
    fieldApi().then(res => {
      this.industry = res.data.data
    })
  }

  /* 工作地点选择 */
  changeAdress (e) {
    this.pop = {
      isShow: true,
      type: 'addAdress'
    }
  }
  /* 关闭地址选择 */
  popCancel () {
    this.pop = {
      isShow: false,
      type: 'addAdress'
    }
  }
  /* 添加地址 */
  addAdress (address) {
    this.adressList.push(address.data)
  }
  /* 删除地址 */
  async delAdress (index) {
    console.log(index, this.adressList)
    if (this.adressList[index].id) await delCompanyAddressApi(this.adressList[index].id)
    this.adressList.splice(index, 1)
    this.companyInfo.address = this.adressList
  }
  /* 邮箱弹窗 */
  save (param) {
    verifyEmailApi(param).then(res => {
      this.email.isShow = false
      this.companyInfo.email = param.email
      this.$message({
        type: 'success',
        message: "邮箱验证成功"
      })
    })
  }
  close () {
    this.email.isShow = false
  }

  /* 获取编辑公司信息 */
  async getCompanyInfo () {
    const { id } = this.$route.params
    let res = await getCompanyInfoApi(id)
    let newCompanyInfo = res.data.data.companyInfo
    this.setCompanyInfo(newCompanyInfo)
  }

  /* 获取审核公司信息 */
  async getCheckCompanyInfo () {
    const { checkId } = this.$route.params
    let res = await getCheckCompanyInfoApi(checkId)
    let newCompanyInfo = res.data.data.companyInfo
    this.setCompanyInfo(newCompanyInfo)
  }

  /* 填充原公司数据 */
  setCompanyInfo (newCompanyInfo) {
    this.companyInfo = {
      company_name: newCompanyInfo.companyName, // 公司名称
      company_shortname: newCompanyInfo.companyShortname, // 公司简称
      industry_id: newCompanyInfo.industryId? newCompanyInfo.industryId : '', // 所属行业
      financing: newCompanyInfo.financing? parseInt(newCompanyInfo.financing) : '', // 融资
      employees: newCompanyInfo.employees? parseInt(newCompanyInfo.employees) : '', // 规模
      intro: newCompanyInfo.intro, // 公司简介
      business_license: newCompanyInfo.businessLicenseInfo.id || '', // 营业执照
      on_job: newCompanyInfo.onJobInfo.id || '', // 在职证明
      logo: newCompanyInfo.logoInfo.id || '',
      website: newCompanyInfo.website, // 公司官网
      address: newCompanyInfo.address? newCompanyInfo.address : [], // 公司地址
      email: newCompanyInfo.email,
      admin_uid: parseInt(newCompanyInfo.adminUid) //跟进人员
    }
    // 上传证件信息
    this.form = {
      logo: newCompanyInfo.logoInfo.smallUrl || '', // logo
      icon1: newCompanyInfo.businessLicenseInfo.smallUrl || '', // 营业执照
      icon2: newCompanyInfo.onJobInfo.smallUrl || '' // 工牌/名片/在职证明
    }
    this.adressList = newCompanyInfo.address? newCompanyInfo.address : []
  }

  created () {
    const { id, checkId } = this.$route.params
    if (id || checkId) { // 是否编辑公司信息
      this.isEdit = true
      this.companyInfoRules.company_name.splice(1,1)
      if (id) {
        this.getCompanyInfo()
      } else {
        this.getCheckCompanyInfo()
      }
    }
    this.getfieldList()
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
      margin-bottom: 20px;
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
}
.emailBox{
  color: #FFFFFF;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>