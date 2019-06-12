<!--  -->
<template>
  <div class="invitPro">
    <lyout-content :leftcontent="leftcontent">
      <div class="formSumbit" slot="formContent">
        <div class="formReasult">
          <el-form ref="form" :inline="true" :model="form" class="form">
            <div class="searchTab">
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="searchType.keyword1"
                class="inputSelect"
              >
                <el-select
                  size="medium"
                  class="selectTitle"
                  v-model="searchType.condition1"
                  slot="prepend"
                  placeholder="招聘公司"
                >
                  <el-option
                    label="约面职位"
                    value="keyword"
                    v-show="searchType.condition2 !== 'keyword'"
                  ></el-option>
                  <el-option
                    label="求职者"
                    value="keyword"
                    v-show="searchType.condition2 !== 'keyword'"
                  ></el-option>
                  <el-option label="面试官" value="mobile" v-show="searchType.condition2 !== 'mobile'"></el-option>
                  <el-option
                    label="面试ID"
                    value="mobile"
                    v-show="searchType.condition2 !== 'mobile'"
                  ></el-option>
                </el-select>
              </el-input>
            </div>
            <div class="searchTab">
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="searchType.keyword1"
                class="inputSelect"
              >
                <el-select
                  size="medium"
                  class="selectTitle"
                  v-model="searchType.condition1"
                  slot="prepend"
                  placeholder="约面职位"
                >
                  <el-option
                    label="招聘公司"
                    value="keyword"
                    v-show="searchType.condition2 !== 'keyword'"
                  ></el-option>
                  <el-option
                    label="求职者"
                    value="keyword"
                    v-show="searchType.condition2 !== 'keyword'"
                  ></el-option>
                  <el-option label="面试官" value="mobile" v-show="searchType.condition2 !== 'mobile'"></el-option>
                  <el-option
                    label="面试ID"
                    value="mobile"
                    v-show="searchType.condition2 !== 'mobile'"
                  ></el-option>
                </el-select>
              </el-input>
            </div>

            <el-form-item label="处理状态" prop="jobStatus" class="formItem">
              <el-select class="select" v-model="form.jobStatus" placeholder="请选择">
                <el-option value="0">求职者未到场</el-option>
                <el-option value="1">求职者已到场</el-option>
                <el-option value="2">面试官评价不错</el-option>
                <el-option value="3">面试官不感兴趣</el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="time" label="面试日期" prop="start" label-width="100px">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="form.start"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">—</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="form.end"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <!--用于代替清除结束时间-->
            <el-form-item label-width="1px" label prop="end"></el-form-item>
            <el-form-item label-width="80px" prop="startd">
              <el-radio v-model="form.radio" label="1">只看求职者自行约面</el-radio>
            </el-form-item>
          </el-form>
          <div class="BtnList">
            <el-button class="inquire" @click.stop="getData(form)">查询</el-button>
            <el-button @click.stop="resetForm('form')">重置</el-button>
          </div>
        </div>
      </div>
      <div class="List" id="scroll" slot="dataList">
        <el-table height="670px" highlight-current-row :data="tableData" style="width: 100%">
          <el-table-column prop="jobhunter.resumeNum" label="简历ID" width="140"></el-table-column>
          <el-table-column prop="jobhunter" label="求职者信息" width="270">
            <template slot-scope="scope">
              <div class="col_position">
                <span>{{scope.row.jobhunter.name}}</span>
                <span>{{scope.row.jobhunter.lastPosition}}</span>
              </div>
              <p class="companyName">{{scope.row.jobhunter.lastCompany}}</p>
              <div class="operation">
                <span>查看简历</span>
                <span @click.stop>联系用户</span>
                <!--电话号码展示框-->
                <div class="phone">
                  <span>{{13922289159}}</span>
                  <img class="phoneBg" src="../../../../assets/number_bg.png">
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="处理状态" width="200">
            <template slot-scope="scope">
              <div class="col_position">
                <i class="icon iconfont iconjiantou"></i>
              </div>
              <p class="companyName">
                面试官未查看
                <span>原因</span>
              </p>
              <p>2019-05-25 16:16</p>
            </template>
          </el-table-column>
          <el-table-column prop="city" label="面试官信息" width="300">
            <template slot-scope="scope">
              <div class="col_position">
                <span>尼古斯丁卡拉王赞</span>
                <span>我是很长的工作的名字已经超出了</span>
              </div>
              <p class="companyName">我是很长的工作的名字已经超出了的公司名字</p>
              <div class="operation">
                <span>扫码看主页</span>
                <span>联系用户</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="约面信息" width="300">
            <template slot-scope="scope">
              <p class="positionName">
                职位:
                <span class="positionName" @click="toPositionPath()">产品经理</span>30k-50k
              </p>
              <p class="companyName">我是很长的工作的名字已经超出了的公司名字</p>
              <p>时间:2019-05-25 16:00</p>
            </template>
          </el-table-column>
          <el-table-column prop="zip" label="是否扣点" width="200"></el-table-column>
          <el-table-column label="操作" width="100">
            <!-- slot-scope="scope" -->
            <template>
              <el-button @click.stop="handleClick(true,'扣点')" type="text" size="medium">扣点</el-button>
              <el-button @click.stop="handleClick(true,'返点')" type="text" size="small">返点</el-button>
              <p class="resultBtn" @click.stop="handleClick(false,'返点原因')">返点原因</p>
              <p class="resultBtn" @click.stop="handleClick(false,'扣点原因')">扣点原因</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </lyout-content>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import lyoutContent from "COMPONENTS/Lyout/lyoutContent/lyoutContent.vue";

@Component({
  name: "invitPro",
  prop: "",
  components: {
    lyoutContent
  }
})
export default class invitPro extends Vue {
  form = {
    radio:"",
    keyword: "",
    jobStatus: "",
    companyName: "",
    listId: "",
    advisorUid: "",
    startTime: "",
    endTime: "",
    page: 1,
    count: 20
  };
  tableData = [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄"
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄"
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄"
    }
  ];
  searchType = {
    condition1: "",
    condition2: ""
  };
  leftcontent = {
    total: 0,
    title: "邀约进展"
  };
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>