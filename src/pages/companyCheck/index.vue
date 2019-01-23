<!--公司审核管理-->
<template>
  <div class="companyCheck">
  	<el-container class="container" style="border: 1px solid #eee">
  	  <el-header class="header" style="text-align: right; font-size: 15px">
  	    <div class="title">审核管理({{total}})</div>
  	    <el-button @click="addCompany" class="btn-limit-width">+ 新建公司</el-button>
  	  </el-header>
      <el-main>
        <!--筛选-->
        <div class="selectionBox">
          <el-form ref="form" :model="form" label-width="80px" validate="validate">
            <el-form-item label="关键词">
              <el-input v-model="form.keyword"></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.start" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.end" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label-width="100px" label="公司认证状态">
              <el-select v-model="form.status" placeholder="全部状态">
                <el-option label="已提交" value="shanghai"></el-option>
                <el-option label="未通过" value="beijing"></el-option>
                <el-option label="通过" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="100px" label="身份认证状态">
              <el-select v-model="form.auth_status" placeholder="全部状态">
                <el-option label="已提交" value="shanghai"></el-option>
                <el-option label="未通过" value="beijing"></el-option>
                <el-option label="通过" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <!--<el-button>清除条件</el-button>-->
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
                  审核中 <i class="el-icon-warning" style="color: #E6A23C;"></i>
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
import { login, templistApi } from 'API/company'
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
      width: 250
    },
    {
      prop: 'realName',
      label: '提交人',
      width: 180
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
      label: '操作'
    }
  ]
  list = []
  onSubmit (e) {
//  console.log(this.form)
    this.getTemplist()
  }
  addCompany () {
    this.$router.push({
      path: '/createCompany'
    })
    console.log('添加公司')
  }
  check (id) {
    this.$router.push({
      path: '/verify',
      query: {id: id}
    })
  }
  handlePageChange (nowPage) {
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
  created () {
//  login({email: 18520287895, password: 123456})
    this.getTemplist()
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
}
</style>