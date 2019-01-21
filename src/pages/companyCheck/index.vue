<!--公司审核管理-->
<template>
  <div class="companyCheck">
  	<el-container class="container" style="border: 1px solid #eee">
  	  <el-header class="header" style="text-align: right; font-size: 15px">
  	    <div class="title">审核管理(200)</div>
  	    <!--<div class="creatBtn">+ 新建公司</div>-->
  	    <el-button @click="addCourse" class="btn-limit-width">+ 新建公司</el-button>
  	  </el-header>
      <el-main style="background-color:red">
        <div class="selectionBox">
          
          <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
          
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'course-list'
})
export default class companyCheck extends Vue {
  text = '我是默认文案'
  form =  {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
    .el-form-item{
      display: inline-block;
    }
  }
}
</style>