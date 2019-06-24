<template>
  <div class="resumeStore" @click.stop="closeSubEvent">
    <lyout-content
      :leftcontent="leftcontent"
      :isShowbtn="true"
      ref="methods"
      @handlePageChange="handlePageChange"
    >
      <div class="class" slot="text" @click.stop="createNewResume">新建微简历</div>
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
                  <el-option label="意向职位" value="expectPosition"></el-option>
                  <el-option label="姓名" value="listId"></el-option>
                  <el-option label="手机号" value="listId"></el-option>
                  <el-option label="公司名" value="listId"></el-option>
                </el-select>
              </el-input>
            </div>
            <!-- 职位来源 -->
            <el-form-item label-width="120px" label="期望职位类型" prop="expectPositionId">
              <el-cascader
                ref="cascader"
                class="formItem"
                placeholder="职位类别"
                :options="options"
                filterable
                :props="{
                value:'labelId',
                label:'name',
                children:'children'
                }"
                @change="type"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="期望工作城市" class="formItem" prop="expectCityNum">
              <el-cascader
                ref="cityChoice"
                class="formItem"
                placeholder="期待工作城市"
                :options="getCityList"
                filterable
                :props="{
                value:'areaId',
                label:'title',
                children:'children'
                }"
                @change="choiceCity"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="期望行业" prop="expectFieldId" class="formItem">
              <el-select
                multiple
                clearable
                collapse-tags
                v-model="form.expectFieldId"
                placeholder="请选择"
              >
                <el-option
                  :label="item.name"
                  :value="item.labelId"
                  v-for="item in fieldList"
                  :key="item.labelId"
                ></el-option>
              </el-select>
            </el-form-item>
            <custom-select
              :typeName="'自定义薪资'"
              :selectName="'期望薪资'"
              :selectList="MoneyList"
              ref="Money"
              @callback="MoneyChoice"
            ></custom-select>
            <custom-select
              :typeName="'自定义年龄'"
              :selectName="'期望年龄'"
              :selectList="AgeList"
              ref="age"
              @callback="AgeChoice"
            ></custom-select>
            <el-form-item label="求职状态" prop="jobStatus" class="formItem">
              <el-select v-model="form.jobStatus" placeholder="请选择">
                <el-option label="无" value="0"></el-option>
                <el-option
                  v-for="(item,index) in jobhuntStatusList"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="最高学历" class="formItem" prop="degree">
              <el-select v-model="form.degree" placeholder="请选择">
                <el-option
                  v-for="(item,index) in degreeList"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <custom-select
              :typeName="'自定义经验'"
              :selectName="'工作经验'"
              :selectList="workLiftList"
              :isCheck="closelift"
              ref="diywork"
              @callback="TimeResult"
            ></custom-select>
            <el-form-item label="简历来源" prop="wherefrom" class="formItem">
              <el-select v-model="form.wherefrom" placeholder="请选择">
                <el-option label="用户创建" value="10"></el-option>
                <el-option label="后台创建" value="20"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="time" label="更新时间" prop="updateTimeLower" label-width="100px">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.updateTimeLower"
                  value-format="yyyy-MM-dd"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">—</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="form.updateTimeUpper"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item class="time" label="访问时间" prop="visitTimeLower" label-width="100px">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.visitTimeLower"
                  value-format="yyyy-MM-dd"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">—</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="form.visitTimeUpper"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <filter-answer :labelName="'简历完整度'"></filter-answer>
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
        <div
          class="resumeItem"
          @click.stop="getDetail(item.uid,index)"
          v-for="(item,index) in itemList"
          :key="index"
        >
          <div class="resumeNumber">
            <span class="resumeNum">简历编号: {{item.resumeNum}}</span>
            <span class="jobStatusDesc" v-if="item.jobStatusDesc!=''">{{item.jobStatusDesc}}</span>
            <span class="resumeUpdateTime">最近更新：{{item.resumeUpdateTime}}</span>
            <span class="lastLoginTime">最近访问：{{item.lastLoginTime}}</span>
          </div>
          <div class="resumeContent">
            <div class="userMsg">
              <div class="userAvator">
                <img :src="item.avatar.url" alt v-if="item.avatar">
              </div>
              <div class="userName">
                <div class="userTop row">
                  <span class="name">{{item.name}}</span>
                  <div class="experience">
                    <span v-if="item.workAge!=''">{{item.workAge}}年工作经验</span>
                    <span v-else>{{item.workAgeDesc}}</span>
                    <span>·</span>
                    <span>{{item.degreeDesc}}</span>
                    <span>·</span>
                    <span>{{item.age}}岁</span>
                  </div>
                </div>
                <p
                  class="lastWork"
                  v-show="item.lastCompany!=''"
                >最近工作: {{item.lastCompany}} · {{item.lastPosition}}</p>
                <p class="maxEducation">最高学历：{{item.school}} · {{item.degreeDesc}} · {{item.major}}</p>
              </div>
              <div class="needWork">
                <div
                  class="workItem"
                  v-for="(item3,index3) in item.expects"
                  :key="index3"
                  v-show="index3<3"
                >
                  <span>{{item3.city}}</span>
                  <span>{{item3.position}}</span>
                  <span>{{item3.salaryFloor}}~{{item3.salaryCeil}}k</span>
                  <div class="industry" v-for="(item4,index4) in item3.fields" :key="index4">
                    <span>{{item4.field}}</span>
                    <span v-show="index4!=item3.fields.length-1">&nbsp;</span>
                  </div>
                </div>
              </div>
              <div
                class="seeResume"
                @click.stop="seereResume(index)"
                v-show="item.resumeAttach!=null"
              >
                <el-button>查看简历附件</el-button>
              </div>
            </div>
          </div>
        </div>
        <div
          style="font-size: 14px;color: #000;padding: 30px 0px;"
          class="resumeItem"
          v-if="itemList.length===0"
        >
          <span>暂无数据</span>
        </div>
      </div>
    </lyout-content>
    <resume-popup
      :resumeId="resumeId"
      :typeList="typeList"
      :isShow="isShow"
      :itemList="itemList"
      @showCallback="showCallback"
      ref="resume"
    ></resume-popup>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import lyoutContent from "COMPONENTS/Lyout/lyoutContent/lyoutContent.vue";
import resumePopup from "COMPONENTS/resumePopup/resumePopup";
import CustomSelect from "../../components/CustomSelect/index.vue";
import filterAnswer from "../../components/filterAnswer/index.vue";
import { getLabelPositionListApi } from "API/position";
import { getCityApi } from "API/company";
import { fieldApi } from "API/commont";
import {
  GetResumeAPI,
  degreeListAPI,
  jobhuntStatusAPI,
  GetResumeHistory,
  addHistory
} from "API/resumeStore.js";

let lock = false;
@Component({
  name: "resumeStore",
  components: {
    lyoutContent,
    CustomSelect,
    resumePopup,
    filterAnswer
  },

  watch: {
    resumeScroll: function(newVal, oldval) {},
    nowCheck: function(newval, oldval) {
      const el = document.getElementById("historyScroll");
      let self = this;
      el.addEventListener("scroll", function(e) {
        const offsetHeight = el.offsetHeight;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        if (offsetHeight + scrollTop - scrollHeight >= -1) {
          // console.log(!lock)
          if (lock) {
            GetResumeHistory(self.itemList[self.nowIndex].uid, {
              page: self.historyCount++,
              count: 20
            }).then(res => {
              self.historyList = [...self.historyList, ...res.data.data];
              lock = false;
            });
          }
        }
        lock = true;
      });
    }
  }
})
export default class resumeStore extends Vue {
  typeList = ["简历详情", "历史记录"];
  resumeId = ""; /* 简历详情id */
  leftcontent = {
    total: 0,
    title: "简历库",
    lastPage: "",
    page: 1 //当前显示页
  };
  closelift = false; /* 工作经验 */
  /* 简历来源 */
  Completion = [
    {
      labelId: "0",
      value: "不限条件"
    },
    {
      labelId: "1",
      value: "全部条件"
    },
    {
      labelId: "completeExpect",
      value: "求职意向"
    },
    {
      labelId: "completeCareer",
      value: "工作经历"
    },
    {
      labelId: "completeEducation",
      value: "教育经历"
    },
    {
      labelId: "completeProject",
      value: "项目经历"
    },
    {
      labelId: "completeMoreIntro",
      value: "更多介绍"
    },
    {
      labelId: "completeResumeAttach",
      value: "附件简历"
    }
  ];
  /* isSection 表示是否有价格区间 */
  workLiftList = [
    {
      text: "不限",
      isSection: false
    },
    {
      text: "无经验",
      isSection: false
    },
    {
      min: "3000",
      max: "5000",
      text: "3000-5000",
      isSection: true
    }
  ];
  AgeList = [
    {
      min: "20",
      max: "25",
      text: "20-25",
      isSection: true
    },
    {
      min: "25",
      max: "30",
      text: "25-30",
      isSection: true
    },
    {
      min: "30",
      max: "35",
      text: "30-35",
      isSection: true
    }
  ];
  MoneyList = [
    {
      min: "3",
      max: "5",
      text: "3-5",
      isSection: true
    },
    {
      min: "5",
      max: "8",
      text: "5-8",
      isSection: true
    },
    {
      min: "8",
      max: "12",
      text: "8-12",
      isSection: true
    }
  ];
  searchType = {
    commonKey1: "expectPosition"
  };
  isShowSearch = true; //显示搜索区域
  nowResumeMsg = {
    moreIntroduce: {
      introduce: ""
    }
  }; /* 简历详情 */
  fieldList = []; /* 期望行业 */
  options = []; //期待职位信息
  itemList = []; //简历数组
  historyList = []; //历史记录数组
  degreeList = []; //学历列表
  getCityList = []; //省市列表
  jobhuntStatusList = []; //求职状态
  form = {
    name: "",
    keyword: "", //关键字
    expectPositionId: "", //期望职位类型id
    expectPosition: "",
    expectCityNum: "", //期望城市编号
    skillLabel: "", //工作技能标签名
    jobStatus: "", //求职状态。 在职暂不考虑1，离职随时到岗2，在职月内到岗3，在职考虑机会4
    degree: "", //最高学历，初中及以下5，中专/中技10，高中15，大专20，本科25，硕士30，博士35，默认本科
    isStudent: "", //在校生、无工作经验。无工作经验时，该值为1，否则为0。该值为1时，忽略工作经验
    updateTimeLower: "" /* 简历更新时间下限 */,
    updateTimeUpper: "" /*简历更新时间上限  */,
    visitTimeLower: "" /* 最近访问时间下限 */,
    visitTimeUpper: "" /* 最近访问时间上限 */,
    workExpLower: "", //工作经验下限，单位“年”
    workExpUpper: "", //工作经验上限，单位“年”
    salaryLower: "" /* 薪资下限 */,
    salaryUpper: "" /* 薪资上限 */,
    ageLower: "" /* 年龄下限 */,
    ageUpper: "" /* 年龄上限*/,
    wherefrom:
      "" /* 10:平台用户在小程序上自行创建简历，20:后台用户创建微简历完成 */,
    resumeLabel: "", //简历标签名
    count: 20, //每页条数
    expectFieldId: "" /* 期望行业 */
  };
  historyCount = 1;
  pageCount = 20; //请求回来的数据量
  page = 1;
  nowCheck = 0; //当前点击详情上方的tab
  nowIndex = ""; //当前点击的简历索引
  isShowbtn = false;
  isShow = false; //展示简历详情
  closeWork = false; /* 关闭工作经验弹框 */
  CompletionDisabled = false;
  /* 完整度 */
  CompletionCheck(e) {
    /* 不限条件 0  全部条件1 */
    let isAll = e.includes("1");
    let empty = e.includes("0");
    if (empty || isAll) {
      console.log("ds");
      this.CompletionDisabled = true;
    }
  }
  /* 清空 */
  removeTag(e) {
    if (e === undefined) {
      this.CompletionDisabled = false;
    }
    console.log(e);
  }
  // 时间选择器
  TimeResult(e) {
    console.log(e, "最终提交数据");
    /* workExpLower 最小年限 workExpUpper 最大 */
    let { isStudent, min, max } = e;
    this.form.isStudent = isStudent == undefined ? "" : isStudent;
    this.form.workExpLower = min == undefined ? "" : min;
    this.form.workExpUpper = max == undefined ? "" : max;
    this.$refs["diywork"].checkTime = e.value;
    this.$refs["diywork"].closeSelect();
  }
  MoneyChoice(e) {
    let { isStudent, min, max } = e;
    this.form.isStudent = isStudent == undefined ? "" : isStudent;
    this.form.salaryLower = min == undefined ? "" : min;
    this.form.salaryUpper = max == undefined ? "" : max;
    this.$refs["Money"].checkTime = e.value;
    this.$refs["Money"].closeSelect();
  }
  AgeChoice(e) {
    let { isStudent, min, max } = e;
    this.form.isStudent = isStudent == undefined ? "" : isStudent;
    this.form.ageLower = min == undefined ? "" : min;
    this.form.ageUpper = max == undefined ? "" : max;
    this.$refs["age"].checkTime = e.value;
    this.$refs["age"].closeSelect();
    console.log(this.form);
  }
  // 新建微简历
  createNewResume() {
    let routeUrl = this.$router.resolve({
      path: "/resumeStore/list/createNewResume",
      query: {
        isEdit: 0
      }
    });
    window.open(routeUrl.href, "_blank");
  }
  /* 手动关闭事件 */
  closeSubEvent() {
    this.closelift = false;
    this.$refs["diywork"].closeSelect();
    this.$refs["Money"].closeSelect();
    this.$refs["age"].closeSelect();
  }
  checkType(e) {
    this.form[`${e}`] = "";
  }
  /* 清除列表选项 */
  resetForm(name) {
    this.$refs[name].resetFields();
    this.form.page = 1;
    this.form.isStudent = "";
    this.form.workExpLower = "";
    this.form.workExpUpper = "";

    this.form.expectCityNum = "";
    this.$nextTick(() => {
      let obj = {};
      obj.stopPropagation = () => {};
      this.$refs.cascader.clearValue(obj);
      this.$refs.cityChoice.clearValue(obj);
      this.$refs.custom.clearValue();
    });
  }
  showCallback(val) {
    this.isShow = false;
  }
  // 查看操作
  async operating(uid, param) {
    await addHistory(uid, param);
  }
  type(e) {
    this.form.expectPosition = e[e.length - 1];
  }
  choiceCity(e) {
    this.form.expectCityNum = e[e.length - 1];
  }

  // 查询按钮
  onSubmit() {
    this.form.page = 1;
    this.getData();
  }
  // 请求历史记录
  history(uid, form) {
    GetResumeHistory(uid, form).then(res => {
      // console.log(res);
      this.historyList = res.data.data;
    });
  }
  // 点击切换
  check(index) {
    this.nowCheck = +index;
    this.historyCount = 1;
    this.historyList = [];
    if (this.nowCheck === 1) {
      this.history(this.nowResumeMsg.uid, {
        page: this.historyCount,
        count: 20
      });
    } else if (this.nowCheck === 0) {
      this.operating(this.nowResumeMsg.uid, { desc: "简历" });
    }
  }
  created() {
    this.isShow = this.degreeData();
    this.jobhuntStatus();
    this.ManageList();
    this.CityData();
    this.getData();
    this.field();
  }
  field() {
    fieldApi().then(res => {
      this.fieldList = res.data.data;
      console.log(res, "sdfsfsd");
    });
  }
  CityData() {
    getCityApi().then(res => {
      this.getCityList = res.data.data;
      this.getCityList.forEach(item => {
        item.children.forEach(item1 => {
          let result = JSON.stringify(item1.children);
          if (result === "[]") delete item1.children;
        });
      });
    });
  }
  // 期待职位
  ManageList() {
    getLabelPositionListApi().then(res => {
      this.options = res.data.data;
      this.options.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            let result = JSON.stringify(item2.children);
            if (result === "[]") delete item2.children;
          });
        });
      });
    });
  }
  jobhuntStatus() {
    jobhuntStatusAPI().then(res => {
      this.jobhuntStatusList = res.data.data;
    });
  }
  /* 查看简历附件 */
  seereResume(index) {
    let uid = this.itemList[index].uid;
    this.seeFiles(this.itemList[index], uid);
    this.operating(uid, { desc: "简历附件" });
  }

  // 学历列表
  degreeData() {
    degreeListAPI().then(res => {
      this.degreeList = res.data.data;
    });
  }

  getDetail(uid, index) {
    this.resumeId = String(uid);
    this.isShow = true;
    this.showArrow = true;
    this.nowIndex = index;
    this.$nextTick(() => {
      this.$refs["resume"].getResume();
    });
  }
  getData() {
    GetResumeAPI(this.form).then(res => {
      this.itemList = res.data.data;
      this.leftcontent.total = parseInt(res.data.meta.total);
      this.leftcontent.lastPage = parseInt(res.data.meta.lastPage);
    });
  }
  // 翻页
  /* 翻页 */
  handlePageChange(nowPage) {
    this.$refs["methods"].scrollZero();
    this.form.page = nowPage;
    this.form.page = nowPage;
    this.getData();
  }
}
</script>

<style scoped lang="less">
@import "./list.less";
</style>
