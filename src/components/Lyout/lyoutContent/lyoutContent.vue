<!--  -->
<template>
  <div class="lyoutContent" id="lyoutScroll">
    <section class="contentStyle">
      <el-header class="header" style="text-align: right; font-size: 15px;">
        <!-- 标题区域 -->
        <div class="lyoutTitle">
          <span class="title">{{leftcontent.title}}({{leftcontent.total}})</span>
        </div>
        <!-- 右上角按钮区域 -->
        <div class="slotButton" v-if="isShowbtn">
          <slot name="text"></slot>
        </div>
      </el-header>
      <!-- 各类搜索条件 -->
      <slot name="formContent"></slot>
      <!-- 数据table -->
      <slot name="dataList"></slot>
      <!-- 分页 -->
      <slot name="pageList"></slot>
      <!-- 遮罩层，如有需要可在遮罩层添加块 -->
      <div class="Mark" v-if="isShowMark">
        <slot name="Mark"></slot>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "lyoutContent",
  props: {
    isShowbtn: {
      //是否显示右侧按钮
      type: Boolean,
      default: false
    },
    leftcontent: {
      //标题，以及数据量
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
export default class lyoutContent extends Vue {
  scrollZero() {
    window.scrollTo(0, 0);
    const el = document.getElementById("lyoutScroll");
    // console.log(el);
    el.scrollTop = 0;
  }
}
</script>
<style scoped lang="less">
.lyoutContent {
  position: fixed;
  top: 60px;
  left: 200px;
  right: 0;
  bottom: 50px;
  overflow-y: scroll;
  // .isScroll {
  &::-webkit-scrollbar {
    display: none;
  }
  // }

  .contentStyle {
    margin: 22px;
    padding: 20px;
    padding-top: 0px;
    padding-bottom: 0px;
    border: 1px solid #eeeeee;
    background: #fff;
    position: relative;
    // overflow-y: scroll;
    // height: 750px;+

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
        cursor: pointer;
      }
    }
  }
}
.Mark {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
.formSumbit {
  background: #fff;

  .BtnList {
    width: 254px;
    .inquire {
      color: #ffffff;
      background-color: #652791;
    }
  }
}
</style>
