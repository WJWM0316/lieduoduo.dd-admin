<!--创建公司-->
<template>
  <div class="createCompany">
    <div class="header">
      <div class="creatTab">
        <div class="Info" :class="{'active': active === 0 }" @click.stop="tab(0)">公司信息</div>
        <div class="userInfo" :class="{'active': active === 1 }" @click.stop="tab(1)">账户设置</div>
      </div>
      <div>
        <el-button v-if="companyInfo.bindWechat === '是'" @click.stop="generate(companyInfo.id, companyInfo.appId)">查看绑定小程序链接</el-button>
        <el-button v-else @click.stop="generate(companyInfo.id, companyInfo.appId)">生成绑定小程序链接</el-button>
        <el-button @click.stop="toEdit">编辑</el-button>
        <el-button @click.stop="bindAdmin" v-if="companyInfo.createdUid === 0">绑定管理员</el-button>
        <el-button @click.stop="delateAdmin" v-else>移除管理员</el-button>
      </div>
    </div>
    <!--大图蒙层-->
    <div class="mask" v-if="nowImg" @click.stop="hiddenMask">
      <vue-photo-zoom-pro type="circle" :width="250" :url="nowImg"></vue-photo-zoom-pro>
      <!--<img :src="nowImg"/>-->
    </div>
    <!--公司信息表格-->
    <div class="companyInfo" v-if="active === 0">
      <el-form
        class="edit-form"
        ref="companyInfo"
        :model="companyInfo"
        label-width="150px"
        label-suffix="："
      >
        <h3>公司信息</h3>
        <!--工牌/名片/在职证明-->
        <el-form-item class="full" label="公司LOGO" prop="icon" v-if="companyInfo.logoInfo">
          <img :src="companyInfo.logoInfo.smallUrl" alt>
        </el-form-item>

        <el-form-item label="公司全称" prop="company_name">
          <span>{{companyInfo.companyName}}</span>
        </el-form-item>

        <!-- <el-form-item label="公司简称" prop="company_shortname">
          <span>{{companyInfo.companyShortname}}</span>
        </el-form-item> -->

        <el-form-item label="所属行业" prop="industry_id">
          <span>{{companyInfo.industry}}</span>
        </el-form-item>
        <el-form-item label="融资阶段" prop="financing">
          <span>{{companyInfo.financingInfo}}</span>
        </el-form-item>

        <el-form-item label="人员规模" prop="employees">
          <span>{{companyInfo.employeesInfo}}</span>
        </el-form-item>

        <!-- <el-form-item label="公司地址" prop="address_id">
          <span
            class="AdressList"
            v-for="(item, index) in companyInfo.address"
          >{{`${index+1}、${item.address}${item.doorplate}`}}</span>
        </el-form-item> -->

        <el-form-item class label="公司简介">
          <span>{{companyInfo.intro}}</span>
        </el-form-item>

        <el-form-item class label="公司官网">
          <span>{{companyInfo.website}}</span>
        </el-form-item>

        <el-form-item class label="公司邮箱">
          <span>{{companyInfo.email}}</span>
        </el-form-item>

        <el-form-item class label="团队福利">
          <span class="temalabel" :key="j" v-for="(item, j) in companyInfo.welfare">{{item.title}}</span>
        </el-form-item>
        
        <el-form-item class label="公司图片">
          <ul class="common-list_01">
            <li
              v-for="(imageItem, imageIndex) in companyInfo.albumInfo"
              :key="imageIndex"
              :data-key="imageIndex"
              class="draggable"
              :style="`background-image: url(${imageItem.smallUrl}); background-size: cover; background-repeat: no-repeat; background-position: center center;`"
              draggable="true">
            </li>
          </ul>
        </el-form-item>

        <h3 v-if="companyInfo.product.length">产品介绍</h3>
        <div v-for="(item, index) in companyInfo.product" v-if="companyInfo.product.length">
          <el-form-item class label="产品logo">
            <img :src="item.logoInfo.smallUrl" alt="" style="width: 130px;height: 130px;" v-if="item.logoInfo.smallUrl">
          </el-form-item>
          <el-form-item class label="产品名称">
            <span>{{item.productName}}</span>
          </el-form-item>
          <el-form-item class label="产品官网">
            <span>{{item.siteUrl}}</span>
          </el-form-item>
          <el-form-item class label="产品slogan">
            <span>{{item.slogan}}</span>
          </el-form-item>
          <el-form-item class label="产品亮点">
            <span>{{item.lightspot}}</span>
          </el-form-item>
          <div class="line" style="height: 1px;background: #ebeef5;width: 100%; margin-bottom: 20px;" v-if="companyInfo.product.length !== index + 1"></div>
        </div>
      </el-form>
    </div>
    <!-- 跟进销售设置 -->
    <div class="sales" v-if="active === 1">
      <h3>跟进销售</h3>
      <el-form label-suffix="：">
        <el-form-item label="跟进销售">
          <span>{{companyInfo.adminName}}</span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 绑定与解绑模块 -->
    <div v-if="showAdminWindow" class="bindAdminWindo">
      <admin-control
        :isOldEdit="isOldEdit"
        @close="closeBtn"
        :companyInfo="companyInfo"
        :isNewCompany="isNewCompany"
        @closeAdminWindow="close"
        :isBindAdmin="companyInfo.createdUid? true : false"
        :nextAdmin="nextAdmin"
      ></admin-control>
    </div>

    <el-dialog
    title="生成小程序链接"
    :visible.sync="dialogVisible"
    width="30%">
    <div @click="copytext()" :style="'cursor:pointer'">链接:https://dd.lieduoduo.com/thirdPartyAuth/?cid={{cpid}}&appId={{appId}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="restsucess()">重新生成</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import adminControl from "@/components/adminControl/index";
import { fieldApi, uploadApi, getSalerListApi } from "API/commont";
import {
  bindCompanyApi,
  setCompanyInfoApi,
  setIdentityInfoApi,
  addCompanyAddressApi,
  delCompanyAddressApi,
  verifyEmailApi,
  getCompanyInfoApi,
  getRecruitersListApi,
  getCompanyProductListsApi
} from "API/company";
import mapSearch from "@/components/map";
import { constants } from "crypto";
@Component({
  name: "companyInfo",
  components: {
    adminControl
  }
})
export default class createCompany extends Vue {
  active = 0;
  adressList = []; // 地址列表
  showAdminWindow = false;
  nowImg = ""; //预览大图
  nextAdmin = null; // 公司下一个管理员的信息
  dialogVisible = false;
  url = 'https://3gimg.qq.com/lightmap/api_v2/2/4/122/main.js';
  pop = {
    isShow: false,
    type: "position"
  };
  isNewCompany = false;
  email = {
    isShow: false
  };
  cpid = ''
  appId = ''
  /* 公司信息 */
  companyInfo = {
    product: [],
    createdUid: "" /* 0没有绑定管理员，1已经绑定了管理员 */
  };

  /* 权益信息 */
  rightInfo = {};
  // 是否是旧公司绑定管理员
  isOldEdit = false;
  /* 切换tab */
  tab(num) {
    console.log(num)
    switch(num) {
      case 0:
        this.active = num
        break
      case 1:
        this.active = num
        break
      case 2:
        window.open(`/manage/positionManage?page=1&count=20&is_online=1&name2=${this.companyInfo.companyName}`, '_blank');
        break
      case 3:
        window.open(`/recruiter?page=1&count=20&companyName=${this.companyInfo.companyName}`, '_blank');
        break
      default:
        break
    }
  }

  /* 去编辑 */
  toEdit() {
    this.$router.push(`/companyManage/edit?id=${this.$route.query.id}`)
  }

  /* 获取公司信息 */
  getCompanyInfo() {
    const { id } = this.$route.query;
    getCompanyInfoApi(id)
      .catch(err => {
        if (err.data.code === 403) {
          this.$router.go(-1);
        }
      })
      .then(res => {
        this.companyInfo = res.data.data.companyInfo;
        this.rightInfo = res.data.data.rtInfo;
      });
  }
  getCompanyProductLists() {
    let query = this.$route.query
    getCompanyProductListsApi({id: query.id, page: 1, count: 50})
  }
  generate (id, aid) {
    this.cpid = id
    this.appId = aid
    this.dialogVisible = true
  }
  restsucess () {
    this.$message({
      message: '重新生成成功',
      type: 'success'
    })
  }
  copytext () {
    this.copyStringToClipboard(`https://dd.lieduoduo.com/thirdPartyAuth/?cid=${this.cpid}&appId=${this.appId}`)
    this.$message({
      message: '复制成功',
      type: 'success'
    })
  }
  copyStringToClipboard (str) {
	   var el = document.createElement('textarea');
	   el.value = str;
	   el.setAttribute('readonly', '');
	   el.style.position = "absolute";
	   el.style.left="-9999px";
	   document.body.appendChild(el)
	   el.select()
	   document.execCommand('copy')
	   document.body.removeChild(el);
  }
  // 绑定已有公司的管理员
  async bindAdmin() {
    // this.isFromUser = !false;
    this.showAdminWindow = true;
    this.isBindAdmin = this.companyInfo.createdUid ? true : false;
    this.isOldEdit = true;
  }
  /* 移除已有公司的管理员 */
  async delateAdmin() {
    this.showAdminWindow = true;
    // 判断是否存在公司id，如果存在，则进入下一步
    if (this.companyInfo.createdUid) {
      let param = {
        page: 1,
        count: 2
      };
      //弹出移除并更换管理员的系统弹框，并自动调取管理员列表，获取下一个管理员信息
      let res = await getRecruitersListApi(this.$route.query.id, param);
      res.data.data.forEach((item, index) => {
        if (this.companyInfo.createdUid !== item.uid) {
          this.nextAdmin = item;
        } else {
          if (index === 0) {
            this.nextAdmin = null;
          }
        }
      });
    }
  }
  close(e) {
    this.showAdminWindow = false;
    if (e && e.needLoad) this.getCompanyInfo();
  }
  closeBtn() {
    this.showAdminWindow = false;
  }
  /* 查看大图 */
  showImg(imgUrl) {
    this.nowImg = imgUrl;
  }
  /* 隐藏大图 */
  hiddenMask() {
    this.nowImg = "";
  }
  created() {
    this.getCompanyInfo();
  }
}
</script>

<style lang="less" scoped="scoped">
.common-list_01 {
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
  }
  .upload-li {
    position: relative;
    box-sizing: border-box;
    border: dotted 1px #DCDCDC;
    background: #f5f7fa;
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
    top: -8px;
    right: -8px;
    color: #BCBCBC;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }
  .el-progress--circle{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: 50%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  .pic-img {
    max-width: 90% !important;
  }
  img {
    max-width: 90% !important;
    max-height: 90% !important;
  }
}

.createCompany {
  border: 1px solid #cccccc;
  .header {
    padding-right: 20px;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    height: 80px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .creatTab {
      height: 100%;
      text-align: center;
      > div {
        cursor: pointer;
        line-height: 80px;
        border-right: 1px solid #cccccc;
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
  }
  /*公司信息*/
  .companyInfo,
  .sales {
    padding: 0 32px;
    text-align: left;
  }
  .sales {
    padding: 30px 32px;
    h3 {
      font-size: 25px;
      font-weight: 500;
      color: #652791;
      margin-bottom: 20px;
    }
  }
  .companyInfo {
    h3 {
      color: #354048;
      font-size: 20px;
      padding-bottom: 16px;
      padding-top: 16px;
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

.bindAdminWindo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
.temalabel{
  padding: 3px 8px;
  border: 1px solid #3e294d;
  margin-right: 10px;
  color: #3e294d;
  font-size: 12px;
  border-radius: 16px;
}
</style>