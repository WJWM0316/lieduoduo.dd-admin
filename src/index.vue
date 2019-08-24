<template>
<router-view/>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { routes } from "@/router/routes";
import { admin_menu } from "API/commont";

@Component({
  name: "page-asise",
  watch: {
    $route: {
      handler(route) {
        this.getMenu();
        this.init();
        // this.onePath = route.path;
        let arr = route.path.split("/");
        this.oneFlag = arr[1]
      },
      immediate: true
    }
  },
  props: {}
})
export default class PageAside extends Vue {
}
</script>
<style scoped lang="less">
</style>