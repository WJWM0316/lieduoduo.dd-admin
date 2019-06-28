<!--  -->
<template>
  <div class="CustomSelect">
    <div class="workHistroy">
      <span class="Title">工作经验:</span>
      <div class="select" :class="isCheck==true?'show':''" @click.self="showSelect">
        <span class="placeholder">{{checkTime}}</span>
        <div class="selectList" v-show="isCheck==true">
          <div class="selectItem" value="0" @click.self="choice(0)">不限</div>
          <div class="selectItem" value="0" @click.self="choice(1)">无经验</div>
          <div class="CustomExperience">
            <span class="Custom">自定义经验</span>
            <div class="Section">
              <input type="text" placeholder="0" :value="workExpLower" id="minYear">
              <span>-</span>
              <input type="text" :value="workExpUpper" placeholder="99" id="maxYear">
            </div>
          </div>
          <div class="sumbitBtn" @click.stop="choice()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "CustomSelect",
})
export default class CustomSelect extends Vue {
  isCheck = false;
  workExpLower = ""; //最小年限
  workExpUpper = ""; //最大年限
  isStudent = ""; // 在校生、无工作经验。无工作经验时，该值为1，否则为0。该值为1时，忽略工作经验
  checkTime = "请选择";

  // 显示
  showSelect() {
    this.isCheck = !this.isCheck;
  }
  // 初始化
  clearValue(){
    this.checkTime='请选择'
  }
  choice(e) {
    this.isCheck = false;
    if (e === 0) {
      this.checkTime = "不限";
      this.isStudent = 0;
      this.workExpLowe = "";
      this.workExpUpper = "";
      this.$emit("callback", {
        isStudent: this.isStudent,
        workExpLower: this.workExpLower,
        workExpUpper: this.workExpUpper,
        checkTime:this.checkTime
      });
    } else if (e === 1) {
      this.checkTime = "无经验";
      this.isStudent = 1;
      this.workExpLower = "";
      this.workExpUpper = "";
      this.$emit("callback", {
        isStudent: this.isStudent,
        workExpLower: this.workExpLower,
        workExpUpper: this.workExpUpper,
        checkTime:this.checkTime
      });
    } else {
      this.workExpLower = document.getElementById("minYear").value;
      this.workExpUpper = document.getElementById("maxYear").value;
      if (/\d/.test(this.workExpLower) && /\d/.test(this.workExpUpper)) {
        if (+this.workExpUpper > +this.workExpLower) {
          this.checkTime = `${this.workExpLower}~${this.workExpUpper}`;
          this.$emit("callback", {
            isStudent: this.isStudent,
            workExpLower: this.workExpLower,
            workExpUpper: this.workExpUpper,
          });
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>;
