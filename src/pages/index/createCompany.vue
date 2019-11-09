<!--创建公司-->
<template>
  <div class="createCompany">
    <div class="header">
      <div class="creatTab" @click.stop="tab">
        <div class="Info" :class="{'active': active === 0 }">公司信息</div>
        <div class="userInfo" v-if="isCreated!==true" :class="{'active': active === 1 }">账户设置</div>
      </div>
      <div>
        <el-button @click.stop="createdCompany" v-show="active === 0 && !isEdit">保存</el-button>
        <el-button @click.stop="createdCompany" v-show="active === 0 && isEdit">保存编辑</el-button>
        <el-button @click.stop="saveSaller" v-show="active === 1 && isEdit">保存</el-button>
      </div>
    </div>
    <!--公司信息表格-->
    <div class="companyInfo" v-if="active === 0">
      <div class="point"></div>
      
      <el-form
        class="edit-form"
        ref="companyInfo"
        :rules="companyInfoRules"
        :model="companyInfo"
        label-width="150px"
        label-suffix="："
      >
        <h3>公司信息</h3>
        <!--工牌/名片/在职证明-->
        <el-form-item class="full" label="公司LOGO" prop="icon">
          <image-uploader
            :width="iconUploader.width"
            :height="iconUploader.height"
            type="logo"
            v-model="form.logo"
            @loaded="handleIconLoaded"
          />
        </el-form-item>

        <el-form-item label="公司全称" prop="company_name">
          <el-input
            v-model="companyInfo.company_name"
            placeholder="请输入名称"
            :minlength="2"
            :disabled="can_company_input"
            :maxlength="50"
            style="width: 400px;"
            v-if="!isEdit"
          >
            <el-button slot="append" @click="isShowCompany=true">修改</el-button>
          </el-input>
          <el-input
            v-model="companyInfo.company_name"
            placeholder="请输入名称"
            :minlength="2"
            disabled
            :maxlength="50"
            style="width: 400px;"
            v-if="isEdit"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="公司简称" prop="company_shortname">
          <el-input
            v-model="companyInfo.company_shortname"
            placeholder="请输入名称"
            :maxlength="10"
            style="width: 400px;"
          ></el-input>
        </el-form-item> -->

        <el-form-item label="所属行业" prop="industry_id">
          <el-select
            style="width: 400px;"
            ref="tagSelector"
            v-model="companyInfo.industry_id"
            placeholder="请选择所属行业"
          >
            <el-option
              v-for="item in industry"
              :label="item.name"
              :value="item.labelId"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="融资阶段" prop="financing">
          <el-select
            style="width: 400px;"
            ref="tagSelector"
            v-model="companyInfo.financing"
            placeholder="请选择融资阶段"
          >
            <el-option
              v-for="item in financing"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="人员规模" prop="employees">
          <el-select
            style="width: 400px;"
            ref="tagSelector"
            v-model="companyInfo.employees"
            placeholder="请选择人员规模"
          >
            <el-option
              v-for="item in employees"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item
          label="公司地址"
          prop="address_id"
          style="width: 380px;"
          v-if="!$route.params.checkId"
        >
          <span class="addAdress" @click.stop="changeAdress">
            <i class="el-icon-circle-plus" style="color: #67C23A;"></i>点击添加公司地址
          </span>
          <span class="AdressList" v-for="(item, index) in adressList" :key="index">
            <i
              @click.stop="delAdress(index)"
              class="el-icon-remove"
              style="color: rgb(245, 108, 108);"
            ></i>
            {{`${item.address}${item.doorplate}`}}
          </span>
        </el-form-item> -->

        <el-form-item class label="团队福利">
          <div class="label" :key="i" v-for="(item, i) in welfarearr">
            <span class="temalabel">{{item.title}}</span>
            <!-- <i @click="deletelabel(i)">X</i> -->
            </div>
          <span class="addlabelbtn" @click="addlabel">添加标签</span>
        </el-form-item>
        
        <el-form-item label="公司图片" prop="input" v-if="!$route.params.checkId" >
          <ul class="common-list">
            <li
              v-for="(imageItem, imageIndex) in commonList"
              :key="imageIndex"
              :data-key="imageIndex"
              class="draggable"
              :style="`background-image: url(${imageItem.smallUrl}); background-size: cover; background-repeat: no-repeat; background-position: center center;`"
              draggable="true">
              <div class="btn-close" @click="handleRemoveUploadImage(imageIndex)"><i class="el-icon-delete"></i></div>
            </li>
            <li class="upload-li" v-if="commonList.length < 20" @click="handleChooseImage">
              <i class="el-icon-plus"></i>
              <input type="file" multiple="multiple" @change="handleChangeImage" style="display: none;" id="image" name="image" accept="image/*" />
            </li>
          </ul>
        </el-form-item>

        <el-form-item class label="公司简介" style="width: 640px;">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            :maxlength="5000"
            v-model="companyInfo.intro"
          ></el-input>
        </el-form-item>

        <el-form-item class label="公司官网" style="width: 640px;">
          <el-input placeholder="请输入官网" :maxlength="5000" v-model="companyInfo.website"></el-input>
        </el-form-item>

        <!-- 邮箱验证 -->
        <el-form-item class="email" label="公司邮箱" prop="icon" v-show="companyInfo.company_name">
          <span @click.stop="email.isShow = true" v-if="companyInfo.email">
            {{companyInfo.email}} 更改邮箱
            <i class="el-icon-edit"></i>
          </span>
          <span @click.stop="email.isShow = true" v-else>验证邮箱</span>
        </el-form-item>

        <h3>{{$route.query.from === "cp" ? '' : '产品介绍'}}</h3>
        <div v-for="(item, index) in companyInfo.product">
          <el-form-item class="full" label="产品logo" prop="icon">
            <image-uploader
              width="250"
              height="250"
              :showBtn="item.isEditing"
              v-model="item.logoInfo.url || ''"
              @loaded="handleProductIconLoaded"
            />
            <div class="func_zone" style="position: absolute;right: 0;top: 0;" v-if="!item.isEditing">
              <el-button type="text" @click="editAction(index)">编辑</el-button>
              <el-button type="text" @click="deleteAction(item)">删除</el-button>
            </div>
          </el-form-item>

          <el-form-item
            label="产品名称"
            prop="input"
            v-if="!$route.params.checkId"
          >
            <el-input v-model="item.productName" placeholder="请输入产品名称" style="width: 400px;" :disabled="!item.isEditing"></el-input>
          </el-form-item>

          <el-form-item
            label="产品官网"
            prop="input"
            v-if="!$route.params.checkId"
          >
            <el-input v-model="item.siteUrl" placeholder="请输入产品官网" style="width: 400px;" :disabled="!item.isEditing"></el-input>
          </el-form-item>

          <el-form-item
            label="产品slogan"
            prop="input"
            v-if="!$route.params.checkId"
          >
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入产品slogan"
              :maxlength="5000"
              v-model="item.slogan"
              :disabled="!item.isEditing"
              style="width: 400px;"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="产品亮点"
            prop="input"
            v-if="!$route.params.checkId"
          >
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入产品亮点"
              :maxlength="5000"
              style="width: 400px;"
              :disabled="!item.isEditing"
              v-model="item.lightspot"
            ></el-input>
          </el-form-item>
          <el-form-item class="button_box" v-if="item.isEditing">
            <el-button size="small" type="primary" @click="cancleEditCompanyProduct">取消</el-button>
            <el-button size="small" type="primary" @click="editCompanyProduct">保存</el-button>
          </el-form-item>
          <div class="line" style="height: 1px;background: #ebeef5;width: 100%; margin-bottom: 20px;" v-if="companyInfo.product.length !== index + 1"></div>
        </div>
        <div v-show="!$route.query.from" class="add_product" @click="addAction" v-if="!companyInfo.product.length || companyInfo.product[companyInfo.product.length - 1].actionType === 'edit'"><i class="el-icon-plus"></i> 添加公司产品</div>
      </el-form>
    </div>
    <!-- 跟进销售设置 -->
    <div class="editWindow" v-if="active === 1">
      <div class="sales" v-if="AdminShow === 0 || AdminShow === 4 || AdminShow === 2">
        <h3>跟进销售</h3>
        <el-form>
          <el-form-item label="跟进销售">
            <el-select
              style="width: 400px;"
              ref="salesList"
              v-model="companyInfo.adminName"
              placeholder="请选择跟进销售"
              @change="ground"
            >
              <!-- <el-option label="全部" :value="all" v-if="AdminShow==4"/> -->
              <el-option label="无" :value="0" />
              <el-option
                v-for="(item, index) in salesList"
                :label="item.realname"
                :value="item.id"
                :key="index"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="sales" v-if="(AdminShow === 0||AdminShow === 5) && $route.path.includes('/index/editCompany')">

        <h3>跟进顾问</h3>
        <el-form>
          <el-form-item label="跟进顾问">
            <el-select
              style="width: 400px;"
              v-model="companyInfo.advisorName"
              placeholder="请选择跟进顾问"
              @change="ground1"
            >
              <el-option
                v-for="(item, index) in advisorUserList"
                :label="item.realname"
                :value="item.id"
                :key="index"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div> 
    </div>

    <!--添加新公司地址弹窗-->
    <div class="pop" v-show="pop.isShow">
      <map-search @popCancel="popCancel" @addAdress="addAdress"></map-search>
    </div>
    <!-- 添加邮箱 -->
    <div class="emailBox" v-show="email.isShow">
      <email-check :companyName="companyInfo.company_name" @save="save" @close="close"></email-check>
    </div>
    <!-- 修改公司名 -->
    <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      title="新建公司"
      :visible.sync="isShowCompany"
      width="30%"
      :center="true"
    >
      <el-form ref="companyName" :model="companyName" :rules="NameRules" label-width="80px">
        <el-form-item prop="name">
          <el-input v-model="companyName.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCompany = false">取 消</el-button>
        <el-button type="primary" @click="saveCompanyName">保存</el-button>
      </span>
    </el-dialog>
    <!-- 绑定管理员 -->
    <div v-if="showAdminWindow" class="bindAdminWindo" @click.self="closeAdminWindow">
      <admin-control
        :companyInfo="companyInfo"
        @close="closeAdmin"
        :isBindAdmin="isBindAdmin"
        :isNewCompany="isNewCompany"
        :companyName="companyInfo.companyName"
        :nextAdmin="nextAdmin"
      ></admin-control>
    </div>

    <div class="labeldiggle">
		 <el-dialog
      title=""
      :visible.sync="labelVisible"
			height="400px"
      width="612px"
      center>
			<div class="addlabel clearfix">
				<div class="top"> 
					<div class="line-bold"></div>
					<div class="name">选择团队福利</div>
				</div>
				<div :class="['item', item.cur ? 'active' : '']" @click="selectlabel(item), i" :key="i" v-for="(item, i) in labellist">{{item.title}}</div>
				<div class="nolabel">
					<span>未找到合适的，</span>
					<span class="bg" @click="addlabelitem()">添加自定义标签</span>
					<div class="textinput" v-show="labelshow">
						<div class="title">新建自定义标签</div>
						<div class="text">
							<input type="text" v-model="follow" maxlength="7" placeholder="请输入标签名" @input="follow=follow.replace(/\s+/g,'')">
							<span class="leng">{{follow.length}}/7</span>
						</div>
						<div class="quxiao" @click="quxiao()">取消</div>
						<div class="queding" @click="sureaddlabel()">确定</div>
					</div>
					</div>
					<div class="btn">
						<div class="sure" @click="btnsure()">确定</div>
							<div class="exit" @click="labelVisible = false">取消</div>
					</div>
			</div>
    </el-dialog>
		</div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import ImageUploader from "@/components/imageUploader";
import emailCheck from "@/components/email/email";
import { getAccessToken } from "@/api/cacheService.js";

import {
  upload_api
} from '@/api/index.js'
import {
  fieldApi,
  uploadApi,
  getSalerListApi,
  getAdvisorUserListApi,
  setCompanyAdvisorApi
} from "API/commont";
import adminControl from "@/components/adminControl/index";
import {
  setCompanyInfoApi,
  addCompanyAddressApi,
  delCompanyAddressApi,
  verifyEmailApi,
  checkCompanyNameApi,
  getCompanyInfoApi,
  editCompanyApi,
  getCheckCompanyInfoApi,
  editCheckCompanyInfoApi,
  editCheckCompanyFollowUserApi,
  editCompanyFollowUserApi,
  setCompanyCompanyAdvisorApi,
  addCompanyProductApi,
  editCompanyProductApi,
  getCompanyProductApi,
  deleteCompanyProductApi,
  getCompanyProductListsApi,
  labelTeamlist,
  createlabelTeam
} from "API/company";
import mapSearch from "@/components/map";
@Component({
  name: "createCompany",
  components: {
    adminControl,
    ImageUploader,
    mapSearch,
    emailCheck
  }
})
export default class createCompany extends Vue {
  imagesLists = null
  realImgSrc = null
  xhr = null
  commonList = []
  temProductList = []
  imageUpload = {
    list: [],
    limit: 20,
    accept: '.png,.jpg',
    tips: 'JPG、PNG格式，最多可上传9张',
    params: {
      'Authorization-Admin': getAccessToken(),
      attach_type: 'img',
    }
  }
  AdminShow = ''
  newComponyId = ''
  isEdit = false
  active = 0
  adressList = []
  isShowCompany = false
  isBindAdmin = 0
  isNewCompany = false
  companyName = {
    name: ""
  }
  isCreated = false
  can_company_input = true
  pop = {
    isShow: false,
    type: 'position'
  };
  email = {
    isShow: false
  }
  nextAdmin = {}
  showAdminWindow = false
  follow = ''
  welfarearr = []
  companyInfo = {
    real_name: '',
    user_email: '',
    user_position: '',
    company_name: '',
    company_shortname: '',
    mobile: '',
    admin_uid: '',
    industry_id: '',
    groupId: '',
    financing: '',
    employees: '',
    welfare: '',
    business_license: '',
    on_job: '',
    intro: '',
    email: '',
    logo: '',
    website: '',
    address: [],
    adminName: '',
    one_sentence_intro: '',
    images: '',
    product: []
  };
  dialogImageUrl = ''
  dialogVisible = false
  labelVisible = false
  labelshow = false
  labellist = []
  financing = [
    { name: "未融资", id: 1 },
    { name: "天使轮", id: 2 },
    { name: "A轮", id: 3 },
    { name: "B轮", id: 4 },
    { name: "C轮", id: 5 },
    { name: "D轮及以上", id: 6 },
    { name: "已上市", id: 7 },
    { name: "不需要融资", id: 8 }
  ]
  employees = [
    { name: "0-20人", id: 1 },
    { name: "20-99人", id: 2 },
    { name: "100-499人", id: 3 },
    { name: "500-999人", id: 4 },
    { name: "1000-9999人", id: 5 },
    { name: "10000人以上", id: 6 }
  ]
  salesList = [];
  industry = []
  iconUploader = {
    point: '',
    width: 400,
    height: '',
    tips: '建议尺寸400X400px，JPG、PNG格式，图片小于5M。'
  }
  form = {
    logo: '',
    icon1: '',
    icon2: ''
  }
  NameRules = {
    name: [{ validator: this.companyNameRule, trigger: 'blur' }]
  }
  companyInfoRules = {
    company_name: [
      {
        required: true,
        message: '公司全称必填，要求2-50个字',
        trigger: 'blur',
        max: 50,
        min: 2
      },
      { validator: this.companyNameRule, trigger: 'blur' }
    ],
    industry_id: [
      { required: true, message: '所属行业必选', trigger: 'change' }
    ],
    financing: [{ required: true, message: '融资情况必选', trigger: 'change' }],
    employees: [{ required: true, message: '人员规模必选', trigger: 'change' }]
  }
  advisorUserList = []
  // 关闭
  closeAdmin(e) {
    this.showAdminWindow = false;
    if (e && e.needLoad) {
      this.$set(this.companyInfo, 'realname', sessionStorage.getItem('name'))
    }
  }
  /* 保存公司名 */
  saveCompanyName() {
    if (this.companyName.name === '') return
    this.isShowCompany = false;
    this.$set(this.companyInfo, "company_name", this.companyName.name)
  }
  closeAdminWindow() {
    this.showAdminWindow = false
  }
  ground(e) {
    let result = this.salesList.find(field => field.id === e);
    this.companyInfo.groupId = result.groupId;
    this.companyInfo.admin_uid = result.id;
  }
  ground1(e) {
    let item = this.advisorUserList.find(field => field.id === e)
    this.companyInfo.advisorUid = item.id
    this.companyInfo.advisorName = item.realname
    this.companyInfo.advisorGroupId = item.groupId
  }
  /* 自定义公司名称校验规则 */
  companyNameRule = (rule, value, callback) => {
    let reg = /\d+/g;
    let arr = value.match(reg);
    if (arr) {
      this.companyName.name = "";
      callback(new Error("公司名称不能使用阿拉伯数字"));
    } else {
      checkCompanyNameApi({ company_name: value }).then(res => {
        if (res.data.data.exist) {
          this.companyName.name = "";
          callback(new Error("公司名称已被注册，请重新输入"));
        } else {
          callback();
        }
      })
      .catch(err => {
        this.companyName.name = ""
      });
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2019-07-19
   * @detail   顾问推荐 - 顾问列表
   * @return   {[type]}   [description]
   */
  getAdvisorUserList() {
    getAdvisorUserListApi().then(res => this.advisorUserList = res.data.data)
  }
  /* 切换tab */
  tab(e) {
    if (e.target.className === "userInfo") {
      this.active = 1
      if (this.salesList.length > 0) return
      getSalerListApi().then(res => this.salesList = res.data.data)
    } else {
      this.active = 0
    }
  }
  /* 创建公司 */
  async createdCompany() {
    let companyInfo = {}
    this.companyInfo.address = this.adressList;
    this.$refs["companyInfo"].validate(async valid => {
      if (valid) {
        let { id, checkId } = this.$route.params;

        if (this.isEdit) {
          // 编辑正式库
          if (id) {
            delete this.companyInfo.adminUid;
            let images = this.commonList.map(field => field.id).join(',')
            let params = Object.assign(this.companyInfo, {images})
            await editCompanyApi(id, params);
            this.$message({
              message: "编辑成功",
              type: "success"
            });
          } else {
            /* 编辑审核库 */
            delete this.companyInfo.admin_uid;

            try {
              await editCheckCompanyInfoApi(checkId, this.companyInfo);
              this.$message({
                message: "编辑成功",
                type: "success"
              });
            } catch (err) {
            }
          }
        } else {
          let admin_uid = sessionStorage.getItem("admin_uid");
          this.$set(this.companyInfo, "admin_uid", admin_uid);
          this.showAdminWindow = true;
          this.isBindAdmin = 0;
          this.isNewCompany = true;
        }
      } else {
        return false;
      }
    });
  }
  mounted() {
    this.AdminShow = +sessionStorage.getItem("AdminShow");
    this.getAdvisorUserList()
    if (this.$route.query.isCreated) {
      this.isCreated = this.$route.query.isCreated;
      this.isShowCompany = true;
      this.active = 0;
    }
  }
  /* 保存跟进人 */
  async saveSaller() {
    let { id, checkId } = this.$route.params;
    if (id) {
      // 数字代表权限的ip
      if([0,1,2,3,4].includes(Number(this.AdminShow))) {
        await editCompanyFollowUserApi(
          id,
          this.companyInfo.admin_uid,
          this.companyInfo.groupId
        );
      }

      if([0,5].includes(Number(this.AdminShow))) {
        if(this.companyInfo.advisorUid) {
          await setCompanyAdvisorApi({id,advisorGroupId: this.companyInfo.advisorGroupId, advisorUid: this.companyInfo.advisorUid})
        }
      }
      
    } else {
      await editCheckCompanyFollowUserApi(
        checkId,
        this.companyInfo.admin_uid,
        this.companyInfo.groupId
      );
      if(this.companyInfo.advisorUid) {
        await setCompanyAdvisorApi({id,advisorGroupId: this.companyInfo.advisorGroupId, advisorUid: this.companyInfo.advisorUid})
      }
    }

    this.$message({
      type: "success",
      message: "编辑成功"
    });
    this.$router.go(-1)
    // aaa
  }
  handleIconLoaded(e) {
    let formData = new FormData();
    formData.append("attach_type", "img");
    formData.append("img", e);
    uploadApi(formData).then(res => {
      if (e.uploadType === "business_license") {
        this.companyInfo.business_license = res.data.data[0].id;
      } else if (e.uploadType === "on_job") {
        this.companyInfo.on_job = res.data.data[0].id;
      } else if (e.uploadType === "logo") {
        this.companyInfo.logo = res.data.data[0].id;
      } else if (e.uploadType === "front") {
        this.personalInfo.passport_front = res.data.data[0].id;
      } else if (e.uploadType === "reverse") {
        this.personalInfo.passport_reverse = res.data.data[0].id;
      } else if (e.uploadType === "handheld") {
        this.personalInfo.handheld_passport = res.data.data[0].id;
      }
    });
  }
  /* 所属行业标签 */
  getfieldList() {
    fieldApi().then(res => {
      this.industry = res.data.data;
    });
  }

  /* 工作地点选择 */
  changeAdress(e) {
    this.pop = {
      isShow: true,
      type: "addAdress"
    };
  }
  /* 关闭地址选择 */
  popCancel() {
    this.pop = {
      isShow: false,
      type: "addAdress"
    };
  }
  /* 添加地址 */
  addAdress(address) {
    this.adressList.push(address.data);
  }
  /* 删除地址 */
  async delAdress(index) {
    if (this.adressList[index].id)
      await delCompanyAddressApi(this.adressList[index].id);
    this.adressList.splice(index, 1);
    this.companyInfo.address = this.adressList;
  }
  /* 邮箱弹窗 */
  save(param) {
    verifyEmailApi(param).then(res => {
      this.email.isShow = false;
      this.companyInfo.email = param.email;
      this.$message({
        type: "success",
        message: "邮箱验证成功"
      });
    });
  }
  close() {
    this.email.isShow = false;
  }

  /* 获取编辑公司信息 */
  async getCompanyInfo() {
    let { id } = this.$route.params;
    let res = await getCompanyInfoApi(id);
    let newCompanyInfo = res.data.data.companyInfo;
    this.setCompanyInfo(newCompanyInfo);
  }

  /* 获取审核公司信息 */
  async getCheckCompanyInfo() {
    let { checkId } = this.$route.params;
    let res = await getCheckCompanyInfoApi(checkId);
    let newCompanyInfo = res.data.data.companyInfo;
    this.setCompanyInfo(newCompanyInfo);
  }

  /* 填充原公司数据 */
  setCompanyInfo(newCompanyInfo) {
    let admin_uid = sessionStorage.getItem("admin_uid");
    let productList = newCompanyInfo.product || []
    productList.map(field => {
      field.isEditing = false
      field.actionType = 'edit'
    })
    this.companyInfo = {
      company_name: newCompanyInfo.companyName,
      company_shortname: newCompanyInfo.companyShortname,
      industry_id: newCompanyInfo.industryId ? newCompanyInfo.industryId : "",
      financing: newCompanyInfo.financing
        ? parseInt(newCompanyInfo.financing)
        : "",
      employees: newCompanyInfo.employees
        ? parseInt(newCompanyInfo.employees)
        : "",
      intro: newCompanyInfo.intro,
      business_license: newCompanyInfo.businessLicenseInfo.id || "",
      on_job: newCompanyInfo.onJobInfo.id || "",
      logo: newCompanyInfo.logoInfo.id || "",
      website: newCompanyInfo.website,
      address: newCompanyInfo.address ? newCompanyInfo.address : [],
      email: newCompanyInfo.email,
      admin_uid: parseInt(newCompanyInfo.adminUid), //跟进人员
      adminName: newCompanyInfo.adminName,
      advisorUid: newCompanyInfo.advisorUid,
      groupId: newCompanyInfo.groupId,
      advisorName: newCompanyInfo.advisorName === '无' ? '' : newCompanyInfo.advisorName,
      advisorGroupId : newCompanyInfo.advisorGroupId,
      one_sentence_intro: newCompanyInfo.oneSentenceIntro,
      product: productList
    };
    this.temProductList = [].concat(productList)
    this.commonList = newCompanyInfo.albumInfo
    let arr = []
    newCompanyInfo.welfare.map((v, k) => {
      arr.push(v.labId)
    })
    this.companyInfo.welfare = arr.join(',')
    this.welfarearr = newCompanyInfo.welfare
    if (Reflect.has(newCompanyInfo, 'albumInfo')) {
      this.imagesLists = newCompanyInfo.albumInfo.map(field => field.url)
    }
    // 上传证件信息
    this.form = {
      logo: newCompanyInfo.logoInfo.url || "", // logo
      icon1: newCompanyInfo.businessLicenseInfo.url || "", // 营业执照
      icon2: newCompanyInfo.onJobInfo.url || "" // 工牌/名片/在职证明
    };
    this.adressList = newCompanyInfo.address ? newCompanyInfo.address : [];
  }

  init() {
    let { isEditSaller } = this.$route.query;
    let { id, checkId } = this.$route.params;
    if (id || checkId) {
      // 是否编辑公司信息
      this.isEdit = true;
      this.companyInfoRules.company_name.splice(1, 1);
      if (id) {
        this.getCompanyInfo();
      } else {
        this.getCheckCompanyInfo();
      }
    }
    this.getlabellist()
    this.getfieldList();
    // 编辑跟进人
    if (isEditSaller) {
      this.active = 1;
      getSalerListApi().then(res => {
        this.salesList = res.data.data;
      });
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2018-12-03
   * @detail  点击选择图片
   * @return   {[type]}   [description]
   */
  handleChooseImage() {
    document.querySelector('#image').click()
    document.querySelector('#image').value = ''
  }
  /**
   * @Author   小书包
   * @DateTime 2018-12-03
   * @detail   处理选中的图片
   * @return   {[type]}   [description]
   */
  handleChangeImage() {
    let commonList = this.commonList
    let fileLists = document.querySelector('#image').files
    fileLists = Array.from(fileLists).slice(0, 20 - this.commonList.length)
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
      if(this.commonList.length !== this.imageUpload.limit) {
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
    let index = this.commonList.length
    this.xhr.open('post', upload_api, true)
    this.xhr.setRequestHeader('Authorization-Admin', getAccessToken())
    // 上传成功
    this.xhr.onload = (res) => {
      this.commonList.push(JSON.parse(res.target.responseText).data[0])
      this.imagesLists = this.commonList.map(field => field.url)
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
    this.commonList.splice(index, 1)
    this.imagesLists = this.commonList.map(field => field.url)
  }
  editAction(index) {
    this.companyInfo.product.map((field, i) => {
      field.isEditing = false
      if(i === index) field.isEditing = true
    })
  }
  addlabel () {
    this.labelVisible = true
    this.labellist= this.labellist.filter(item => {
      let idList= this.welfarearr.map(v => v.labId)
      if(idList.includes(item.id)){
        item.cur = true
      }
      return item
    })
  }
  // 点击自定义标签
  addlabelitem () {
    this.labelshow = !this.labelshow 
  }
  quxiao () {
    this.labelshow = false
  }
  selectlabel (data, i) {
    data.cur = !data.cur
  }
  btnsure () {
  let arr = []
  let titlearr = []
  this.labellist.map((v, k) => {
    if (v.cur) {
      arr.push(v.id)
      titlearr.push({title: v.title})
    }
  })
  if (titlearr.length >= 9) {
    this.$message({
      message: '最多只能添加8个标签',
      type: 'warning'
    })
  } else {
    this.companyInfo.welfare = arr.join(',')
    this.welfarearr = titlearr
    this.labelVisible = false
  }
  }
  		// 确定添加
		sureaddlabel () {
      let data = {title: this.follow}
			if (this.follow === '') {
				this.$message({
          message: '标签名字不能为空哦',
          type: 'warning'
        })
			} else {
				createlabelTeam(data).then((res) => {
					this.$message({
						message: '添加成功',
						type: 'success'
					})
					this.follow = ''
					this.getlabellist()
					this.labelshow = false
				})
			}
		}

  getlabellist () {
    labelTeamlist().then((res) => {
      let arr = res.data.data
      arr.map((v, k) => {
        v.cur = false
      })
      this.labellist = arr
    })
  }
  deleteAction(data) {
    let params = {id: data.id}
    deleteCompanyProductApi(params).then((res) => {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.getCompanyInfo();
    })
    // this.companyInfo.product.splice(index, 1)
  }
  addAction() {
    this.companyInfo.product.push({
      actionType: 'add',
      id: '',
      product_name: '',
      slogan: '',
      lightspot: '',
      site_url: '',
      logo: 0,
      logoInfo: {
        smallUrl: ''
      },
      isEditing: true
    })
  }
  cancleEditCompanyProduct() {
    this.init()
  }
  editCompanyProduct() {
    let query = this.$route.params
    let item = this.companyInfo.product.find(field => field.isEditing)
    let params = {
      product_name: item.productName,
      logo: item.logoInfo.id,
      slogan: item.slogan,
      lightspot: item.lightspot,
      site_url: item.siteUrl
    }
    if(item.actionType === 'edit') {
      params = Object.assign(params, {id: item.id})
      editCompanyProductApi(params).then(() => this.init())
    } else {
      params = Object.assign(params, {company_id: query.id})
      addCompanyProductApi(params).then(() => this.init())
    }
  }
  handleProductIconLoaded(e) {
    let formData = new FormData();
    formData.append("attach_type", "img");
    formData.append("img", e);
    uploadApi(formData).then(res => {
      let infos = res.data.data[0]
      this.companyInfo.product.find(field => {
        if(field.isEditing) field.logoInfo = infos
      })
    });
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-28
   * @detail   图片重新排序
   * @return   {[type]}   [description]
   */
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped="scoped">
.bindAdminWindo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
.createCompany {
  .header {
    padding-right: 20px;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    height: 80px;
    border: 1px solid #cccccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .creatTab {
      height: 100%;
      > div {
        cursor: pointer;
        line-height: 80px;
        border: 1px solid #cccccc;
        width: 100px;
        height: 100%;
        display: inline-block;
        &.active {
          background-color: #652791;
          border: none;
          color: #ffffff;
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
  .sales {
    padding: 0 32px;
    text-align: left;
    .point {
      font-size: 14px;
      color: #ffffff;
      background-color: #652791;
      padding: 10px;
      text-align: center;
      margin-bottom: 30px;
      margin-left: -32px;
      margin-right: -32px;
    }
  }
  .sales {
    border-radius: 4px;
    padding: 30px 32px;
    h3 {
      font-size: 25px;
      font-weight: 500;
      color: #652791;
      margin-bottom: 20px;
    }
  }
  .companyInfo,
  .personalInfo {
    border: 1px solid #cccccc;
    border-radius: 4px;
    h3 {
      color: #354048;
      font-size: 20px;
      padding-bottom: 16px;
      padding-left: 10px;
      border-bottom: 1px solid #ebeef5;
      margin-bottom: 32px;
    }
  }
  .addAdress {
    cursor: pointer;
  }
  .AdressList {
    cursor: pointer;
    white-space: nowrap;
    i {
      margin-right: 5px;
      cursor: pointer;
    }
    display: block;
  }
  .email {
    color: #652791;
    cursor: pointer;
  }
}
.emailBox {
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
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
.add_product{
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  height: 100px;
  cursor: pointer;
  line-height: 100px;
  vertical-align: top;
  text-align: center;
  font-size: 20px;
  margin-bottom: 22px;
}
.label{
  float: left;
  margin-right: 10px;
  .temalabel{
    padding: 3px 8px;
    border: 1px solid #3e294d;
    margin-right: 4px;
    color: #3e294d;
    font-size: 12px;
    border-radius: 16px;
  }
  i{
    color: #ccc;
    cursor: pointer;
  }
}
.addlabelbtn{
  padding: 3px 8px;
  border: 1px solid #3e294d;
  margin-right: 10px;
  color: #3e294d;
  font-size: 12px;
}
.labeldiggle{
	width: 100%;
	.addlabel{
		width: 100%;
		.top{
			width: 100%;
			height: 20px;
			margin-bottom: 26px;
			.line-bold{
				width:6px;
				height:16px;
				background:rgba(101,39,145,1);
				float: left;
			}
			.name{
				color:rgba(40,40,40,1);
				font-size: 16px;
				float: left;
				line-height: 20px;
        margin-left: 8px;
			}
		}
		.item{
			height:32px;
			padding: 0 34px;
			border-radius:18px;
			float: left;
			text-align: center;
			line-height: 32px;
			margin-right: 12px;
			margin-bottom: 16px;
			border:1px solid rgba(220,220,220,1);
		}
		.active{
			border-color: rgba(101,39,145,1);
			color:rgba(101,39,145,1);
		}
		.nolabel{
			width: 100%;
			position: relative;
			float: left;
			.bg{
				color:rgba(101,39,145,1);
				font-weight: bold;
			}
			.textinput{
				width:304px;
				height:184px;
				position:absolute;
				top: 32px;
				background:rgba(255,255,255,1);
				box-shadow:0px 2px 12px 0px rgba(0,0,0,0.06);
				border:1px solid rgba(237,237,237,1);
				.title{
					color:rgba(40,40,40,1);
					font-size: 14px;
					padding-top:35px;
					padding-left: 34px;
				}
				.text{
					width:244px;
					height:36px;
					line-height: 36px;
					background:rgba(255,255,255,1);
					border-radius:4px;
					padding-left: 12px;
					margin-left: 30px;
					margin-top: 15px;
					position: relative;
					border:1px solid rgba(220,220,220,1);
					input{
						background:rgba(255,255,255,1);
					border-radius:4px;
						line-height: 36px;
					}
					.leng{
						position: absolute;
						right: 12px;
						color: #DCDCDC;
					}
				}
				.quxiao{
					float: left;
					width:76px;
					height:28px;
					line-height: 30px;
					text-align: center;
					color:rgba(90,94,102,1);
					border-radius:14px;
					margin-top: 36px;
					margin-left: 106px;
					border:1px solid rgba(220,223,230,1);
				}
				.queding{
					float: left;
					width:76px;
					height:28px;
					line-height: 30px;
					text-align: center;
					margin-top: 36px;
					margin-left: 16px;
					color:rgba(255,255,255,1);
					background:rgba(101,39,145,1);
					border-radius:14px;
				}
			}
		}
		.btn{
				width: 100%;
				float: left;
				margin-top: 76px;
				.exit{
					width:80px;
					height:32px;
					background:rgba(255,255,255,1);
					border-radius:16px;
					color:rgba(53,64,72,1);
					font-size: 14px;
					text-align: center;
					line-height: 32px;
					float: right;
					margin-right: 16px;
					border:1px solid rgba(220,220,220,1);
				}
				.sure{
					width:80px;
					height:32px;
					background:rgba(101,39,145,1);
					border-radius:16px;
					color:rgba(255,255,255,1);
					font-size: 14px;
					text-align: center;
					float: right;
					line-height: 32px;
				}
			}
	}
}
</style>