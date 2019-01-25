<template>
  <div class="editCompanyInfo">
    <!--头部-->
    <div class="header">
      <div class="left">
        <span class="title">公司认证信息</span>
      </div>
      <div class="editBox">
        <el-button type="primary" @click.stop="save">保存</el-button>
      </div>
    </div>
    <!--公司信息表格-->
    <div class="companyInfo">
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
            v-model="companyInfo.intro">
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
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageUploader from '@/components/imageUploader'
import { fieldApi, uploadApi } from 'API/commont'
import { getCompanyInfoApi, editCompanyApi } from 'API/company'
@Component({
  name: 'editCompany',
  components: {
    ImageUploader
  }
})
export default class editCompany extends Vue {
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
    logo: ''
  }
  /* 图片信息 */
  form = {
    logo: '', // logo
    icon1: '', // 营业执照
    icon2: '' // 工牌/名片/在职证明
  }
  /* 提示语 */
  iconUploader = {
    point: '',
    width: 160,
    height: '',
    tips: '建议尺寸400X400px，JPG、PNG格式，图片小于5M。'
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
  /* 编辑图片 */
  handleIconLoaded (e) {
    console.log(e, 999)
    let formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img', e)
    uploadApi(formData).then(res => {
      if (e.uploadType === 'business_license') {
        this.companyInfo.business_license = res.data.data[0].id
//      console.log(res.data.data[0].id, 'business_license')
      } else if (e.uploadType === 'on_job') {
        this.companyInfo.on_job = res.data.data[0].id
//      console.log(res.data.data[0].id, 'on_job')
      } else if (e.uploadType === 'logo') {
        this.companyInfo.logo = res.data.data[0].id
      }
    })
  }
  /* 所属行业标签 */
  getfieldList () {
    fieldApi().then(res => {
      this.industry = res.data.data
    })
  }
  /* 获取编辑的公司信息 */
  getCompanyInfo () {
    const { id } = this.$route.query
    getCompanyInfoApi(id).then(res => {
      this.form = {
        logo: res.data.data.companyInfo.logoInfo.middleUrl, 
        icon1: res.data.data.companyInfo.businessLicenseInfo.middleUrl, 
        icon2: res.data.data.companyInfo.onJobInfo.middleUrl 
      }
      /* 公司信息 */
      this.companyInfo = {
        company_name: res.data.data.companyInfo.companyName, // 公司名称
        company_shortname: res.data.data.companyInfo.companyShortname, // 公司简称
        industry_id: res.data.data.companyInfo.industryId, // 所属行业
        financing: parseInt(res.data.data.companyInfo.financing), // 融资
        employees: parseInt(res.data.data.companyInfo.employees), // 规模
        intro: res.data.data.companyInfo.intro, // 公司简介
        business_license: res.data.data.companyInfo.businessLicenseInfo.id, // 营业执照
        on_job: res.data.data.companyInfo.onJobInfo.id, // 在职证明
        logo: res.data.data.companyInfo.logoInfo.id
      }
    })
  }
  /* 保存 */
  save () {
    const { id } = this.$route.query
    editCompanyApi(id, this.companyInfo).then(res => {
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
      this.$router.go(-1)
    })
  }
  created () {
    this.getfieldList()
    this.getCompanyInfo()
  }
}
</script>

<style lang="less" scoped="scoped">
.editCompanyInfo{
  margin-left: 200px;
  padding: 22px;
}
.header{
  padding: 22px;
  box-sizing: border-box;
  border-radius: 4px;
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
.companyInfo
{
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
</style>