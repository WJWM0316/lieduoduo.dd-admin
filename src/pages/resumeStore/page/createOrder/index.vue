<!--  -->
<template>
  <div class="OrderDetail">
    <tab-block :itemList="itemList" :isCreate="isCreate">
      <div class="createOrder" slot="ShowContent">
        <span>新建订单</span>
      </div>
    </tab-block>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import TabBlock from "../../components/TabBlock/index.vue";
@Component({
  name: "OrderDetail",
  components: {
    TabBlock
  }
})
export default class OrderDetail extends Vue {
  isCreate = true;
  itemList = [
    {
      name: "推荐单详情",
      path: "/resumeStore/recommendList/createOrder"
    },
    {
      name: "新建推荐单",
      path: "/resumeStore/recommendList/OrderDetail"
    }
  ];
  isActive = 0;
  ClickTab(index) {
    this.isActive = index;
    this.$router.push({
      // path:
    });
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>