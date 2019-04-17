<!--创建公司-->
<template>
 
  <div class="createCompany">
    <div class="header">
      <div class="creatTab" @click.stop="tab">
        <div class="Info" :class="{'active': active === 0 }">公司信息</div>
        <div class="userInfo" :class="{'active': active === 1 }">账户设置</div>
      </div>
      <!-- <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="填写公司信息"></el-step>
        <el-step title="填写身份信息"></el-step>
        <el-step title="录入完成"></el-step>
      </el-steps> -->
      <div>
      	<!-- <el-button @click.stop="last" v-show="active === 1">返回上一步</el-button>
        <el-button @click.stop="next" v-show="active === 0">保存，下一步</el-button> -->
        <el-button @click.stop="createdCompany" v-show="active === 0">保存并通过</el-button>
      </div>
    </div>
     <!--公司信息表格-->
    <div class="companyInfo" v-if="active === 0">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
      <el-form class="edit-form" ref="companyInfo" :rules="companyInfoRules" :model="companyInfo" label-width="150px" label-suffix="：">
        <h3>公司信息</h3>
        <!--工牌/名片/在职证明-->
        <el-form-item class="full" label="公司LOGO" prop="icon">
          <img :src="companyInfo.logoInfo.smallUrl" alt="">
        </el-form-item>
        
        <el-form-item label="公司全称" prop="company_name">
          <span>{{companyInfo.companyName}}</span>
        </el-form-item>
        
        <el-form-item label="公司简称" prop="company_shortname">
          <span>{{companyInfo.companyShortname}}</span>
        </el-form-item>
        
        <el-form-item label="所属行业" prop="industry_id">
          <span>{{companyInfo.industry}}</span>
        </el-form-item>
        
        <el-form-item label="融资阶段" prop="financing">
          <span>{{companyInfo.financingInfo}}</span>
        </el-form-item>
        
        <el-form-item label="人员规模" prop="employees">
          <span>{{companyInfo.employeesInfo}}</span>
        </el-form-item>

        <el-form-item label="公司地址" prop="address_id" style="width: 380px;">
          <!-- <span class="addAdress" @click.stop="changeAdress"><i class="el-icon-circle-plus" style="color: #67C23A;"></i>点击添加公司地址</span> -->
          <!--公司地址列表-->
          <span class="AdressList" v-for="(item, index) in companyInfo.address">
            <!-- <i @click.stop="delAdress(index)" class="el-icon-remove" style="color: rgb(245, 108, 108);"></i> -->
            {{`${item.address}${item.doorplate}`}}
          </span>
        </el-form-item>
        
        <el-form-item class="" label="公司简介" style="width: 640px;">
          <span>{{companyInfo.intro}}</span>
        </el-form-item>

        <el-form-item class="" label="公司官网" style="width: 640px;">
          <span>{{companyInfo.email}}</span>
        </el-form-item>

        <h3>资质信息</h3>
        <el-form-item class="full" label="营业执照" prop="icon">
          <img :src="companyInfo.businessLicenseInfo.smallUrl" alt="">
        </el-form-item>
        <!--工牌/名片/在职证明-->
        <el-form-item class="full" label="工牌/名片/在职证明(三选一)" prop="icon">
          <img :src="companyInfo.onJobInfo.smallUrl" alt="">
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
          <el-select style="width: 400px;" ref="salesList" v-model="companyInfo.adminUid" placeholder="请选择跟进人">
            <el-option v-for="item in salesList" :label="item.realname" :value="item.id" :key="item.id" />
          </el-select> 
        </el-form-item>
      </el-form>
    </div>
    <!--新建通过-->
    <div class="personalInfo" v-if="active === 3">
      创建成功
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
import { setCompanyInfoApi, setIdentityInfoApi, addCompanyAddressApi, delCompanyAddressApi, verifyEmailApi, checkCompanyNameApi, getCompanyInfoApi } from 'API/company'
import mapSearch from '@/components/map'
@Component({
  name: 'createCompany',
  components: {
    ImageUploader,
    mapSearch,
    emailCheck
  }
})
export default class createCompany extends Vue {
  active = 0
  adressList = [] // 地址列表
  pop = {
    isShow: false,
    type: 'position'
  }
  email = {
    isShow: false
  }
  /* 公司信息 */
  companyInfo = {}
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
  /* 自定义公司名称校验规则 */
  companyNameRule = (rule, value, callback) => {
    console.log(rule)
    checkCompanyNameApi(this.companyInfo.company_name).then(res => {
      if (res.data.data.exist) {
        callback(new Error('公司名称已被注册，请重新输入'))
      } else {
        callback()
      }
    })
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
      { required: true, message: '所属行业必选', trigger: 'blur' },
    ],
    financing: [
      { required: true, message: '融资情况必选', trigger: 'blur' },
    ],
    employees: [
      { required: true, message: '人员规模必选', trigger: 'blur' },
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
  createdCompany () {
    this.companyInfo.address = this.adressList
    this.$refs['companyInfo'].validate((valid) => {
      if (valid) {
        setCompanyInfoApi(this.companyInfo).then(res => {
          this.$message({
            message: '公司创建成功',
            type: 'success'
          })
          this.$router.push({path: '/index'})
        })
      } else {
        return false;
      }
    })
  }
  
  async next() {
    if (this.active >= 2 ) {
      return
    }
    if (this.active === 0) {
      this.$refs['companyInfo'].validate((valid) => {
        if (valid) {
          this.active++
        } else {
          return false;
        }
      })
    } else {
      this.$refs['personalInfo'].validate(async (valid) => {
        if (valid) {
          try {
            let res = await setCompanyInfoApi(this.companyInfo)
            this.personalInfo.company_id = res.data.data.companyId
            await setIdentityInfoApi(this.personalInfo)
            this.active+=2
            this.$message({
              message: '恭喜你，信息录入完成',
              type: 'success'
            })
            let that = this
            setTimeout(function () {
              that.$router.push({
                path: '/index'
              })
            }, 1000)
          } catch (err) {
            this.$message.error(`${err.data.msg}`)
          }
        } else {
          return false;
        }
      })
    }
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
  delAdress (index) {
    this.adressList.splice(index, 1)
    this.companyInfo.address = this.adressList
  }
  /* 邮箱弹窗 */
  save (param) {
    console.log(param, '保存')
    verifyEmailApi(param).then(res => {
      this.email.isShow = false
      this.companyInfo.email = param.email
      console.log(this.companyInfo.email)
      this.$message({
        type: 'success',
        message: "邮箱验证成功"
      })
    })
  }
  close () {
    console.log('关闭')
    this.email.isShow = false
  }

  /* 获取公司信息 */
  async getCompanyInfo () {
    const { id } = this.$route.query
    let res = await getCompanyInfoApi(id)
    this.companyInfo = res.data.data.companyInfo
  }

  created () {
    this.getCompanyInfo()
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
  z-index: 9999;
}
</style>