<!--  -->
<template>
  <div class="filterAnswer">
    <div class="workHistroy">
      <span class="Title">{{labelName}}:</span>
      <div class="select" :class="isCheck==true?'show':''" @click.stop="showSelect">
        <div class="checkList" v-if="nowCheckList.length>0">
          <span class="itemCheck" v-for="(item,index) in nowCheckList" :key="index">{{item.text}}</span>
        </div>
        <div class="selectPop" v-if="startSelect">
          <p class="selectTitle">简历完整度筛选</p>
          <div class="selectBorder">
            <el-radio label="1" v-model="checkAll" @change="handleNoReason">不限条件</el-radio>
            <p class="line">可勾选多个必需有的简历信息进行筛选</p>
            <el-radio v-model="checkAll" label="2" @change="allchoice">全部条件</el-radio>
            <el-checkbox-group v-model="allCheckList" @change="handleCheckedCitiesChange">
              <el-checkbox
                v-for="city in cityOptions"
                :label="city.value"
                :key="city.labelId"
              >{{city.value}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "filterAnswer",
  props: {
    /* 搜索label */
    labelName: {
      type: String
    }
  }
})
export default class filterAnswer extends Vue {
  choiceKeys = {};
  isCheck = false;
  startSelect = true; /* 显示筛选框 */
  allCheckList = []; /* 全选中 */
  nowCheckList = []; /* 当前选中 */
  allCheck = [];
  checkedCities = "";
  checkAll = false;
  isIndeterminate = false;
  cityOptions = [
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
      value: "简历附件"
    }
  ];
  // 显示
  showSelect() {
    this.startSelect = true;
  }
  /* 全选 */
  allchoice(e) {
    console.log(e);
    this.delateNoOptions();
    // this.checkArr = event.target.checked ? this.CheckedAllArr : [];
  }
  /*  */
  delateNoOptions() {
    for (let i = 0; i < this.nowCheckList.length; i++) {
      if (this.nowCheckList[i].text === "不限条件") {
        this.removeAaary(this.nowCheckList, this.nowCheckList[i]);
      }
    }
  }
  removeAaary(_arr, _obj) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
      if (_arr[i] == _obj) {
        if (i == 0) {
          _arr.shift(); //删除并返回数组的第一个元素
          return _arr;
        } else if (i == length - 1) {
          _arr.pop(); //删除并返回数组的最后一个元素
          return _arr;
        } else {
          _arr.splice(i, 1); //删除下标为i的元素
          return _arr;
        }
      }
    }
  }

  handleNoReason(val) {
    let param = {
      text: "不限条件",
      label: "0"
    };
    val ? this.nowCheckList.push(param) : this.delateNoOptions();
    // this.startSelect = false;
  }
  handleCheckedCitiesChange(value) {
    console.log(value);
    let checkedCount = value.length;
    this.checkAll = checkedCount === this.cities.length;
    this.isIndeterminate =
      checkedCount > 0 && checkedCount < this.cities.length;
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>