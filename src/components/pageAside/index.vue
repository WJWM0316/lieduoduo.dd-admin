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
              <div class="path" v-if="item.isShow==true">
                <i style="margin-right: 16px;" class="icon iconfont icongongneng"></i>
                <span>{{item.name}}</span>
              </div>
              <div class="verify" v-if="item.children!=''">
                <li v-for="(page,index1) in item.children" :key="index1">
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
          path: "/interview",
          name: "申请列表"
        },
        {
          path: "/interview/invite",
          name: "邀请列表"
        }
      ]
    },
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
  created() {
    this.AdminShow = sessionStorage.getItem("AdminShow");
    console.log("this.AdminShow", this.AdminShow);
    // this.judge(this.AdminShow);
  }
  judge(adminGrade) {
    if (/(0|1|2)/.test(+adminGrade)) {
      console.log("显示简历库");
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
    console.log(this.itemList);
  }
}
</script>
<style scoped lang="less">
@import "./index.less";
</style>