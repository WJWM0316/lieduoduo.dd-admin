<!--  -->
<template>
  <div class="OrderDetail">
    <div class="TabView">
      <div class="OrderDetail" style="padding:0px;">
        <div class="createTime">
          <span>推荐单详情</span>
          <span>创建时间: {{baseMsg.createdTimeDesc}}</span>
        </div>
        <div class="result">
          <div class="success">
            <span>推荐成功:</span>
            <span>{{baseMsg.succeedNum}}</span>
            <span>份简历</span>
          </div>
          <div class="success">
            <span>推荐失败:</span>
            <span>{{baseMsg.failNum}}</span>
            <span>份简历</span>
          </div>
          <div class="success" @click.stop="isShowForm=true">查看原因</div>
        </div>
        <div class="result">
          <div class="success">
            <span>职位ID:</span>
            <span>{{baseMsg.positionId}}</span>
          </div>
          <div class="success">
            <span>推荐职位:</span>
            <span>{{baseMsg.positionName}} | {{baseMsg.areaName}} | {{baseMsg.emolumentMin}}k-{{baseMsg.emolumentMax}}k</span>
          </div>
          <div class="success">
            <span>公司名称:</span>
            <span>{{baseMsg.companyName}}</span>
          </div>
          <div class="success">
            <span>发布者:</span>
            <span>{{baseMsg.advisorName}}</span>
          </div>
          <div class="success">
            <span>负责推荐人:</span>
            <span>{{baseMsg.recruiterName}}</span>
          </div>
        </div>
        <div class="content"></div>
      </div>
      <div class="form">
        <el-table height="670px" highlight-current-row :data="tableData" style="width: 100%">
          <el-table-column prop="jobhunter.resumeNum" label="简历ID" width="140"></el-table-column>
          <el-table-column prop="jobhunter" label="求职者信息" width="270">
            <template slot-scope="scope">
              <div class="col_position">
                <span>{{scope.row.jobhunter.name}}</span>
                <span>{{scope.row.jobhunter.lastPosition}}</span>
              </div>
              <p class="companyName">{{scope.row.jobhunter.lastCompany}}</p>
              <div class="operation">
                <span>查看简历</span>
                <span @click.stop>联系用户</span>
                <!--电话号码展示框-->
                <div class="phone">
                  <span>13922289159</span>
                  <img class="phoneBg" src="../../../../assets/number_bg.png">
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="处理状态" width="200">
            <template slot-scope="scope">
              <div class="col_position">
                <i class="icon iconfont iconjiantou"></i>
              </div>
              <p class="companyName">
                面试官未查看
                <span>原因</span>
              </p>
              <p>2019-05-25 16:16</p>
            </template>
          </el-table-column>
          <el-table-column prop="city" label="面试官信息" width="300">
            <template slot-scope="scope">
              <div class="col_position">
                <span>尼古斯丁卡拉王赞</span>
                <span>我是很长的工作的名字已经超出了</span>
              </div>
              <p class="companyName">我是很长的工作的名字已经超出了的公司名字</p>
              <div class="operation">
                <span>扫码看主页</span>
                <span>联系用户</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="约面信息" width="300">
            <template slot-scope="scope">
              <p class="positionName">
                职位:
                <span class="positionName">产品经理</span>30k-50k
              </p>
              <p class="companyName">我是很长的工作的名字已经超出了的公司名字</p>
              <p>时间:2019-05-25 16:00</p>
            </template>
          </el-table-column>
          <el-table-column prop="zip" label="是否扣点" width="200"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.stop="handleClick(true,'扣点')" type="text" size="medium">扣点</el-button>
              <el-button @click.stop="handleClick(true,'返点')" type="text" size="small">返点</el-button>
              <p class="resultBtn" @click.stop="handleClick(false,'返点原因')">返点原因</p>
              <p class="resultBtn" @click.stop="handleClick(false,'扣点原因')">扣点原因</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="PopForm" @click.stop="closeForm" v-if="isShowForm">
        <div class="allRusule">
          <p class="title">查看原因</p>
          <div class="resumeNums">
            <span>成功:15份</span>
            <span>失败:15份</span>
          </div>
          <div class="resultList">
            <el-table height="400" max-height="400" :data="tableData" style="width: 100%">
              <el-table-column align="center" prop="date" label="简历编号" width="380"></el-table-column>
              <el-table-column align="center" prop="name" label="求职者" width="380"></el-table-column>
              <el-table-column align="center" prop="address" label="原因说明" width="380"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="centerDialogVisible" width="30%" center>
        <div class="editRusult" v-if="iseditResult">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入原因"
            v-model="textarea2"
          ></el-input>
        </div>
        <div class="resultDetail" v-if="!iseditResult">
          <p>原因:工作经历不符合</p>
          <span
            s
          >说明：没联系一般就是不合适，还有种情况是可要可不要没有让面试感兴趣的闪光点特长之处留作储备运气好会联系入职（但也只是抱着试试用的心态招进去）运气不好就雪藏了。。公司真的招人的话碰到合适的一定会最快速度拉进来沟通入职事宜的。</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { recommendDetail } from "API/resumeStore";
@Component({
  name: "OrderDetail",
  prop: ""
})
export default class OrderDetail extends Vue {
  // itemList = ["推荐单详情"];
  isCreate = false; //是否创建
  isShowForm = false; //是否展示原因
  iseditResult = false; //如果是编辑就弹出编辑弹框，否则是原因弹框
  dialogTitle = "返点"; //弹框标题,四种情况 弹框唯一
  centerDialogVisible = false; //原因弹框
  baseMsg = {}; //基础信息
  textarea2 = ""; //原因
  tableData = [
    {
      date: "2016-05-02",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1517 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1519 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1516 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1517 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1519 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1516 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1517 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1519 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1516 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1517 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1519 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1516 弄",
      zip: 200333,
      jobhunterInfo: {
        mobile: 13922289159
      }
    }
  ];
  closeForm() {
    this.isShowForm = !this.isShowForm;
  }
  /* status  是否处于编辑状态,title  标题 */
  handleClick(status, title) {
    this.dialogTitle = title;
    this.centerDialogVisible = true;
    this.iseditResult = status;
  }
  created() {
    this.getData();
  }
  getData() {
    let { id } = this.$route.query;
    console.log(id);
    recommendDetail(id).then(res => {
      console.log(res);
      this.baseMsg = res.data.data.listInfo;
      this.tableData = res.data.data.recommends;
      console.log(this.baseMsg);
    });
  }
}
</script>
<style lang='less' scoped>
@import "./index.less";
</style>