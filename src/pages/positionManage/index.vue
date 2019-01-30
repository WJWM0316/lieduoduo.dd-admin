<!--职位管理-->
<template>
  <div class="positionManage">
    <el-container class="container" style="border: 1px solid #eee">
      <el-header class="header" style="text-align: right; font-size: 15px">
        <div class="title">职位管理({{total}})</div>
      </el-header>
      <el-main>
        <!--筛选-->
        <div class="selectionBox">
          <el-button class="inquire" @click="addPosition" style="margin-bottom: 20px;margin-left: 20px;float: right;">发布职位</el-button>

          <el-form ref="form" :model="form" label-width="80px" validate="validate">
            <el-form-item label="职位名称">
              <el-input v-model="form.name" placeholder="输入职位/发布者/主体公司"></el-input>
            </el-form-item>
            
            <el-form-item label-width="100px" label="上线/下线">
              <el-select v-model="form.is_online" placeholder="全部状态">
                <el-option label="上线" value='1'></el-option>
                <el-option label="下线" value='2'></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label-width="100px" label="审核状态">
              <el-select v-model="form.status" placeholder="全部状态">
                <el-option label="已通过" value="1"></el-option>
                <el-option label="待审核" value="2"></el-option>
                <el-option label="退回重审" value="3"></el-option>
                <el-option label="未通过" value="4"></el-option>
              </el-select>
            </el-form-item>


            <!-- <el-form-item label-width="100px" label="职位类别">
              <el-select v-model="form.status" placeholder="全部状态">
                <el-option label="已提交" value="shanghai"></el-option>
                <el-option label="未通过" value="beijing"></el-option>
                <el-option label="通过" value="beijing"></el-option>
              </el-select> -->

            <!-- <el-form-item label-width="100px" label="薪资范围">
              <el-select v-model="form.auth_status" placeholder="全部状态">
                <el-option label="已提交" value="shanghai"></el-option>
                <el-option label="未通过" value="beijing"></el-option>
                <el-option label="通过" value="beijing"></el-option>
              </el-select>
            </el-form-item> 
            <el-form-item label-width="100px" label="城市">
              <el-select v-model="form.status" placeholder="全部状态">
                <el-option label="已提交" value="shanghai"></el-option>
                <el-option label="未通过" value="beijing"></el-option>
                <el-option label="通过" value="beijing"></el-option>
              </el-select>-->
            <!-- <el-form-item label="修改时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.start" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.end" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item> -->
            <el-form-item>
              <el-button class="inquire" @click="onSubmit">查询</el-button>
              <!--<el-button @click="resetForm('form')">重置</el-button>-->
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
            <div class="btn-container" v-if="props.scope.column.property === 'op'" style="height: 48px;">
              <div>
                <el-button
                  type="text"
                  @click="check(props.scope.row.id)"
                  >
                  查看
                </el-button>
              </div>
            </div>

            <div class="btn-container"  v-else-if="props.scope.column.property === 'positionMsg'" style="height: 48px;">
              <div class="positionMsg">
                <div class="job_name">{{props.scope.row.positionName}}</div>
                <!--<div class="job_info">
                  <span v-if="props.scope.row.address">{{props.scope.row.address}}</span>
                  <span v-if="props.scope.row.workExperience">{{props.scope.row.workExperience}}年</span>
                  <span v-if="props.scope.row.workExperienceName">{{props.scope.row.workExperienceName}}</span>
                </div>-->
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
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import List from '@/components/list'
import { login, templistApi } from 'API/company'
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
      label: '审核状态',
      width: 150
    },
    {
      prop: 'op',
      fixed: "right",
      label: '操作'
    }
  ]
  list = []
  onSubmit (e) {
    this.form.page = 1
    this.getTemplist()
  }
  addCompany () {
    this.$router.push({
      path: '/createCompany'
    })
    console.log('添加公司')
  }
  check (id) {
    console.log(id)
    this.$router.push({
      path: '/positionAuditDetail',
      query: {id: id}
    })
  }
  /* 重置 */
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }

  addPosition() {
    this.$router.push({
      path: '/positionPost'
    })
  }
  handlePageChange (nowPage) {
    console.log(nowPage)
    this.form.page = nowPage
    this.getTemplist()
  }
  /* 请求职位管理列表 */
  getTemplist () {
    getListApi(this.form).then(res => {

      console.log(res)
      this.list = res.data.data
      this.total = res.data.meta.total
      this.pageCount = res.data.meta.lastPage
    })
  }
  created () {
    this.getTemplist()
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
    .job_name {
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(53,64,72,1);
      margin-bottom: 8px;
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
  }
}
.inquire{
  background-color: #652791;
  color: #FFFFFF;
  border-radius: 4px;
}
</style>