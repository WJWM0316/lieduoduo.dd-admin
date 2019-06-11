<template>
  <div id="app">
    <page-aside/>

    <page-header/>
    <!--<router-view/>-->
    <router-view></router-view>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <! 这里是会被缓存的视图组件！ -->
      <!-- </router-view>
    </keep-alive> -->
    <!-- <router-view v-if="!$route.meta.keepAlive"> -->
      <!-- 这里是不被缓存的视图组件！ -->
    <!-- </router-view> -->
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import PageAside from "COMPONENTS/pageAside/index.vue";
import PageHeader from "COMPONENTS/pageHeader/index.vue";
//import { Loading } from 'element-ui'
@Component({
  name: "App",
  components: {
    PageAside,
    PageHeader
  }
})
export default class App extends Vue {
  loadingInstance = null;
  showResetPsw = false;

  mounted() {
    //  this.loadingInstance = Loading.service({})
    //  const code  = Cookies.get('code') ? Cookies.get('code') : process.env.VUE_APP__TEST_COMPANY
    //  this.loginApi({code, 'Authorization-Sso': Cookies.get('Authorization-Sso')})
    //      .then(() => {
    //        this.loadingInstance.close()
    //      })
  }
}
</script>

<style lang="less">
@import "./App.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.messageBox {
  p {
    color: #000;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-table{
  .cell{
    text-align: left;
  }
}
</style>
