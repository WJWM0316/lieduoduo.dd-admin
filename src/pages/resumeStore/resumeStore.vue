<template>
  <div class="resumeStore">
    <lyout-content :leftcontent="leftcontent" :isShowbtn="false" :isShowMark="isShowMark">
      <div class="formSumbit" slot="formContent">
        <div class="formReasult">
          <el-form ref="form" :model="form" class="form">
            <el-form-item label="求职状态" class="formItem">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期望职位类型" class="formItem">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期待工作城市" class="formItem">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最高学历" class="formItem">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作经验" class="formItem">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="BtnList">
          <el-form ref="form" :model="form">
            <el-form-item class="btn">
              <el-button class="inquire" @click.stop="onSubmit">查询</el-button>
              <el-button @click.stop="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="resumeList" slot="dataList">
        <div class="resumeItem">
          <div class="resumeNumber">
            <span>简历编号 cdate0000012X</span>
            <span>2018-08-12 23:00 更新</span>
            <span>最近访问时间：2018-08-12 23:00</span>
          </div>
          <div class="resumeContent">
            <div class="userMsg">
              <div class="userAvator">
                <img src="../../assets/images/text.jpg" alt>
              </div>
              <div class="userName">
                <p class="name">谢安琪</p>
                <div class="experience">
                  <span>10年工作经验</span>
                  <span>|</span>
                  <span>本科</span>
                  <span>|</span>
                  <span>23岁</span>
                  <span>|</span>
                  <span>在职-考虑机会</span>
                </div>
              </div>
              <div class="recentWork">
                <p>最近工作经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="education">
                <p>最高学历经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="seeResume">
                <el-button>查看简历附件</el-button>
              </div>
            </div>
            <div class="line"></div>
            <div class="userLabel">
              <div class="whereFrom">
                <span>
                  求职意向:
                  <i>·</i>
                </span>
                <span>
                  广州
                  <i>·</i>
                </span>
                <span>
                  高级产品经理
                  <i>·</i>
                </span>
                <span>
                  知识付费
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  电子产品
                  <i>·</i>
                </span>
                <span>
                  6k-9k
                  <i>·</i>
                </span>
              </div>
              <div class="iconList">
                <span>要求16薪水</span>
              </div>
            </div>
          </div>
        </div>
        <div class="resumeItem">
          <div class="resumeNumber">
            <span>简历编号 cdate0000012X</span>
            <span>2018-08-12 23:00 更新</span>
            <span>最近访问时间：2018-08-12 23:00</span>
          </div>
          <div class="resumeContent">
            <div class="userMsg">
              <div class="userAvator">
                <img src="../../assets/images/text.jpg" alt>
              </div>
              <div class="userName">
                <p class="name">谢安琪</p>
                <div class="experience">
                  <span>10年工作经验</span>
                  <span>|</span>
                  <span>本科</span>
                  <span>|</span>
                  <span>23岁</span>
                  <span>|</span>
                  <span>在职-考虑机会</span>
                </div>
              </div>
              <div class="recentWork">
                <p>最近工作经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="education">
                <p>最高学历经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="seeResume">
                <el-button>查看简历附件</el-button>
              </div>
            </div>
            <div class="line"></div>
            <div class="userLabel">
              <div class="whereFrom">
                <span>
                  求职意向:
                  <i>·</i>
                </span>
                <span>
                  广州
                  <i>·</i>
                </span>
                <span>
                  高级产品经理
                  <i>·</i>
                </span>
                <span>
                  知识付费
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  电子产品
                  <i>·</i>
                </span>
                <span>
                  6k-9k
                  <i>·</i>
                </span>
              </div>
              <div class="iconList">
                <span>要求16薪水</span>
              </div>
            </div>
          </div>
        </div>
        <div class="resumeItem">
          <div class="resumeNumber">
            <span>简历编号 cdate0000012X</span>
            <span>2018-08-12 23:00 更新</span>
            <span>最近访问时间：2018-08-12 23:00</span>
          </div>
          <div class="resumeContent">
            <div class="userMsg">
              <div class="userAvator">
                <img src="../../assets/images/text.jpg" alt>
              </div>
              <div class="userName">
                <p class="name">谢安琪</p>
                <div class="experience">
                  <span>10年工作经验</span>
                  <span>|</span>
                  <span>本科</span>
                  <span>|</span>
                  <span>23岁</span>
                  <span>|</span>
                  <span>在职-考虑机会</span>
                </div>
              </div>
              <div class="recentWork">
                <p>最近工作经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="education">
                <p>最高学历经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="seeResume">
                <el-button>查看简历附件</el-button>
              </div>
            </div>
            <div class="line"></div>
            <div class="userLabel">
              <div class="whereFrom">
                <span>
                  求职意向:
                  <i>·</i>
                </span>
                <span>
                  广州
                  <i>·</i>
                </span>
                <span>
                  高级产品经理
                  <i>·</i>
                </span>
                <span>
                  知识付费
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  电子产品
                  <i>·</i>
                </span>
                <span>
                  6k-9k
                  <i>·</i>
                </span>
              </div>
              <div class="iconList">
                <span>要求16薪水</span>
              </div>
            </div>
          </div>
        </div>
        <div class="resumeItem">
          <div class="resumeNumber">
            <span>简历编号 cdate0000012X</span>
            <span>2018-08-12 23:00 更新</span>
            <span>最近访问时间：2018-08-12 23:00</span>
          </div>
          <div class="resumeContent">
            <div class="userMsg">
              <div class="userAvator">
                <img src="../../assets/images/text.jpg" alt>
              </div>
              <div class="userName">
                <p class="name">谢安琪</p>
                <div class="experience">
                  <span>10年工作经验</span>
                  <span>|</span>
                  <span>本科</span>
                  <span>|</span>
                  <span>23岁</span>
                  <span>|</span>
                  <span>在职-考虑机会</span>
                </div>
              </div>
              <div class="recentWork">
                <p>最近工作经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="education">
                <p>最高学历经历</p>
                <p>深圳腾讯科技有限公司</p>
                <p>产品经理</p>
              </div>
              <div class="seeResume">
                <el-button>查看简历附件</el-button>
              </div>
            </div>
            <div class="line"></div>
            <div class="userLabel">
              <div class="whereFrom">
                <span>
                  求职意向:
                  <i>·</i>
                </span>
                <span>
                  广州
                  <i>·</i>
                </span>
                <span>
                  高级产品经理
                  <i>·</i>
                </span>
                <span>
                  知识付费
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  服务
                  <i>·</i>
                </span>
                <span>
                  电子产品
                  <i>·</i>
                </span>
                <span>
                  6k-9k
                  <i>·</i>
                </span>
              </div>
              <div class="iconList">
                <span>要求16薪水</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pageList" slot="pageList">
        <!-- v-if="hasPagination" v-show="total > 0" -->
        <footer class="list-footer">
          <el-pagination
            :layout="paginationLayout"
            :current-page="page"
            :page-size="pageSize"
            :total="total"
            @current-change="handlePageChange"
          >
            <span class="total">共 {{pageCount}} 页，{{total}} 条记录</span>
          </el-pagination>
        </footer>
      </div>
    </lyout-content>
    <div class="swiperList">
      <div class="swiperContent">

      </div>
      <div class="swipertype">
        <div class="common" :class="[index==nowCheck?'isCheck':'noCheck']" v-for="(item,index) in typeList" :key="item" @click.stop='check(index)'>{{item}}</div>
      </div>
      <div class="nowResume" v-show="nowCheck==0">
        div.
      </div>
      <div class="nowResume" v-show="nowCheck==1">21</div>
      <div class="nowResume" v-show="nowCheck==2">3</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import lyoutContent from "COMPONENTS/Lyout/lyoutContent/lyoutContent.vue";
@Component({
  name: "resumeStore",
  components: {
    lyoutContent
  }
})
export default class resumeStore extends Vue {
  typeList=['简历详情','附件简历','历史记录'];
  leftcontent = {
    total: 0,
    title: "简历库"
  };
  form = {
    name: ""
  };
  nowCheck=''; //当前点击
  isCheck=0;
  isShowbtn = true;
  isShowMark = true;
  // 点击切换
  check(index){
    this.nowCheck=index
  }
}
</script>

<style scoped lang="less">
@import "./resumeStore.less";
</style>
