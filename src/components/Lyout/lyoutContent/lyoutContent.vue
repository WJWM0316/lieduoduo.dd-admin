<!--  -->
<template>
  <div class="lyoutContent">
    <section class="contentStyle">
      <el-header class="header" style="text-align: right; font-size: 15px;">
        <div class="lyoutTitle">
          <span class="title">{{leftcontent.title}}({{leftcontent.total}})</span>
        </div>
        <div class="slotButton" v-if="isShowbtn">
          <slot name="text"></slot>
        </div>
      </el-header>
      <slot name="formContent"></slot>
      <slot name="dataList"></slot>
      <slot name="pageList"></slot>
      <div class="Mark" v-if="isShowMark"></div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "lyoutContent",
  props: {
    isShowbtn: { //是否显示右侧按钮
      type: Boolean,
      default: false
    },
    leftcontent: { //标题，以及数据量
      type: Object,
      default: {
        title: "标题",
        total: 0
      }
    },
    isShowMark: {
      type: Boolean, //是否展示遮罩
      default: false
    }
  }
})
export default class lyoutContent extends Vue {}
</script>
<style scoped lang="less">
.lyoutContent {
  position: fixed;
  top: 60px;
  left: 200px;
  right: 0;
  z-index: 100;
  height: 100%;
  .contentStyle {
    margin: 22px;
    padding: 20px;
    padding-top: 0px;
    border: 1px solid rgb(238, 238, 238);
    height: 100%;
    .header {
      padding: 0px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .lyoutTitle {
        position: relative;

        &:before {
          content: "";
          position: absolute;
          left: 0px;
          top: 3px;
          background: #ffe266;
          display: inline-block;
          float: left;
          height: 100%;
          height: 16px;
          margin-right: 10px;
          width: 6px;
        }

        span {
          margin-left: 15px;
          font-size: 15px;
        }
      }

      .slotButton {
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
      }
    }
  }
}
.Mark {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.7;
  z-index: 500;
}
</style>
