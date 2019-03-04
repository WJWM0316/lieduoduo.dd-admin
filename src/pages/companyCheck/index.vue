<!--公司审核管理-->
<template>
  <div class="companyCheck">
  	<el-container class="container" style="border: 1px solid #eee">
  	  <el-header class="header" style="text-align: right; font-size: 15px">
  	    <div class="title">审核管理({{total}})</div>
  	    <!--<el-button @click="addCompany" class="btn-limit-width">+ 新建公司</el-button>-->
  	  </el-header>
      <el-main>
        <!--筛选-->
        <div class="selectionBox" @keyup.enter="search">
          <el-form ref="form" :model="form" label-width="80px" validate="validate">
            <el-form-item label="关键词" prop="keyword">
              <el-input v-model="form.keyword" placeholder="请输入提交人/公司全称"></el-input>
            </el-form-item>
            <el-form-item label="申请时间" prop="start" style="margin-left: 10px;">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.start" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">—</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.end" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <!--用于代替清除结束时间-->
            <el-form-item label-width="1px" label="" prop="end">
            </el-form-item>
            
            <el-form-item label-width="100px" label="公司认证状态" prop="status" style="margin-left: 20px;">
              <el-select v-model="form.status" placeholder="全部状态">
                <el-option label="待审核" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="100px" label="身份认证状态" prop="auth_status" style="margin-left: 20px;">
              <el-select v-model="form.auth_status" placeholder="全部状态">
                <el-option label="待审核" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="未通过" value="2"></el-option>
                <el-option label="未提交" value="3"></el-option>
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
            <div class="btn-container" v-if="props.scope.column.property === 'id'" style="height: 48px;">
              <div>
                <span class="check" @click="check(props.scope.row[props.scope.column.property])">查看</span>
                <!--<el-button
                  type="text"
                  @click="check(props.scope.row[props.scope.column.property])"
                  class="func-btn-text"
                  :class="{'row-delete': props.scope.row.isPunchCard !== 1}"
                  >
                  查看
                </el-button>-->
              </div>
            </div>
            <!-- 提交人 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'realName'" style="justify-content: flex-start;">
              <span style="text-align: left;">
                {{props.scope.row[props.scope.column.property]}}
              </span>
            </div>
            <!-- 申请信息列 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'companyName'" style="height: 48px;">
              <div class="companyName">
                <div class="name">{{props.scope.row[props.scope.column.property]}}</div>
                <div class="label"><span class="industry">{{props.scope.row.industry}}</span> <span class="capital">{{props.scope.row.financingInfo}}</span> <span class="extent">{{props.scope.row.employeesInfo}}</span></div>
              </div>
            </div>
            <!--认证状态-->
            <div class="btn-container" v-else-if="props.scope.column.property === 'status' || props.scope.column.property === 'authStatus'" style="height: 48px;">
              <div>
                <span :class="{'row-delete': props.scope.row.status !== 1}" v-show="!props.scope.row[props.scope.column.property] && props.scope.row[props.scope.column.property] !== 0">
                  未提交 <i class="el-icon-error" style="color: #F56C6C;"></i>
                </span>
                <span :class="{'row-delete': props.scope.row.status !== 1}" v-show="props.scope.row[props.scope.column.property] === 0">
                  待审核 <i class="el-icon-warning" style="color: #E6A23C;"></i>
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
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import List from '@/components/list'
import { templistApi } from 'API/company'
@Component({
  name: 'course-list',
  components: {
    List
  }
})
export default class companyCheck extends Vue {
  total = 0 // 筛查结果数量
  pageCount = 0 // 请求回的数据共几页
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
      prop: 'companyName',
      label: '申请信息',
      width: 400
    },
    {
      prop: 'realName',
      label: '提交人',
      width: 200,
      align: 'left'
    },
    {
      prop: 'status',
      label: '公司认证状态',
      width: 200
    },
    {
      prop: 'authStatus',
      label: '身份认证状态',
      width: 200
    },
    {
      prop: 'createdAt',
      label: '申请时间',
      width: 200
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
    this.getTemplist()
  }
  // 搜索公司
  search () {
    this.onSubmit()
  }
  addCompany () {
    this.$router.push({
      path: '/createCompany'
    })
    console.log('添加公司')
  }
  check (id) {
    this.$route.meta.scrollY = window.scrollY
    this.$router.push({
      path: '/companyCheck/verify',
      query: {id: id}
    })
  }
  /* 翻页 */
  handlePageChange (nowPage) {
    this.$route.meta.scrollY = 0
    window.scrollTo(0, 0)
    this.form.page = nowPage
    this.getTemplist()
  }
  /* 请求审核列表 */
  getTemplist () {
    templistApi(this.form).then(res => {
      this.list = res.data.data
      this.total = res.data.meta.total
      this.pageCount = res.data.meta.lastPage
    })
  }
  /* 清除列表选项 */
  resetForm (name) {
    this.$refs[name].resetFields()
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
.companyCheck{
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
      span{
        white-space: nowrap;
        user-select:none;
        cursor: pointer;
        line-height: 12px;
        color: #409EFF;
      }
    }
    /* 公司申请信息栏样式 */
    .companyName{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      .name{
        font-size: 16px;
        font-weight: bolder;
        width: 300px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 30px;
      }
      .label{
        text-align: left;
        width: 100%;
        span{
          display: inline-block;
          background-color: #F8F8F8;
          padding: 0 4px;
          border-radius: 3px;
          margin-right: 20px;
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
        color: #409EFF;
      }
    }
  }
}
</style>