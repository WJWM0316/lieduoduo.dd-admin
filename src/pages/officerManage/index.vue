<!--招聘官管理-->
<template>
  <div class="officerManage">
    <el-container class="container" style="border: 1px solid #eee">
      <el-header class="header" style="text-align: right; font-size: 15px">
        <div class="title">招聘官管理({{total}})</div>
      </el-header>
      <el-main>
        <!--筛选-->
        <div class="selectionBox" @keyup.enter="search">
          <el-form ref="form" :model="form" label-width="80px" validate="validate">
            <el-form-item label="关键词" prop="keyword">
              <el-input v-model="form.keyword" placeholder="请输入姓名/职务/加入公司"></el-input>
            </el-form-item>
            <el-form-item label="申请时间" prop="start">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.start" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.end" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            
            <!--用于代替清除结束时间-->
            <el-form-item label-width="1px" label="" prop="end">
            </el-form-item>
        
            <el-form-item label-width="120px" label="管理员处理状态" prop="status">
              <el-select v-model="form.status" placeholder="全部状态">
                <el-option label="待审核" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="120px" label="身份认证状态" prop="auth_status">
              <el-select v-model="form.auth_status" placeholder="全部状态 ">
                <el-option label="已提交" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
                <el-option label="未提交" value="3"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item class="btn">
              <el-button class="inquire" @click="onSubmit">查询</el-button>
              <el-button @click.stop="resetForm('form')">重置</el-button>
            </el-form-item>
            <!--<el-form-item class="btn" label-width="50px">
              <el-button class="inquire" @click="onSubmit">查询</el-button>
              <span @click.stop="resetForm('form')">重置</span>
            </el-form-item>-->
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
                <span class="check" @click="check(props.scope.row[props.scope.column.property])">查看</span>
              </div>
              <div style="width: 100%; cursor: pointer; color: #652791;" @click.stop="creatLink($event, props.scope.row.uid, props.scope.$index)" @mouseleave="hiddenQr">查看招聘官</div>
            </div>
            <!-- 序号 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'index'">
              <div>
                <span>{{props.scope.$index +1}}</span>
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
      <img class="Qr" :src="qrCode"/>
      <div class="txt">微信扫码，打开小程序查看</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import List from '@/components/list'
import { getRecruiterListApi } from 'API/recruiter'
import { getRecruiterCodeUrlApi } from 'API/interview'
@Component({
  name: 'officerManage',
  components: {
    List
  }
})
export default class officerManage extends Vue{
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
  fields = [
    {
      prop: 'index',
      label: '序号',
      width: 80
    },
    {
      prop: 'realName',
      label: '申请信息',
      width: 150
    },
    {
      prop: 'userEmail',
      label: '邮箱',
      width: 220
    },
    {
      prop: 'userPosition',
      label: '公司职务',
      width: 150
    },
    {
      prop: 'companyName',
      label: '加入公司',
      width: 220
    },
    {
      prop: 'createdAt',
      label: '申请时间',
      width: 200
    },
    {
      prop: 'status',
      label: '管理员处理状态',
      width: 150
    },
    {
      prop: 'authStatus',
      label: '身份认证状态',
      width: 150
    },
    {
      prop: 'id',
      fixed: "right",
      label: '操作'
    }
  ]
  list = []
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
    getRecruiterListApi(this.form).then(res => {
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
      path: '/recruitmentOfficer/reviewDetails',
      query: {id: id}
    })
  }
  /* 生成职位详情小程序码 */
  async creatLink (e, positionId, index) {
    // 是否已经加载过二维码
    if (this.list[index].qrCode) {
      this.qrCode = this.list[index].qrCode
      this.$nextTick(() => {
        this.$refs['qrCode'].style.display = 'block'
        this.$refs['qrCode'].style.left = e.clientX + 'px'
        this.$refs['qrCode'].style.top = e.clientY + 'px'
      })
      return
    }
    
    let res = await this.getQr(positionId)
    this.qrCode = res.data.data.qrCodeUrl
    this.list[index].qrCode = res.data.data.qrCodeUrl
    
    this.$nextTick(() => {
      this.$refs['qrCode'].style.display = 'block'
      this.$refs['qrCode'].style.left = e.clientX + 'px'
      this.$refs['qrCode'].style.top = e.clientY + 'px'
    })
  }
  
  /* 生成二维码 */
  getQr ( id) {
    return getRecruiterCodeUrlApi({id: id})
  }
  /* 关闭二维码弹窗 */
  hiddenQr () {
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
  position: fixed;
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
</style>