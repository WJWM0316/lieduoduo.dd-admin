<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  name: "App",
  watch: {
    isAjax: {
      handler(res) {
        this.showAside(res);
      }
    }
  }
})
export default class App extends Vue {
  loadingInstance = null;
  showResetPsw = false;
  isAjax = false;
  showAside(res) {
    this.isAjax = res;
  }
  changeStatus(e) {
    console.log(e);
  }
  mounted() {
    // if(sessionStorage.getItem(''))
  }
}
</script>

<style lang="less">
@import "./App.less";

#app {
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
.el-table {
  .cell {
    text-align: left;
  }
}
</style>
