<!--创建公司-->
<template>
  <div class="createCompany">
     <div class="header">
        <el-steps :space="200" :active="active" finish-status="success">
          <el-step title="已完成"></el-step>
          <el-step title="进行中"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
        <el-button @click.stop="next">保存，下一步</el-button>
     </div>
      
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
export default class createCompany extends Vue{
  active = 0
  next() {
    if (this.active++ > 2) this.active = 0;
  }
}
</script>

<style lang="less" scoped="scoped">
.createCompany{
  margin-left: 200px;
  padding: 22px;
  .header{
    padding: 22px;
    box-sizing: border-box;
    border-radius: 4px;
    height: 100px;
    border: 1px solid #BCBCBC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-steps{
      text-align: left;
      width: 500px;
    }
  }
}
</style>