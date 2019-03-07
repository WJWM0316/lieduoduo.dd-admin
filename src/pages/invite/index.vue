<!-- 面试申请管理 -->
<template>
  <div class="application" @click="closeTopic">
    <el-container class="container" style="border: 1px solid #eee">
      <el-header class="header" style="text-align: right; font-size: 15px">
        <div class="title">邀请列表管理({{total}})</div>
      </el-header>
      <el-main width="200px">
        <!--筛选-->
        <div class="selectionBox" @keyup.enter="onSubmit">
          <el-form ref="form" :model="form" label-width="80px" validate="validate">
            
            <el-form-item class="content" prop="content" label-width="0">
              <el-input type='text' placeholder="请输入内容" v-model="form.content" class="inputSelect">
                <el-select class="selectTitle" v-model="form.searchType" slot="prepend" placeholder="请选择" @change="changeProvince">
                  <el-option label="面试ID" value="id"></el-option>
                  <el-option label="求职者" value="jobhunter"></el-option>
                  <el-option label="面试官" value="recruiter"></el-option>
                  <el-option label="职位" value="position"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            
            <el-form-item class="state" label-width="0" prop="searchType">
            </el-form-item>
            
            <el-form-item class="state" label="状态" prop="status">
              <el-select class="selectState" v-model="form.status" placeholder="全部状态" @change="changeProvince">
                <el-option label="待求职者接受邀请" value="12"></el-option>
                <el-option label="待面试官安排时间" value="21"></el-option>
                <el-option label="待求职者确认" value="31"></el-option>
                <el-option label="待面试官修改" value="32"></el-option>
                <el-option label="已确定面试日程" value="41"></el-option>
                <el-option label="不合适" value="52"></el-option>
                <el-option label="求职者暂不考虑" value="54"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item class="btn">
              <el-button class="inquire" @click="onSubmit">查询</el-button>
              <el-button @click.stop="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--筛选-->
      </el-main>
      <list
          :fields="fields"
          :list="list"
          :total="total"
          :page="form.page"
          :page-count="pageCount"
          :rowspan="3"
          @page-change="handlePageChange">
          
          <template slot-scope="props" slot="columns">
            <!-- 求职者信息 -->
            <div class="jobhunter" v-if="props.scope.column.property === 'jobhunterInfo'">
              <div class="name">
                <span style="font-weight: bold;display: inline-block; max-width: 120px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                {{props.scope.row.jobhunterInfo.realname}}
                </span>
                <span style="display: inline-block; max-width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-if="props.scope.row.jobhunterInfo.lastPosition">
                   · {{props.scope.row.jobhunterInfo.lastPosition}}
                </span>
              </div>
              <div class="info" v-if="props.scope.row.jobhunterInfo.lastCompanyName || props.scope.row.jobhunterInfo.lastPosition"><span>{{props.scope.row.jobhunterInfo.lastCompanyName}}</span></div>
              <div class="btn"><span @click.stop="creatLink($event, props.scope.row.jobhunterInfo.uid, props.scope.$index, 2)">查看简历</span>  <span @click.stop="showPhone($event, props.scope.row.jobhunterInfo.mobile)">联系用户</span></div>
            </div>
            <!-- 状态 -->
            <div class="jobhunter" v-else-if="props.scope.column.property === 'statusDesc'">
              <div class="name arrow">
                <i class="icon iconfont iconjiantouzuo" v-if="props.scope.row.status === 12 || props.scope.row.status === 31 || props.scope.row.status === 52"></i>
                <i class="icon iconfont iconjiantou" v-else></i>
              </div>
              <div class="info status">{{props.scope.row.statusDesc}}</div>
              <div class="btn time">{{props.scope.row.updatedAtTime * 1000 | date}}</div>
            </div>
            <!-- 面试官信息 -->
            <div class="jobhunter" v-else-if="props.scope.column.property === 'recruiterInfo'">
              <div class="name">
                <span style="font-weight: bold;display: inline-block; max-width: 120px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                {{props.scope.row.recruiterInfo.realname}}
                </span>
                <span style="display: inline-block; max-width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                   · {{props.scope.row.recruiterInfo.position}}
                </span>
              </div>
              <div class="info" v-if="props.scope.row.recruiterInfo.companyName"><span>{{props.scope.row.recruiterInfo.companyName}}</span></div>
              <div class="btn"><span @click.stop="creatLink($event, props.scope.row.recruiterInfo.uid, props.scope.$index, 1)">查看主页</span>  <span @click.stop="showPhone($event, props.scope.row.recruiterInfo.mobile)">联系用户</span></div>
            </div>
            <!-- 约面信息 -->
            <div class="jobhunter" v-else-if="props.scope.column.property === 'interviewInfo'">
              <div class="name" v-if="props.scope.row.positionName"><span class="btn positionName" @click.stop="creatLink($event, props.scope.row.positionId, props.scope.$index, 3)">职位：{{props.scope.row.positionName}}</span><span style="display: inline-block;">{{props.scope.row.emolument}}</span></div>
              <div class="name" v-else><span>职位：直接约面</span></div>
              <div class="info"><span>地址：{{props.scope.row.address || '未设置面试地址'}}</span></div>
              <div class="btn" v-if="props.scope.row.arrangementInfo && props.scope.row.arrangementInfo.appointmentTime">时间：{{props.scope.row.arrangementInfo.appointmentTime *1000 | date}}</div>
            </div>
            <template v-else><span :class="{'row-delete': props.scope.row.status !== 1}">{{props.scope.row[props.scope.column.property]}}</span></template>
          </template>
      </list>
    </el-container>
    <!--电话号码展示框-->
    <div class="phone" ref="mobile">
      {{mobile}}
      <img class="phoneBg" src="../../assets/number_bg.png"/>
    </div>
    <!--小程序码展示框-->
    <div class="qrCode" ref="qrCode">
      <img class="bg" src="../../assets/code_bg.png"/>
      <img class="Qr" :src="qrCode"/>
      <div class="txt">微信扫码，打开小程序查看</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { getInviteListApi, getRecruiterCodeUrlApi, getResumeCodeUrlApi, getPositionCodeUrlApi } from 'API/interview'
  import List from '@/components/list'
  @Component({
  name: 'invite',
  components: {
    List
  }
})
  export default class invite extends Vue {
    timeout = null // 防抖
    total = 0
    fields = [
      {
        prop: 'interviewId',
        label: '面试ID',
        minWidth: '8%'
  //    width: 100
      },
      {
        prop: 'jobhunterInfo',
        label: '求职者信息',
        minWidth: '25%',
  //    width: 300,
        align: 'left'
      },
      {
        prop: 'statusDesc',
        label: '状态',
        minWidth: '20%'
  //    width: 200
      },
      {
        prop: 'recruiterInfo',
        label: '面试官信息',
        minWidth: '25%',
  //    width: 300,
        align: 'left'
      },
      {
        prop: 'interviewInfo',
        label: '约面信息',
        minWidth: '31%',
  //    width: 500,
        align: 'left'
      }
    ]
    form = {
      searchType: 'id',
      content: '',
      status: '',
      page: 1,
      count: 20
    }
    list = []
    pageCount = 0 // 请求回的数据共几页
    mobile = '' // 当前查看的手机号码
    qrCode = ''
    created () {
      this.init()
    }
    
    init () {
      this.getInterviewList()
    }
    
    /* 获取列表数据 */
    getInterviewList () {
      getInviteListApi(this.form).then(res => {
        this.list = res.data.data
        this.total = res.data.meta.total
        this.pageCount = res.data.meta.lastPage
      })
    }
    
    /* 展示手机 */
    showPhone (e, mobile) {
      if(this.timeout !== null) clearTimeout(this.timeout)
      this.mobile = mobile || '用户未绑定手机'
      this.$nextTick(() => {
        this.$refs['mobile'].style.display = 'block'
        this.$refs['mobile'].style.left = e.clientX + 'px'
        this.$refs['mobile'].style.top = e.clientY + 'px'
      })
    }
    
    /* 生成小程序码 */
    async creatLink (e, uid, index, type) {
      // 是否已经加载过二维码
      if (this.list[index].qrCode && type === 1) {
        this.qrCode = this.list[index].qrCode
        this.$nextTick(() => {
          this.$refs['qrCode'].style.display = 'block'
          this.$refs['qrCode'].style.left = e.clientX + 'px'
          this.$refs['qrCode'].style.top = e.clientY + 'px'
        })
        return
      } else if (this.list[index].resumeQrCode && type === 2) {
        this.qrCode = this.list[index].resumeQrCode
        this.$nextTick(() => {
          this.$refs['qrCode'].style.display = 'block'
          this.$refs['qrCode'].style.left = e.clientX + 'px'
          this.$refs['qrCode'].style.top = e.clientY + 'px'
        })
        return
      } else if (this.list[index].jobQrCode && type === 3) {
        this.qrCode = this.list[index].jobQrCode
        this.$nextTick(() => {
          this.$refs['qrCode'].style.display = 'block'
          this.$refs['qrCode'].style.left = e.clientX + 'px'
          this.$refs['qrCode'].style.top = e.clientY + 'px'
        })
        return
      }
      
      let res = await this.getQr(type, uid)
      if (type === 1) {
        this.qrCode = res.data.data.qrCodeUrl
        this.list[index].qrCode = res.data.data.qrCodeUrl
      } else if (type === 2) {
        this.qrCode = res.data.data.qrCodeUrl
        this.list[index].resumeQrCode = res.data.data.qrCodeUrl
      } else {
        this.qrCode = res.data.data.qrCodeUrl
        this.list[index].jobQrCode = res.data.data.qrCodeUrl
      }
      this.$nextTick(() => {
        this.$refs['qrCode'].style.display = 'block'
        this.$refs['qrCode'].style.left = e.clientX + 'px'
        this.$refs['qrCode'].style.top = e.clientY + window.scrollY + 'px'
      })
    }
    
    /* 生成二维码 */
    getQr (type, uid) {
      switch (type) {
        case 1:
          return getRecruiterCodeUrlApi({id: uid})
          break;
        case 2:
          return getResumeCodeUrlApi({id: uid})
          break;
        case 3: 
          if (uid === 0) return
          return getPositionCodeUrlApi({id: uid})
          break;
      }
    }
    
    hiddenQr () {
      this.$nextTick(() => {
        this.$refs['qrCode'].style.display = 'none'
      })
    }
    
    hiddenPhone () {
      this.$nextTick(() => {
        this.$refs['mobile'].style.display = 'none'
      })
    }
    /* 关闭浮窗 */
    closeTopic () {
      this.$nextTick(() => {
        this.$refs['mobile'].style.display = 'none'
        this.$refs['qrCode'].style.display = 'none'
      })
    }
    
    /* 查询 */
    onSubmit () {
      this.form.page = 1
      this.getInterviewList()
    }
    /* 选择变更 */
    changeProvince (e) {
      console.log(this.nowSelect)
    }
    
    /* 清除列表选项 */
    resetForm (name) {
      this.$refs[name].resetFields()
    }
    
    /* 翻页 */
    handlePageChange (nowPage) {
      this.$route.meta.scrollY = 0
      window.scrollTo(0, 0)
      this.form.page = nowPage
      this.getInterviewList()
    }
    /* 防抖 */
    debounce (wait) {
      let that = this
      if(this.timeout !== null) clearTimeout(that.timeout)
      this.timeout = setTimeout(that.hiddenPhone, wait)
    }
  }
</script>

<style lang="less" scoped="scoped">
@import "../../style/iconfont.less";
.application {
  margin-left: 200px;
  .container{
    min-width: 1000px;
    margin: 22px;
  }
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
      display: flex;
      align-items: center;
      position: relative;
      font-size: 15px;
      &::before{
        background: #ffe266;
        content: "";
        display: inline-block;
        float: left;
        height: 100%;
        height: 16px;
        margin-right: 10px;
        width: 6px;
      }
    }
    .creatBtn{
      font-size: 14px;
      padding: 12px 20px;
      background-color: #ffe266;
      border-radius: 4px;
    }
  }
  .el-form{
    .el-input{
      width: 200px;
    }
    &::after {
      content: '';
      display: block;
      height: 0;
      clear: both;
    }
  }
  .el-form-item{
    float: left;
  }
  /* 按钮 */
  .btn{
    float: right;
    .inquire{
      color: #FFFFFF;
      background-color: #652791;
    }
    span{
      white-space: nowrap;
      user-select:none;
      cursor: pointer;
      line-height: 12px;
      color: #652791;
    }
  }
  /* 筛选 */
  
  .inputSelect{
    height: auto;
    width: 400px !important;
    float: left;
    margin-right: 20px;
    .selectTitle {
      box-sizing: border-box;
      margin-top: 0;
      width: 120px;
      background-color: #FFFFFF;
    }
  }
  .selectState{
    float: left;
  }
  .jobhunter{
    .name,
    .info,
    .btn {
      color: #282828;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }
    .arrow,
    .status,
    .time{
      text-align: center;
      justify-content: center;
    }
    .status {
      font-weight: 500;
      color: #282828;
    }
    .time {
      color: #929292;
      font-weight: 400;
      font-size: 14px;
    }
    .name {
      height: 22px;
      display: flex;
      .btn {
        white-space: nowrap;
        user-select:none;
        cursor: pointer;
        color: #652791;
      }
      .positionName {
        display: inline-block;
        max-width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &.arrow{
        color: #BCBCBC;
      }
    }
    span {
      margin-right: 10px;
    }
    .btn{
      float: none;
      position: relative;
      font-size: 15px;
    }
    .mobile {
      display: inline-block;
      background-color: #FFFFFF;
      color: #652791;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .phone,
  .qrCode {
    width: 150px;
    height: 70px;
    border-radius: 4px;
    transform: translateY(-90%) translateX(-20%);
    color: #652791;
    position: absolute;
    top: -999px;
    left: -999px;
    z-index: 3;
    line-height: 60px;
    .phoneBg {
      display: block;
      position: absolute;
      top: 0;
      left: 5%;
      z-index: -1;
    }
  }
  .qrCode {
    width: 212px;
    height: 164px;
    /*background-color: #CCCCCC;*/
    transform: translateY(-100%) translateX(-50%);
    .Qr{
      width: 100px;
      height: 100px;
      margin-top: 15px;
    }
    .bg{
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    .txt{
      line-height: normal;
      color: #5C565D;
      margin-top: 5px;
    }
  }
}
</style>