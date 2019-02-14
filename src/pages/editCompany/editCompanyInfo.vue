<template>
  <div class="editCompanyInfo">
    <!--头部-->
    <div class="header">
      <div class="left">
        <span class="title">公司认证信息</span>
      </div>
      <div class="editBox">
        <el-button class="inquire" @click.stop="save">保存</el-button>
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
        
        <el-form-item label="公司地址" prop="address_id" style="width: 380px;">
          <span class="addAdress"><i class="el-icon-circle-plus" style="color: #67C23A;"></i>点击添加公司地址</span>
          <!--<el-select v-model="form.address_id" placeholder="点击选择工作地点" @change="changeAdress" style="width: 100%;">
            <el-option
              v-for="item in addressList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left;color: #999;" v-if="item.value!=='0'">{{ item.label }}</span>
              <span style="float: left; color: #652791;" v-else>{{ item.label }}</span>
            </el-option>
          </el-select>-->
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
    <div class="pop" v-if="pop.isShow">
      <div class="addAdressPop" v-if="pop.type==='addAdress'">
        <img class="clo" @click="popCancel" />
        <h3 class="">添加新的公司地址</h3>
        <p>添加新的公司地址</p>
        <el-input style="width: 368px;margin: 13px 0 26px 0;box-sizing: border-box;" v-model="adressInput" placeholder="请输入工作地址）"></el-input>
        <el-input style="width: 368px;margin: 13px 0 26px 0;box-sizing: border-box;" v-model="adress_id_Input" placeholder="请输入门牌号（选填）"></el-input>
        <div class="btn-add">
          <el-button class="btn_cancel" @click="popCancel">取消</el-button>
          <el-button class="btn_submit" type="primary" @click="addAdress">保存地址</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ImageUploader from '@/components/imageUploader'
import { fieldApi, uploadApi } from 'API/commont'
import { getCompanyInfoApi, editCompanyApi } from 'API/company'
import {TMap} from '../../util/js/TMap.js'
@Component({
  name: 'editCompany',
  components: {
    ImageUploader
  }
})
export default class editCompany extends Vue {
  geocoder = null
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
  pop = {
    isShow: false,
    type: 'position'
  }
  /* 地址数据 */
  addressData = {
    areaName: '',
    area_id: '',
    address: '',
    doorplate: '',
    lng: '',
    lat: ''
  }
  /* 地址列表 */
  addressList = [
    {
      value: '0',
      label: '添加新的公司地址',
    }
  ]
  /* 所属行业 */
  industry = []
  adressInput = ''
  adress_id_Input = ''
  mounted () {
    let that = this
    TMap('P63BZ-4RM35-BIJIV-QOL7E-XNCZZ-WIF4L').then(qq => {
      this.geocoder = new qq.maps.Geocoder({
        complete : function(result){
          console.log(result, 9999)
          let data = {
            mobile: that.form.mobile,
            areaName: result.detail.addressComponents.city || '',
            //address: result.detail.address,
            address: that.adressInput,
            doorplate: that.addressData.doorplate,
            lng: result.detail.location.lng,
            lat: result.detail.location.lat
          }
          that.pop = {
            isShow: false,
            type: ''
          }

//        addCompanyAdressApi(data).then(res => {
//          that.pop = {
//            isShow: false,
//            type: ''
//          }
//          that.form.address_id = ''
//          that.getAdressList()
//          console.log(res)
//        }).catch(e=>{
//          console.log('===',e)
//          that.$message.error(e.data.msg)
//        })
        },//若服务请求失败，则运行以下函数
        error: function(e) {
          console.log(e)
          that.$message.error("地址搜索失败")
        }
      })
    })
  }
  
  //添加工作地点
  addAdress () {
    console.log(this.adressInput, 11111)
    console.log(this.addressData, 222)
    if(this.adressInput.length>0){
      let adress = this.adressInput
      this.addressData.address = this.adressInput
      this.addressData.doorplate = this.adress_id_Input
      console.log(adress)
      this.geocoder.getLocation(adress)
    }
  }
  
  popCancel () {
    this.pop.isShow = false
  }
  
  // 工作地点选择 
  changeAdress (e) {
    console.log(e, '999999999----*--*')
    console.log(this.form.mobile)
    console.log(this.form.address_id)
    if(e==='0'){
      this.pop = {
        isShow: true,
        type: 'addAdress'
      }
      this.form.address_id = ''
    }
    return false
  }
  
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
    color: #FFFFFF;
    background-color: #652791;
    padding: 10px;
    text-align: center;
    margin-bottom: 30px;
  }
}
.addAdress{
  color: #652791;
  cursor: pointer;
}
.inquire{
  background-color: #652791;
  color: #FFFFFF;
  border-radius: 4px;
}
.addAdressPop {
  width:432px;
  background:rgba(255,255,255,1);
  box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
  border-radius:4px;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 6;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 36px;

  text-align: left;
  .clo {
    width:10px;
    height:10px;
    position: absolute;
    right: 16px;
    top: 16px;
  }
  h3 {
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(53,64,72,1);
  }
  p {
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(98,98,98,1);
    margin: 4px 0 14px 0;
  }
  .btn-add {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    .btn_cancel {
      width:80px;
      height:32px;
      background:rgba(255,255,255,1);
      border-radius:16px;
      border:1px solid rgba(220,220,220,1);
      box-sizing: border-box;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(53,64,72,1);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .btn_submit {
      width:80px;
      height:32px;
      background:rgba(101,39,145,1);
      border-radius:16px;
      box-sizing: border-box;
      border:1px solid rgba(101,39,145,1);
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      margin-left: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      span {
        color: #fff;
      }
    }
  }
}
.pop {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>