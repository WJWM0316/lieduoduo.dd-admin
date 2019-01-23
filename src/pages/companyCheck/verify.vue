<template>
  <!--审核页面-->
  <div class="checkPage">
    <!--公司认证信息-->
    <div class="commont companyInfo">
      <!--头部-->
      <div class="header">
        <div class="left">
          <span class="title">公司认证信息</span>
          <span class="status" v-show="companyInfo.status === 0"><i class="el-icon-warning" style="color: #E6A23C;"></i> 已提交</span>
          <span class="status" v-show="companyInfo.status === 1"><i class="el-icon-success" style="color: #67C23A;"></i> 已通过</span>
          <span class="status" v-show="companyInfo.status === 2"><i class="el-icon-error" style="color: #F56C6C;"></i> 未通过</span>
        </div>
        <div class="editBox">
          <el-button type="primary" @click.stop="Review(companyInfo.id, 'company')" v-show="companyInfo.status === 0">审核</el-button>
          <el-button type="primary" disabled v-show="companyInfo.status !== 0">审核</el-button>
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
    <!--人员认证信息-->
    <div class="commont companyInfo">
      <!--头部-->
      <div class="header">
        <div class="left">
          <span class="title">身份认证信息</span>
          <span class="status" v-show="personalInfo.status === 0"><i class="el-icon-warning" style="color: #E6A23C;"></i> 已提交</span>
          <span class="status" v-show="personalInfo.status === 1"><i class="el-icon-success" style="color: #67C23A;"></i> 已通过</span>
          <span class="status" v-show="personalInfo.status === 2"><i class="el-icon-error" style="color: #F56C6C;"></i> 未通过</span>
        </div>
        <div class="editBox">
          <el-button type="primary" @click.stop="Review(personalInfo.uid, 'identity')" v-show="personalInfo.status === 0">审核</el-button>
          <el-button type="primary" disabled v-show="personalInfo.status !== 0">审核</el-button>
        </div>
      </div>
      <!--内容-->
      <div class="content">
        <div class="title">个人信息</div>
        <div class="item"><span class="lable">姓名：</span> {{personalInfo.realName}}</div>
        <div class="item"><span class="lable">公司职务：</span> {{companyInfo.userPosition}}</div>
        <div class="item"><span class="lable">公司邮箱：</span> {{companyInfo.userEmail}}</div>
        <div class="item"><span class="lable">手机号码：</span> 12345123456</div>
        <div class="title">身份信息</div>
        <div class="item"><span class="lable">真实姓名：</span> {{personalInfo.realName}}</div>
        <div class="item"><span class="lable">身份证号码：</span> {{personalInfo.identityNum}}</div>
        <div class="item"><span class="lable">有效期：</span> {{personalInfo.validity}}</div>
        <div class="title">认证材料</div>
        <div class="item">
          <div class="imgBox" v-if="personalInfo.passportFrontInfo">
            <div class="imgNote">身份证（正面）</div>
            <img :src="personalInfo.passportFrontInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(personalInfo.passportFrontInfo.url)"></i>
          </div>
          <div class="imgBox" v-if="personalInfo.passportReverseInfo">
            <div class="imgNote">身份证（反面）</div>
            <img :src="personalInfo.passportReverseInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(personalInfo.passportReverseInfo.url)"></i>
          </div>
          <div class="imgBox" v-if="personalInfo.handheldPassportInfo">
            <div class="imgNote">手持身份照</div>
            <img :src="personalInfo.handheldPassportInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(personalInfo.handheldPassportInfo.url)"></i>
          </div>
        </div>
      </div>
    </div>
    <!--大图蒙层-->
    <div class="mask" v-if="nowImg" @click.stop="hiddenMask">
      <img :src="nowImg"/>
    </div>
    <!--审核蒙层-->
    <el-dialog title="审核" :visible.sync="isCheck">
      <el-form :model="form">
        <el-form-item label="审核结果" label-width="100px" style="text-align: left;">
          <el-select v-model="form.result" placeholder="请选择审核结果">
            <el-option label="通过" value="true"></el-option>
            <el-option label="退回" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不通过原因" label-width="100px">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="isCheck = false">取 消</el-button>
        <el-button type="primary" @click.stop="setResult">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getCompanyInfo, temppassApi, tempfailApi, identityPassApi, identityFailApi } from 'API/company'
@Component({
  name: 'checkPage'
})
export default class checkPage extends Vue {
  companyInfo = ''
  personalInfo = ''
  nowImg = ''
  type = '' // 当前审核的信息类别 company 或 identity
  isCheck = false // 审核蒙层
  checkId = ''
  form = {
    result: '',
    reason: ''
  }
  /* 点击审核按钮 */
  Review (id, type) {
    this.type = type
    this.isCheck = true
    this.checkId = id
//  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//    confirmButtonText: '确定',
//    cancelButtonText: '取消',
//    type: 'warning'
//  }).then(() => {
//    this.$message({
//      type: 'success',
//      message: '删除成功!'
//    })
//  }).catch(() => {
//    this.$message({
//      type: 'info',
//      message: '已取消删除'
//    })     
//  })
  }
  showImg (imgUrl) {
    this.nowImg = imgUrl
  }
  hiddenMask () {
    this.nowImg = ''
  }
  /*设置审核结果 */
  setResult () {
    if (this.type === 'company') {
      //审核公司信息
      if (this.form.result) {
        temppassApi(this.checkId).then(res => {
          this.companyInfo.status = 1
          this.isCheck = false
        })
      } else {
        tempfailApi(this.checkId).then(res => {
          this.companyInfo.status = 2
          this.isCheck = false
        })
      }
    } else {
      //审核人员信息
      if (this.form.result) {
        identityPassApi(this.checkId).then(res => {
          this.personalInfo.status = 1
          this.isCheck = false
        })
      } else {
        identityFailApi(this.checkId).then(res => {
          this.personalInfo.status = 2
          this.isCheck = false
        })
      }
    }
  }
  created () {
    const { id } = this.$route.query
    console.log(id)
    getCompanyInfo(id).then(res => {
      console.log(res.data.data)
      this.companyInfo = res.data.data.companyInfo
      this.personalInfo = res.data.data.identityInfo
    })
  }
}
</script>

<style lang="less" scoped="scoped">
.checkPage{
  margin-left: 200px;
  padding: 22px;
  position: relative;
}
.mask{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    height: 90%;
  }
}
.el-form-item__content{
  text-align: left;
}
.commont{
  width: 100%;
  .header{
    background-color: #f4f4f4;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      .status{
        margin-left: 10px;
      }
    }
  }
  .content{
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title{
      line-height: 50px;
      font-size: 20px;
      font-weight: 700;
    }
    .item{
      line-height: 30px;
      .lable{
        margin-right: 10px;
        color: #909399;
      }
    }
    .imgBox{
      display: inline-block;
      margin-right: 20px;
      position: relative;
      img{
        width: 200px;
        height: 150px;
        background-color: #BCBCBC;
        object-fit: cover;
        vertical-align: middle;
      }
      i{
        cursor: pointer;
        color: #FFFFFF;
        font-size: 20px;
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
}
</style>