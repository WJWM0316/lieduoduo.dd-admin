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
              <el-select v-model="form.jobStatus" placeholder="请选择活动区域">
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

            <!-- <el-form-item label="期待工作城市" class="formItem" prop="expectCityNum">
              <el-cascader
                v-model="form.expectCityNum"
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
            </el-form-item>-->
            <el-form-item label="最高学历" class="formItem" prop="degree">
              <el-select v-model="form.degree" placeholder="请选择活动区域">
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
      <div class="resumeList" slot="dataList">
        <div
          class="resumeItem"
          @click.stop="getDetail(item.uid)"
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
                <img :src="item.avatar.url" alt>
              </div>
              <div class="userName">
                <span class="name">{{item.name}}</span>
                <div class="experience">
                  <span v-if="item.workAge!=''">{{item.workAge}}年工作经验</span>
                  <span v-else>{{item.workAgeDesc}}</span>
                  <span>·</span>
                  <span>{{item.degreeDesc}}</span>
                  <span>·</span>
                  <span>{{item.degree}}岁</span>
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
                  <span>{{item3.province}}</span>
                  <span>{{item3.position}}</span>
                  <span>{{item3.salaryFloor}}~{{item3.salaryCeil}}k</span>
                  <div class="industry" v-for="(item4,index4) in item3.fields" :key="index4">
                    <span>{{item4.field}}</span>
                    <span>·</span>
                  </div>
                </div>
                <!-- <p
                  v-for="(item2,index2) in item.expects"
                  :key="index2"
                >{{item2.position}} {{item2.province}} 互联网·人才服务 6k-9k</p>-->
                <!-- <p>产品经理 广州 互联网/人才服务 6k-9k</p> -->
                <!-- <p>产品经理 广州 互联网/人才服务 6k-9k</p> -->
              </div>
              <div class="seeResume">
                <el-button>查看简历附件</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pageList" slot="pageList">
        <!-- v-if="hasPagination" v-show="total > 0" -->
        <footer class="list-footer">
          <el-pagination
            layout="prev, pager, next, slot"
            :current-page="page"
            :page-size="20"
            :total="leftcontent.total"
            @current-change="handlePageChange"
          >
            <span class="total">共 {{pageCount}} 页，{{leftcontent.total}} 条记录</span>
          </el-pagination>
        </footer>
      </div>
      <transition name="el-fade-in-linear" v-show="isShowMark" slot="Mark">
        <div class="Mask" @click.self="showMark">
          <div class="swiperList">
            <div class="arrow">
              <div class="left comstyle" @click.stop="reduce">
                <i class="el-icon-caret-left"></i>
              </div>
              <div class="right comstyle" @click.stop="add">
                <i class="el-icon-caret-right"></i>
              </div>
            </div>
            <div class="swipertype">
              <div
                class="common"
                :class="[index==nowCheck?'isCheck':'noCheck']"
                v-for="(item,index) in typeList"
                :key="item"
                @click.stop="check(index,'tab')"
              >{{item}}</div>
            </div>
            <div class="nowResume" v-show="nowCheck==0">
              <div class="Numbering">
                <span>简历编号：928de08bB4b99169a</span>
                <span>1995-.01.71更新</span>
              </div>
              <div class="Code">
                <div class="msgCode">
                  <img src="../../assets/images/preview.png" alt>
                  <span>扫码进入</span>
                </div>
                <div class="ContactInformation">
                  <p class="contactTitle">联系方式:</p>
                  <div class="Contact">
                    <span>手机号</span>
                    <span>13922281959</span>
                  </div>
                  <div class="Contact">
                    <span>微信号</span>
                    <span>13922281959</span>
                  </div>
                </div>
                <div class="download row">
                  <p class="contactTitle">附件简历:</p>
                  <div class="Contact">
                    <span>查看附件</span>
                  </div>
                </div>
              </div>
              <div class="ResumeDetails">
                <!-- 基础信息 -->
                <div class="base">
                  <div class="message">
                    <div class="msgUrl">
                      <img src="../../assets/images/preview.png" alt>
                      <span class="gender">
                        <i class="icon iconfont iconicon_boy"></i>
                      </span>
                    </div>
                    <div class="msgUserInfo">
                      <div class="basemsg">
                        <span class="realName">李永江</span>
                        <div class="lebalList">
                          <div class="lebalItem">
                            <i class="icon iconfont iconzhiwei"></i>
                            <span>暂无经历</span>
                          </div>
                          <div class="lebalItem">
                            <i class="icon iconfont iconnianling"></i>
                            <span>25岁</span>
                          </div>
                          <div class="lebalItem">
                            <i class="icon iconfont iconxueli"></i>
                            <span>本科</span>
                          </div>
                          <div class="lebalItem">
                            <span class="status">在职-考虑机会</span>
                          </div>
                        </div>
                      </div>
                      <div class="description">
                        <span
                          class="msg"
                        >4年的UI设计经验，个人适应力强，愿意不断学习，做事上手快，是一个有个性，负责任，有上进心且开朗的设计师。 对安卓及苹果尺寸规范熟悉； 现主要负责APP视觉界面设计，也有运营类经验； 会Ae动效 Sketch PS Ai软件 会手绘； 本人艺术生及艺术院系设计专业毕业，对美有一定的追求及敏感度；</span>
                        <div class="iconList">
                          <span class="iconItem">撸猫</span>
                          <span class="iconItem">分析用户</span>
                          <span class="iconItem">这是个性标签</span>
                          <span class="iconItem">这是个</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 求职意向 -->
                <div class="intention">
                  <p class="title">求职意向</p>
                  <div class="intentList">
                    <div class="intentionItem">
                      <span>高级产品经理 | 广州</span>
                      <span>知识付费·服务·电子产品</span>
                      <span>6k-9k</span>
                    </div>
                    <div class="intentionItem">
                      <span>高级产品经理 | 广州</span>
                      <span>知识付费·服务·电子产品</span>
                      <span>6k-9k</span>
                    </div>
                    <div class="intentionItem">
                      <span>高级产品经理 | 广州</span>
                      <span>知识付费·服务·电子产品</span>
                      <span>6k-9k</span>
                    </div>
                  </div>
                </div>
                <!-- 工作经历 -->
                <div class="workExperience">
                  <p class="title">工作经历</p>
                  <div class="workList">
                    <div class="workItem">
                      <div class="workTime">
                        <span>厦门乐域网络科技有限公司 | UI设计师</span>
                        <span>2017.06-2019.03</span>
                      </div>
                      <div class="workContent">
                        <span
                          class="duties"
                        >1、负责项目组内前端开发、项目组的管理协调工作，负责项目组内前端开发;
                         2、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发；
                         3、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端； 4、管理协调工作负责项目组内前端开发、项目组的管理协调工；
                         </span>
                      </div>
                    </div>
                    <div class="workItem">
                      <div class="workTime">
                        <span>广州老虎科技</span>
                        <span>2015.07-至今</span>
                      </div>
                      <div class="workContent">
                        <p class="name">前端工程师</p>
                        <span
                          class="duties"
                        >负责项目组内前端开发、项目组的管理协调工作，负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 项目经历 -->
              <!-- <div class="workExperience">
                <p class="title">项目经历</p>
                <div class="workList">
                  <div class="workItem">
                    <div class="workTime">
                      <span>广州老虎科技</span>
                      <span>2015.07-至今</span>
                    </div>
                    <div class="workContent">
                      <p class="name">项目职责:前端工程师</p>
                      <span
                        class="duties"
                      >负责项目组内前端开发、项目组的管理协调工作，负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作</span>
                    </div>
                  </div>
                  <div class="workItem">
                    <div class="workTime">
                      <span>广州老虎科技</span>
                      <span>2015.07-至今</span>
                    </div>
                    <div class="workContent">
                      <p class="name">前端工程师</p>
                      <span
                        class="duties"
                      >负责项目组内前端开发、项目组的管理协调工作，负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作</span>
                    </div>
                  </div>
                </div>
              </div>-->
              <!-- 教育经历 -->
              <!-- <div class="workExperience">
                <p class="title">教育经历</p>
                <div class="workList">
                  <div class="workItem">
                    <div class="workTime">
                      <span>广州老虎科技</span>
                      <span>2015.07-至今</span>
                    </div>
                    <div class="workContent">
                      <p class="name">项目职责:前端工程师</p>
                      <span
                        class="duties"
                      >负责项目组内前端开发、项目组的管理协调工作，负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作</span>
                    </div>
                  </div>
                  <div class="workItem">
                    <div class="workTime">
                      <span>广州老虎科技</span>
                      <span>2015.07-至今</span>
                    </div>
                    <div class="workContent">
                      <p class="name">前端工程师</p>
                      <span
                        class="duties"
                      >负责项目组内前端开发、项目组的管理协调工作，负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作负责项目组内前端开发、项目组的管理协调工作</span>
                    </div>
                  </div>
                </div>
              </div>-->
            </div>
            <!-- 历史记录 -->
            <div class="nowResume" v-show="nowCheck==1">
              <div class="historyList">
                <span>
                  2019-04-25 15:40:04
                  <i>陈某某</i> 查看 联系方式
                </span>
                <span>
                  2019-04-25 15:40:04
                  <i>陈某某</i> 查看 联系方式
                </span>
                <span>
                  2019-04-25 15:40:04
                  <i>陈某某</i> 查看 联系方式
                </span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </lyout-content>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import lyoutContent from "COMPONENTS/Lyout/lyoutContent/lyoutContent.vue";
import CustomSelect from "./components/CustomSelect/index.vue";
import { getLabelPositionListApi } from "API/position";
import { getCityApi } from "API/company";
import {
  GetResumeAPI,
  GetResumeDetailsAPI,
  degreeListAPI,
  jobhuntStatusAPI
} from "API/resumeStore.js";
@Component({
  name: "resumeStore",
  components: {
    lyoutContent,
    CustomSelect
  }
})
export default class resumeStore extends Vue {
  typeList = ["简历详情", "历史记录"];
  leftcontent = {
    total: 0,
    title: "简历库"
  };
  options = []; //期待职位信息
  itemList = []; //简历数组
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
  pageCount = 20; //请求回来的数据量
  page = 1;
  nowCheck = 0; //当前点击
  isCheck = 0;
  isShowbtn = true;
  isShowMark = true; //展示简历详情
  showMark() {
    this.isShowMark = !this.isShowMark;
  }
  // 右箭头
  add(index) {
    if (this.nowCheck === 2) return;
    this.nowCheck++;
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
    this.form.isStudent = "";
    this.form.workExpLower = "";
    this.form.workExpUpper = "";
    this.$nextTick(() => {
      let obj = {};
      obj.stopPropagation = () => {};
      this.$refs.cascader.clearValue(obj);
      this.$refs.custom.clearValue();
    });
  }
  type(e) {
    this.form.expectPosition = e[e.length - 1];
  }
  choiceCity(e) {
    this.form.expectCityNum = e[e.length - 1];
  }
  // 左边箭头
  reduce() {
    if (this.nowCheck === 0) return;
    this.nowCheck--;
  }
  // 查询按钮
  onSubmit() {
    this.getData();
  }
  // 点击切换
  check(index) {
    this.nowCheck = index;
  }
  mounted() {
    this.getData();
    this.degreeData();
    this.jobhuntStatus();
    this.ManageList();
    this.CityData();
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
      console.log("this.jobhuntStatusList", this.jobhuntStatusList);
    });
  }
  // 学历列表
  degreeData() {
    degreeListAPI().then(res => {
      this.degreeList = res.data.data;
      console.log("this.degreeList", this.degreeList);
    });
  }
  getDetail(uid) {
    this.isShowMark = !this.isShowMark;
    GetResumeDetailsAPI(uid).then(res => {
      console.log(res);
    });
  }
  getData() {
    GetResumeAPI(this.form).then(res => {
      console.log(res);
      this.itemList = res.data.data;
      this.leftcontent.total = res.data.meta.total;
      console.log(this.leftcontent);
    });
  }
  // 翻页
  /* 翻页 */
  handlePageChange(nowPage) {
    this.$route.meta.scrollY = 0;
    window.scrollTo(0, 0);
    this.form.page = nowPage;
    // this.getCompanyList();
  }
}
</script>

<style scoped lang="less">
@import "./resumeStore.less";
</style>
