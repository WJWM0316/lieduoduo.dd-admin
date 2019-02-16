<template>
<div id="index">
	<el-container class="container" style="border: 1px solid #eee">
	  <el-header class="header" style="text-align: right; font-size: 15px">
      <div class="title">公司管理({{total}})</div>
      <el-button @click="addCompany" class="btn-limit-width">+ 新建公司</el-button>
    </el-header>
  	<el-main width="200px">
  	  <!--筛选-->
      <div class="selectionBox" @keyup.enter="search">
        <el-form ref="form" :model="form" label-width="80px" validate="validate">
          <el-form-item label="关键词" prop="keyword">
            <el-input v-model="form.keyword" placeholder="请输公司名字"></el-input>
          </el-form-item>
          <!--地区筛选-->
          <!--<el-form-item label="地区筛选" prop="keyword">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
          
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
import { getCompanyListApi } from 'API/company'
import List from '@/components/list'
@Component({
  name: 'companyLibrary',
  components: {
    List
  }
})
export default class indexPage extends Vue {
  total = 0 // 筛查结果数量
  pageCount = 0 // 请求回的数据共几页
  form =  {
    keyword: '',
    start: '',
    end: '',
    page: 1,
    count: 20
  }
  list = []
  fields = [
    {
      prop: 'companyName',
      label: '申请信息',
      width: 250
    },
    {
      prop: 'industry',
      label: '行业',
      width: 150
    },
    {
      prop: 'employeesInfo',
      label: '规模',
      width: 150
    },
    {
      prop: 'financingInfo',
      label: '融资情况',
      width: 150
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
  getCompanyList () {
    getCompanyListApi(this.form).then(res => {
      this.list = res.data.data
      this.pageCount = res.data.meta.lastPage
      this.total = res.data.meta.total
    })
  }
  /* 翻页 */
  handlePageChange (nowPage) {
    this.form.page = nowPage
    this.getCompanyList()
  }
  /* 新建公司 */
  addCompany () {
    this.$router.push({
      path: '/createCompany'
    })
    console.log('添加公司')
  }
  onSubmit () {
    this.form.page = 1
    this.getCompanyList()
  }
  // 搜索公司
  search () {
    this.onSubmit()
  }
  /* 清除列表选项 */
  resetForm (name) {
    this.$refs[name].resetFields()
  }
  check (id) {
    this.$router.push({
      path: '/verify',
      query: {id: id, isEdit: true}
    })
  }
  created () {
    this.getCompanyList()
  }
}
</script>

<style lang="less" scoped="scoped">
  #index{
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
    .btn{
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