<template>
  <aside id="page-aside">
    <section>
      <div>
        <div class="logo">
          <img src="../../assets/lieduoduo.png" class="avatar">
        </div>
        <ul>
          <li v-for="(item, index) in itemList" :key="index">
            <router-link :to="{path:item.path}" v-if="item.path">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>
              {{item.name}}
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/index">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>公司库
            </router-link>
          </li>-->
          <!-- <li>
            <router-link to="/user">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>用户管理
            </router-link>
          </li>-->
          <!-- <li>
            <router-link to="/positionManage">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>职位管理
            </router-link>
          </li>-->
          <!-- 审核管理列 -->
          <!-- <li>
            <router-link to="/check" active-class="interviewActive">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>审核管理
            </router-link>
          </li>-->
          <!-- <div class="verify">
            <li>
              <router-link to="/check/companyCheck">公司审核管理</router-link>
            </li>
            <li>
              <router-link to="/check/recruitmentOfficer">招聘官审核</router-link>
            </li>
          </div>-->
          <!-- 面试管理列 -->
          <!-- <li> 
            <router-link to="/interview" active-class="interviewActive">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>面试管理
            </router-link>
          </li>-->
          <!-- <div class="interviewBox" :class="{expand: isCLick, collapse: !isCLick}">
            <li>
              <router-link to="/interview" exact>申请列表</router-link>
            </li>
            <li>
              <router-link to="/interview/invite">邀请列表</router-link>
            </li>
          </div>
          <!-- 简历库-->
          <!-- <li> -->
          <!-- <router-link to="/resumeStore" active-class="interviewActive">
              <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>简历库
          </router-link>-->
          <!-- </li> -->
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
  itemList = [
    {
      path: "/index",
      name: "公司库",
      children: []
    },
    {
      path: "/user",
      name: "用户管理",
      children: []
    },
    {
      path: "/positionManage",
      name: "职位管理",
      children: []
    },
    {
      path: "/check",
      name: "审核管理",
      children: [
        {
          path: "/check/companyCheck",
          name: "公司审核管理"
        },
        {
          path: "/check/recruitmentOfficer",
          name: "招聘官审核"
        }
      ]
    },
    {
      path: "/interview",
      name: "面试管理",
      children: [
        {
          path: "/interview",
          name: "审核列表"
        },
        {
          path: "/interview/invite",
          name: "邀请列表"
        }
      ]
    },
    {
      path: "/resumeStore",
      name: "简历库",
      children: []
    }
  ];
  handleNodeClick(data) {}
  tabSwitch() {
    this.isCLick = !this.isCLick;
  }
  mounted() {
    console.log(this.itemList)
  }
}
</script>
<style scoped lang="less">
@import "./index.less";
</style>