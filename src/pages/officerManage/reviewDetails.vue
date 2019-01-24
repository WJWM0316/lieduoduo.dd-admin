<!--招聘官审核详情-->
<template>
  <div class="reviewDetail">
    <!--加入公司审核-->
    <div class="companyCheck">
      <div class="companyName"><span class="label">加入公司</span>{{personalInfo.companyName}}</div>
      <div class="companyName" v-if="personalInfo.adminInfo"><span class="label">管理员</span>{{personalInfo.adminInfo.name || ''}}</div>
      <div class="checkStatus">
        <div v-show="personalInfo.status === 0">审核中 <i class="el-icon-warning" style="color: #E6A23C;"></i></div>
        <div v-show="personalInfo.status === 1">已通过 <i class="el-icon-success" style="color: #67C23A;"></i></div>
        <div v-show="personalInfo.status === 2">未通过 <i class="el-icon-error" style="color: #F56C6C;"></i></div>
      </div>
    </div>
    <!--人员认证信息-->
    <div class="commont companyInfo">
      <!--头部-->
      <div class="header">
        <div class="left">
          <span class="title">身份认证信息</span>
          <span class="status" v-show="identityInfo.status === 0"><i class="el-icon-warning" style="color: #E6A23C;"></i> 已提交</span>
          <span class="status" v-show="identityInfo.status === 1"><i class="el-icon-success" style="color: #67C23A;"></i> 已通过</span>
          <span class="status" v-show="identityInfo.status === 2"><i class="el-icon-error" style="color: #F56C6C;"></i> 未通过</span>
        </div>
        <div class="editBox">
          <el-button type="primary" @click.stop="Review(personalInfo.uid)" v-show="identityInfo.status === 0">审核</el-button>
          <el-button type="primary" disabled v-show="identityInfo.status !== 0">审核</el-button>
        </div>
      </div>
      <!--内容-->
      <div class="content">
        <div class="title">个人信息</div>
        <div class="item"><span class="lable">姓名：</span> {{personalInfo.realName}}</div>
        <div class="item"><span class="lable">公司职务：</span> {{personalInfo.userPosition}}</div>
        <div class="item"><span class="lable">公司邮箱：</span> {{personalInfo.userEmail}}</div>
        <div class="item"><span class="lable">手机号码：</span> {{identityInfo.mobile}}</div>
        <div class="title">身份信息</div>
        <div class="item"><span class="lable">真实姓名：</span> {{identityInfo.realName}}</div>
        <div class="item"><span class="lable">身份证号码：</span> {{identityInfo.identityNum}}</div>
        <div class="item"><span class="lable">有效期：</span> {{identityInfo.validity}}</div>
        <div class="title">认证材料</div>
        <div class="item">
          <div class="imgBox" v-if="identityInfo.passportFrontInfo">
            <div class="imgNote">身份证（正面）</div>
            <img :src="identityInfo.passportFrontInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(identityInfo.passportFrontInfo.url)"></i>
          </div>
          <div class="imgBox" v-if="identityInfo.passportReverseInfo">
            <div class="imgNote">身份证（反面）</div>
            <img :src="identityInfo.passportReverseInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(identityInfo.passportReverseInfo.url)"></i>
          </div>
          <div class="imgBox" v-if="identityInfo.handheldPassportInfo">
            <div class="imgNote">手持身份照</div>
            <img :src="identityInfo.handheldPassportInfo.middleUrl"/>
            <i class="el-icon-zoom-in" @click.stop="showImg(identityInfo.handheldPassportInfo.url)"></i>
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
        <el-form-item label="原因" label-width="100px">
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
import { getReviewDetailsApi } from 'API/recruiter'
import { identityPassApi, identityFailApi } from 'API/company'
@Component({
  name: 'reviewDetails'
})
export default class reviewDetails extends Vue {
  personalInfo = ''
  identityInfo = ''
  nowImg = ''
  isCheck = false
  form = {
    result: '',
    reason: ''
  }
  getReviewDetails () {
    const { id } = this.$route.query
    getReviewDetailsApi(id).then(res => {
      console.log(res.data.data)
      this.personalInfo = res.data.data.applyInfo
      this.identityInfo = res.data.data.identityInfo
    })
  }
  /* 查看大图 */
  showImg (imgUrl) {
    this.nowImg = imgUrl
  }
  hiddenMask () {
    this.nowImg = ''
  }
  /* 点击审核按钮 */
  Review (id) {
    this.isCheck = true
    this.checkId = id
  }
  /*设置审核结果 */
  setResult () {
    //审核人员信息
    if (this.form.result === 'true') {
      identityPassApi(this.checkId).then(res => {
        this.identityInfo.status = 1
        this.isCheck = false
      })
    } else {
    console.log()
      identityFailApi(this.checkId).then(res => {
        this.identityInfo.status = 2
        this.isCheck = false
      })
    }
  }
  created () {
    this.getReviewDetails()
  }
}
</script>

<style lang="less" scoped="scoped">
.reviewDetail{
  margin-left: 200px;
}
.companyCheck{
  padding: 22px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  .label{
    margin-right: 10px;
    font-weight: 300;
    color: #909399;
  }
}
.commont{
  width: 100%;
  .header{
    background-color: #f4f4f4;
    border-radius: 4px;
    padding: 10px 22px;
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
    padding: 22px;
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
/*查看大图*/
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
</style>