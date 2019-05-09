<template>
  <aside id="page-aside">
    <section>
      <div>
        <div class="logo">
          <img src="../../assets/lieduoduo.png" class="avatar">
        </div>
        <ul>
          <li>
            <router-link to="/index">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>公司库
            </router-link>
          </li>
          <li>
            <router-link to="/user">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>用户管理
            </router-link>
          </li>
          <li>
            <router-link to="/positionManage">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>职位管理
            </router-link>
          </li>
          <!-- 审核管理列 -->
          <li>
            <router-link to="/check" active-class="interviewActive">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>审核管理
            </router-link>
          </li>
          <div class="verify">
            <li>
              <router-link to="/check/companyCheck">公司审核管理</router-link>
            </li>
            <li>
              <router-link to="/check/recruitmentOfficer">招聘官审核</router-link>
            </li>
          </div>
          <!-- 面试管理列 -->
          <li>
            <router-link to="/interview" active-class="interviewActive">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>面试管理
            </router-link>
          </li>
          <div class="interviewBox" :class="{expand: isCLick, collapse: !isCLick}">
            <li>
              <router-link to="/interview" exact>申请列表</router-link>
            </li>
            <li>
              <router-link to="/interview/invite">邀请列表</router-link>
            </li>
          </div>
          <!-- 简历库 -->
          <li>
            <router-link to="/resumeStore" active-class="interviewActive">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>简历库
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </aside>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { routes } from "@/router/routes";

@Component({
  name: "page-asise",
  watched: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
})
export default class PageAside extends Vue {
  routes = null;
  isCLick = true;
  handleNodeClick(data) {}
  tabSwitch() {
    this.isCLick = !this.isCLick;
  }
}
</script>
<style lang="less" scoped>
#page-aside {
  width: 200px;
  height: 100vh;
  background: #3e294d;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  > section {
    height: 100%;
    overflow: hidden;
    width: 200px;
    > div {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      width: 217px;
    }
  }
  .logo {
    position: relative;
    margin: 42px auto 50px;
    .avatar {
      position: relative;
      z-index: 1;
      width: 124px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 150px;
  }
  li {
    font-weight: 300;
    color: #fff;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    transition: all ease 0.4s;
    font-size: 14px;
    text-align: left;
    &:hover {
      background: rgba(255, 226, 102, 0.12);
    }
    .zike-icon {
      margin-right: 10px;
    }
    .iconfont {
      margin-left: 5px;
    }
    .iconfont::before {
      transition: 0.5s ease;
    }
    a {
      padding-left: 46px;
      box-sizing: border-box;
      text-decoration: none;
      color: #ededed;
      display: block;
      /*padding-left: 50px;*/
      .iconfont {
        color: #513e5f;
      }
    }
  }
  .router-link-active,
  .interviewActive,
  .filter-tree {
    font-weight: 500;
    background: rgba(255, 226, 102, 0.12);
    position: relative;
    color: #fff;
    .iconfont {
      color: #ffffff;
    }
    &:before {
      background: #ffe266;
      content: "";
      display: block;
      left: 0;
      position: absolute;
      height: 100%;
      width: 4px;
    }
    &:after {
      width: 0;
      height: 0;
      border-color: red;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent transparent #ffe266;
      display: block;
      content: "";
    }
  }
  .interviewActive {
    background: none;
  }
  .interviewActive:before {
    display: none;
  }
  .interviewActive:after {
    display: none;
  }
  .interviewBox {
    height: 0px;
    transition: 0.5s ease;
    overflow: hidden;
    li {
      a {
        padding-left: 78px;
      }
    }
  }
  .verifyTab {
    color: #ededed;
    padding-left: 46px;
  }
  .verify {
    width: 100%;
    display: inline-block;
    li {
      a {
        padding-left: 78px;
      }
    }
  }
  .expand {
    height: 120px;
  }
  .collapse {
    height: 0px;
  }
  .turnUp::before {
    display: inline-block;
    transition: 0.5s ease;
    transform: rotateZ(-180deg);
  }
  .turnDowm::before {
    display: inline-block;
    transition: 0.5s ease;
    transform: rotateZ(0deg);
  }
}
</style>