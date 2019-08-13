<!--创建公司-->
<template>
  <div id="edit_recruiter">

    <div class="base_infos">
      <el-form label-suffix="：" label-width="160px">
        <h3>基本信息</h3>

        <el-form-item label="头像">
          <ul class="common-list">
            <li
              v-for="(imageItem, imageIndex) in userInfos.avatars"
              :key="imageIndex"
              :data-key="imageIndex"
              class="draggable"
              :style="`background-image: url(${imageItem.smallUrl}); background-size: cover; background-repeat: no-repeat; background-position: center center;`"
              draggable="true">
              <div class="btn-close" @click="handleRemoveUploadImage(imageIndex)"><i class="el-icon-delete"></i></div>
            </li>
            <li class="upload-li" v-if="userInfos.avatars.length < model.limit" @click="handleChooseImage('#image')">
              <i class="el-icon-plus"></i>
              <input type="file" multiple="multiple" @change="handleChangeImage('#image')" style="display: none;" id="image" name="image" accept="image/*" />
            </li>
          </ul>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input
            v-model="userInfos.name"
            placeholder="请输入姓名"
            :maxlength="20"
            style="width: 400px;"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio v-model="userInfos.gender" :label="1">男</el-radio>
          <el-radio v-model="userInfos.gender" :label="2">女</el-radio>
        </el-form-item>

        <el-form-item label="担任职务">
          <el-input
            v-model="userInfos.position"
            placeholder="请输入担任职务"
            :maxlength="20"
            style="width: 400px;"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="接收简历邮箱">
          <el-input
            v-model="userInfos.email"
            placeholder="请输入邮箱"
            :maxlength="20"
            style="width: 400px;"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="微信">
          <el-input
            v-model="userInfos.wechat"
            placeholder="请输入微信"
            :maxlength="20"
            style="width: 400px;"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="个性签名">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            style="width: 400px;"
            v-model="userInfos.signature">
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="saveUser">保存</el-button>
          <el-button >取消</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="userLabel">
      <h3>个人标签</h3>
      <el-form label-suffix="：" label-width="160px">

        <el-form-item label="职业技能">
          <ul class="label_ul">
            <li
              :class="{active: item.active}"
              v-for="(item, index) in userInfos.professionalSkill"
              :key="index"
              @click="removeSills(index)">{{item.name || item.labelName}}
            </li>
          </ul>
          <el-button type="text" @click="todoAction('skills')">编辑</el-button>
        </el-form-item>
        
        <el-form-item label="自定义职业技能标签">
          <el-button type="text" @click="todoAction('customize_skills')">编辑</el-button>
        </el-form-item>

        <el-form-item label="职业素养">
          <ul class="label_ul">
            <li
              :class="{active: item.active}"
              v-for="(item, index) in userInfos.labelLife"
              :key="index"
              @click="removeSills(index)">{{item.name || item.labelName}}
            </li>
          </ul>
          <el-button type="text" @click="todoAction('literacy')">编辑</el-button>
        </el-form-item>
        
        <el-form-item label="自定义职业素养标签">
          <el-button type="text" @click="todoAction('customize_literacy')">编辑</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="userLabel">
      <h3>个人简介</h3>
      <el-form label-suffix="：" label-width="160px">

        <el-form-item>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
            style="width: 400px;"
            v-model="userInfos.brief">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="setRecruiterBrief">保存</el-button>
          <el-button >取消</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="userBelong">
      <h3>所属公司</h3>
      <el-form label-suffix="：" label-width="160px" :inline="true">

        <el-form-item style="margin-left: 150px;">
          公司全称：{{userInfos.companyInfo.companyName}}
        </el-form-item>
        
        <el-form-item style="margin-left: 100px;">
          是否可以发布职位
          <el-switch
            v-model="userInfos.createPositionRight"
            active-color="#3a8ee6"
            inactive-color="#cccccc"
            active-value="1"
            @change="switchPublicBtn"
            inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item style="float: right;">
          <el-button type="text">移出公司</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :title="model.title" :visible.sync="model.show" width="580px">
      
      <div class="html_content_box" v-if="model.type === 'skills'">
        <div class="m_h1">已选择标签：</div>
        <ul class="label_ul_dialog" v-if="model.selected.length">
          <li :class="{active: item.active}" v-for="(item, index) in model.selected" :key="index" @click="removeSills(index)">{{item.name || item.labelName}}</li>
        </ul>
        <div class="m_h2">请选择标签：</div>
        <el-select v-model="model.value3" placeholder="请选择" @change="getLabelSkills">
          <el-option
            v-for="item in labelProfessionalSkillsList"
            :key="item.labelId"
            :label="item.name"
            :value="item.labelId">
          </el-option>
        </el-select>
      </div>

      <div class="html_content_box" v-if="model.type === 'literacy'">
        <div class="m_h1">已选择标签：</div>
        <ul class="label_ul_dialog" v-if="model.selected.length">
          <li :class="{active: item.active}" v-for="(item, index) in model.selected" :key="index" >{{item.name || item.labelName}}</li>
        </ul>
        <div class="m_h2">请选择标签：</div>
        <ul class="label_ul_dialog" v-if="model.list.length">
          <li :class="{active: item.active}" v-for="(item, index) in model.list" :key="index" @click="getLabelItem(index)">{{item.name}}</li>
        </ul>
      </div>

      <div class="html_content_box_01" v-if="model.type === 'customize_skills' || model.type === 'customize_literacy'">
        <el-input v-model="model.value2" placeholder="请输入标签名称"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import ImageUploader from "@/components/imageUploader";
import {
  fieldApi,
  uploadApi,
  getLabelProfessionalLiteracyListApi,
  getLabelProfessionalSkillsListApi
} from "API/commont";
import { getListApi, getLabelPositionListApi } from "API/position";
import {
  upload_api
} from '@/api/index.js'
import {
  detectionMobileApi,
  checkUserauthApi,
  createdUserApi,
  getUserInfoApi,
  editUserauthApi,
  editUserApi,
  closePublicPosisionApi,
  openPublicPosisionApi,
  getRecruiterBaseInfoApi,
  getRecruiterBriefApi,
  getRecruiterLabelApi,
  editUsermanageInfosApi,
  setRecruiterBriefApi,
  createLabelProfessionalSkillsApi,
  getRecruiterLabelsListsApi
} from "API/recruiter";

import {
  setCompanyInfoApi,
  setIdentityInfoApi,
  addCompanyAddressApi,
  delCompanyAddressApi,
  getApplyUserInfoApi,
  editApplyUserInfoApi
} from "API/company";
import { getAccessToken, removeAccessToken } from "@/api/cacheService.js";

@Component({
  name: "EditRecruiter",
  components: {
    ImageUploader
  }
})
export default class EditRecruiter extends Vue {
  model = {
    show: false,
    type: '',
    title: '',
    selected: [],
    list: [],
    value1: '100',
    value2: '',
    positionLabel: '',
    value3: '',
    avatar: {
      url: ''
    },
    width: 400,
    height: 400,
    tips: "建议尺寸400X400px，JPG、PNG格式，图片小于5M。",
    limit: 6
  }
  /* 身份信息 */
  userInfos = {
    name: '', // 姓名
    gender: '',
    realname: '',
    avatars: [],
    companyInfo: {
      companyName: ''
    },
    brief: '',
    createPositionRight: '1',
    professionalSkill: [],
    labelLife: []

  };
  labelProfessionalLiteracyList = []
  labelProfessionalSkillsList = []
  setRecruiterBrief() {
    setRecruiterBriefApi({uid: this.$route.params.id, brief: this.userInfos.brief})
  }
  switchPublicBtn(e) {
    let funcApi = e === 'y' ? openPublicPosisionApi : closePublicPosisionApi
    funcApi({uid: this.$route.params.id}).then(() => {})
  }
  getLabelSkills(e) {
    this.labelProfessionalSkillsList.map(field => {
      if(field.labelId === e && !field.active) field.active = !field.active
    })
    this.model.selected = this.form.professionalSkill.concat(this.labelProfessionalSkillsList.filter(field => field.active))
  }
  removeSills(index) {
    this.model.selected.splice(index, 1)
    this.model.value3 = ''
  }
  getRecruiterBaseInfo() {
    return getRecruiterBaseInfoApi({uid: this.$route.params.id})
          .then(res => {
            let userInfos = res.data.data
            this.userInfos = Object.assign(this.userInfos, userInfos)
            if(userInfos.avatars.length) this.model.avatar = userInfos.avatars[0]
          })
  }
  getRecruiterBrief() {
    return getRecruiterBriefApi({uid: this.$route.params.id})
          .then(res => this.userInfos = Object.assign(this.userInfos, {brief: res.data.data.brief}))
  }
  getRecruiterLabel() {
    return getRecruiterLabelApi({uid: this.$route.params.id})
          .then(res => this.userInfos = Object.assign(this.userInfos, {label: res.data.data}))
  }
  getRecruiterLabelsLists() {
    return getRecruiterLabelsListsApi({uid: this.$route.params.id}).then(res => {
      let professionalSkill = []
      let labelLife = []
      let list = res.data.data
      list.map(field => {
        if(field.type === 'label_professional_skills') professionalSkill.push(field)
        if(field.type === 'label_life') labelLife.push(field)
      })
      this.userInfos.professionalSkill = professionalSkill
      this.userInfos.labelLife = labelLife
      console.log(this.userInfos)
    })
  }
  getUserInfo() {
    let funcApi = this.$route.query.isFromCheck ? getApplyUserInfoApi : getUserInfoApi
    let isFromCheck = this.$route.query.isFromCheck
    return funcApi(this.$route.params.id).then(res => {
      let userInfos = res.data.data
      let params = {
        uid: userInfos.uid,
        name: userInfos.name,
        gender: userInfos.gender,
        wechat: userInfos.wechat,
        signature: userInfos.signature,
        position: userInfos.position,
        email: userInfos.email,
        companyEmail: userInfos.companyEmail,
        avatars: userInfos.avatars,
        createPositionRight: String(userInfos.createPositionRight),
        companyInfo: userInfos.companyInfo
      }
      this.userInfos = Object.assign(this.userInfos, params)
    })
  }
  todoAction(type) {
    switch(type) {
      case 'literacy':
        this.model.show = true
        this.model.title = '添加职业素养标签'
        this.model.type = 'literacy'
        this.model.list = this.labelProfessionalLiteracyList
        this.model.selected = this.userInfos.labelLife
        break;
      case 'customize_skills':
        this.model.show = true
        this.model.title = '添加自定义标签'
        this.model.type = 'customize_skills'
        console.log(this.userInfos)
        break
      case 'customize_literacy':
        this.model.show = true
        this.model.title = '添加自定义标签'
        this.model.type = 'customize_literacy'
        console.log(this.userInfos)
        break
      case 'skills':
        this.model.show = true
        this.model.title = '添加职业能力标签'
        this.model.type = 'skills'
        this.model.selected = this.userInfos.professionalSkill
        break
      default:
        break
    }
  }
  confirm() {
    switch(this.model.type) {
      case 'literacy':
        console.log(this.model)
        break;
      case 'customize_skills':
        console.log(this.model)
        break;
      case 'customize_literacy':
        console.log(this.model)
        break;
      default:
        break
    }
  }
  close() {
    this.model.show = false
  }
  saveUser() {
    let params = {
      uid: this.$route.params.id,
      name: this.userInfos.name,
      gender: this.userInfos.gender,
      wechat: this.userInfos.wechat,
      signature: this.userInfos.signature,
      position: this.userInfos.position,
      email: this.userInfos.email,
      companyEmail: this.userInfos.companyEmail
    }
    if(this.userInfos.avatars.length) {
      params = Object.assign(params, {avatars: this.userInfos.avatars.map(field => field.id).join(',')})
    }
    editUsermanageInfosApi(params)
  }
  getLabelProfessionalLiteracyList() {
    return getLabelProfessionalLiteracyListApi().then(res => this.labelProfessionalLiteracyList = res.data.data)
  }
  getLabelProfessionalSkillsList() {
    return getLabelProfessionalSkillsListApi().then(res => this.labelProfessionalSkillsList = res.data.data.labelProfessionalSkills)
  }
  createLabelProfessionalSkills() {
    return createLabelProfessionalSkillsApi({uid: this.$route.params.id})
  }
  getLabelItem(index) {
    this.labelProfessionalLiteracyList[index].active = !this.labelProfessionalLiteracyList[index].active
    let activeList = this.labelProfessionalLiteracyList.filter(field => field.active)
    this.model.list = this.labelProfessionalLiteracyList
    this.model.selected = activeList
  }
  handleAvatarLoaded(e) {
    let formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img', e)
    uploadApi(formData).then(res => this.model.avatar = res.data.data[0])
  }
  /**
   * @Author   小书包
   * @DateTime 2018-12-03
   * @detail  点击选择图片
   * @return   {[type]}   [description]
   */
  handleChooseImage(dom) {
    document.querySelector(dom).click()
    document.querySelector(dom).value = ''
  }
  /**
   * @Author   小书包
   * @DateTime 2018-12-03
   * @detail   处理选中的图片
   * @return   {[type]}   [description]
   */
  handleChangeImage(dom) {
    let fileLists = document.querySelector(dom).files
    fileLists = Array.from(fileLists).slice(0, this.model.limit - this.userInfos.avatars.length)
    Array.from(fileLists).map((file, index) => {
      let reader = new FileReader()
      let formData = new FormData()
      reader.readAsDataURL(file)
      // 开始
      reader.onloadstart = (res) => {}
      // 正在读取
      reader.onprogress = (res) => {}
      // 中断
      reader.onabort = (res) => {}
      // 出错
      reader.onerror = (res) => {}
      // 成功读取
      reader.onload = (res) => {
        let isLt5M = file.size / 1024 / 1024 > 5
        if(isLt5M) {
          this.$message.error('上传的图片大小是5MB~')
          return false
        }
      }
      // 读取完成，无论成功失败
      reader.onloadend = (res) => {}
      formData.append(`img${index + 1}`, file)
      formData.append('attach_type', 'img')
      this.xhr = new XMLHttpRequest()
      if(this.userInfos.avatars.length !== this.model.limit) {
        this.handleUploadImage(formData)
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-12-03
   * @detail   上传选中的图片
   * @return   {[type]}         [description]
   */
  handleUploadImage(formData) {
    this.xhr.open('post', upload_api, true)
    this.xhr.setRequestHeader('Authorization-Admin', getAccessToken())
    // 上传成功
    this.xhr.onload = (res) => {
      this.userInfos.avatars.unshift(JSON.parse(res.target.responseText).data[0])
    }
    // 上传失败
    this.xhr.onerror = (res) => {}
    // 上传进度
    this.xhr.upload.onprogress = (res) => {}
    this.xhr.send(formData)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-23
   * @detail   取消某一张图片上传
   * @return   {[type]}        [description]
   */
  handleRemoveUploadImage(index) {
    this.userInfos.avatars.splice(index, 1)
  }
  editUsermanageInfos(userInfo) {
    let uid = this.$route.params.id
    let funcApi = this.$route.query.isFromCheck ? editApplyUserInfoApi : editUserApi
    let tem = {real_name: userInfo.name, gender: userInfo.gender }
    let params = this.$route.query.isFromCheck ? tem : userInfo
    return funcApi(uid, params)
  }
  created() {
    this.getUserInfo()
    this.getLabelProfessionalLiteracyList()
    this.getLabelProfessionalSkillsList()
    // this.getRecruiterBaseInfo()
    this.getRecruiterBrief()
    this.getRecruiterLabel()
    this.getRecruiterLabelsLists()
  }
}
</script>

<style lang="less" scoped="scoped">
#edit_recruiter{
  margin: 20px 20px 20px 220px;
  text-align: left;
  background: white;
  border: 1px solid #cccccc;
  padding: 20px;
  h3{
    color: #354048;
    font-size: 20px;
    padding-bottom: 16px;
    padding-left: 10px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 32px;
  }
  .m_h1, .m_h2{
    margin-bottom: 5px;
  }
  .label_ul {
    height: 40px;
    li{
      padding: 0 20px;
      line-height: 30px;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: #ccc;
      border-radius: 2px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      vertical-align: middle;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
    }
    .active{
      border-color: red;
      color: red;
    }
  }
  .html_content_box{
    height: 250px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .html_content_box::-webkit-scrollbar {
   width: 4px;
  }
  .html_content_box::-webkit-scrollbar-track {
   background:rgba(0,0,0,.1);
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius:20px;
  }
  .html_content_box::-webkit-scrollbar-thumb {
   background:rgba(0,0,0,1);
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius:20px;
  }
  .el-dialog__body{
    padding-top: 0;
    padding-bottom: 0;
  }
  .label_ul_dialog {
    li{
      padding: 0 20px;
      line-height: 30px;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: #ccc;
      border-radius: 2px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      vertical-align: middle;
      display: inline-block;
      margin-right: 10px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .active{
      border-color: #3a8ee6;
      color: #3a8ee6;
    }
  }
  .html_content_box_01{
    margin: 20px;
  }
  .common-list {
  li {
    width:88px;
    height:88px;
    background:rgba(245,247,250,1);
    border-radius:4px;
    position: relative;
    display: inline-block;
    margin-right: 24px;
    margin-bottom: 24px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover{
      .btn-close{
        opacity: 1
      }
    };
  }
  .upload-li {
    position: relative;
    box-sizing: border-box;
    border: dotted 1px #DCDCDC;
    background: #f5f7fa;
    border-radius: 5px;
    overflow: hidden;
    .el-upload {
      width: 100%;
      height: 100%;
    }
    .el-icon-plus {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #DCDCDC;
      font-size: 24px;
    }
  }
  .btn-close{
    position: absolute;
    top: 0;
    right: 0;
    color: #BCBCBC;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    z-index: 2;
    text-align: center;
    line-height: 88px;
    border-radius: 5px;
    overflow: hidden;
    color: white;
    transition: all ease .4s;
    opacity: 0;
  }
  .el-progress--circle{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
}
</style>
<style lang="less">
#edit_recruiter{
  .el-dialog__body{
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>