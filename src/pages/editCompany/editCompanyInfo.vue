<template>
  <div class="companyInfo">
    <!--公司认证信息-->
    <div class="commont companyInfo">
      <!--头部-->
      <div class="header" :class="{edit : isEdit}">
        <div class="left" v-if="!isEdit">
          <span class="title">公司认证信息</span>
          <span class="status" v-show="companyInfo.status === 0"><i class="el-icon-warning" style="color: #E6A23C;"></i> 已提交</span>
          <span class="status" v-show="companyInfo.status === 1"><i class="el-icon-success" style="color: #67C23A;"></i> 已通过</span>
          <span class="status" v-show="companyInfo.status === 2"><i class="el-icon-error" style="color: #F56C6C;"></i> 未通过</span>
        </div>
        <div class="editBox" v-if="!isEdit">
          <el-button type="primary" @click.stop="Review(companyInfo.id, 'company')" v-show="companyInfo.status === 0">审核</el-button>
          <el-button type="primary" disabled v-show="companyInfo.status !== 0">审核</el-button>
        </div>
        <div class="editBox" v-else>
          <el-button type="primary" disabled>编辑</el-button>
        </div>
      </div>
      <!--内容-->
      <div class="content">
        <div class="title">基本信息</div>
        <div class="item"><span class="lable">公司全称：</span> {{companyInfo.companyName}}</div>
        <div class="item"><span class="lable">公司简称：</span> {{companyInfo.companyShortname}}</div>
        <div class="item"><span class="lable">所属行业：</span> {{companyInfo.industry}}</div>
        <div class="item"><span class="lable">融资阶段：</span> {{companyInfo.financingInfo}}</div>
        <div class="item"><span class="lable">人员规模：</span> {{companyInfo.employeesInfo}}</div>
        <div class="title">资质信息</div>
        <div class="item"><span class="lable">上传资质：</span> </div>
        <div class="item">
          <div class="imgBox" v-if="companyInfo.businessLicenseInfo">
            <div class="imgNote">营业执照</div>
            <img :src="companyInfo.businessLicenseInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(companyInfo.businessLicenseInfo.url)"></i>
          </div>
          <div class="imgBox" v-if="companyInfo.onJobInfo">
            <div class="imgNote">上传工牌/名片/在职证明</div>
            <img :src="companyInfo.onJobInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(companyInfo.onJobInfo.url)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'editCompany'
})
export default class editCompany extends Vue {}
</script>

<style>
</style>