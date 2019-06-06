<!--  -->
<template>
  <div class="history">
    <lyout-content :leftcontent="leftcontent" :isShowbtn="true">
      <div class="class" slot="text" @click.stop="toTabBlock">新建推荐单</div>
      <div class="formSumbit" slot="formContent">
        <div class="formReasult">
          <el-form ref="form" :model="form" class="form">
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
                  placeholder="公司名"
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
                    value="mobile"
                    v-show="searchType.condition2 !== 'mobile'"
                  ></el-option>
                  <el-option label="批次" value="mobile" v-show="searchType.condition2 !== 'mobile'"></el-option>
                </el-select>
              </el-input>
            </div>
            <div class="searchTab">
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
                  @change="changeProvince"
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
            </div>
            <el-form-item label="推荐人" prop="jobStatus" class="formItem">
              <el-select class="select" v-model="form.jobStatus" placeholder="请选择">
                <el-option value="0">1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="time" label="创建时间" prop="start" label-width="100px">
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
            <div class="BtnList">
              <el-form-item class="btn">
                <el-button class="inquire" @click.stop="onSubmit">查询</el-button>
                <el-button @click.stop="resetForm('form')">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="resumeList" id="scroll" slot="dataList">
        <el-table height="670px" highlight-current-row :data="tableData" style="width: 100%">
          <el-table-column fixed prop="date" label="批次" width="150"></el-table-column>
          <el-table-column prop="name" label="创建时间" width="120"></el-table-column>
          <el-table-column prop="province" label="管理员" width="120"></el-table-column>
          <el-table-column prop="city" label="推荐公司" width="300"></el-table-column>
          <el-table-column prop="address" label="推荐职位" width="300"></el-table-column>
          <el-table-column prop="zip" label="推荐成功" width="170"></el-table-column>
          <el-table-column prop="zip" label="推荐失败" width="170"></el-table-column>
          <el-table-column prop="zip" label="推荐负责人" width="170"></el-table-column>
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
@Component({
  name: "",
  prop: "",
  components: {
    lyoutContent
  }
})
export default class login extends Vue {
  tableData = [
    {
      date: "2016-05-02",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1517 弄",
      zip: 200333
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1519 弄",
      zip: 200333
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1516 弄",
      zip: 200333
    }
  ];
  form = {
    keyword: "",
    jobStatus: ""
  };
  searchType = {
    condition1: "",
    condition2: ""
  };
  leftcontent = {
    total: 0,
    title: "推荐列表"
  };
  toTabBlock() {
    this.$router.push({
      path: "/resumeStore/recommendList/createOrder",
      query:{
        isCreate:true
      }
    });
  }
  handleClick(row) {
    console.log(row)
    this.$router.push({
      path: "/resumeStore/recommendList/createOrder",
      query:{
        isCreate:false
      }
    });
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>