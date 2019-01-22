<template>
<div id="index">
	<el-container class="container" style="height: 500px; border: 1px solid #eee">
  	 <el-main width="200px" style="background-color:red"> 公司管理</el-main>
  </el-container>
</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  components: {}
})
export default class indexPage extends Vue {}
</script>

<style lang="less" scoped="scoped">
  #index{
    margin-left: 200px;
    .container{
      min-width: 1000px;
      margin: 22px;
    }
  }
</style>