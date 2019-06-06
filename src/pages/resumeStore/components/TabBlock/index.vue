<!--  -->
<template>
  <div class="TabBlock">
    <div class="TabView">
      <div class="tabList">
        <div
          class="tabItem"
          v-for="(item,index) in itemList"
          :key="index"
          @click.stop="ClickTab(index,path)"
          :class="isActive===index?'active':''"
        >
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="ShowContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "TabBlock",
  props: {
    /* 是否创建订单，如果是true，说明是查看详情，false表明还未创建 */
    isCreate: {
      type: Boolean
    },
    // 顶部tab列表
    itemList: {
      type: Array
    }
  }
})
export default class TabBlock extends Vue {
  isActive = 0;
  mounted() {
    // console.log(this.$route.query.isCreate,'route')
    let result = this.itemList.every(item => item.name.indexOf("详情"));
    console.log(this.Index(),'index')
    if (this.$route.query.isCreate&&result) {
      this.itemList.splice(1,this.Index())
    }
  }
  Index(){
    let indexOf=0;
    for(let i =0;i<this.itemList.length;i++){
      if(this.itemList[i].name.indexOf("详情")){
        indexOf=i;
      }
    }
    console.log('indexOf',indexOf)
    return indexOf
  }
  ClickTab(index, path) {
    console.log(path, "path");
    this.isActive = index;
    // this.$router.push({
    // path:
    // });
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>