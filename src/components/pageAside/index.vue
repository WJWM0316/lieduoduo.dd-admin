<template>
  <aside id="page-aside">
    <section class="section">
      <div class="AsideContent">
        <div class="logo">
          <img src="../../assets/lieduoduo.png" class="avatar">
        </div>
        <ul class="itemList">
          <li v-for="(item, index) in itemList" :key="index" class="item">
            <router-link :to="{path:item.path}" v-if="item.path">
              <div class="path">
                <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>
                <span>{{item.name}}</span>
              </div>
              <div class="verify" v-if="item.children.length>0">
                <li v-for="(page,index1) in item.children" :key="index1" class="children">
                  <router-link :to="{path:page.path}">{{page.name}}</router-link>
                </li>
              </div>
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
    itemList: (newVal, oldVal) => {
      console.log("newVal", newVal);
    }
  }
})
export default class PageAside extends Vue {
  routes = null;
  isActive = 0;
  itemList = [
    {
      path: "/index",
      name: "公司库",
      isShow: true,
      children: []
    },
    {
      path: "/user",
      name: "用户管理",
      isShow: true,
      children: []
    },
    {
      path: "/positionManage",
      name: "职位管理",
      isShow: true,
      children: []
    },
    {
      path: "/check",
      name: "审核管理",
      isShow: true,
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
      isShow: true,
      children: [
        {
          isShow: false,
          path: "/interview",
          name: "申请列表"
        },
        {
          isShow: false,
          path: "/interview/invite",
          name: "邀请列表"
        }
      ]
    }
    // {
    //   path: "/resumeStore",
    //   name: "简历库",
    //   isShow: true,
    //   children: []
    // }
  ];
  handleNodeClick(data) {}
  tabSwitch() {
    this.isCLick = !this.isCLick;
  }
  click(e) {
    this.isActive = e;
  }
  mounted() {
    this.AdminShow = sessionStorage.getItem("AdminShow");
    console.log("this.AdminShow", this.AdminShow);
    // this.judge(this.AdminShow);
  }
  judge(adminGrade) {
    if (/(0|1|2)/.test(+adminGrade)) {
      this.$set(this.itemList, 5, {
        path: "/resumeStore",
        name: "简历库",
        isShow: true,
        children: []
      });
    } else {
      console.log("不显示简历库");
      this.$set(this.itemList, 5, {
        path: "/resumeStore",
        name: "简历库",
        isShow: false,
        children: []
      });
    }
  }
}
</script>
<style scoped lang="less">
@import "./index.less";
</style>