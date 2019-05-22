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
              <input type="text" placeholder="0" :value="minYear" id="minYear">
              <span>-</span>
              <input type="text" :value="maxYear" placeholder="99" id="maxYear">
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
import { scrypt } from "crypto";

@Component({
  name: "CustomSelect",
  prop: ""
})
export default class CustomSelect extends Vue {
  isCheck = false;
  minYear = ""; //最小年限
  maxYear = ""; //最大年限
  checkTime = "请选择";
  // 显示
  showSelect() {
    this.isCheck = !this.isCheck;
  }
  choice(e) {
    this.isCheck = false;
    if (e === 0) {
      this.checkTime = "不限";
    } else if (e === 1) {
      this.checkTime = "无经验";
    } else {
      let minYear = document.getElementById("minYear").value;
      let maxYear = document.getElementById("maxYear").value;
      if (/\d/.test(minYear) && /\d/.test(maxYear)) {
        if (+maxYear > +minYear) {
          this.checkTime = `${minYear}~${maxYear}`;
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>;
