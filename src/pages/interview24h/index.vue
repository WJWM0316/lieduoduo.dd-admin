<style lang="less">
#interview24h{
  margin: 22px 22px 22px 222px;
  border: 1px solid rgb(238, 238, 238);
  .h24_navigation{
    text-align: left;
    margin-top: 24px;
    margin-left: 10px;
    li{
      display: inline-block;
      background-color: #f4f4f5;
      display: inline-block;
      height: 40px;
      padding: 0 15px;
      line-height: 40px;
      font-size: 12px;
      color: #909399;
      cursor: pointer;
    }
    .active{
      background-color: #3e294d;
      color: white;
      cursor: none;
      pointer-events: none;
    }
  }
  .el-form {
    text-align: left;
    margin-top: 22px;
    overflow: hidden;
    margin-left: 10px;
    .el-form-item{
      text-align: center;
    }
  }
  .el-pagination{
    text-align: left;
    margin: 22px 0;
    overflow: hidden;
  }
  .btn_deal{
    color: #652791;
    cursor: pointer;
    display: inline-block;
    margin-right: 20px;
  }
  .el-dialog__body{
    padding-top: 0;
    padding-bottom: 0;
  }
  .html_content {
    .row{
      height: 40px;
      line-height: 40px;
      display: flex;
    }
    .label{
      display: inline-block;
      width: 70px;
    }
    .value{
      display: inline-block;
      flex: 1;
      position: relative;
    }
    .user_input{
      display: block;
      width: 100%;
      border: none;
      outline: none;
      height: 40px;
      background: transparent;
      line-height: 40px;
      font-size: 14px;
    }
    .position_item{
      height: 40px;
      line-height: 40px;
      display: flex;
      border-bottom: 1px solod #fefefe;
      position: relative;
      cursor: pointer;
    }
    .name{
      padding-left: 20px;
      max-width: 300px;
      overflow: hidden;
      line-height: 40px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon_circle_my{
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #606266;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 1px;
      cursor: pointer;
    }
    .el-icon-success{
      font-size: 14px;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      cursor: pointer;
      color: #3a8ee6;
    }
    .improper{
      padding-bottom: 5px;
    }
    .reason_item{
      height: 28px;
      line-height: 28px;
      padding: 0 15px;
      border-radius: 5px;
      display: inline-block;
      border-radius: 17px;
      border: 1px solid rgba(228, 228, 228, 1);
      margin-bottom: 8px;
      margin-right: 8px;
      color: #999;
      cursor: pointer;
    }
    .reason_item_active{
      color: #3a8ee6;
      border-color: #3a8ee6;
    }
    h2{
      color: #666;
      margin-bottom: 5px;
    }
  }
  .position_ul .p_ul{
    max-height: 300px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .position_ul .p_ul::-webkit-scrollbar {
   width: 4px;
  }
   .position_ul .p_ul::-webkit-scrollbar-track {
   background:rgba(0,0,0,.1);
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius:20px;
  }
   .position_ul .p_ul::-webkit-scrollbar-thumb {
   background:rgba(0,0,0,1);
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius:20px;
  }
  .time_row{
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    position: relative;
    i{
      margin-right: 10px;
      color: red;
    }
    .circle{
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    .active{
      border-color: rgb(58, 142, 230);
      background: rgb(58, 142, 230);
    }
  }
  .add_time{
    position: relative;
    overflow: hidden;
    .el-date-editor{
      position: absolute;
      left: 0;
      right: 0;
      height: 100%;
      opacity: 0;
    }
  }
  .dialog-footer{
    text-align: left;
  }
  .strong_name{
    cursor: pointer;
    color: #652791;
  }
}
</style>
<template>
  <div id="interview24h">

    <ul class="h24_navigation">
      <li v-for="item in navigation" :key="item.type" :class="{active: item.active}" @click="tabClick(item.type)">{{item.msg}}</li>
    </ul>

    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      
      <el-form-item>
        <el-input
          type="text"
          placeholder="请输入内容"
          v-model="form.content">
          <el-select
            v-model="form.searchType"
            slot="prepend"
            placeholder="手机号"
            @change="changeSearch"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>

      <el-form-item label="公司名字">
        <el-input v-model="form.companyName" placeholder="请输入公司名字"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="全部状态">
          <el-option
            v-for="item in statusLists"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="lists">
      <el-table-column
        prop="interviewId"
        width="80"
        label="面试id">
      </el-table-column>
      <el-table-column
        prop="jobhunterInfo"
        label="求职者信息">
        <template slot-scope="scope" v-if="scope.row.jobhunterInfo">
          <div>
            <span class="strong_name">{{scope.row.jobhunterInfo.realname}}</span>
            <span> · {{scope.row.jobhunterInfo.lastPosition}}</span>
          </div>
          <div>{{scope.row.jobhunterInfo.lastCompanyName}}</div>
          <div>
            <span class="strong_name">扫码看简历&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="strong_name">联系用户</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="statusDesc"
        label="状态">
        <template slot-scope="scope">
          <div>{{scope.row.statusDesc}}</div>
          <div>{{scope.row.updatedAt}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="recruiterInfo"
        label="面试官信息">
        <template slot-scope="scope" v-if="scope.row.recruiterInfo">
          <div>
            <span class="strong_name">{{scope.row.recruiterInfo.realname}}</span>
            <span> · {{scope.row.recruiterInfo.position}}</span>
          </div>
          <div>{{scope.row.recruiterInfo.companyName}}</div>
          <div>
            <span class="strong_name">扫码看主页&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="strong_name">联系用户</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="interviewType"
        label="约面信息">
        <template slot-scope="scope">
          <div>
            <span class="strong_name">职位： {{scope.row.positionName}}</span>
          </div>
          <div>地址：{{scope.row.address}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="handleEndTime"
        label="服务到期时间">
      </el-table-column>
      <el-table-column
        prop="num4"
        label="跟进运营">
        <template slot-scope="scope" v-if="scope.row.adminInfo">
          {{scope.row.adminInfo.realname || ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        width="120"
        align="center"
        label="代客操作">
        <template slot-scope="scope" v-if="scope.row.action">
          <span class="btn_deal" @click="todoAction('modify', scope.row)">修改约面时间</span>
          <span class="btn_deal" @click="todoAction(item.action, scope.row)" v-for="(item, index) in scope.row.action">{{item.msg}}</span>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
      layout="prev, pager, next, slot"
      :total="total"
      :page-size="pageSize"
      prev-text="上一页"
      next-text="下一页"
      :current-page="Number(form.page)"
      v-if="total"
      @current-change="pageChange">
      <span class="total">共{{ Math.ceil(total/20) }}页, {{total}}条记录</span>
    </el-pagination>
    <el-dialog
      :title="model.title"
      :visible.sync="model.show"
      width="450px"
      center>
      <div class="html_content position_ul" v-show="model.type === 'position'">
        <ul class="p_ul" id="scroll_div_ul_position">
          <li class="position_item" v-for="(item, index) in positionLists" :key="index" @click="getPosition(index)">
            <i class="icon_circle_my" v-show="!item.active"></i>
            <i class="el-icon-success" v-show="item.active"></i>
            <div class="name">{{item.positionName}}</div>
          </li>
        </ul>
      </div>
      <div class="html_content position_ul" v-show="model.type === 'address'">
        <ul class="p_ul" id="scroll_div_ul_address">
          <li class="position_item" v-for="(item, index) in addressLists" :key="index" @click="getAddress(index)">
            <i class="icon_circle_my" v-show="!item.active"></i>
            <i class="el-icon-success" v-show="item.active"></i>
            <div class="name">{{item.address}}</div>
          </li>
        </ul>
      </div>
      <div class="html_content position_ul" v-show="model.type === 'improper'">
        <div class="improper">确定标记为不合适吗？</div>
      </div>
      <div class="html_content position_ul" v-show="model.type === 'reason'">
        <ul>
          <li
            v-for="(item, index) in reasonList"
            :key="index"
            class="reason_item"
            :class="{reason_item_active: item.active}"
            @click="setReason(index)">{{item.title}}</li>
        </ul>
        <div class="content_01">
          <h2>补充说明（选填）</h2>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="model.extra">
          </el-input>
        </div>
      </div>
      <div class="html_content" v-show="model.type === 'modify' || model.type === 'arrange'">
        <ul>
          <li class="row">
            <div class="label">联系人：</div>
            <div class="value">{{form.realname}}</div>
          </li>
          <li class="row">
            <div class="label">联系电话：</div>
            <div class="value">{{form.mobile}}</div>
          </li>
          <li class="row">
            <div class="label">职位：</div>
            <div class="value">
              <span class="user_input" style="cursor: pointer;color: #3a8ee6;" v-if="model.position.name" @click="todoAction('position')">{{model.position.name}}</span>
              <el-button type="text" @click="todoAction('position')" v-else>+选择职位</el-button>
            </div>
          </li>
        </ul>
        <ul class="time_list" v-if="model.dateLists.length">
          <li class="time_row" v-for="(item, index) in model.dateLists" :key="index" @click="selectTime(index)">
            <i class="el-icon-remove"></i>
            {{item.value}}
            <span class="circle" :class="{active: item.active}"></span>
          </li>
        </ul>
        <el-button type="text" class="add_time" v-if="model.dateLists.length < 3">
          +添加时间
          <el-date-picker
            v-model="form.date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-button>
      </div>
      <div class="html_content" v-show="model.type === 'preview'">
        <ul>
          <li class="row">
            <div class="label">联系人：</div>
            <div class="value">{{form.realname}}</div>
          </li>
          <li class="row">
            <div class="label">联系电话：</div>
            <div class="value">{{form.mobile}}</div>
          </li>
          <li class="row">
            <div class="label">职位：</div>
            <div class="value">
              <span class="user_input" style="color: #3a8ee6;">{{model.position.name}}</span>
            </div>
          </li>
        </ul>
        <ul class="time_list" v-if="model.dateLists.length">
          <li class="time_row" v-for="(item, index) in model.dateLists" :key="index" @click="selectTime(index)" style="cursor: unset;">
            <i class="el-icon-remove"></i>
            {{item.value}}
            <span class="circle" :class="{active: item.active}"></span>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">{{model.btnTxt}}</el-button>
        <el-button type="primary" @click="confirm" size="small" v-if="model.showConfirmBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import {
  getQuickApplyInterviewApi,
  interviewRetractApi,
  confirmInterviewApi,
  getInterviewCommentReasonApi,
  getInterviewNotSuitReasonApi,
  refuseJobhunterUidInterviewApi,
  setInterviewInfoApi,
  getSimplepageAddressesListsApi
} from "API/interview"
import {
  getListApi
} from "API/position"
@Component({
  name: 'Interview24h'
})
export default class Interview24h extends Vue {
  navigation = [
    {
      type: 'all',
      msg: '全部',
      active: false,
      id: '1'
    },
    {
      type: 'unprocessed',
      msg: '未处理',
      active: false,
      id: '2'
    },
    {
      type: 'expired',
      msg: '已过期',
      active: false,
      id: '3'
    }
  ]
  options = [
    {
      value: 'id',
      label: '面试'
    },
    {
      value: 'jobhunter',
      label: '求职者'
    },
    {
      value: 'recruiter',
      label: '招聘官'
    },
    {
      value: 'position',
      label: '职位'
    }
  ]
  statusLists = [
    {
      value: '11',
      label: '待面试官处理'
    },
    {
      value: '21',
      label: '待面试官安排时间'
    },
    {
      value: '31',
      label: '待求职者确认'
    },
    {
      value: '32',
      label: '待面试官修改'
    },
    {
      value: '41',
      label: '已确定面试日程'
    },
    {
      value: '52',
      label: '不合适'
    }
  ]
  total = 99
  pageSize = 20
  form = {
    companyName: '',
    searchType: '',
    date1: '',
    resource: '',
    page: 1,
    content: '',
    status: '',
    mobile: '',
    realname: ''
  }
  lists = []
  model = {
    show: false,
    type: '',
    beforeType: '',
    title: '',
    beforeTitle: '',
    btnTxt: '取消',
    reason: [],
    extra: '',
    dateLists: [],
    interviewId: '',
    showConfirmBtn: true,
    position: {
      positionName: '',
      positionId: ''
    },
    address: {
      addressName: '',
      addressId: ''
    },
    item: {}
  }
  reasonList = []
  positionLists = []
  isLastPageOfPosition = false
  positionNum = 1
  addressLists = []
  isLastPageOfAddress = false
  addressNum = 1

  getQuickApplyInterview() {
    let tab = this.navigation.find(field => field.active)
    let params = {
      tab_status: tab.id
    }
    if(this.form.companyName) {
      params = Object.assign(params, {companyName: this.form.companyName})
    }
    if(this.form.searchType) {
      params = Object.assign(params, {searchType: this.form.searchType, content: this.form.content})
    }
    if(this.form.status) {
      params = Object.assign(params, {status: this.form.status})
    }
    getQuickApplyInterviewApi(params).then(res => {
      let infos = res.data
      this.total = infos.meta.total
      this.lists = infos.data
      this.$router.push({query: {...params}})
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   关闭弹窗
   * @param    {[type]}   index [description]
   */
  close() {
    switch(this.model.type) {
      case 'recipe':
        this.model.title = '确定约面'
        this.model.show = false
        break;
      case 'improper':
        this.model.show = false
        break;
      case 'arrange':
        this.model.title = '安排面试'
        this.model.show = false
        break;
      case 'modify':
        this.model.title = '修改面试时间'
        this.model.show = false
        break;
      case 'preview':
        this.model.title = '查看面试'
        this.model.show = false
        break;
      case 'position':
        this.model.type = this.model.beforeType
        this.model.title = this.model.beforeTitle
        break;
      case 'address':
        this.model.type = this.model.beforeType
        this.model.title = this.model.beforeTitle
        break;
      case 'reason':
        this.model.show = false
        this.model.position = this.model.defaultPosition
        break;
      default:
        break
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   弹窗确定
   * @param    {[type]}   index [description]
   */
  confirm() {
    let interviewTime = this.model.dateLists.find(field => field.active)
    let data = this.model.item
    switch(this.model.type) {
      case 'arrange':
        this.model.show = false
        this.setInterviewInfo({
          interviewId: this.model.interviewId,
          realname: this.form.realname,
          mobile: this.form.mobile,
          addressId: this.model.address.addressId,
          interviewTime,
          positionId: this.model.position.positionId
        })
        break;
      case 'modify':
        this.model.show = false
        this.setInterviewInfo({
          interviewId: this.model.interviewId,
          realname: this.form.realname,
          mobile: this.form.mobile,
          addressId: this.model.address.addressId,
          interviewTime,
          positionId: this.model.position.positionId
        })
        break;
      case 'preview':
        this.model.show = false
        break;
      case 'position':
        this.model.type = this.model.beforeType
        this.model.title = this.model.beforeTitle
        break;
      case 'address':
        this.model.type = this.model.beforeType
        this.model.title = this.model.beforeTitle
        break;
      case 'reason':
        let reason = this.model.reason.map(field => field.id).join(',')
        this.refuseJobhunterUidInterview({
          jobhunterUid: data.jobhunterInfo.uid,
          interviewId: data.interviewId,
          extra: this.model.extra,
          reason
        }).then(() => {
          this.model.show = false
        })
        break;
      default:
        break
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   列表搜索
   * @param    {[type]}   index [description]
   */
  search() {
    this.getQuickApplyInterview()
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   设置不合适item激活
   * @param    {[type]}   index [description]
   */
  setReason(index) {
    this.reasonList[index].active = !this.reasonList[index].active
    this.model.reason = this.reasonList.filter(field => field.active)
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   获取选中的职位
   * @return   {[type]}         [description]
   */
  getPosition(index) {
    this.positionLists.map((field, i) => {
      field.active = false
      if(i === index) {
        field.active = true
        this.model.position.positionId = field.id
        this.model.position.positionName = field.positionName
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   获取选中的地址
   * @return   {[type]}         [description]
   */
  getAddress(index) {
    this.addressLists.map((field, i) => {
      field.active = false
      if(i === index) {
        field.active = true
        this.model.position.positionId = field.id
        this.model.position.positionName = field.positionName
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-02
   * @detail   tab切换
   * @return   {[type]}        [description]
   */
  tabClick(type) {
    this.navigation.map(field => field.active = type === field.type ? true : false)
  }
  onSubmit() {
    console.log('submit!');
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-02
   * @detail   分页获取数据
   * @return   {[type]}        [description]
   */
  pageChange(page) {
    this.form.page = page
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   待办项
   * @return   {[type]}              [description]
   */
  todoAction(type, item) {
    let data = item ? item : this.model.item
    this.form.realname = data.recruiterInfo.realname
    this.form.mobile = data.recruiterInfo.mobile
    this.model.item = data ? data : this.model.item
    this.model.beforeType = this.model.type
    this.model.beforeTitle = this.model.title
    this.model.dateLists = []
    switch(type) {
      case 'recipe':
        this.model.type = type
        this.confirmInterview({interviewId: data.interviewId})
        break;
      case 'improper':
        this.getLabelComment({status: data.status}).then(() => {
          this.model.type = type
          this.model.show = true
          this.model.title = '不合适'
          this.model.item = data
        })
        break;
      case 'arrange':
        this.model.type = type
        this.model.show = true
        this.model.position.name = data.positionName
        this.model.position.positionId = data.positionId
        this.model.title = '安排面试'
        this.model.dateLists.push({active: true, value: data.handleEndTime})
        this.setPositionDomScroll({
          page: this.positionNum, 
          count: 20, 
          recruiter: data.recruiterInfo.uid
        }).then(() => {
          this.model.address.addressName = data.address
          this.model.address.addressId = data.addressId
          this.form.mobile = data.recruiterInfo.mobile
          this.form.realname = data.recruiterInfo.realname
          this.model.interviewId = data.interviewId
        })
        break;
      case 'modify':
        this.model.type = type
        this.model.show = true
        this.model.dateLists.push({active: true, value: data.handleEndTime})
        this.model.position.name = data.positionName
        this.model.position.positionId = data.positionId
        this.model.title = '修改面试时间'
        this.setPositionDomScroll({
          page: this.positionNum, 
          count: 20, 
          recruiter: data.recruiterInfo.uid
        }).then(() => {
          this.model.address.addressName = data.address
          this.model.address.addressId = data.addressId
          this.form.mobile = data.recruiterInfo.mobile
          this.form.realname = data.recruiterInfo.realname
          this.model.interviewId = data.interviewId
        })
        break;
      case 'preview':
        this.model.show = true
        this.model.title = '查看面试'
        this.model.position.name = data.positionName
        this.model.type = type
        this.model.dateLists.push({active: true, value: data.handleEndTime})
        this.form.mobile = data.recruiterInfo.mobile
        this.form.realname = data.recruiterInfo.realname
        this.model.showConfirmBtn = false
        this.model.btnTxt = '返回'
        break;
      case 'position':
        this.model.show = true
        this.model.type = type
        this.model.title = '选择职位'
        this.model.btnTxt = '返回'
        break;
      case 'address':
        this.getSimplepageAddressesLists({
          page: this.addressNum, 
          count: 20, 
          mobile: data.recruiterInfo.mobile
        }).then(() => {
          this.model.show = true
          this.model.title = '选择职位'
          this.model.btnTxt = '返回'
          this.model.type = type
          this.setAddressDomScroll()
        })
        break;
      case 'reason':
        this.model.show = true
        this.model.title = '选择不合适原因'
        this.model.type = 'reason'
        this.model.type = type
        let reason = this.model.reason.map(field => field.id).join(',')
        this.refuseJobhunterUidInterview({
          jobhunterUid: data.jobhunterInfo.uid,
          interviewId: data.interviewId,
          reason,
          extra: this.model.extra
        })
        break;
      case 'withdraw':
        this.interviewRetract({
          jobhunterUid: data.jobhunterInfo.uid,
          interviewId: data.interviewId
        })
        break
      default:
        break
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-02
   * @detail   切换搜索类型
   * @return   {[type]}   [description]
   */
  changeSearch() {
    this.form.content = ''
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-02
   * @detail   获取时间
   * @param    {[type]}   e [description]
   * @return   {[type]}     [description]
   */
  getTime(e) {
    this.model.dateLists.push({
      value: e,
      active: false
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-02
   * @detail   设置面试时间
   * @return   {[type]}         [description]
   */
  selectTime(index) {
    this.model.dateLists.map((field, i) => field.active = index === i ? true : false)
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-02
   * @detail   初始化页面
   * @return   {[type]}   [description]
   */
  init() {
    let query = this.$route.query
    this.form = Object.assign(this.form, query)
    if(query.tab_status) {
      this.navigation.map(field => field.active = query.tab_status == field.id ? true : false)
    } else {
      this.navigation[0].active = true
    }
    this.getQuickApplyInterview()
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   不合适撤回
   * @return   {[type]}          [description]
   */
  interviewRetract(params) {
    return interviewRetractApi(params).then(() => this.init())
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   确定约面
   * @return   {[type]}          [description]
   */
  confirmInterview(params) {
    return confirmInterviewApi(params).then(() => this.init())
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   获取不合适标签
   * @return   {[type]}   [description]
   */
  getLabelComment(params) {
    // 代表过程中的状态
    let pending = [11, 12, 21, 31, 32, 41]
    let api = pending.includes(Number(params.status)) ? getInterviewNotSuitReasonApi : getInterviewCommentReasonApi
    return api(params).then(res => {
      let reasonList = res.data.data
      reasonList.map(field => field.active = false)
      this.reasonList = reasonList
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   标记不合适
   * @return   {[type]}          [description]
   */
  refuseJobhunterUidInterview(params) {
    return refuseJobhunterUidInterviewApi(params).then(() => this.init())
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   修改面试时间
   * @param    {[type]}   param [description]
   */
  setInterviewInfo(param) {
    return setInterviewInfoApi(param).then(() => this.init())
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   获取职位列表
   * @return   {[type]}   [description]
   */
  getPositionList(params) {
    return getListApi(params).then(res => {
      let infos = res.data
      let list = infos.data
      list.map(field => field.active = false)
      this.positionLists = this.positionLists.concat(list)
      this.isLastPageOfPosition = (res.data.meta && res.data.meta.nextPageUrl) ? false : true
      this.positionNum++
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   获取地址列表
   * @return   {[type]}   [description]
   */
  getSimplepageAddressesLists(params) {
    return getSimplepageAddressesListsApi(params).then(res => {
      let infos = res.data
      let list = infos.data
      list.map(field => field.active = false)
      this.addressLists = this.addressLists.concat(list)
      this.isLastPageOfAddress = (res.data.meta && res.data.meta.nextPageUrl) ? false : true
      this.addressNum++
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   dom滚动
   * @return   {[type]}   [description]
   */
  scroll(domId) {
    return new Promise((resolve, reject) => {
      let dom = document.getElementById(domId)
      let wholeHeight = dom.scrollHeight
      let scrollTop = dom.scrollTop
      let divHeight = dom.clientHeight
      if(scrollTop + divHeight >= wholeHeight) resolve()
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   设置地址dom的滚动加载
   * @return   {[type]}   [description]
   */
  setAddressDomScroll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let domId = 'scroll_div_ul_address'
        let div = document.getElementById(domId)
        div.onscroll = this.scroll(domId).then(() => this.getSimplepageAddressesLists().then(() => resolve()))
      }, 1000)
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2019-08-01
   * @detail   设置职位dom的滚动加载
   * @return   {[type]}   [description]
   */
  setPositionDomScroll(params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let domId = 'scroll_div_ul_position'
        let div = document.getElementById(domId)
        div.onscroll = this.scroll(domId).then(() => this.getPositionList(params).then(() => resolve()))
      }, 1000)
    })
  }
  mounted() {
    this.init()
  }
}
</script>
