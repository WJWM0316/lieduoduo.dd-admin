<!--招聘官管理-->
<template>
  <div class="officerManage">
    <el-container class="container" style="border: 1px solid #eee">
      <el-header class="header" style="text-align: right; font-size: 15px">
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
            
            <el-form-item class="btn" label-width="50px">
              <el-button class="inquire" @click="onSubmit">查询</el-button>
              <span @click.stop="resetForm('form')">重置</span>
              <!--<el-button>清除条件</el-button>-->
            </el-form-item>
          </el-form>
        </div>
        <!--筛选-->
      </el-header>
      <el-main>
        <list
          :fields="fields"
          :list="list"
          :total="total"
          :page="form.page"
          :page-count="pageCount"
          @page-change="handlePageChange">
          <template slot-scope="props" slot="columns">
            <!-- 操作列 -->
            <div class="btn-container" v-if="props.scope.column.property === 'id'" style="height: 48px;">
              <div>
                <el-button
                  type="text"
                  @click="check(props.scope.row[props.scope.column.property])"
                  class="func-btn-text"
                  :class="{'row-delete': props.scope.row.isPunchCard !== 1}"
                  >
                  查看
                </el-button>
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
      <!--<el-main width="200px" style="background-color:brown"> 招聘官管理</el-main>-->
    </el-container>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import List from '@/components/list'
import { getRecruiterListApi } from 'API/recruiter'
@Component({
  name: 'officerManage',
  components: {
    List
  }
})
export default class officerManage extends Vue{
  total = 0
  pageCount = 0
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
//  {
//    prop: 'authStatus',
//    label: '身份认证状态',
//    width: 200
//  },
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
      path: '/reviewDetails',
      query: {id: id}
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
  }
  .selectionBox{
    display: flex;
    align-items: center;
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
  .btn{
    padding-top: 10px;
    text-align: center;
    span{
      white-space: nowrap;
      user-select:none;
      cursor: pointer;
      line-height: 12px;
      color: #409EFF;
    }
  }
  .btn-container{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.inquire{
  background-color: #652791;
  color: #FFFFFF;
  border-radius: 4px;
}
</style>