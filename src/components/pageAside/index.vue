<template>
  <aside id="page-aside">
    <section class="section">
      <div class="AsideContent">
        <div class="logo">
          <img src="../../assets/lieduoduo.png" class="avatar" />
        </div>
        <ul class="itemList">
          <li
            v-for="(item, index) in itemList"
            :key="index"
            class="item"
            :class="{'slide-down': item.slideDown, 'active': item.isShow }"
            @click.stop="topath('up', '', index, item)"
          >
            <div class="path" :class="{'pathactive': item.isShow}">
              <i
                style="margin-right: 16px;"
                class="icon iconfont icongongneng"
                :class="oneFlag===item.flag?'iconold':'iconNew'"
              ></i>
              <span>{{item.meta.title}}</span>
              <i class="el-icon-arrow-up pathArrow" v-show="item.children && item.children.length"></i>
            </div>

            <ul v-if="item.children && item.children.length > 1">
              <li
                v-for="(page,index1) in item.children"
                :key="index1"
                class="children"
                @click.stop="topath('down', index, index1, page)"
              >
                <div class="verify" :class="{'pathactive': page.isShow }">
                  <span>{{page.meta.title}}</span>
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
import { admin_menu } from "API/commont";
import router from '@/router'
@Component({
  name: "page-asise",
  watch: {
    $route: {
      handler(route) {
        // this.init()
      },
      immediate: true
    }
  },
  props: {}
})
export default class PageAside extends Vue {
  routes = null;
  isActive = 0;
  onePath = "/index"; //当前一级路由
  oneFlag = "index"; //默认选中第一个
  SecondPath = ""; //当前二级路由
  index = "";
  index1 = "";
  AdminShow = 0;
  itemList = [];
  tabSwitch() {
    this.isCLick = !this.isCLick;
  }
  created() {
		admin_menu().then(res => {
			console.log(res, 222)
		})
    this.AdminShow = sessionStorage.getItem("AdminShow");
    this.init()
  }
  topath(type, pIndex, cIndex, item) {
    if (type === "up") {
      this.itemList.map((field, index) => {
        if (field.name === item.name) {
          field.isShow = true
          if (item.children && item.children.length > 1) {
            item.slideDown = true
            item.children.map((n, i) => item.children[i].isShow = i === 0 ? true : false)
          }
        } else {
          field.isShow = false;
        }
        this.$set(this.itemList, index, field)
      });
      this.$router.push({ name: item.children[0].name });
    } else {
      this.topath('up', pIndex, cIndex, this.itemList[pIndex])
      this.itemList[pIndex].children.map(
        (field, i) => {
          field.isShow = i === cIndex ? true : false
          this.$set(this.itemList[pIndex].children, i, field)
        }
      );
      this.$router.push({ name: item.name });
    }

  }
  init() {
    admin_menu().then(res => {
      let pathName = this.$route.name,
          itemList = res.data.data
       this.itemList = itemList
      itemList.map((uRoute, uIndex) => {
        if (this.$route.path.indexOf(uRoute.name) !== -1) {
          uRoute.isShow = true
          if (uRoute.children && uRoute.children.length > 1) {
            uRoute.slideDown = true
            uRoute.children.map(cRoute => {
              if (cRoute.name === pathName) {
                cRoute.isShow = true
              } else {
                cRoute.isShow = false;
              }
            })
          }
        }
      })
    })
  }
}
</script>
<style scoped lang="less">
@import "./index.less";
</style>
