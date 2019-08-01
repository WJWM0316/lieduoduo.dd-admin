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
    margin-right: 40px;
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
        <el-select v-model="value" placeholder="全部状态">
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
        prop="sort"
        label="面试id">
      </el-table-column>
      <el-table-column
        prop="id"
        label="求职者信息">
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="面试官信息">
      </el-table-column>
      <el-table-column
        prop="num1"
        label="约面信息">
      </el-table-column>
      <el-table-column
        prop="num2"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="num3"
        label="服务到期时间">
      </el-table-column>
      <el-table-column
        prop="num4"
        label="跟进运营">
      </el-table-column>
      <el-table-column
        prop="status"
        label="代客操作">
        <template slot-scope="scope">
          <span class="btn_deal" @click="todoAction('recipe')">确定约面</span>
          <span class="btn_deal" @click="todoAction('improper')">不合适</span>
          <span class="btn_deal" @click="todoAction('arrange')">安排面试</span>
          <span class="btn_deal" @click="todoAction('modify')">修改面试时间</span>
          <span class="btn_deal" @click="todoAction('preview')">查看面试时间</span>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
      layout="prev, pager, next, slot"
      :total="total"
      :page-size="pageSize"
      prev-text="上一页"
      next-text="下一页"
      :current-page="form.page"
      v-if="total"
      @current-change="pageChange">
      <span class="total">共{{ Math.ceil(total/20) }}页, {{total}}条记录</span>
    </el-pagination>
    <el-dialog
      :title="model.title"
      :visible.sync="model.show"
      width="400px"
      center>
      <div class="html_content" v-if="model.type === 'recipe'">
        <ul>
          <li class="row">
            <div class="label">联系人：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系人" class="user_input"></div>
          </li>
          <li class="row">
            <div class="label">联系电话：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系电话" class="user_input"></div>
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
            v-model="date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-button>
      </div>
      <div class="html_content position_ul" v-if="model.type === 'position'">
        <ul class="p_ul">
          <li class="position_item" v-for="(item, index) in lists" :key="index" @click="getPosition(index)">
            <i class="icon_circle_my" v-show="!item.active"></i>
            <i class="el-icon-success" v-show="item.active"></i>
            <div class="name">前端开发{{index}}</div>
          </li>
        </ul>
      </div>
      <div class="html_content position_ul" v-if="model.type === 'improper'">
        <div class="improper">确定标记为不合适吗？</div>
      </div>
      <div class="html_content position_ul" v-if="model.type === 'reason'">
        <ul>
          <li v-for="(item, index) in reasonList" :key="index" class="reason_item" :class="{reason_item_active: item.active}" @click="getReason(index)">{{item.msg}}</li>
        </ul>
        <div class="content_01">
          <h2>补充说明（选填）</h2>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="model.desc">
          </el-input>
        </div>
      </div>
      <div class="html_content" v-if="model.type === 'modify'">
        <ul>
          <li class="row">
            <div class="label">联系人：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系人" class="user_input"></div>
          </li>
          <li class="row">
            <div class="label">联系电话：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系电话" class="user_input"></div>
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
            v-model="date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-button>
      </div>
      <div class="html_content" v-if="model.type === 'preview'">
        <ul>
          <li class="row">
            <div class="label">联系人：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系人" class="user_input"></div>
          </li>
          <li class="row">
            <div class="label">联系电话：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系电话" class="user_input"></div>
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
            v-model="date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-button>
      </div>
      <div class="html_content" v-if="model.type === 'arrange'">
        <ul>
          <li class="row">
            <div class="label">联系人：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系人" class="user_input"></div>
          </li>
          <li class="row">
            <div class="label">联系电话：</div>
            <div class="value"><input v-model="form.name" placeholder="请输入联系电话" class="user_input"></div>
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
            v-model="date1"
            type="datetime"
            @change="getTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">{{model.btnTxt}}</el-button>
        <el-button type="primary" @click="confirm" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
import {
  getQuickApplyInterviewApi
} from "API/interview";
@Component({
  name: 'Interview24h'
})
export default class Interview24h extends Vue {
  navigation = [
    {
      type: 'all',
      msg: '全部',
      active: true,
      id: 1
    },
    {
      type: 'unprocessed',
      msg: '未处理',
      active: false,
      id: 2
    },
    {
      type: 'expired',
      msg: '已过期',
      active: false,
      id: 3
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
  value = ''
  date1 = ''
  total = 99
  pageSize = 20
  form = {
    companyName: '',
    searchType: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    page: 1,
    content: '',
    status: ''
  }
  lists = []
  model = {
    show: false,
    type: '',
    title: '',
    btnTxt: '取消',
    reason: [],
    desc: '',
    dateLists: [
      {
        active: false,
        value: '2019-07-09 00:00:00'
      }
    ],
    position: {
      name: '前端开发'
    },
    defaultPosition: {
      name: '前端开发'
    }
  }
  reasonList = [
    {
      msg: '学历不符',
      active: false
    },
    {
      msg: '薪资不符',
      active: false
    },
    {
      msg: '经验不符',
      active: false
    },
    {
      msg: '工作年限不符',
      active: false
    },
    {
      msg: '年龄不符',
      active: false
    },
    {
      msg: '简历不真实',
      active: false
    },
    {
      msg: '距离太远',
      active: false
    },
    {
      msg: '已找到工作',
      active: false
    },
    {
      msg: '其他原因',
      active: false
    }
  ]
  value1 = ''
  checked = false
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
    getQuickApplyInterviewApi(params)
  }
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
        break;
      case 'modify':
        this.model.title = '修改面试时间'
        break;
      case 'preview':
        this.model.title = '查看面试'
        break;
      case 'position':
        this.model.title = '确定约面'
        this.model.type = 'recipe'
        break;
      case 'reason':
        this.model.show = false
        this.model.position = this.model.defaultPosition
        break;
      default:
        break
    }
  }
  confirm() {
    switch(this.model.type) {
      case 'recipe':
        this.model.show = false
        break;
      case 'improper':
        this.model.title = '选择不合适原因'
        this.model.type = 'reason'
        break;
      case 'arrange':
        this.model.show = false
        break;
      case 'modify':
        this.model.show = false
        break;
      case 'preview':
        this.model.show = false
        break;
      case 'position':
        this.model.title = '确定约面'
        this.model.type = 'recipe'
        break;
      case 'reason':
        this.model.show = false
        break;
      default:
        break
    }
  }
  search() {
    this.getQuickApplyInterview()
  }
  getReason(index) {
    this.reasonList.map((field, i) => {
      if(i === index) {
        field.active = true
        this.model.reason.push(field)
      }
    })
  }
  getPosition(index) {
    this.lists.map((field, i) => {
      field.active = false
      if(i === index) {
        field.active = true
        this.model.position = field
      }
    })
  }
  tabClick(type) {
    this.navigation.map(field => field.active = type === field.type ? true : false)
  }
  onSubmit() {
    console.log('submit!');
  }
  pageChange(page) {
    this.form.page = page
  }
  todoAction(type) {
    this.model.type = type
    this.model.show = true
    switch(type) {
      case 'recipe':
        this.model.title = '确定约面'
        break;
      case 'improper':
        this.model.title = '不合适'
        break;
      case 'arrange':
        this.model.title = '安排面试'
        break;
      case 'modify':
        this.model.title = '修改面试时间'
        break;
      case 'preview':
        this.model.title = '查看面试'
        break;
      case 'position':
        this.model.title = '选择职位'
        this.model.btnTxt = '返回'
        break;
      case 'reason':
        this.model.title = '选择不合适原因'
        this.model.type = 'reason'
        break;
      default:
        break
    }
  }
  changeSearch() {
    this.form.content = ''
  }
  getTime(e) {
    this.model.dateLists.push({
      value: e,
      active: false
    })
  }
  selectTime(index) {
    this.model.dateLists.map((field, i) => field.active = index === i ? true : false)
  }
  mounted() {
    this.getQuickApplyInterview()
    for(let i = 10; i < 30; i++) {
      this.lists.push({
        start_time: `20${i}-05-02`,
        end_time: `20${i}-05-02`,
        name: `center${i}`,
        sort: i,
        id: i,
        num1: i,
        num2: i,
        num3: i,
        num4: i,
        status: i%2,
        action: 1,
        active: false
      })
    }
  }
}
</script>
