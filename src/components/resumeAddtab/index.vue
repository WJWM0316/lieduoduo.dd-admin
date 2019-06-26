<!--  -->
<template>
  <div class="resumeAddTab">
    <!-- 标签添加组件 -->
    <div class="addTab" v-if="showAddResumeTab">
      <div class="addConttent">
        <div class="TabHeader">
          <span>标签</span>
          <i class="el-icon-circle-close" @click.stop="showAddResumeTab=false"></i>
        </div>
        <div class="SearchInput">
          <div class="row">
            <el-input
              type="text"
              placeholder="请输入自定义标签"
              v-model="diyTabName"
              maxlength="12"
              show-word-limit
            ></el-input>
            <el-button class="adding" type="primary" @click.stop="addTab">添加</el-button>
          </div>

          <div class="nowCheckTabList">
            <p class="nowCheck">已选择({{nowCheckListTab.length}} /15)</p>
            <div
              :class="item.status?'focusItem':'tabItem'"
              v-for="(item,index) in nowCheckListTab"
              :key="index"
            >
              <span>{{item.name}}</span>
              <i class="el-icon-circle-close" @click.stop="delateTab(index)"></i>
            </div>
          </div>
        </div>
        <div class="tabStore">
          <p>标签库</p>
          <div class="tabList">
            <div
              v-for="(item,index) in tabList"
              :key="index"
              :class="item.status?'focusItem':'tabItem'"
              @click.stop="choiceTab(index)"
            >
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="resumeTabBtn">
          <el-button type="primary" @click="checkTab()">确定</el-button>
          <el-button @click.stop="showAddResumeTab=false">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { resumelist, createLabel, confgiLabel } from "API/resumeStore.js";

@Component({
  name: "resumeAddTab",
  props: {
    uid: {
      type: Number,
      default: 0
    }
  }
})
export default class resumeAddtab extends Vue {
  nowCheckListTab = []; /* 当前选择标签数组 */
  diyTabName = ""; /* 自定义标签 */
  showAddResumeTab = false; /* 是否显示select */
  tabList = []; /* 标签库 */
  returnStr = "";
  showSelect() {
    this.showAddResumeTab = true;
  }
  closeSelect() {
    this.showAddResumeTab = false;
  }
  /* 确认给简历打标签 */
  checkTab() {
    let labelIds = this.nowCheckListTab.map(item => item.id).join(",");
    confgiLabel(this.uid, { labelIds }).then(res => {
      console.log(res);
      this.showAddResumeTab = false;
      this.$emit("CallbackDetail");
    });
  }
  /* 删除已选择的标签 */
  delateTab(index) {
    this.resetStoreStatus(index);
    this.nowCheckListTab.splice(index, 1);
  }
  /* 新增标签 */
  addTab() {
    console.log(this.diyTabName);
    createLabel({ name: this.diyTabName }).then(res => {
      this.Tabresumelist();
      this.$message({
        message: "添加成功",
        type: "success"
      });
    });
  }
  /* 选择标签 */
  choiceTab(index) {
    let isCheck = this.nowCheckListTab.filter(
      item => item.name === this.tabList[index].name
    );
    if (isCheck.length > 0) return;
    if (this.nowCheckListTab.length >= 15) return;
    if (!this.tabList[index].status) {
      let param = {
        status: !this.tabList[index].status,
        name: this.tabList[index].name,
        id: this.tabList[index].id
      };
      this.$nextTick(() => {
        this.tabList[index].status = true;
        this.nowCheckListTab.push(param);
      });
    } else {
      this.$nextTick(() => {
        this.tabList[index].status = false;
      });
      console.log("----2----", this.tabList);
      // this.$forceUpdate();
      // console.log("sdfk");
    }
  }
  /* 重置标签库 */
  resetStoreStatus(index) {
    for (let i = 0; i < this.tabList.length; i++) {
      if (this.nowCheckListTab[index].id === this.tabList[i].id) {
        this.tabList[i].status = false;
      }
    }
  }
  Tabresumelist() {
    resumelist().then(res => {
      this.tabList = res.data.data;
      this.tabList.forEach(item => {
        item.status = false;
      });
      console.log(this.tabList);
    });
  }
  created() {
    this.Tabresumelist();
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>