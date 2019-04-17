<!--招聘官管理-->
<template>
  <div class="officerManage" @click="closeTopic">
    <el-container class="container" style="border: 1px solid #eee">
      <el-header class="header" style="text-align: right; font-size: 15px">
        <div class="title">用户管理({{total}})</div>
        <el-button @click.stop="addUser" class="btn-limit-width">+ 添加用户</el-button>
      </el-header>
      <el-main>
        <!--筛选-->
        <div class="selectionBox" @keyup.enter="onSubmit">
          <el-form ref="form" :model="form" label-width="80px" validate="validate">
            
            <el-form-item class="content" prop="content" label-width="0">
              <el-input type='text' placeholder="请输入内容" v-model="form.content" class="inputSelect">
                <el-select class="selectTitle" v-model="form.searchType" slot="prepend" placeholder="请选择" @change="changeProvince">
                  <el-option v-for="item in keyword" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            
            <el-form-item class="state" label="公司名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输公司名字"></el-input>
            </el-form-item>
            
            <el-form-item class="state" label-width="0" prop="searchType">
            </el-form-item>
            
            <el-form-item class="state" label="状态" prop="status">
              <el-select class="selectState" v-model="form.status" placeholder="全部状态" @change="changeProvince">
                <el-option label="全部状态" value="0"></el-option>
                <el-option label="待求职者接受邀请" value="12"></el-option>
                <el-option label="待面试官安排时间" value="21"></el-option>
                <el-option label="待求职者确认" value="31"></el-option>
                <el-option label="待面试官修改" value="32"></el-option>
                <el-option label="已确定面试日程" value="41"></el-option>
                <el-option label="不合适" value="52"></el-option>
                <el-option label="求职者暂不考虑" value="54"></el-option>
                <el-option label="面试已结束" value="51"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item class="btn">
              <el-button class="inquire" @click="onSubmit">查询</el-button>
              <el-button @click.stop="resetForm('form')">重置</el-button>
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
            <div style="flex-wrap: wrap;" class="btn-container" v-if="props.scope.column.property === 'id'">
              <div>
                <span class="check" @click="check(props.scope.row.uid)">查看</span>
              </div>
              <div style="width: 100%; cursor: pointer; color: #652791;" @click.stop="creatLink($event, props.scope.row, props.scope.$index)">查看招聘官</div>
            </div>
            <!-- 序号 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'index'">
              <div>
                <span>{{props.scope.$index +1}}</span>
              </div>
            </div>
            <!-- 所属公司 -->
            <div class="btn-container companyName" v-else-if="props.scope.column.property === 'companyName'">
              <div v-if="props.scope.row.isRecruiter">
                <span>{{props.scope.row[props.scope.column.property]}}</span>
                <p v-if="props.scope.row.isAdmin === 1">管理员</p>
                <p v-else>招聘官</p>
              </div>
            </div>
            <!-- 发布职位权益 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'createPositionRight'">
              <div>
                <span v-if="props.scope.row.createPositionRight === 0">无</span>
                <span v-else-if="props.scope.row.createPositionRight === 1">是</span>
                <span v-else>---</span>
              </div>
            </div>
            <!-- 身份认证状态 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'identityAuth'">
              <div>
                <span v-if="props.scope.row.identityAuth === 0">已提交</span>
                <span v-else-if="props.scope.row.identityAuth === 1">已通过</span>
                <span v-else-if="props.scope.row.identityAuth === 2">未通过</span>
                <span v-else>未提交</span>
              </div>
            </div>
            <!--认证状态-->
            <div class="btn-container" v-else-if="props.scope.column.property === 'status' || props.scope.column.property === 'authStatus'" style="height: 48px;">
              <div>
                <span :class="{'row-delete': props.scope.row.status !== 1}" v-show="!props.scope.row[props.scope.column.property] && props.scope.row[props.scope.column.property] !== 0">
                  未提交 <i class="el-icon-warning" style="color: #E6A23C;"></i>
                </span>
                <span :class="{'row-delete': props.scope.row.status !== 1}" v-show="props.scope.row[props.scope.column.property] === 0">
                  <span v-if="props.scope.column.property === 'status'">待审核 <i class="el-icon-warning" style="color: #E6A23C;"></i></span>
                  <span v-else>已提交 <i class="el-icon-warning" style="color: #E6A23C;"></i></span>
                </span>
                <span :class="{'row-delete': props.scope.row.status !== 1}" v-show="props.scope.row[props.scope.column.property] === 1">
                  已通过 <i class="el-icon-success" style="color: #67C23A;"></i>
                </span>
                <span :class="{'row-delete': props.scope.row.status !== 1}" v-show="props.scope.row[props.scope.column.property] === 2">
                  未通过 <i class="el-icon-error" style="color: #F56C6C;"></i>
                </span>
              </div>
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
import { getUserListApi } from 'API/recruiter'
import { getRecruiterCodeUrlApi } from 'API/interview'
@Component({
  name: 'userList',
  components: {
    List
  }
})
export default class user extends Vue{
  total = 0
  pageCount = 0
  qrCode = ''
  form =  {
    keyword: '',
    status: '',
    auth_status: '',
    start: '',
    end: '',
    page: 1,
    count: 20
  }
  /* 搜索关键字 */
  keyword = [
    {label: '公司名字', value: 'companyName'},
    {label: '手机号', value: 'phone'},
    {label: '人名', value: 'name'}
  ]
  fields = [
    {
      prop: 'index',
      label: '序号',
      width: 80
    },
    {
      prop: 'name',
      label: '个人信息',
      width: 200
    },
    {
      prop: 'companyName',
      label: '所属公司',
      align: 'left',
      width: 300
    },
    {
      prop: 'createPositionRight',
      label: '发布职位权益',
      width: 150
    },
    {
      prop: 'identityAuth',
      label: '身份认证状态',
      width: 220
    },
    {
      prop: 'createdAt',
      label: '创建时间',
      width: 200
    },
    {
      prop: 'id',
      fixed: "right",
      label: '操作'
    }
  ]
  list = []
  /* 添加用户 */
  addUser () {
    console.log('添加用户')
    this.$router.push({path: '/user/addUser'})
  }
  /* 选择变更 */
    changeProvince (e) {
      console.log(this.nowSelect)
    }
  onSubmit (e) {
    this.form.page = 1
    this.getRecruiterList()
  }
  // 搜索地址
  search () {
    this.onSubmit()
  }
  /* 重置筛选 */
  resetForm (name) {
    this.$refs[name].resetFields()
  }
  /* 请求招聘官审核列表 */
  getRecruiterList () {
    getUserListApi(this.form).then(res => {
      this.list = res.data.data
      this.total = res.data.meta.total
      this.pageCount = res.data.meta.lastPage
    })
  }
  /* 翻页 */
  handlePageChange (nowPage) {
    this.$route.meta.scrollY = 0
    window.scrollTo(0, 0)
    this.form.page = nowPage
    this.getRecruiterList()
  }
  /* 查看相应的招聘官审核详情 */
  check (id) {
    this.$route.meta.scrollY = window.scrollY
    this.$router.push({
      path: `/user/userInfo/${id}`
    })
  }
  /* 生成职位详情小程序码 */
  async creatLink (e, data, index) {
    this.qrCode = ''
    if (data.isRecruiter !== 1) {
      this.$refs['qrCode'].style.display = 'none'
      this.$message.error(`该用户不是招聘官,暂无招聘官主页`);
      return
    }
    // 是否已经加载过二维码
    if (this.list[index].qrCode) {
      this.qrCode = this.list[index].qrCode
      this.$nextTick(() => {
        this.$refs['qrCode'].style.display = 'block'
        this.$refs['qrCode'].style.left = e.clientX + 'px'
        this.$refs['qrCode'].style.top = e.clientY + window.scrollY + 'px'
      })
      return
    }
    
    this.$nextTick(() => {
      this.$refs['qrCode'].style.display = 'block'
      this.$refs['qrCode'].style.left = e.clientX + 'px'
      this.$refs['qrCode'].style.top = e.clientY + window.scrollY + 'px'
    })
    let res = await this.getQr(data.uid)
    this.qrCode = res.data.data.qrCodeUrl
    this.list[index].qrCode = res.data.data.qrCodeUrl
  }
  
  /* 生成二维码 */
  getQr ( id) {
    return getRecruiterCodeUrlApi({id: id})
  }
  /* 关闭二维码弹窗 */
//hiddenQr () {
//  this.$nextTick(() => {
//    this.$refs['qrCode'].style.display = 'none'
//  })
//}
  /* 关闭浮窗 */
  closeTopic () {
    this.$nextTick(() => {
      this.$refs['qrCode'].style.display = 'none'
    })
  }
  
  created () {
    this.getRecruiterList()
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
.officerManage{
  /*padding: 22px;*/
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
  .companyName{
    justify-content: flex-start;
    text-align: left;
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
  /* 筛选 */
  .inputSelect{
    width: 400px !important;
    background-color: #FFFFFF;
    .el-select{
      width: 120px;
      margin-top: -2px;
      border: none;
      box-sizing: border-box;
    }
  }
</style>