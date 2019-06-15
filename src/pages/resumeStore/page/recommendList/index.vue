<!--  -->
<template>
  <div class="recommendList">
    <lyout-content :leftcontent="leftcontent" :isShowbtn="true" ref="methods">
      <div class="class" slot="text" @click.stop="toTabBlock">新建推荐单</div>
      <div class="formSumbit" slot="formContent">
        <div class="formReasult">
          <el-form ref="form" :model="form" class="form">
            <div class="searchTab">
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="form.commonKey1"
                class="inputSelect"
                @blur.stop="checkInput()"
              >
                <el-select
                  size="medium"
                  class="selectTitle"
                  v-model="searchType.key1"
                  slot="prepend"
                  placeholder="公司名"
                  @change="checkType(searchType.key1)"
                >
                  <el-option label="公司名" value="companyName"></el-option>
                  <el-option label="批次" value="listId" v-show="searchType.condition2 !== 'mobile'"></el-option>
                </el-select>
              </el-input>
            </div>
            <!-- <div class="searchTab">
              <el-input
                type="text"
                placeholder="推荐职位"
                v-model="searchType.keyword1"
                class="inputSelect"
              >
                <el-select
                  size="medium"
                  class="selectTitle"
                  v-model="searchType.condition1"
                  slot="prepend"
                  placeholder="推荐职位"
                >
                  <el-option
                    label="公司名"
                    value="keyword"
                    v-show="searchType.condition2 !== 'keyword'"
                  ></el-option>
                  <el-option
                    label="招聘官"
                    value="keyword"
                    v-show="searchType.condition2 !== 'keyword'"
                  ></el-option>
                  <el-option
                    label="推荐职位"
                    value="keyword"
                    v-show="searchType.condition2 !== 'keyword'"
                    class="optionStyle"
                  ></el-option>
                  <el-option label="批次" value="mobile" v-show="searchType.condition2 !== 'mobile'"></el-option>
                </el-select>
              </el-input>
            </div>-->
            <el-form-item label="推荐人" prop="advisorUid" class="formItem">
              <el-select class="select" v-model="form.advisorUid" placeholder="请选择">
                <el-option
                  :label="item.realname"
                  :value="item.id"
                  v-for="item in userList"
                  :key="item.id"
                >{{item.realname}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="time" label="创建时间" prop="startTime" label-width="100px">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="timestamp"
                  v-model="form.startTime"
                  style="width: 142px;"
                  @change="changeTime(form.startTime,'startTime')"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">—</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="timestamp"
                  v-model="form.endTime"
                  style="width: 142px;"
                  @change="changeTime(form.endTime,'endTime')"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <!--用于代替清除结束时间-->
            <el-form-item label-width="1px" label prop="endTime"></el-form-item>
            <div class="BtnList">
              <el-form-item class="btn">
                <el-button class="inquire" @click.stop="getData(form)">查询</el-button>
                <el-button @click.stop="resetForm('form')">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="resumeList" id="scroll" slot="dataList">
        <el-table highlight-current-row :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="批次" width="150"></el-table-column>
          <el-table-column prop="createdTimeDesc" label="创建时间" width="120"></el-table-column>
          <el-table-column prop="recruiterName" label="职位发布者" width="120"></el-table-column>
          <el-table-column prop="companyName" label="推荐公司" width="300"></el-table-column>
          <el-table-column prop="positionName" label="推荐职位" width="300">
            <template slot-scope="scope">
              <p
                class="positionName"
              >{{scope.row.positionId}}|{{scope.row.positionName}}|{{scope.row.emolumentMin}}K~{{scope.row.emolumentMax}}K|{{scope.row.areaName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="succeedNum" label="推荐成功" width="170"></el-table-column>
          <el-table-column prop="failNum" label="推荐失败" width="170"></el-table-column>
          <el-table-column prop="advisorName" label="推荐负责人" width="170"></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageList" slot="pageList">
        <footer class="list-footer">
          <el-pagination
            layout="prev, pager, next, slot"
            :current-page="page"
            :page-size="20"
            :total="leftcontent.total"
            @current-change="handlePageChange"
          ></el-pagination>
          <span class="total">共 {{lastPage}} 页，{{leftcontent.total}} 条记录</span>
        </footer>
      </div>
    </lyout-content>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import lyoutContent from "COMPONENTS/Lyout/lyoutContent/lyoutContent.vue";
import { recommendList, userList } from "API/resumeStore";
@Component({
  name: "recommendList",
  prop: "",
  components: {
    lyoutContent
  }
})
export default class recommend extends Vue {
  tableData = [];
  key1 = "companyName";
  page = 1;
  userList = [];
  lastPage = 20;
  form = {
    advisorUid: "",
    commonKey1: "" /* 公共键  批次或者公司名*/,
    startTime: "",
    endTime: "",
    page: 1,
    count: 20
  };
  tableData = [];
  searchType = {
    key1: "companyName" /* 第一个搜索条件的默认键 */
    // key2: "line" /* 第二个搜索条件的默认键 */
  };
  leftcontent = {
    total: 0,
    title: "推荐列表"
  };
  toTabBlock() {
    this.$router.push({
      path: "/resumeStore/recommendList/createOrder"
    });
  }
  checkType(e) {
    // 创建键值
    this.form[`${e}`] = "";
  }
  changeTime(e, keys) {
    console.log(e);
    this.form[keys] = e;
  }
  /* 清除列表选项 */
  resetForm(name) {
    this.form.commonKey1 = "";
    this.form.isJobhunterApply = false;
    this.$refs[name].resetFields();
  }
  handleClick(row) {
    this.$router.push({
      path: "/resumeStore/recommendList/OrderDetail",
      query: {
        id: row.id
      }
    });
  }
  forEachKeys(form) {
    let startTime = parseInt(form.startTime / 1000);
    let endTime = parseInt(form.endTime / 1000);
    // 基础键，剩余键值对由用户选择
    let param = {
      count: 20,
      page: form.page,
      endTime,
      startTime,
      advisorUid: this.form.advisorUid
    };
    param[this.searchType.key1] = this.form.commonKey1;
    return param;
  }
  getData() {
    // console.log("this.form", this.form);
    let obj = this.forEachKeys(this.form);
    console.log("ob", obj);
    recommendList(obj).then(res => {
      this.tableData = res.data.data;
      this.lastPage = res.data.meta.lastPage;
      this.leftcontent.total = res.data.meta.total;
      console.log(this.tableData);
    });
  }
  handlePageChange(nowPage) {
    console.log(nowPage);
    this.$refs["methods"].scrollZero();
    this.form.page = nowPage;
    this.form.page = nowPage;
    this.getData(this.form);
  }
  created() {
    this.getData(this.form);
    this.getList();
  }
  getList() {
    userList().then(res => {
      this.userList = res.data.data;
    });
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>