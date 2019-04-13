<template>
  <aside id="page-aside">
    <section>
      <div>
        <div class="logo">
          <img src="../../assets/lieduoduo.png" class="avatar">
        </div>
        <ul>
          <li><router-link to="/index"><i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>公司库</router-link></li>
          <li><router-link to="/companyCheck"><i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>公司审核管理</router-link></li>
          <li><router-link to="/user"><i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>用户管理</router-link></li>
          <li><router-link to="/recruitmentOfficer"><i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>招聘官管理</router-link></li>
          <li><router-link to="/positionManage"><i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>职位管理</router-link></li>
          <li @click.stop="tabSwitch"><router-link to="/interview" active-class="interviewActive"><i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>面试管理<i class="icon iconfont iconloeft_down" style="color: #FFFFFF;" :class="{ turnUp: isCLick, turnDowm: !isCLick }"></i></router-link></li>
          <!--<li @click.stop="tabSwitch"><a style="display: inline-block;"><i style="margin-right: 16px;" :class="" class="icon iconfont icongongneng"></i>面试管理</a><i class="icon iconfont iconloeft_down" :class="{ turnUp: !isCLick, turnDowm: isCLick }"></i></li>-->
          <div class="interviewBox" :class="{expand: isCLick, collapse: !isCLick}">
            <li><router-link to="/interview" exact>申请列表</router-link></li>
            <li><router-link to="/interview/invite">邀请列表</router-link></li>
          </div>
        </ul>
      </div>
    </section>
  </aside>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { routes } from '@/router/routes'

@Component({
  name: 'page-asise',
  watched: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
//computed: {
//  ...mapGetters([
//    'userInfos'
//  ])
//},
//watch: {
//  'userInfos.roles': {
//    handler(roles) {
//      // 确保数据已经回来
//      if(roles.length) {
//        const isContentManager = roles.some(field => field <= 3) && !roles.includes(1) && !roles.includes(2)
//        const contentManagerRoutes = routes.filter(route => route.meta.useNav && ['course', 'broadcast', 'work-zone'].includes(route.name))
//        // 付费路由
//        const officialRoute = routes.filter(route => route.meta.useNav)
//        // 试用路由
//        const notOfficialRoute = routes.filter(route => route.meta.useNav && route.name !== 'books')
//        if(!isContentManager && !this.userInfos.company.isTrial) {
//          this.routes = officialRoute
//        } else if(!isContentManager && this.userInfos.company.isTrial) {
//          this.routes = notOfficialRoute
//        } else {
//          this.routes = contentManagerRoutes
//        }
//      }
//    },
//    immediate: true
//  }
//}
})
export default class PageAside extends Vue {
  routes = null
  isCLick = true
  handleNodeClick(data) {
    console.log(data)
  }
  tabSwitch () {
    this.isCLick = !this.isCLick
  }
}
</script>
<style lang="less" scoped>
#page-aside {
  width: 200px;
  height: 100vh;
  background: #3E294D;
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
      width:124px;
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
    transition: all ease .4s;
    font-size: 14px;
    text-align: left;
    &:hover {
      background:rgba(255,226,102,0.12);
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
      color: #EDEDED;
      display: block;
      /*padding-left: 50px;*/
      .iconfont{
        color: #513E5F;
      }
    }
  }
  .router-link-active,
  .interviewActive,
  .filter-tree {
    font-weight: 500;
    background:rgba(255,226,102,0.12);
    position: relative;
    color: #fff;
    .iconfont{
      color: #FFFFFF;
    }
    &:before {
      background: #FFE266;
      content: '';
      display: block;
      left: 0;
      position: absolute;
      height: 100%;
      width:4px;
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
      border-color: transparent transparent transparent #FFE266;
      display: block;
      content: '';
    }
  }
  .interviewActive{
    background: none;
  }
  .interviewActive:before{
    display: none;
  }
  .interviewActive:after{
    display: none;
  }
  .interviewBox{
    height: 0px;
    transition: 0.5s ease;
    overflow: hidden;
    li {
      a {
        padding-left: 78px;
      }
    }
  }
  .expand{
    height: 120px;
  }
  .collapse{
    height: 0px;
  }
  .turnUp::before{
    display: inline-block;
    transition: 0.5s ease;
    transform: rotateZ(-180deg);
  }
  .turnDowm::before{
    display: inline-block;
    transition: 0.5s ease;
    transform: rotateZ(0deg);
  }
}
</style>