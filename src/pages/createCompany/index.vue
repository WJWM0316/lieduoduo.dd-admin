<!--创建公司-->
<template>
 
  <div class="createCompany">
    <div class="header">
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="填写公司信息"></el-step>
        <el-step title="填写身份信息"></el-step>
        <el-step title="录入完成"></el-step>
      </el-steps>
      <!--<el-button @click.stop="last" v-show="active === 1">返回上一步</el-button>-->
      <el-button @click.stop="next" v-show="active === 0">保存，下一步</el-button>
      <el-button @click.stop="next" v-show="active === 1">保存并审核</el-button>
    </div>
     <!--公司信息表格-->
    <div class="companyInfo" v-if="active === 0">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
      <el-form class="edit-form" ref="form" :model="companyInfo" label-width="150px" label-suffix="：">
        <h3>公司信息</h3>
        <!--工牌/名片/在职证明-->
        <el-form-item class="full" label="公司LOGO" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          type="logo"
                          v-model="form.logo"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
        
        <el-form-item label="公司全称" prop="title">
          <el-input v-model="companyInfo.company_name" placeholder="请输入名称" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="公司简称" prop="title">
          <el-input v-model="companyInfo.company_shortname" placeholder="请输入名称" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="所属行业" prop="tags">
          <el-select style="width: 400px;" ref="tagSelector" v-model="companyInfo.industry_id" placeholder="请选择所属行业">
            <el-option v-for="item in industry":label="item.name":value="item.labelId" :key="item.id" />
          </el-select> 
        </el-form-item>
        
        <el-form-item label="融资阶段" prop="tags">
          <el-select style="width: 400px;" ref="tagSelector" v-model="companyInfo.financing" placeholder="请选择融资阶段">
            <el-option v-for="item in financing":label="item.name":value="item.id" :key="item.id" />
          </el-select> 
        </el-form-item>
        
        <el-form-item label="人员规模" prop="tags">
          <el-select style="width: 400px;" ref="tagSelector" v-model="companyInfo.employees" placeholder="请选择人员规模">
            <el-option v-for="item in employees":label="item.name":value="item.id" :key="item.id" />
          </el-select> 
        </el-form-item>
        
        <el-form-item class="" label="公司简介">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="companyInfo.Introduction">
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
        <el-form-item class="full" label="工牌/名片/在职证明(三选一)" prop="icon">
          <image-uploader :width="iconUploader.width"
                          :height="iconUploader.height"
                          :tips="iconUploader.tips"
                          type="on_job"
                          v-model="form.icon2"
                          @loaded="handleIconLoaded"/>
        </el-form-item>
      </el-form>
    </div>
    <!--身份信息表格-->
    <div class="personalInfo" v-if="active === 1">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
      <el-form class="edit-form" ref="form" :model="personalInfo" label-width="150px" label-suffix="：">
        <h3>个人信息</h3>
        <el-form-item label="姓名" prop="title">
          <el-input v-model="personalInfo.name" placeholder="请输入姓名" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="公司职务" prop="title">
          <el-input v-model="personalInfo.user_position " placeholder="请输入公司职务" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="公司邮箱" prop="title">
          <el-input v-model="personalInfo.user_email" placeholder="请输入邮箱" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="手机号码" prop="title">
          <el-input v-model="personalInfo.mobile" placeholder="请输入手机号码" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <h3>身份信息</h3>
        <el-form-item label="真实姓名" prop="title">
          <el-input v-model="personalInfo.real_name" placeholder="请输入真实姓名" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="身份证号码" prop="title">
          <el-input v-model="personalInfo.identity_num" placeholder="请输入身份证号码" :maxlength="30" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item label="有效期" prop="date1">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="personalInfo.validity" style="width: 100%;"></el-date-picker>
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
    <!--新建通过-->
    <div class="personalInfo" v-if="active === 3">
      创建成功
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageUploader from '@/components/imageUploader'
import { fieldApi, uploadApi } from 'API/commont'
import { setCompanyInfoApi, setIdentityInfoApi } from 'API/company'
@Component({
  name: 'createCompany',
  components: {
    ImageUploader
  }
})
export default class createCompany extends Vue{
  active = 0
  /* 公司信息 */
  companyInfo = {
    company_name: '', // 公司名称
    company_shortname: '', // 公司简称
    industry_id: '', // 所属行业
    financing: '', // 融资
    employees: '', // 规模
    Introduction: '', // 公司简介
    business_license: '', // 营业执照
    on_job: '', // 在职证明
    logo: ''
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
    {name: 'D轮', id: 6},
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
  next() {
    if (this.active >= 2 ) {
      console.log('成功')
      
      return
    }
    if (this.active === 0) {
      setCompanyInfoApi(this.companyInfo).then(res => {
        this.personalInfo.company_id = res.data.data.companyId
        this.active++
      }).catch(err => {
        this.$message.error('有信息没填，无法通过哦');
      })
    } else {
      setIdentityInfoApi(this.personalInfo).then(res => {
        this.active+=2
        this.$message({
          message: '恭喜你，信息录入完成',
          type: 'success'
        })
      }).catch(err => {
        this.$message.error('有信息没填，无法通过哦');
      })
    }
  }
//last () {
//  if (this.active === 0 ) return
//  this.active--
//}
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
//  this.$refs.form.validateField('icon')
  }
  /* 所属行业标签 */
  getfieldList () {
    fieldApi().then(res => {
      this.industry = res.data.data
    })
  }
  created () {
    this.getfieldList()
  }
}
</script>

<style lang="less" scoped="scoped">
.createCompany{
  margin-left: 200px;
  padding: 22px;
  .header{
    padding: 22px;
    box-sizing: border-box;
    border-radius: 4px;
    height: 100px;
    border: 1px solid #BCBCBC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-steps{
      text-align: left;
      width: 500px;
    }
  }
  /*公司信息*/
  .companyInfo,
  .personalInfo{
    text-align: left;
    .point{
      font-size: 14px;
      color: #606266;
      background-color: #E6A23C;
      padding: 10px;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>