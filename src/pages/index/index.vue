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
          <!-- 筛选条件1 -->
          <div class="searchTab">
            <el-input type='text' placeholder="请输入内容" v-model="searchType.keyword1" class="inputSelect">
              <el-select class="selectTitle" v-model="searchType.condition1" slot="prepend" placeholder="请选择" @change="changeProvince">
                <el-option label="公司名" value="keyword" v-show="searchType.condition2 !== 'keyword'"></el-option>
                <el-option label="手机号码" value="mobile" v-show="searchType.condition2 !== 'mobile'"></el-option>
                <el-option label="公司ID" value="companyId" v-show="searchType.condition2 !== 'companyId'"></el-option>
              </el-select>
            </el-input>
          </div>
          <!-- <el-form-item prop="keyword" label-width="20px" class="searchTab">
            
          </el-form-item> -->
          <!-- 筛选条件2 -->
          <div class="searchTab">
            <el-input type='text' placeholder="请输入内容" v-model="searchType.keyword2" class="inputSelect">
              <el-select class="selectTitle" v-model="searchType.condition2" slot="prepend" placeholder="请选择" @change="changeProvince">
                <el-option label="公司名" value="keyword" v-show="searchType.condition1 !== 'keyword'"></el-option>
                <el-option label="手机号码" value="mobile" v-show="searchType.condition1 !== 'mobile'"></el-option>
                <el-option label="公司ID" value="companyId" v-show="searchType.condition1 !== 'companyId'"></el-option>
              </el-select>
            </el-input>
          </div>
          <!-- <el-form-item prop="keyword" label-width="20px" class="searchTab">
            
          </el-form-item> -->
          <!--地区筛选-->
          <el-form-item class="area" label="地区筛选" prop="area">
            <el-select v-model="form.firstAreaId" placeholder="请选择省份" @change="changeProvince" style="margin-right: 10px;">
              <el-option
                v-for="item in firstAreaIdList"
                :key="item.areaId"
                :label="item.title"
                :value="item.areaId">
              </el-option>
            </el-select>
            <el-select v-model="form.area_id" placeholder="请选择城市">
              <el-option
                v-for="item in cityLable"
                :key="item.areaId"
                :label="item.title"
                :value="item.areaId">
              </el-option>
            </el-select>
          </el-form-item>
          
          <!-- 权益筛选 -->
          <el-form-item class="area" label="权益筛选" prop="equity">
            <el-select v-model="form.equity" placeholder="请选择权益" style="margin-right: 10px;">
              <el-option label="全部权益" value="0"></el-option>
              <el-option
                v-for="item in rightList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="time" label="权益截止时间" prop="start" label-width="100px">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.start" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">—</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.end" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <!--用于代替清除结束时间-->
          <el-form-item label-width="1px" label="" prop="end">
          </el-form-item>

          <!-- 状态筛选 -->
          <el-form-item class="area" label="状态" prop="status" label-width="50px">
            <el-select v-model="form.status" placeholder="请选择状态" style="margin-right: 10px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="上线" value="1"></el-option>
              <el-option label="下线" value="0"></el-option>
            </el-select>
          </el-form-item>

          <!-- 跟进人筛选 -->
          <el-form-item class="area" label="跟进人" prop="adminUid" label-width="70px">
            <el-select v-model="form.adminUid" placeholder="请选择" style="margin-right: 10px;">
              <el-option
                v-for="item in salerLis"
                :key="item.id"
                :label="item.realname"
                :value="item.id">
              </el-option>
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
            <div class="btn-container" v-if="props.scope.column.property === 'check'">
              <div>
                <span class="check" @click="check(props.scope.row.id)">查看</span>
              </div>
              <div>
                <span class="check" @click="toUser(props.scope.row.createdUid)" v-if="props.scope.row.createdUid">查看管理员</span>
              </div>
            </div>
            <!-- 地址列 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'address'">
              <div>
                <span>{{props.scope.row.address.city || '公司未设置地址'}}</span>
              </div>
            </div>
            <!-- 序号 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'index'">
              <div>
                <span>{{props.scope.row.id}}</span>
              </div>
            </div>
            <!-- 申请信息 -->
            <div class="btn-container" v-else-if="props.scope.column.property === 'companyName'">
              <div style="text-align: left; display: flex;align-items: center;">
                <img style="width: 56px;height: 56px;border-radius: 5px;margin-right: 5px;" :src="props.scope.row.logoInfo.middleUrl"/>
                <div>
                  <span>{{props.scope.row.companyName}}</span>
                  <P class="label"><span class="industry">{{props.scope.row.industry}}</span> <span class="capital">{{props.scope.row.financingInfo}}</span> <span class="extent">{{props.scope.row.employeesInfo}}</span></P>
                </div>
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
import { getCompanyListApi, getCityApi } from 'API/company'
import { rightInfoApi, getSalerListApi } from 'API/commont'
import List from '@/components/list'
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])

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
    start: '',
    end: '',
    page: 1,
    count: 20,
    area_id: '',
    firstAreaId: '',
    equity: '',
    status: '',
    adminUid: ''
  }
  searchType = {
    condition1: 'keyword',
    condition2: 'mobile',
    keyword1:'',
    keyword2: ''
  }
  rightList = [] // 权益列表
  salerLis = [] // 销售人员列表
//firstAreaId = ''
  firstAreaIdList = []
  cityLable = []
  list = []
  fields = [
    {
      prop: 'id',
      label: '公司ID',
      width: 80
    },
    {
      prop: 'companyName',
      label: '申请信息',
      width: 350
//    align: 'left'
    },
    {
      prop: 'address',
      label: '地区',
      width: 150
    },
    {
      prop: 'rtVersionName',
      label: '权益类型',
      width: 150
    },
    {
      prop: 'expiredDesc',
      label: '权益截止时间',
      width: 200
    },
    {
      prop: 'adminName',
      label: '跟进人',
      width: 150
    },
    {
      prop: 'statusDesc',
      label: '状态',
      width: 200
    },
    {
      prop: 'check',
      fixed: "right",
      width: 180,
      label: '操作',
    }
  ]
  beforeRouteEnter (to, from, next) {
    if (from.name === 'createCompany') {
      next(vm => {
        vm.getCompanyList()
      })
    } else {
      next()
    }
    
  }
  getCompanyList (newForm) {
    if (this.form.firstAreaId !== '' && this.form.area_id === '') {
      this.$message.error("请选择城市")
      return
    }
//  delete this.form.firstAreaId
    getCompanyListApi(newForm || this.form).then(res => {
      this.list = res.data.data
      this.pageCount = res.data.meta.lastPage
      this.total = res.data.meta.total
    })
  }
  /* 翻页 */
  handlePageChange (nowPage) {
    this.$route.meta.scrollY = 0
    window.scrollTo(0, 0)
    this.form.page = nowPage
    this.getCompanyList()
  }
  /* 新建公司 */
  addCompany () {
    this.$router.push({
      path: '/index/createCompany'
    })
  }
  onSubmit () {
    this.form.page = 1
    let searchCondition = {}
    if (this.searchType.condition1 && this.searchType.keyword1) searchCondition[this.searchType.condition1] = this.searchType.keyword1
    if (this.searchType.condition2 && this.searchType.keyword2) searchCondition[this.searchType.condition2] = this.searchType.keyword2
    let searchForm = Object.assign({}, this.form, searchCondition)
    this.getCompanyList(searchForm)
  }
  // 搜索公司
  search () {
    this.onSubmit()
  }
  // 获取城市标签
  getCity () {
    getCityApi().then(res => {
      res.data.data.map(item => {
        this.firstAreaIdList.push(item)
      })
      console.log(this.cityLable)
    })
  }
  // 获取权益列表
  async getRightList () {
    let res = await rightInfoApi({pageCount: 50})
    this.rightList = res.data.data
  }
  // 获取销售人员名单
  async getSalerList () {
    let res =  await getSalerListApi({pageCount: 50})
    this.salerLis = res.data.data
  }
  /* 选择省 */
  changeProvince () {
    this.firstAreaIdList.map(item => {
      if (item.areaId === this.form.firstAreaId) {
        this.cityLable = item.children
        this.form.area_id = ''
      }
    })
  }
  /* 清除列表选项 */
  resetForm (name) {
    this.$refs[name].resetFields()
    // 清除筛选条件数据
    this.searchType = {
      condition1: '',
      condition2: '',
      keyword1:'',
      keyword2: ''
    }
    // 清除地区数据
    this.form.firstAreaId = ''
    this.form.area_id = ''
    this.cityLable = []
  }
  check (id) {
    this.$route.meta.scrollY = window.scrollY
    this.$router.push({
      path: '/index/companyInfo',
      query: {id: id}
    })
  }
  toUser (uid) {
    this.$router.push({path: `/user/userInfo/${uid}`})
  }
  created () {
    this.getCompanyList()
    this.getCity()
    this.getRightList()
    this.getSalerList()
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
      /*display: flex;*/
      /*align-items: center;*/
      /* 筛选 */
      .inputSelect{
        line-height: 20px !important;
        width: 400px !important;
        background-color: #FFFFFF;
        .el-select{
          width: 120px;
          margin-top: -2px;
          border: none;
          box-sizing: border-box;
        }
      }
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
    .el-form-item,
    .searchTab{
      margin-bottom: 22px;
      margin-left: 5px;
      float: left;
    }
    .area{
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
.check{
  line-height: 48px;
  color: #652791;
  cursor: pointer;
}
.btn-container{
  .label{
    white-space: nowrap;
    text-align: left;
    width: 100%;
    span{
      display: inline-block;
      background-color: #F8F8F8;
      padding: 0 4px;
      border-radius: 3px;
      margin-right: 10px;
    }
  }
}
</style>