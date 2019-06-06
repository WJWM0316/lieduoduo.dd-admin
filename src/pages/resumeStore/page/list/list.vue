<template>
  <div class="resumeStore">
    <lyout-content
      :leftcontent="leftcontent"
      :isShowbtn="false"
      :isShowMark="isShowMark"
      ref="methods"
    >
      <div class="formSumbit" slot="formContent">
        <div class="formReasult">
          <el-form ref="form" :model="form" class="form">
            <el-form-item label="模糊搜索" class="formItem" prop="keyword">
              <el-input placeholder="搜索姓名、手机号、公司名" v-model="form.keyword"></el-input>
            </el-form-item>
            <el-form-item label="求职状态" prop="jobStatus" class="formItem">
              <el-select v-model="form.jobStatus" placeholder="请选择">
                <el-option
                  v-for="(item,index) in jobhuntStatusList"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 职位来源 -->
            <el-form-item label-width="80px" label="职位类别" prop="expectPosition">
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

            <el-form-item label="期待工作城市" class="formItem" prop="expectCityNum">
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
            <custom-select ref="custom" @callback="TimeResult"></custom-select>
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
      </div>
      <div class="pageList" slot="pageList">
        <!-- v-if="hasPagination" v-show="total > 0" -->
        <footer class="list-footer" v-show="isShowMark==false">
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
      <div v-show="isShowMark" slot="Mark">
        <div class="left comstyle" @click.stop="LeftArrow">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="right comstyle" @click.stop="rightArrow">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="Mask" @click.self="showMark">
          <div class="swiperList">
            <div class="swipertype">
              <div
                class="common"
                :class="[index==nowCheck?'isCheck':'noCheck']"
                v-for="(item,index) in typeList"
                :key="index"
                @click.stop="check(index,'tab')"
              >{{item}}</div>
            </div>
            <div class="nowResume" v-show="nowCheck==0">
              <div class="Numbering">
                <span>简历编号：{{nowResumeMsg.vkey}}</span>
                <span>{{nowResumeMsg.resumeUpdateTime}}更新</span>
              </div>
              <div class="resumeLyout">
                <div class="ResumeDetails">
                  <!-- 基础信息 -->
                  <div class="base">
                    <div class="message">
                      <div class="msgUrl">
                        <img :src="nowResumeMsg.avatar.url" alt v-if="nowResumeMsg.avatar">
                        <span class="gender" v-show="nowResumeMsg.gender===1">
                          <i v-show="nowResumeMsg.gender===1" class="icon iconfont iconicon_boy"></i>
                        </span>
                        <span class="gender2" v-show="nowResumeMsg.gender===2">
                          <i v-show="nowResumeMsg.gender===2" class="icon iconfont iconicon_girl"></i>
                        </span>
                      </div>
                      <div class="msgUserInfo">
                        <div class="basemsg">
                          <span class="realName">{{nowResumeMsg.name}}</span>
                          <div class="lebalList">
                            <div class="lebalItem">
                              <i class="icon iconfont iconzhiwei" style></i>
                              <span>{{nowResumeMsg.workAgeDesc}}</span>
                            </div>
                            <div class="lebalItem">
                              <i class="icon iconfont iconnianling"></i>
                              <span>{{nowResumeMsg.age}}岁</span>
                            </div>
                            <div
                              class="lebalItem"
                              :style="nowResumeMsg.jobStatus===''?'margin-right:0px;':''"
                            >
                              <i class="icon iconfont iconxueli"></i>
                              <span>{{nowResumeMsg.degreeDesc}}</span>
                            </div>
                            <div class="lebalItem">
                              <span
                                class="status"
                                v-if="nowResumeMsg.jobStatus"
                              >{{nowResumeMsg.jobStatusDesc}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="description">
                          <span class="msg">{{nowResumeMsg.signature}}</span>
                          <!-- v-show="nowResumeMsg.personalizedLabels.length>0" -->
                          <div class="iconList">
                            <span
                              class="iconItem"
                              v-for="(item,index) in nowResumeMsg.personalizedLabels"
                              :key="item.labelName"
                              :style="index===nowResumeMsg.personalizedLabels.length-1?'margin-bottom:0px;':''"
                            >{{item.labelName}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 求职意向 -->
                  <div class="intention" v-show="nowResumeMsg.expects!=''">
                    <p class="title">求职意向</p>
                    <div class="intentList">
                      <div
                        class="intentionItem"
                        v-for="(item,index) in nowResumeMsg.expects"
                        :key="item.position"
                        :style="index===nowResumeMsg.expects.length-1?'padding-bottom:0px;':''"
                      >
                        <span class="position">{{item.position}}&nbsp;|&nbsp;{{item.city}}</span>
                        <span v-if="item.fields.length>0">|</span>
                        <div style="margin-left:9px;display:inline-block;">
                          <div class="fields" v-for="(item1,index1) in item.fields" :key="index1">
                            <span>{{item1.field}}&nbsp;&nbsp;</span>
                          </div>
                        </div>
                        <span class="price">{{item.salaryFloor}}k-{{item.salaryCeil}}k</span>
                      </div>
                    </div>
                  </div>
                  <!-- 工作经历 -->
                  <div class="workExperience" v-show="nowResumeMsg.careers!=''">
                    <p class="title">工作经历</p>
                    <!-- v-show="nowResumeMsg.careers.length>0" -->
                    <div class="workList">
                      <div
                        class="workItem"
                        v-for="(item,index) in nowResumeMsg.careers"
                        :key="item.company"
                        :style="index===nowResumeMsg.careers.length-1?'margin-bottom:0px;':''"
                      >
                        <div class="workTime">
                          <span>{{item.company}} | {{item.position}}</span>
                          <span>{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                        </div>
                        <div class="workContent">
                          <span class="duties">
                            <pre>{{item.duty}}</pre>
                          </span>
                        </div>
                        <!-- v-show="item.technicalLabels.length>0" -->
                        <div class="workIconList" v-show="item.technicalLabels.length>0">
                          <span
                            v-for="item1 in item.technicalLabels"
                            :key="item1.technicalLabels"
                          >#{{item1.labelName}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 项目经历 -->
                  <div class="workExperience" v-show="nowResumeMsg.projects!=''">
                    <p class="title">项目经历</p>
                    <div class="workList">
                      <div
                        class="workItem"
                        v-for="(item,index) in nowResumeMsg.projects"
                        :key="item.role"
                        :style="index===nowResumeMsg.projects.length-1?'margin-bottom:0px;':''"
                      >
                        <div class="workTime">
                          <span>{{item.name}} &nbsp;| &nbsp;{{item.role}}</span>
                          <span>{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                        </div>
                        <div class="workContent">
                          <span class="duties">
                            <pre>{{item.description}}</pre>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 教育经历 -->
                  <div class="workExperience" v-show="nowResumeMsg.educations!=''">
                    <p class="title">教育经历</p>
                    <div class="workList">
                      <div
                        class="workItem"
                        v-for="(item,index) in nowResumeMsg.educations"
                        :key="item.school"
                        :style="index===nowResumeMsg.educations.length-1?'margin-bottom:0px;':''"
                      >
                        <div class="workTime">
                          <span>{{item.school}} | {{item.degreeDesc}} | {{item.major}}</span>
                          <span>{{item.startTimeDesc}}~{{item.endTimeDesc}}</span>
                        </div>
                        <div class="workContent" v-show="item.experience!=''">
                          <span class="duties">
                            <pre>{{item.experience}}</pre>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 更多介绍 -->
                  <div class="workExperience" v-show="nowResumeMsg.moreIntroduce.introduce!=''">
                    <p class="title">更多介绍</p>
                    <div class="workList">
                      <pre>{{nowResumeMsg.moreIntroduce.introduce}}</pre>
                      <div class="imgList">
                        <img
                          :src="item.url"
                          alt
                          v-for="(item,index) in nowResumeMsg.moreIntroduce.imgs"
                          :key="index"
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="Code">
                  <div class="msgCode">
                    <img :src="nowResumeMsg.resumeQrCode" alt v-if="nowResumeMsg.resumeQrCode">
                    <span>扫码进入</span>
                  </div>
                  <div class="ContactInformation">
                    <p class="contactTitle">联系方式:</p>
                    <div class="Contact" @click.stop="seeMobile" v-if="nowResumeMsg.mobile!=''">
                      <span>手机号</span>
                      <span v-if="nowResumeMsg.showPhone==true">{{nowResumeMsg.mobile}}</span>
                    </div>
                    <div class="Contact" @click.stop="seeWechat" v-if="nowResumeMsg.wechat!=''">
                      <span>微信号</span>
                      <span v-if="nowResumeMsg.showWechat==true">{{nowResumeMsg.wechat}}</span>
                    </div>
                    <p v-if="nowResumeMsg.wechat==''&&nowResumeMsg.mobile==''" class="noUpload">暂无上传</p>
                  </div>
                  <div class="download">
                    <p class="contactTitle">附件简历:</p>
                    <p v-if="nowResumeMsg.resumeAttach==null" class="noUpload">暂无上传</p>
                    <div class="Contact" @click.stop="seeFilesBtn" v-else>
                      <span>查看附件</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 历史记录 -->
            <div class="nowResume" v-show="nowCheck==1">
              <div class="Numbering">
                <span>简历编号：{{nowResumeMsg.vkey}}</span>
                <span>{{nowResumeMsg.resumeUpdateTime}}更新</span>
              </div>
              <div class="historyList" id="historyScroll">
                <span v-for="(item,index) in historyList" :key="index">
                  {{item.createdAt}}
                  <i>&nbsp;&nbsp;&nbsp;{{item.admin}}&nbsp;&nbsp;</i>
                  &nbsp;&nbsp;{{item.action}} &nbsp;&nbsp;{{item.desc}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </lyout-content>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import lyoutContent from "COMPONENTS/Lyout/lyoutContent/lyoutContent.vue";
import CustomSelect from "../../components/CustomSelect/index.vue";
import { getLabelPositionListApi } from "API/position";
import { getCityApi } from "API/company";
import {
  GetResumeAPI,
  GetResumeDetailsAPI,
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
    CustomSelect
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
  leftcontent = {
    total: 0,
    title: "简历库"
  };
  isShowSearch = true; //显示搜索区域
  lastPage = "";
  nowResumeMsg = {
    moreIntroduce: {
      introduce: ""
    }
  }; /* 简历详情 */
  options = []; //期待职位信息
  itemList = []; //简历数组
  historyList = []; //历史记录数组
  degreeList = []; //学历列表
  getCityList = []; //省市列表
  jobhuntStatusList = []; //求职状态
  form = {
    name: "",
    keyword: "", //关键字
    expectPosition: "", //期望职位类型id
    expectCityNum: "", //期望城市编号
    skillLabel: "", //工作技能标签名
    jobStatus: "", //求职状态。 在职暂不考虑1，离职随时到岗2，在职月内到岗3，在职考虑机会4
    degree: "", //最高学历，初中及以下5，中专/中技10，高中15，大专20，本科25，硕士30，博士35，默认本科
    isStudent: "", //在校生、无工作经验。无工作经验时，该值为1，否则为0。该值为1时，忽略工作经验
    workExpLower: "", //工作经验下限，单位“年”
    workExpUpper: "", //工作经验上限，单位“年”
    resumeLabel: "", //简历标签名
    page: 1, //第几页
    count: 20 //每页条数
  };
  historyCount = 1;
  pageCount = 20; //请求回来的数据量
  page = 1;
  nowCheck = 0; //当前点击详情上方的tab
  nowIndex = ""; //当前点击的简历索引
  isCheck = 0;
  isShowbtn = true;
  isShowMark = false; //展示简历详情
  showMark() {
    this.isShowMark = !this.isShowMark;
  }
  // 时间选择器
  TimeResult(e) {
    let { isStudent, workExpLower, workExpUpper } = e;
    this.form.isStudent = isStudent;
    this.form.workExpLower = workExpLower;
    this.form.workExpUpper = workExpUpper;
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

  // 查看手机号码
  seeMobile() {
    // console.log(this.nowIndex)
    // console.log(this.itemList[this.nowIndex])
    // return
    let uid = this.nowResumeMsg.uid;
    this.operating(uid, { desc: "联系方式" });
    this.$nextTick(() => {
      this.nowResumeMsg.showPhone = !this.nowResumeMsg.showPhone;
    });
  }
  /* 查看微信号 */
  seeWechat() {
    let uid = this.nowResumeMsg.uid;
    this.operating(uid, { desc: "微信号" });
    this.$nextTick(() => {
      this.nowResumeMsg.showWechat = !this.nowResumeMsg.showWechat;
    });
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
      // console.log("我进来了");
      this.history(this.nowResumeMsg.uid, {
        page: this.historyCount,
        count: 20
      });
    } else if (this.nowCheck === 0) {
      // console.log("简历详情");
      // console.log(this.nowResumeMsg.name);
      this.operating(this.nowResumeMsg.uid, { desc: "简历" });
    }
  }
  created() {
    // console.log("");
    this.degreeData();
    this.jobhuntStatus();
    this.ManageList();
    this.CityData();
    this.getData();
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
    // console.log(this.itemList[index]);
    this.seeFiles(this.itemList[index], uid);
    this.operating(uid, { desc: "简历附件" });
  }
  // 查看附件
  seeFilesBtn() {
    this.seeFiles(this.nowResumeMsg, this.nowResumeMsg.uid);
    this.operating(this.nowResumeMsg.uid, { desc: "简历附件" });
  }
  seeFiles(fileObJ, uid) {
    let File = fileObJ.resumeAttach;

    if (File === null) {
      this.$message.error("此人未上传简历附件");
    } else {
      let uid = fileObJ.uid;
      let type = File.extension;
      this.operating(uid, { desc: "简历附件" });
      this.$nextTick(() => {
        if (/(png|jpg)/.test(type)) {
          window.open(File.url);
        } else if (/(pdf)/.test(type)) {
          window.open(File.url);
        } else if (/(doc|docx)/.test(type)) {
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${File.url}`
          );
        } else {
          this.$message({
            message: "格式不支持",
            type: "warning"
          });
        }
      });
    }
  }
  // 学历列表
  degreeData() {
    degreeListAPI().then(res => {
      this.degreeList = res.data.data;
      // console.log("this.degreeList", this.degreeList);
    });
  }
  // 左边箭头
  LeftArrow() {
    if (this.nowIndex < 0) return;
    let index = this.nowIndex--;
    // this.historyCount=1;
    if (this.nowCheck == 1) {
      this.historyCount = 1;
      this.history(this.itemList[index].uid, {
        page: this.historyCount,
        count: 20
      });
    }
    this.nowResumeMsg = Object.assign(this.nowResumeMsg, this.itemList[index]);
  }
  // 右箭头
  rightArrow() {
    if (this.nowIndex === this.itemList.length) {
      this.$message({
        message: "本页数据加载完毕",
        type: "warning"
      });
    } else {
      let index = this.nowIndex++;
      // this.historyCount=1;
      if (this.nowCheck === 1) {
        this.historyCount = 1;
        this.history(this.itemList[index].uid, {
          page: this.historyCount,
          count: 20
        });
      }
      this.nowResumeMsg = Object.assign(
        this.nowResumeMsg,
        this.itemList[index]
      );
    }
  }
  getDetail(uid, index) {
    this.isShowMark = true;
    this.nowIndex = index;
    // console.log("thisIndex", typeof this.nowIndex);
    GetResumeDetailsAPI(uid).then(res => {
      this.nowResumeMsg = res.data.data;
      this.nowResumeMsg = Object.assign({}, this.nowResumeMsg, {
        showPhone: false,
        showWechat: false
      });
      const uid = this.nowResumeMsg.uid;
      this.operating(uid, { desc: "简历" });
    });
  }
  getData() {
    GetResumeAPI(this.form).then(res => {
      this.itemList = res.data.data;
      this.leftcontent.total = parseInt(res.data.meta.total);
      this.lastPage = parseInt(res.data.meta.lastPage);
      // console.log(this.lastPage);
      // this.$nextTick(() => {
      //   this.$set(this.leftcontent, "total", Number(res.data.meta.total));
      //   this.$set(this.leftcontent, "lastPage", Number(res.data.meta.lastPage));
      // });

      // console.log("itemList", this.itemList);
      // console.log("this.leftcontent", this.leftcontent);
    });
  }
  // 翻页
  /* 翻页 */
  handlePageChange(nowPage) {
    // console.log(nowPage);
    // const el = document.getElementById("scroll");
    // console.log(el);
    // el.scrollTop = 0;
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
