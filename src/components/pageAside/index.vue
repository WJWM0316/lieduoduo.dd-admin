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
            :class="{'slide-down': item.children.length, 'active': item.isShow }"
            @click.stop="topath('up', '', index, item)"
          >
            <div class="path" :class="{'pathactive': item.isShow}">
              <i
                style="margin-right: 16px;"
                class="icon iconfont icongongneng"
                :class="onePath===item.path?'iconold':'iconNew'"
              ></i>
              <span>{{item.title}}</span>
              <i class="el-icon-arrow-up pathArrow" v-show="item.children.length"></i>
            </div>

            <!--  :class="{'pathactive': page.path === onePath }" -->
            <ul v-if="item.children.length">
              <li
                v-for="(page,index1) in item.children"
                :key="index1"
                class="children"
                @click.stop="topath('down', index, index1, page)"
              >
                <div class="verify" :class="{'pathactive': page.isShow }">
                  <span>{{page.title}}</span>
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
        this.init();
      },
      immediate: true
    }
  }
})
export default class PageAside extends Vue {
  routes = null;
  isActive = 0;
  onePath = "/index"; //当前一级路由
  SecondPath = ""; //当前二级路由
  index = "";
  index1 = "";
  itemList = [
    {
      path: "/index",
      title: "公司库",
      name: "index",
      isShow: false,
      flag: "index",
      children: []
    },
    {
      path: "/user",
      title: "用户管理",
      name: "user",
      isShow: false,
      flag: "user",
      children: []
    },
    {
      path: "/positionManage",
      title: "职位管理",
      name: "positionManage",
      isShow: false,
      flag: "positionManage",
      children: []
    },
    {
      path: "/",
      title: "审核管理",
      isShow: false,
      flag: "check",
      children: [
        {
          path: "/check/companyCheck",
          title: "公司审核管理",
          name: "companyCheck",
          flag: "check"
        },
        {
          path: "/check/recruitmentOfficer",
          title: "招聘官审核",
          name: "recruitmentOfficer",
          flag: "check"
        }
      ]
    },
    {
      path: "/",
      title: "面试管理",
      isShow: false,
      flag: "interview",
      children: [
        {
          isTwo: true,
          isShow: false,
          path: "/interview/List",
          name: "List",
          title: "申请列表",
          flag: "interview"
        },
        {
          isShow: false,
          path: "/interview/invite",
          name: "invite",
          title: "邀请列表",
          flag: "interview"
        }
      ]
    },
    {
      path: "/",
      title: "简历库",
      flag: "resume",
      isShow: false,
      children: [
        {
          isShow: false,
          path: "/resumeStore/list",
          name: "list",
          title: "简历列表",
          flag: "resume"
        },
        {
          isShow: false,
          path: "/resumeStore/recommendList",
          name: "recommendList",
          title: "推荐列表",
          flag: "resume"
        }
      ]
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
  topath(type, pIndex, cIndex, item) {
    // console.log(type, pIndex, cIndex, item)
    this.onePath = item.path;
    if (type === "up") {
      this.itemList.map(field => {
        field.isShow = false;
        if (field.path === item.path) field.isShow = true;
      });
    } else {
      this.itemList[pIndex].children.map(
        (field, i) => (field.isShow = i === cIndex ? true : false)
      );
    }

    if (item.path == "/") {
      this.itemList.map((field, i) => {
        field.isShow = i === cIndex ? true : false;
      });
    } else {
      console.log(item.name,'------------')
      this.$router.push({ name: item.name });
    }
  }
  // mounted() {
  //   this.init()
  // }
  init() {
    this.AdminShow = +sessionStorage.getItem("AdminShow");
    let path = this.$route.path;
    let obj = {};
    // this.itemList.splice
    // if (/(5)/.test(this.AdminShow)) {
    //   this.$set(this.itemList, 3, {
    //     path: "/check",
    //     name: "审核管理",
    //     isShow: false,
    //     children: []
    //   });
    // }
    // if (/(0|1|2|5|6)/.test(this.AdminShow)) {
    //   this.$set(this.itemList, 5, {
    //     path: "/resumeStore",
    //     title: "简历库",
    //     name: 'resumeStore',
    //     isShow: false,
    //     children: []
    //   });
    // } else {
    //   this.$set(this.itemList, 5, {
    //     path: "/resumeStore",
    //     name: "简历库",
    //     isShow: false,
    //     children: []
    //   });
    // }
    this.itemList.map((uRoute, uIndex, uArray) => {
      if (Reflect.get(uRoute, "path") === path) {
        uRoute.isShow = true;
      } else {
        uRoute.isShow = false;
        uRoute.children.map(cRoute => {
          if (cRoute.path === path) {
            cRoute.isShow = true;
            uArray.map(
              field =>
                (field.isShow = field.flag === cRoute.flag ? true : false)
            );
          } else {
            cRoute.isShow = false;
          }
        });
      }
    });
  }
  judge(adminGrade) {
    // console.log("+adminGrade", +adminGrade);
    if (/(0|1|2)/.test(+adminGrade)) {
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
  }
}
</script>
<style scoped lang="less">
@import "./index.less";
</style>