<!--  -->
<template>
  <div class="OrderDetail">
    <div class="TabView">
      <div class="tabList">
        <div
          class="tabItem"
          v-for="(item,index) in itemList"
          :key="index"
          @click.stop="ClickTab(index,item.path)"
          :class="isCreate===index?'active':''"
        >
          <span>{{item}}</span>
        </div>
      </div>
      <div class="createOrder">
        <p class="title">新建微简历</p>
        <div class="CreateContent">
          <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
            <el-form-item label-width="80px" required prop="mobile" label="手机号码" class="formItem">
              <el-input disabled v-model.number="form.mobile"></el-input>
              <span class="editMoile" @click.stop="editMoile">修改手机号码</span>
            </el-form-item>
            <el-form-item label-width="80px" required label="姓名" class="formItem" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender" class="formItem" label-width="80px" required>
              <el-radio-group v-model="form.gender">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生年月" label-width="80px" prop="birth" class="formItem" required>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.birth"
                value-format="yyyy-MM-dd"
                style="width: 142px;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="startWorkYear" label="参加工作时间" class="formItem" required>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startWorkYear"
                value-format="yyyy-MM-dd"
                style="width: 180px;margin-left:56px;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item required label="最近任职公司" class="formItem">
              <el-input placeholder="最近任职公司" v-model="form.lastCompany" style="margin-left:56px;"></el-input>
            </el-form-item>
            <el-form-item required label="最近工作职位" class="formItem">
              <el-input placeholder="最近工作职位" v-model="form.lastPosition" style="margin-left:56px;"></el-input>
            </el-form-item>
            <el-form-item label="期望城市" required class="formItem" prop="expectCityNum">
              <el-cascader
                ref="cityChoice"
                class="formItem"
                style="margin-left:83px;"
                placeholder="期望城市"
                :options="getCityList"
                filterable
                :props="{
                value:'areaId',
                label:'title',
                children:'children'
                }"
                @change="type"
              ></el-cascader>
            </el-form-item>
            <el-form-item
              class="formItem"
              label-width="80px"
              required
              label="期待职位"
              prop="expectPositionId"
            >
              <el-cascader
                ref="cascader"
                class="formItem"
                placeholder="期待职位类别"
                :options="options"
                filterable
                :props="{
                value:'labelId',
                label:'name',
                children:'children'
                }"
                @change="choicePostion"
              ></el-cascader>
            </el-form-item>
            <el-form-item required label="期望薪资" class="formItem">
              <el-row style="margin-left:85px;">
                <el-col :span="6">
                  <el-select v-model="form.expectSalaryCeil" placeholder="最低薪资" @change="choiceMin">
                    <el-option v-for="item in minSalary" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">-</el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-select
                      v-model="form.expectSalaryFloor"
                      placeholder="最高薪资"
                      @change="choiceMax"
                    >
                      <el-option v-for="item in maxSalary" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              label-width="80px"
              required
              label="期望领域"
              class="formItem"
              prop="expectFieldIds"
            >
              <el-select v-model="form.expectFieldIds" placeholder="请选择">
                <el-option
                  v-for="item in fieldList"
                  :key="item.labelId"
                  :label="item.name"
                  :value="item.labelId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="附件简历(选填)" class="formItem" prop="name">
              <el-upload
                class="upload-demo"
                style="margin-left:56px;"
                drag
                action="https://admin-api.lieduoduo.ziwork.com/attaches"
                multiple
                :data="uploadParam"
                :auto-upload="false"
                :before-upload="beforeUpload"
                :on-success="uploadImg"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">支持上传png,jpg,pdf,doc,docx文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item class="formItem">
              <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog
      :title="PopTitle"
      :close-on-click-modal="closeModel"
      :show-close="showClose"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-input v-model="checkMobileVal" placeholder="请输入手机号码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$router.go(-1)" class="inquire" v-if="!$route.query.isEdit">保存</el-button>
        <el-button @click="checkMobile(checkMobileVal)" class="inquire" v-else>下一步</el-button>
      </span>
    </el-dialog>
    <!-- 推荐单 -->
    <!-- <div class="PopForm" @click.stop="isShowForm=false" v-if="isShowForm">
      <div class="allRusule">
        <p class="title">提交结果</p>
        <div class="resumeNums">
          <span v-if="resultmsg.succeedNum">成功:{{resultmsg.succeedNum}}份</span>
          <span v-if="resultmsg.failNum">失败:{{resultmsg.failNum}}份</span>
        </div>
        <div class="resultList">
          <el-table height="400" max-height="400" :data="tableData">
            <el-table-column prop="vkey" label="简历编号"></el-table-column>
            <el-table-column prop="name" label="求职者"></el-table-column>
            <el-table-column prop="isSuccess" label="提交结果">
              <template slot-scope="scope">
                <i class="el-icon-circle-close" v-if="scope.row.isSuccess===0"></i>
                <i class="el-icon-circle-check" style="color:red;" v-if="scope.row.isSuccess===1"></i>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="原因说明">
              <template slot-scope="scope">
                <p style="color:#000;font-size:14px;" v-if="scope.row.isSuccess===1">推荐成功</p>
                <p
                  style="color:#000;font-size:14px;"
                  v-if="scope.row.isSuccess===0"
                >{{scope.row.reason}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="okBtn" style="margin-top:20px;" v-if="sumbitRusult">
          <el-button @click.stop="goPath">好的</el-button>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import {
  createOrder,
  searchId,
  createResume,
  haveMobile
} from "API/resumeStore";
import { getLabelPositionListApi } from "API/position";
import { getCityApi } from "API/company";
import { fieldApi, uploadApi } from "API/commont";
@Component({
  name: "OrderDetail"
})
export default class OrderDetail extends Vue {
  checkMobileVal = ""; /* 校验手机号码 */
  uploadApi = "";
  PopTitle = "验证手机号码";
  isFocus = false;
  dialogVisible = false;
  uploadParam = {
    Authorization: "",
    attach_type: "doc",
    private: 0,
    setwater: 0,
    img1:1,
  };
  closeModel = false;
  autoUpload = false;
  showClose = false;
  isCreate = 0;
  fieldList = []; /* 行业领域 */
  isShowForm = false;
  minSalary = []; /* 最小薪资 */
  maxSalary = []; /* 最大薪资 */
  isShowmsg = false;
  getCityList = []; //省市列表
  form = {
    mobile: "" /* 手机号 */,
    avatar: "" /* 头像附件id */,
    gender: "" /* 性别，未知0，男1，女2 */,
    name: "" /* 姓名 */,
    birth: "" /* 出生年月(时间戳) */,
    startWorkYear: "" /* 参加工作年份(时间戳) */,
    lastCompany: "" /* 最近任职公司 */,
    lastPosition: "" /* 最近任职公司*/,
    expectCityNum: "" /* 期望城市，城市编号 */,
    expectPositionId: "" /* 期望职位id*/,
    expectSalaryCeil: "" /* 期望月薪上限，单位k */,
    expectSalaryFloor: "" /* 期望月薪下限，单位k*/,
    expectFieldIds: "" /* 期望领域ids，逗号分隔 */,
    resumeAttachId: "" /* 简历附件id */
  };
  rules = {
    mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
    gender: [{ required: true, message: "请选择性别", trigger: "change" }],
    birth: [
      { type: "date", required: true, message: "请选择日期", trigger: "change" }
    ],
    startWorkYear: [
      { required: true, message: "请输入参加工作年限", trigger: "blur" }
    ],
    lastCompany: [
      { required: true, message: "请选择最近加入的公司", trigger: "change" }
    ],
    lastPosition: [
      {
        type: "date",
        required: true,
        message: "请选择最近任职的职位",
        trigger: "change"
      }
    ],
    expectCityNum: [
      { required: true, message: "请选择你期望的城市", trigger: "blur" }
    ],
    expectPositionId: [
      { required: true, message: "请选择期望的职位", trigger: "change" }
    ],
    expectSalaryCeil: [
      {
        type: "date",
        required: true,
        message: "请选择期望的最低月薪",
        trigger: "change"
      }
    ],
    expectSalaryFloor: [
      { required: true, message: "请选择期望的最高月薪", trigger: "blur" }
    ],
    expectFieldIds: [
      { required: true, message: "请选择你期望的领域", trigger: "change" }
    ]
  };
  options = [];
  sumbitRusult = false;
  itemList = ["新建微简历"];
  goPath(e) {
    this.$router.push({
      path: "/resumeStore/recommendList/OrderDetail",
      query: {
        id: this.resultmsg.id
      }
    });
  }
  /* 修改手机号码 */
  editMoile() {
    this.dialogVisible = true;
    this.PopTitle = "修改手机号码";
    this.showClose = true;
    this.closeModel = true;
  }
  /* 清除列表选项 */
  resetForm(name) {
    this.$refs[name].resetFields();
    this.form.lastCompany = "";
    this.form.lastPosition = "";
    this.form.expectSalaryCeil = "";
    this.form.expectSalaryFloor = "";
    this.form.expectCityNum = "";
    // this.$nextTick(() => {
    let obj = {};
    this.$nextTick(() => {
      let obj = {};
      obj.stopPropagation = () => {};
      this.$refs.cascader.clearValue(obj);
      this.$refs.cityChoice.clearValue(obj);
      // this.$refs.custom.clearValue();
    });
    // });
  }
  /* 文件上传成功 */
  uploadImg(e) {
    console.log(e);
  }
  /* 选择文件 */
  beforeUpload(e) {
    console.log(e, "选择文件");
  }
  /* 验证手机号码 */
  checkMobile(e) {
    if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(e)) {
      this.$message({
        message: "格式有误，请重新输入有效11位手机号",
        type: "warning"
      });
    } else {
      haveMobile(e).then(res => {
        console.log(res);
        if (!res.data.data.userExist) {
          this.$message({
            message: "该用户不存在",
            type: "warning"
          });
        } else if (res.data.data.userExist && res.data.data.haveCard) {
          this.$message({
            message: "该手机号已创建简历，不能再次创建",
            type: "warning"
          });
        } else {
          this.form.mobile = e;
          this.dialogVisible = false;
        }
        // if(res)
      });
    }
  }
  choiceMax(e) {
    console.log(e);
  }
  submitForm(form) {
    console.log(this.form);
  }
  choicePostion(e) {
    this.form.expectPositionId = e[e.length - 1];
  }
  /* 选择最小薪资 */
  choiceMin(val) {
    let length = 2 * +val;
    let firstVal = +val + 1;
    this.maxSalary = [];
    for (let i = +val; i < length; i++) {
      this.maxSalary.push(parseInt(+i + 1));
    }
  }
  type(e) {
    this.form.expectCityNum = e[e.length - 1];
  }
  ClickTab(index) {
    let result = this.itemList[index].name.indexOf("详情") != -1;
    result ? (this.isCreate = 0) : (this.isCreate = 1);
  }
  CityData() {
    getCityApi().then(res => {
      this.getCityList = res.data.data;
      this.getCityList.forEach(item => {
        item.children.forEach(item1 => {
          let result = JSON.stringify(item1.children);
          if (result === "[]") delete item1.children;
        });
      });
    });
  }
  // 期待职位
  ManageList() {
    getLabelPositionListApi().then(res => {
      this.options = res.data.data;
      this.options.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            let result = JSON.stringify(item2.children);
            if (result === "[]") delete item2.children;
          });
        });
      });
    });
  }
  field() {
    fieldApi().then(res => {
      this.fieldList = res.data.data;
    });
  }
  created() {
    // if (!Number(this.$route.query.isEdit)) this.dialogVisible = true;
    this.salary();
    this.field();
    this.CityData();
    this.ManageList();
  }
  salary() {
    let minSalary = new Array(60);
    for (var i = 0; i < minSalary.length; i++) {
      minSalary[i] = i + 1;
    }
    this.minSalary = minSalary;
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>