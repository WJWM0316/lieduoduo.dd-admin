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
        <div :class="['slotButton', $route.path === '/resumeStore/list' ? 'weizhi' : '']" v-if="isShowbtn">
          <slot name="text"></slot>
        </div>
      </el-header>
      <!-- 各类搜索条件 -->
      <slot name="formContent"></slot>
      <!-- 数据table -->
      <slot name="dataList" ref="tableHeight"></slot>

      <!-- 分页 -->
      <div class="pageList" slot="pageList">
        <!-- v-if="hasPagination" v-show="total > 0" -->
        <footer class="list-footer">
          <el-pagination
            layout="prev, pager, next, slot"
            :current-page="leftcontent.page"
            :page-size="20"
            :total="leftcontent.total"
            @current-change="handlePageChange"
          ></el-pagination>
          <span class="total">共 {{leftcontent.lastPage}} 页，{{leftcontent.total}} 条记录</span>
        </footer>
      </div>
      <!-- 遮罩层，如有需要可在遮罩层添加块 -->
      <!-- <div class="Mark" v-if="isShowMark"></div> -->
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
    lastPage: {
      type: String,
      default: ""
    }
  }
})
export default class lyoutContent extends Vue {
  tableHeight = 0; /* table高度 */
  scrollZero() {
    window.scrollTo(0, 0);
    const el = document.getElementById("lyoutScroll");
    el.scrollTop = 0;
  }
  /* 监听布局高度，以改变table高度,兼容其他浏览器 */
  clientHeight() {
    let lyoutHeight = document.getElementById("lyoutScroll").offsetHeight;
    let isMaxHeight = (lyoutHeight > 800) & (lyoutHeight < 900) ? true : false;
    let centerHeight = (lyoutHeight > 700) & (lyoutHeight < 800) ? true : false;
    let isMixHeight = (lyoutHeight > 600) & (lyoutHeight < 700) ? true : false;
    let ismaxMix = (lyoutHeight > 400) & (lyoutHeight < 600) ? true : false;
    this.lyoutHeight = lyoutHeight;
    /* 主要为了定table高度,屏幕高度值在几个区间浮动 */
    if (isMaxHeight) {
      this.tableHeight = 637;
    } else if (centerHeight) {
      this.tableHeight = 800;
    } else if (isMixHeight) {
      this.tableHeight = 500;
    } else if (ismaxMix) {
      this.tableHeight = 400;
    } else {
      this.tableHeight = 260;
    }
    this.$emit("handertableHeight", this.tableHeight);
  }
  handlePageChange(nowPage) {
    this.$emit("handlePageChange", nowPage);
  }
  mounted() {
    // this.$nextTick(() => this.clientHeight())
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
  z-index: 200;
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
      .weizhi{
         margin-right: 110px;
      }
    }
  }
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
.list-footer {
  box-sizing: border-box;
  z-index: 999;
  position: fixed;
  left: 200px;
  bottom: 0;
  padding-left: 200px;
  padding: 8px;
  padding-left: 52px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px -1px 0px 0px rgba(232, 233, 235, 1);
  border: 1px solid #e8e9eb;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>
