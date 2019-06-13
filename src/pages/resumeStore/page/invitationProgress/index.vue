<!--  -->
<template>
  <div class="invitPro">
    <lyout-content :leftcontent="leftcontent">
      <div class="formSumbit" slot="formContent">
        <div class="formReasult">
          <el-form ref="form" :inline="true" :model="form" class="form">
            <div class="searchTab">
              <el-input type="text" placeholder="请输入" v-model="form.commonKey1" class="inputSelect">
                <el-select
                  size="medium"
                  class="selectTitle"
                  v-model="searchType.key1"
                  slot="prepend"
                  placeholder="公司名"
                >
                  <el-option label="公司名" value="companyName"></el-option>
                  <el-option label="职位名" value="positionName"></el-option>
                  <el-option label="面试ID" value="interviewId"></el-option>
                </el-select>
              </el-input>
            </div>

            <!-- <el-form-item label="处理状态" prop="jobStatus" class="formItem">
              <el-select class="select" v-model="form.jobStatus" placeholder="请选择">
                <el-option value="0">求职者未到场</el-option>
                <el-option value="1">求职者已到场</el-option>
                <el-option value="2">面试官评价不错</el-option>
                <el-option value="3">面试官不感兴趣</el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="time" label="面试日期" prop="start" label-width="100px">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="form.start"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">—</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="form.end"
                  style="width: 142px;"
                ></el-date-picker>
              </el-col>
            </el-form-item>-->
            <!--用于代替清除结束时间-->
            <el-form-item label-width="1px" label prop="end"></el-form-item>
            <el-form-item label-width="80px" prop="startd">
              <el-checkbox v-model="form.isJobhunterApply">只看求职者自行约面</el-checkbox>
            </el-form-item>
          </el-form>
          <div class="BtnList">
            <el-button class="inquire" @click.stop="getData(form)">查询</el-button>
            <el-button @click.stop="resetForm('form')">重置</el-button>
          </div>
        </div>
      </div>
      <div class="List" ref="List" id="scroll" slot="dataList">
        <div class="form">
          <el-table highlight-current-row :data="tableData" style="width: 100%">
            <el-table-column prop="jobhunter.resumeNum" label="简历ID" width="140">
              <template slot-scope="scope">
                <p v-if="scope.row.isJobhunterApply" class="Self-operation inquire">求职者已自行约面</p>
                <p style="color:#000;font-size:14px;">{{scope.row.jobhunter.resumeNum}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="jobhunter" label="求职者信息" width="270">
              <template slot-scope="scope">
                <div class="col_position">
                  <span>{{scope.row.jobhunter.name}}</span>
                  <span>{{scope.row.jobhunter.lastPosition}}</span>
                </div>
                <p class="companyName">{{scope.row.jobhunter.lastCompany}}</p>
                <div class="operation">
                  <span
                    @click.stop="creatLink($event, scope.row.jobhunter.uid,scope.$index, 2)"
                  >扫码看简历</span>
                  <span
                    @click.stop="scope.row.jobhunter.isShowMobile=!scope.row.jobhunter.isShowMobile"
                  >联系用户</span>
                  <!--求职者电话号码展示框-->
                  <div class="phone" v-if="scope.row.jobhunter.isShowMobile">
                    <p v-if="scope.row.jobhunter.mobile">{{scope.row.jobhunter.mobile}}</p>
                    <p v-else>暂无</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="province" label="处理状态" width="200">
              <template slot-scope="scope">
                <div v-if="scope.row.interview!=null">
                  <div class="col_position">
                    <i class="icon iconfont iconjiantou" v-if="scope.row.dealStatus==1"></i>
                    <i
                      class="icon iconfont iconjiantouzuo"
                      v-if="scope.row.dealStatus==2||scope.row.dealStatus==0"
                    ></i>
                  </div>
                  <p class="companyName">
                    <span>{{scope.row.dealStatusDesc}}</span>
                  </p>
                  <p>{{scope.row.interview.updatedAt}}</p>
                </div>
                <div v-else>
                  <p>----------</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="city" label="面试官信息" width="300">
              <template slot-scope="scope">
                <div class="col_position">
                  <span>{{scope.row.recrutier.name}}</span>
                  <span>{{scope.row.recrutier.position}}</span>
                </div>
                <p class="companyName">{{scope.row.recrutier.companyName}}</p>
                <div class="operation">
                  <span
                    @click.stop="creatLink($event, scope.row.jobhunter.uid,scope.$index,1)"
                  >扫码看主页</span>
                  <span
                    @click.stop="scope.row.recrutier.isShowMobile=!scope.row.recrutier.isShowMobile"
                  >联系用户</span>
                  <div class="phone" v-if="scope.row.recrutier.isShowMobile">
                    <p v-if="scope.row.recrutier.mobile">{{scope.row.recrutier.mobile}}</p>
                    <p v-else>暂无</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="约面信息" width="300">
              <template slot-scope="scope">
                <div v-if="scope.row.isValid===0">
                  <p>{{scope.row.note}}</p>
                </div>
                <div v-else-if="scope.row.interview">
                  <p class="positionName">
                    职位:
                    <span
                      class="positionName"
                      @click="toPositionPath(scope.row.interview.positionId)"
                    >{{scope.row.interview.positionName}}</span>
                    {{scope.row.interview.emolumentMin}}k-{{scope.row.interview.emolumentMax}}k
                  </p>
                  <p
                    class="companyName"
                  >{{scope.row.interview.address}}{{scope.row.interview.doorplate}}</p>
                  <p
                    v-if="scope.row.arrangementInfo"
                  >时间:{{scope.row.arrangementInfo.appointment_time}}</p>
                </div>
                <div v-else>
                  <p style="color:red;font-size：14px;">{{scope.row.dealStatusDesc}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="chargeStatusDesc" label="是否扣点" width="200"></el-table-column>
            <el-table-column label="操作" width="100">
              <!-- slot-scope="scope" -->
              <template slot-scope="scope">
                <div>
                  <el-button
                    @click.stop="handleClick(true,'扣点',scope.row.id,1)"
                    type="text"
                    size="medium"
                    v-if="scope.row.chargeStatus===1"
                  >扣点</el-button>
                  <el-button
                    @click.stop="handleClick(true,'返点',scope.row.id,2)"
                    type="text"
                    size="small"
                    v-if="scope.row.chargeStatus===1"
                  >返点</el-button>
                </div>

                <p
                  class="resultBtn"
                  @click.stop="handleClick(false,'返点原因')"
                  v-if="scope.row.chargeStatus===3"
                >返点原因</p>
                <p
                  class="resultBtn"
                  @click.stop="handleClick(false,'扣点原因')"
                  v-if="scope.row.chargeStatus===2"
                >扣点原因</p>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--小程序码展示框-->
        <!--小程序码展示框-->
      </div>
    </lyout-content>
    <div class="qrCode" ref="qrCode">
      <img class="bg" src="../../../../assets/code_bg.png">
      <div
        style="height: 100%;display: flex; align-items: center;flex-direction: column;justify-content: center;"
        v-if="!qrCode"
      >
        <img style="height: 38px;width: 38px;" src="../../../../assets/loading.gif">
        <div class="txt">正在加载中…</div>
      </div>
      <div v-else>
        <img class="Qr" :src="qrCode">
        <div class="txt">微信扫码，打开小程序查看</div>
      </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="editRusult" v-if="iseditResult">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入原因"
          v-model="RusultForm.note"
        ></el-input>
      </div>
      <div class="resultDetail" v-if="!iseditResult">
        <p>原因:工作经历不符合</p>
        <span>说明：没联系一般就是不合适，还有种情况是可要可不要没有让面试感兴趣的闪光点特长之处留作储备运气好会联系入职（但也只是抱着试试用的心态招进去）运气不好就雪藏了。。公司真的招人的话碰到合适的一定会最快速度拉进来沟通入职事宜的。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkNote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import lyoutContent from "COMPONENTS/Lyout/lyoutContent/lyoutContent.vue";
import { interviewsList } from "API/resumeStore";
import { getResumeCodeUrlApi, getRecruiterCodeUrlApi } from "API/interview";
@Component({
  name: "invitPro",
  prop: "",
  components: {
    lyoutContent
  }
})
export default class invitPro extends Vue {
  form = {
    commonKey1: "",
    isJobhunterApply: "",
    page: 1,
    count: 20
  };
  searchType = {
    key1: "companyName",
    condition2: ""
  };
  RusultForm = {
    recommendId: "",
    note: "",
    type: "" /* 1是扣点，2是返点 */
  };
  centerDialogVisible = false; //原因弹框
  qrCode = ""; //二维码
  tableData = []; //数据
  dialogTitle = ""; //弹窗标题
  iseditResult = false; //是否编辑

  leftcontent = {
    total: 0,
    title: "邀约进展"
  };
  /* 清除列表选项 */
  resetForm(name) {
    this.form.commonKey1 = "";
    this.form.isJobhunterApply = false;
    this.$refs[name].resetFields();
    console.log(this.form);
  }
  forEachKeys() {
    // 基础键，剩余键值对由用户选择

    let param = {
      count: 20,
      page: 1,
      isJobhunterApply: this.form.isJobhunterApply == true ? 1 : 0
    };
    param[this.searchType.key1] = this.form.commonKey1;
    return param;
  }
  getData(form) {
    let obj = this.forEachKeys();
    interviewsList(obj).then(res => {
      this.tableData = res.data.data;
      this.tableData.forEach(item => {
        item.jobhunter.isShowMobile = false;
        item.recrutier.isShowMobile = false;
      });
      console.log(this.tableData);
    });
  }
  created() {
    this.getData(this.form);
  }
  /* 生成二维码 */
  getQr(type, uid) {
    switch (type) {
      case 1:
        // 招聘官主页
        return getRecruiterCodeUrlApi({ id: uid });
        break;
      case 2:
        // 简历二维码
        return getResumeCodeUrlApi({ id: uid });
        break;
      case 3:
        if (uid === 0) return;
        return getPositionCodeUrlApi({ id: uid });
        break;
    }
  }
  // 看二维码
  /* 生成小程序码 */
  async creatLink(e, uid, index, type) {
    console.log(e);
    // console.log(uid, index, type);
    console.log(e.clientX, e.clientY, "e");
    console.log(window.scrollY);
    this.qrCode = "";
    // 是否已经加载过二维码
    console.log("this.tableData[index]", this.tableData[index]);
    if (this.tableData[index].qrCode && type === 1) {
      this.qrCode = this.tableData[index].qrCode;
      this.$nextTick(() => {
        this.$refs["qrCode"].style.display = "block";
        this.$refs["qrCode"].style.left = e.clientX + "px";
        this.$refs["qrCode"].style.top = e.clientY + window.scrollY + "px";
      });
      return;
    } else if (this.tableData[index].resumeQrCode && type === 2) {
      this.qrCode = this.tableData[index].resumeQrCode;
      this.$nextTick(() => {
        this.$refs["qrCode"].style.display = "block";
        this.$refs["qrCode"].style.left = e.clientX + "px";
        this.$refs["qrCode"].style.top = e.clientY + window.scrollY + "px";
      });
      return;
    } else if (this.tableData[index].jobQrCode && type === 3) {
      this.qrCode = this.tableData[index].jobQrCode;
      this.$nextTick(() => {
        this.$refs["qrCode"].style.display = "block";
        this.$refs["qrCode"].style.left = e.clientX + "px";
        this.$refs["qrCode"].style.top = e.clientY + window.scrollY + "px";
      });
      return;
    }

    this.$nextTick(() => {
      this.$refs["qrCode"].style.display = "block";
      this.$refs["qrCode"].style.left = e.clientX + "px";
      this.$refs["qrCode"].style.top = e.clientY + window.scrollY + "px";
    });
    let res = await this.getQr(type, uid);
    if (type === 1) {
      this.qrCode = res.data.data.qrCodeUrl;
      this.tableData[index].qrCode = res.data.data.qrCodeUrl;
    } else if (type === 2) {
      this.qrCode = res.data.data.qrCodeUrl;
      this.tableData[index].resumeQrCode = res.data.data.qrCodeUrl;
    } else {
      this.qrCode = res.data.data.qrCodeUrl;
      this.tableData[index].jobQrCode = res.data.data.qrCodeUrl;
    }
  }
  /* status  是否处于编辑状态,title  标题 */
  handleClick(status, title, id, type) {
    this.RusultForm.type = type;
    this.RusultForm.recommendId = id;
    this.dialogTitle = title;
    this.centerDialogVisible = true;
    this.iseditResult = status;
  }
  // 确认扣返点
  checkNote() {
    if (this.RusultForm.note === "") {
      this.$message({
        message: "原因不能为空",
        type: "warning"
      });
      return;
    }
    if (this.RusultForm.type === 1) {
      console.log("扣点");
      recommendPay(this.RusultForm.recommendId, {
        note: this.RusultForm.note
      }).then(res => {
        console.log(res);
      });
      /* 扣点 */
    } else if (this.RusultForm.type === 2) {
      console.log("返点"); /* 返点 */
      refund(this.RusultForm.recommendId, {
        note: this.RusultForm.note
      }).then(res => {
        console.log(res);
      });
    }
    console.log(this.RusultForm);
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>