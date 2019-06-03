<template>
  <aside id="page-aside">
    <section class="section">
      <div class="AsideContent">
        <div class="logo">
          <img src="../../assets/lieduoduo.png" class="avatar">
        </div>
        <ul class="itemList">
          <li
            v-for="(item, index) in itemList"
            :key="index"
            class="item"
            @click.stop="topath(index,index1,item.path)"
          >
            <div
              class="path"
              :class="{'pathactive': onePath === item.path }"
              v-if="item.isShow===true"
            >
              <i
                style="margin-right: 16px;"
                class="icon iconfont icongongneng"
                :class="onePath===item.path?'iconold':'iconNew'"
              ></i>
              <span>{{item.name}}</span>
              <i class="el-icon-arrow-up pathArrow" v-if="item.children.isShow==true"></i>
            </div>
            <!--  :class="{'pathactive': page.path === onePath }" -->
            <ul v-if="item.children.isShow===true">
              <li
                v-for="(page,index1) in item.children.list"
                :key="index1"
                class="children"
                @click.stop="topath(index,index1,page.path)"
              >
                <div class="verify" :class="{'pathactive': page.path === onePath }">
                  <span>{{page.name}}</span>
                </div>
              </li>
            </ul>
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
  watch: {
    $route: {
      handler(route) {
        // if (route.path !== "") {
        //   this.onePath = route.path;
        // }
        this.AdminShow = +sessionStorage.getItem("AdminShow");
        if (/(5)/.test(this.AdminShow)) {
          // console.log('隐藏审核管理')
          this.$set(this.itemList, 3, {
            path: "/check",
            name: "审核管理",
            isShow: false,
            children: []
          });
        }
        if (/(0|1|2|5|6)/.test(this.AdminShow)) {
          // console.log("显示简历库");
          this.$set(this.itemList, 5, {
            path: "/resumeStore",
            name: "简历库",
            isShow: true,
            children: []
          });
        } else {
          // console.log("不显示简历库");
          this.$set(this.itemList, 5, {
            path: "/resumeStore",
            name: "简历库",
            isShow: false,
            children: []
          });
        }
      },
      immediate: true
    }
  }
})
export default class PageAside extends Vue {
  routes = null;
  isActive = 0;
  onePath = ""; //当前一级路由
  SecondPath = ""; //当前二级路由
  index = "";
  index1 = "";
  itemList = [
    {
      path: "/index",
      name: "公司库",
      isShow: true,
      children: {
        isShow:false,
        list:[]
      }
    },
    {
      path: "/user",
      name: "用户管理",
      isShow: true,
      children: {
        isShow:false,
        list:[]
      }
    },
    {
      path: "/positionManage",
      name: "职位管理",
      isShow: true,
      children: {
        isShow:false,
        list:[]
      }
    },
    {
      path: "/",
      name: "审核管理",
      isShow: true,
      children: {
        isShow: false,
        list: [
          {
            path: "/check/companyCheck",
            name: "公司审核管理"
          },
          {
            path: "/check/recruitmentOfficer",
            name: "招聘官审核"
          }
        ]
      }
    },
    {
      path: "/",
      name: "面试管理",
      isShow: true,
      children: {
        isShow: false,
        list: [
          {
            isTwo: true,
            isShow: false,
            path: "/interview/List",
            name: "申请列表"
          },
          {
            isShow: false,
            path: "/interview/invite",
            name: "邀请列表"
          }
        ]
      }
    },
    {
      path: "/resumeStore",
      name: "简历库",
      isShow: true,
      children: {
         isShow: false,
         list:[]
      }
    }
  ];
  tabSwitch() {
    this.isCLick = !this.isCLick;
  }
  clickChild(index, index1, path) {
    // console.log("我点击了自己");
    // console.log(this.itemList[index].children);
    this.itemList[index].children.isShow = true;
    this.onePath = this.itemList[index].children.list[index1].path;
    // console.log(this.onePath)
    this.$router.replace({
      path: this.onePath
    });
  }
  // 清空之前的操作
  clearOperating() {
    this.onePath = "";
    for (let i = 0; i < this.itemList.length; i++) {
      this.$set(this.itemList[i].children, "isShow", false);
    }
  }
  topath(index, index1, path) {
    console.log(index, index1, path);
    this.onePath = index;
    this.clearOperating();
    if (path == "/") {
      // console.log("操作二级目录母菜单");
      this.itemList[index].children.isShow = true;
    } else if (index1 !== "") {
      // console.log("操作中间层");
      this.onePath = path;
      this.itemList[index].children.isShow = true;
      this.$router.push({
        path: this.onePath
      });
    } else {
      for (let i = 0; i < this.itemList.length; i++) {
        console.log(this.itemList[i].children.isShow);
      }
      this.onePath = path;
      this.$router.push({
        path
      });
    }
    // if (path === "/" || index1 !== "") {
    //   console.log("存在二级目录");
    //   this.onePath = "";
    //   this.itemList[index].children.isShow = true;
    //   if (index1 !== "") {
    //     console.log("操作二级目录");
    //     // this.onePath=path;
    //     // // this.onePath = "";
    //     // console.log("进入子集");
    //     // // 分两种情况， 一种是子集
    //     // for (let i = 0; i < this.itemList.length; i++) {
    //     //   this.itemList[i].children.isShow = false;
    //     // }
    //     // this.itemList[index].children.isShow = true;
    //     // // console.log(this.onePath,'this.onePath')
    //     // this.$router.push({
    //     //   path: this.onePath
    //     // });

    //     // // this.onePath = this.itemList[index].children.list[index1].path;
    //     // this.$router.push({
    //     //   path:this.onePath
    //     // });
    //   }
    // } else {
    // }
  }
  mounted() {
    console.log(this.isActive);
    // console.log(this.$store);
    // this.AdminShow = sessionStorage.getItem("AdminShow");
    // console.log("this.AdminShow", this.AdminShow);
  }
  judge(adminGrade) {
    console.log("+adminGrade", +adminGrade);
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
  }
}
</script>
<style scoped lang="less">
@import "./index.less";
</style>