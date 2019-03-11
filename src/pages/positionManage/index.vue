<!--职位管理-->
<template>
  <div class="positionManage" @click="closeTopic">
    <el-container class="container" style="border: 1px solid #eee">
      <el-header class="header" style="text-align: right; font-size: 15px">
        <div class="title">职位管理({{total}})</div>
      </el-header>
      <el-main>
        <!--筛选-->
        <div class="selectionBox" @keyup.enter="search">
          <el-button class="inquire" @click="addPosition" style="margin-bottom: 20px;margin-left: 20px;float: right;">发布职位</el-button>

          <el-form ref="form" :model="form" label-width="80px" validate="validate">
            <el-form-item label="职位名称" prop="name">
              <el-input v-model="form.name" placeholder="输入职位/发布者/主体公司"></el-input>
            </el-form-item>

            <el-form-item label-width="100px" label="上线/下线" prop="is_online">
              <el-select v-model="form.is_online" placeholder="全部状态">
                <el-option label="上线" value='1'></el-option>
                <el-option label="下线" value='2'></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label-width="100px" label="审核状态" prop="status">
              <el-select v-model="form.status" placeholder="全部状态">
                <el-option label="全部状态" value=" "></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="待审核" value="2"></el-option>
                <el-option label="退回重审" value="3"></el-option>
                <el-option label="未通过" value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button class="inquire" @click="onSubmit">查询</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--筛选-->
        <list
          :fields="fields"
          :list="list"
          :total="total"
          :page="form.page"
          :page-count="pageCount"
          @page-change="handlePageChange">
          <template slot-scope="props" slot="columns">
            <!-- 操作列 -->
            <div class="btn-container" style="flex-wrap: wrap;" v-if="props.scope.column.property === 'op'">
              <div>
                <span class="check" @click="check(props.scope.row.id)">查看</span>
              </div>
              <div style="width: 100%; cursor: pointer; color: #652791;" @click.stop="creatLink($event, props.scope.row.id, props.scope.$index)">查看职位</div>
            </div>

            <div class="btn-container"  v-else-if="props.scope.column.property === 'positionMsg'" style="height: 48px;">
              <div class="positionMsg">
                <div class="job_name">{{props.scope.row.positionName}}</div>
              </div>
            </div>

            <div class="btn-container" v-else-if="props.scope.column.property === 'status'" style="height: 48px;">
              <span v-show="props.scope.row.status ===0">
                  关闭<i class="el-icon-error" style="color: #F56C6C;"></i>
              </span>
              <span v-show="props.scope.row.status ===1">
                  已通过<i class="el-icon-success" style="color: #67C23A;"></i>
              </span>
              <span v-show="props.scope.row.status ===2">
                 待审核<i class="el-icon-warning" style="color: #E6A23C;"></i>
              </span>
              <span v-show="props.scope.row.status ===3">
                 退回重审<i class="el-icon-warning" style="color: #E6A23C;"></i>
              </span>
              <span v-show="props.scope.row.status ===4">
                  未通过<i class="el-icon-error" style="color: #F56C6C;"></i>
              </span>
            </div>

            <div class="btn-container" v-else-if="props.scope.column.property === 'recruiterName'" style="height: 48px;">
              <span v-if="props.scope.row.recruiterInfo">
                  {{props.scope.row.recruiterInfo.name}}
              </span>
            </div>

            <div class="btn-container" v-else-if="props.scope.column.property === 'company'" style="height: 48px;">
              <span>
                  {{props.scope.row.companyInfo.companyName}}
              </span>
            </div>

            <div class="btn-container" v-else-if="props.scope.column.property === 'isOnline'" style="height: 48px;">
              <span>
                  {{props.scope.row.isOnline === 2 ? '下线' : '上线'}}
              </span>
            </div>
            <template v-else><span :class="{'row-delete': props.scope.row.status !== 1}">{{props.scope.row[props.scope.column.property]}}</span></template>
          </template>
        </list>
      </el-main>
    </el-container>
    <!--小程序码展示框-->
    <div class="qrCode" ref="qrCode">
      <img class="bg" src="../../assets/code_bg.png"/>
      <div style="height: 100%;display: flex; align-items: center;flex-direction: column;justify-content: center;" v-if="!qrCode">
        <img style="height: 38px;width: 38px;" src="../../assets/loading.gif"/>
        <div class="txt">正在加载中…</div>
      </div>
      <div v-else>
        <img class="Qr" :src="qrCode"/>
        <div class="txt">微信扫码，打开小程序查看</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import List from '@/components/list'
import { login, templistApi } from 'API/company'
import { getPositionCodeUrlApi } from 'API/interview'
import { getListApi } from 'API/position'
@Component({
  name: 'course-list',
  components: {
    List
  }
})
export default class companyCheck extends Vue {
  total = 0 // 筛查结果数量
  pageCount = 0 // 请求回的数据共几页
  qrCode = ''
  form =  {
    type: '',
    is_online: '', // 状态（1 上线，2 下线)
    status: '',  // 状态（0关闭，1开启，审核通过，2审核中，3审核失败）查询多种状态用，号分隔（1,2,3）
    recruiter: '',
    page: 1,
    name: '',
    count: 20
  }
  fields = [
    {
      prop: 'id',
      label: '职位ID',
      width: 150
    },
    {
      prop: 'positionMsg',
      label: '职位信息',
      width: 250
    },
    {
      prop: 'recruiterName',
      label: '发布者',
      width: 180
    },
    {
      prop: 'company',
      label: '主体公司',
      width: 200
    },
    {
      prop: 'createdAt',
      label: '最近修改时间',
      width: 200
    },
    {
      prop: 'isOnline',
      label: '上线/下线',
      width: 150
    },
    {
      prop: 'status',
      label: '审核状态'
//    width: 150
    },
    {
      prop: 'op',
      fixed: "right",
      width: 150,
      label: '操作'
    }
  ]
  list = []
  onSubmit (e) {
    this.form.page = 1
    this.getTemplist()
  }
  // 搜索地址
  search () {
    this.onSubmit()
  }
  check (id) {
    this.$route.meta.scrollY = window.scrollY
    this.$router.push({
      path: '/positionManage/positionAuditDetail',
      query: {id: id}
    })
  }
  /* 重置 */
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }

  addPosition() {
    this.$router.push({
      path: '/positionManage/positionPost'
    })
  }
  handlePageChange (nowPage) {
    this.$route.meta.scrollY = 0
    window.scrollTo(0, 0)
    console.log(nowPage)
    this.form.page = nowPage
    this.getTemplist()
  }
  /* 请求职位管理列表 */
  getTemplist () {
    getListApi(this.form).then(res => {
      this.list = res.data.data
      this.total = res.data.meta.total
      this.pageCount = res.data.meta.lastPage
    })
  }
  
  /* 关闭浮窗 */
  closeTopic () {
    this.$nextTick(() => {
      this.$refs['qrCode'].style.display = 'none'
    })
  }
  
  /* 生成职位详情小程序码 */
  async creatLink (e, positionId, index) {
    this.qrCode = ''
    // 是否已经加载过二维码
    if (this.list[index].qrCode) {
      this.qrCode = this.list[index].qrCode
      this.$nextTick(() => {
        this.$refs['qrCode'].style.display = 'block'
        this.$refs['qrCode'].style.left = e.clientX + 'px'
        this.$refs['qrCode'].style.top = e.clientY + window.scrollY  + 'px'
      })
      return
    }
    
    this.$nextTick(() => {
      this.$refs['qrCode'].style.display = 'block'
      this.$refs['qrCode'].style.left = e.clientX + 'px'
      this.$refs['qrCode'].style.top = e.clientY + window.scrollY  + 'px'
    })
    let res = await this.getQr(positionId)
    this.qrCode = res.data.data.qrCodeUrl
    this.list[index].qrCode = res.data.data.qrCodeUrl
    
//  this.$nextTick(() => {
//    this.$refs['qrCode'].style.display = 'block'
//    this.$refs['qrCode'].style.left = e.clientX + 'px'
//    this.$refs['qrCode'].style.top = e.clientY + window.scrollY  + 'px'
//  })
  }
  
  /* 生成二维码 */
  getQr ( id) {
    return getPositionCodeUrlApi({id: id})
  }
  /* 关闭二维码弹窗 */
  hiddenQr () {
    this.$nextTick(() => {
      this.$refs['qrCode'].style.display = 'none'
    })
  }
  created () {
    this.getTemplist()
  }
  activated () {
    let that = this
    setTimeout(function () {
      window.scrollTo(0, that.$route.meta.scrollY)
    }, 300)
  }
}
</script>

<style lang="less" scoped="scoped">
.positionManage{
  margin-left: 200px;
  .container{
    min-width: 1000px;
    margin: 22px;
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
        font-size: 15px;
        padding: 12px 20px;
        background-color: #ffe266;
        border-radius: 4px;
      }
    }
    .el-form{
      display: flex;
      align-items: center;
      .el-input{
        width: 200px;
      }
    }
    .el-form-item{
      display: inline-block;
    }
  }
  .positionMsg {
    width: 100%;
    .job_name {
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(53,64,72,1);
      margin-bottom: 8px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .job_info {
      span {
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(98,98,98,1);
        padding: 0 6px;
        margin-right: 8px;
        background:rgba(248,248,248,1);
        border-radius:2px;
        display: inline-block;
      }
    }
  }
  .btn-container{
    display: flex;
    align-items: center;
    justify-content: center;
    .check{
      line-height: 48px;
      color: #652791;
      cursor: pointer;
    }
  }
}
.inquire{
  background-color: #652791;
  color: #FFFFFF;
  border-radius: 4px;
}
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
  width: 250px;
  height: 240px;
  /*background-color: #CCCCCC;*/
  transform: translateY(-100%) translateX(-50%);
  .Qr{
    width: 150px;
    height: 150px;
    margin-top: 30px;
  }
  .bg{
    width: 100%;
    height: 100%;
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
</style>