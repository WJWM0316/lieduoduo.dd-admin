<!--创建公司-->
<template>
  <div class="createCompany">
    <div class="header">
      <div class="creatTab" @click.stop="tab">
        <div class="Info" :class="{'active': active === 0 }">公司信息</div>
        <div class="userInfo" :class="{'active': active === 1 }">账户设置</div>
      </div>
      <div>
        <!-- <el-button @click.stop="last" v-show="active === 1">返回上一步</el-button>
        <el-button @click.stop="next" v-show="active === 0">保存，下一步</el-button>-->
        <el-button @click.stop="toEdit">编辑</el-button>
        <el-button @click.stop="bindAdmin" v-if="companyInfo.createdUid === 0">绑定管理员</el-button>
        <el-button @click.stop="bindAdmin" v-else>移除管理员</el-button>
      </div>
    </div>
    <!--大图蒙层-->
    <div class="mask" v-if="nowImg" @click.stop="hiddenMask">
      <vue-photo-zoom-pro type="circle" :width="250" :url="nowImg"></vue-photo-zoom-pro>
      <!--<img :src="nowImg"/>-->
    </div>
    <!--公司信息表格-->
    <div class="companyInfo" v-if="active === 0">
      <div class="point">上传工牌/名片/在职证明等信息需要与身份信息保持一致</div>
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

        <el-form-item label="公司地址" prop="address_id">
          <!--公司地址列表-->
          <span
            class="AdressList"
            v-for="(item, index) in companyInfo.address"
          >{{`${index+1}、${item.address}${item.doorplate}`}}</span>
        </el-form-item>

        <el-form-item class label="公司简介">
          <span>{{companyInfo.intro}}</span>
        </el-form-item>

        <el-form-item class label="公司官网">
          <span>{{companyInfo.website}}</span>
        </el-form-item>

        <el-form-item class label="公司邮箱">
          <span>{{companyInfo.email}}</span>
        </el-form-item>

        <h3>资质信息</h3>
        <el-form-item class="full" label="营业执照" prop="icon" v-if="companyInfo.businessLicenseInfo">
          <div class="seePhoto" v-if="companyInfo.businessLicenseInfo.smallUrl!=null">
            <img :src="companyInfo.businessLicenseInfo.smallUrl" alt>
            <div class="zoomBox" @click.stop="showImg(companyInfo.businessLicenseInfo.url)">
              <i class="el-icon-zoom-in"></i>
              查看大图
            </div>
          </div>
        </el-form-item>
        <!--工牌/名片/在职证明-->
        <el-form-item
          class="full"
          label="工牌/名片/在职证明(三选一)"
          prop="icon"
          v-if="companyInfo.businessLicenseInfo"
        >
          <div class="seePhoto" v-if="companyInfo.onJobInfo.smallUrl!=null">
            <img :src="companyInfo.onJobInfo.smallUrl" alt>
            <div class="zoomBox" @click.stop="showImg(companyInfo.onJobInfo.url)">
              <i class="el-icon-zoom-in"></i>
              查看大图
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 跟进销售设置 -->
    <div class="sales" v-if="active === 1">
      <h3>跟进销售</h3>
      <el-form label-suffix="：">
        <el-form-item label="跟进人">
          <span>{{companyInfo.adminName}}</span>
        </el-form-item>
      </el-form>
      <h3>权益类型</h3>
      <el-form label-suffix="：">
        <el-form-item label="权益类型">
          <span>{{rightInfo.rtVersionName}}</span>
        </el-form-item>
        <el-form-item label="开始时间">
          <span>{{rightInfo.startTimeDesc}}</span>
        </el-form-item>
        <el-form-item label="结束时间">
          <span>{{rightInfo.expiredDesc}}</span>
        </el-form-item>
      </el-form>
      <h3>权益点</h3>
      <el-form label-suffix="：">
        <el-form-item label="招聘成员上限">
          <span>{{rightInfo.cRecruiterNum === -1 ? "无上限" : rightInfo.cRecruiterNum}}</span>
        </el-form-item>
        <el-form-item label="招聘职位上">
          <span>{{rightInfo.rOnlinePosition === -1 ? "无上限" : rightInfo.rOnlinePosition}}</span>
        </el-form-item>
        <el-form-item label="每日邀约上限">
          <span>{{rightInfo.rDayInviteInterview === -1 ? "无上限" : rightInfo.rDayInviteInterview}}</span>
        </el-form-item>
        <el-form-item label="每日查看简历上限">
          <span>{{rightInfo.rDayBrowseResume === -1 ? "无上限" : rightInfo.rDayBrowseResume}}</span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 绑定与解绑模块 -->
    <div v-if="showAdminWindow" class="bindAdminWindo">
      <admin-control
        @closeAdminWindow="close"
        :isBindAdmin="companyInfo.createdUid? true : false"
        :companyName="companyInfo.companyName"
        :nextAdmin="nextAdmin"
      ></admin-control>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import adminControl from "@/components/adminControl/index";
import { fieldApi, uploadApi, getSalerListApi } from "API/commont";
import {
  setCompanyInfoApi,
  setIdentityInfoApi,
  addCompanyAddressApi,
  delCompanyAddressApi,
  verifyEmailApi,
  getCompanyInfoApi,
  getRecruitersListApi
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
  nowImg='';//预览大图
  nextAdmin = null; // 公司下一个管理员的信息
  pop = {
    isShow: false,
    type: "position"
  };
  email = {
    isShow: false
  };
  /* 公司信息 */
  companyInfo = {};

  /* 权益信息 */
  rightInfo = {};

  /* 切换tab */
  tab(e) {
    if (e.target.className === "userInfo") {
      this.active = 1;
    } else {
      this.active = 0;
    }
  }

  /* 去编辑 */
  toEdit() {
    this.$router.push({ path: `/index/editCompany/${this.$route.query.id}` });
  }

  /* 获取公司信息 */
  async getCompanyInfo() {
    const { id } = this.$route.query;
    let res = await getCompanyInfoApi(id);
    this.companyInfo = res.data.data.companyInfo;
    this.rightInfo = res.data.data.rtInfo;
  }

  /* 绑定和解绑管理员 */
  async bindAdmin() {
    this.showAdminWindow = true;
    if (this.companyInfo.createdUid) {
      let param = {
        page: 1,
        count: 2
      };
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
  /* 查看大图 */
  showImg(imgUrl) {
    this.nowImg = imgUrl;
    console.log(this.nowImg)
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
.seePhoto{
  position: relative;
  width: 130px;
  height: 170px;
}
.zoomBox {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.createCompany {
  margin-left: 200px;
  padding: 22px;
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
  .sales {
    padding: 0 32px;
    text-align: left;
    border: 1px solid #cccccc;
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
  .companyInfo {
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
  z-index: 9999;
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
</style>