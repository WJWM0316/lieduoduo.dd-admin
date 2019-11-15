<template>
	<div class="publish">
		<div class="publishInner">
			<div class="autoRefresh">
				<span class="txt">{{autoRefresh ? '关闭自动刷新' : '开启自动刷新'}}</span>
				<el-switch
				  v-model="autoRefresh"
				  active-color="#67C23A"
				  inactive-color="#dcdfe6">
				</el-switch></div>
			<div class="card">
				<div class="title">线上版本</div>
				<template v-if="!formalData.version">
					<p class="shenhe">暂无线上版本</p>
				</template>
				<template v-else>
					<div class="status-detail">
					<div class="number">
						<p class="descTitle">版本号</p>
						<p class="num">{{formalData.version}}</p>
					</div>
					<div class="content">
						<p class="publisher"><span class="descTitle">发布人</span><span class="descData">{{formalData.developer}}</span></p>
						<p class="publishTime"><span class="descTitle">发布时间</span><span class="descData">{{formalData.createdAt}}</span></p>
						<p class="publishDesc"><span class="descTitle">描述</span><span class="descData">{{formalData.comment}}</span></p>
					</div>
					<div class="operArea">
						<el-button type="success" @click="deleteRelease">版本回退</el-button>
					</div>
					</div>
				</template>
			</div>
			<div class="card audit">
				<div class="title">审核版本</div>
				<template v-if="!auditData.length">
					<p class="shenhe">你暂无提交审核的版本或者版本已发布上线</p>
				</template>
				<template v-else>
					<div class="audit">
						<div class="status-detail" v-for="(n, index) in auditData">
							<div class="number">
								<p class="descTitle">版本号</p>
								<p class="num">{{n.version}}</p>
							</div>
							<div class="content">
								<p class="publisher"><span class="descTitle">发布人</span><span class="descData">{{n.developer}}</span></p>
								<p class="publishTime"><span class="descTitle">提交时间</span><span class="descData">{{n.createdAt}}</span></p>
								<p class="publishDesc"><span class="descTitle">描述</span><span class="descData">{{n.comment}}</span></p>
							</div>
							<div class="operArea">
								<el-button type="default" disabled>{{n.typeDesc}}</el-button>
								<el-dropdown  @command="handleCommand">
									<el-button class="operBtn" type="success"><i class="icon iconfont icon-bottom"></i></el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item command="postrelease" v-if="n.type === 6">发布</el-dropdown-item>
								    <el-dropdown-item command="deleteAudit">撤销审核</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				</template>
			</div>
			<div class="card">
				<div class="title">体验版本</div>
				<div class="status-detail">
					<div class="number">
						<p class="descTitle">版本号</p>
						<p class="num">{{experientialData.userVersion}}</p>
						<img class="qrCode" :src="qrCodeUrl" alt="">
					</div>
					<div class="content">
						<p class="publisher"><span class="descTitle">发布人</span><span class="descData">{{experientialData.developer}}</span></p>
						<p class="publishTime"><span class="descTitle">提交时间</span><span class="descData">{{experientialData.createdAt}}</span></p>
						<p class="publishDesc"><span class="descTitle">描述</span><span class="descData">{{experientialData.comment}}</span></p>
					</div>
					<div class="operArea">
						<el-button type="success" @click="postMiniApp">提交审核</el-button>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="title">开发版本</div>
				<div class="status-detail">
					<div class="number">
						<p class="descTitle">版本号</p>
						<p class="num">{{dartData.userVersion}}</p>
					</div>
					<div class="content">
						<p class="publisher"><span class="descTitle">开发者</span><span class="descData">{{dartData.developer}}</span></p>
						<p class="publishTime"><span class="descTitle">提交时间</span><span class="descData">{{dartData.createTime * 1000 | date}}</span></p>
						<p class="publishDesc"><span class="descTitle">描述</span><span class="descData">{{dartData.userDesc}}</span></p>
					</div>
					<div class="operArea">
						<el-button type="success" @click="toCommit">提交体验服</el-button>
					</div>
				</div>
			</div>
		</div>
		<submitPop ref="submitPop" @callback="callback" type="detail"></submitPop>
	</div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import submitPop from './components/submitPop.vue'
import { getTemplateListNewApi, getDartsApi, addTemplateApi, getTemplateListApi, commitApi, getQrcodeApi, deleteTemplateApi, postMiniAppApi, getcodeManagerVcsListsApi, deleteAuditApi, deleteReleaseApi, postReleaseApi } from "API/publish";
let timer = null
@Component({
  name: "publish",
  components: {
  	submitPop
  },
  watch: {
    'autoRefresh': {
      handler(autoRefresh) {
      	clearTimeout(timer)
      	if (autoRefresh) {
      		timer = setTimeout(() => {
      			this.getDarts()
						this.getTemplateList()
						this.getcodeManagerVcsLists()
      		}, 60000) 
      	}
      },
      immediate: true
    }
  }
})
export default class publish extends Vue {
	dartData = {} // 最新草稿数据
	dartId = 0 // 最新模板id
	templateList = [] // 模板列表
	versionData = {
		version: '',
		createdAt: '',
		developer: '',
		comment: ''
	}
	experientialData = this.versionData // 体验服数据
	auditData = [] // 审核版
	formalData = this.versionData //正式版
	appId = ''
	qrCodeUrl = ''
	autoRefresh = true // 开启自动刷新
	qrCodeUrl1 = ''
	
	created() {
		this.appId = this.$route.query.appId
		this.getDarts()
		this.getTemplateList()
		this.getQrcode()
		this.getcodeManagerVcsLists()
	}
	maxIndex = (list, typeId) => {
		let array = []
		list.forEach((item) => {
			array.push(item[typeId])
		})
		return array.indexOf(Math.max(...array))
	}
	getDarts () {
		let parmas = {app_id: this.appId}
		return getDartsApi(parmas).then(res => {
			let list = res.data.data.draftList
			this.dartData = list[this.maxIndex(list, 'draftId')]
			this.dartId = this.dartData.draftId
		})
	}
	deleteTemplate (templateId) {
		let template_id = []
		for (var i = 1; i <= 5; i++) {
			template_id.push(this.templateList[this.templateList.length - i].templateId || '')
		}
		let formData = {
			template_id: template_id.join(','),
			app_id: this.appId
		}
		return deleteTemplateApi(formData)
	}
	addTemplate () {
		let parmas = {app_id: this.appId, dart_id: this.dartId}
	  return new Promise((resolve, reject) => {
	  	addTemplateApi(parmas).then(res => {
				// 模板已满删除 删除最后一个
				if (res.data.httpStatus === 200 && res.data.code === 85065) {
					this.deleteTemplate().then(() => {
						this.toCommit()
					})
					reject('模板已满')
				} else {
					resolve(res)
				}
			})
	  })
	}
	getTemplateList () {
		let parmas = {app_id: this.appId, page: 1, count: 50}
		return getTemplateListApi(parmas).then(res => {
			let list = res.data.data
			this.templateList = list			
		})
	}
	getTemplateListNew() {
		let parmas = {app_id: this.appId, page: 1, count: 50}
		return getTemplateListNewApi(parmas).then(res => {
			let list = res.data.data.templateList
			this.templateList = list
		})
	}
	// 状态列表
	getcodeManagerVcsLists() {
		let parmas = {app_id: this.appId, page: 1, count: 50}
		return getcodeManagerVcsListsApi(parmas).then(res => {
			let list = res.data.data.items
			this.auditData = list.filter(item => item.type === 2 || item.type === 5 || item.type === 6 || item.type === 8)
			this.experientialData = list.find(item => item.type === 1)
			this.formalData = list.find(item => item.type === 3)
			if (!this.formalData) this.formalData = this.versionData
			if (!this.auditData) this.auditData = this.versionData
			if (!this.experientialData) this.experientialData = this.versionData
			this.templateList = list
		})
	}
	// 提审
	commit (parmas) {
		return commitApi(parmas).then(res => {
			this.getcodeManagerVcsLists()
		})
	}
	// 生成二维码
	getQrcode () {
		let parmas = {app_id: this.appId, path: 'page/common/pages/homepage/homepage', format: 'base64'}
		return getQrcodeApi(parmas).then(res => {
			this.qrCodeUrl = res.data.data.qrcode
		})
	}
	// 提交代码到体验服
	toCommit () {
		this.$refs.submitPop.showPop = true
	}
	// 执行提交体验服回调
	callback (e) {
		this.getDarts().then(() => {
			this.addTemplate().then(() => {
				this.getTemplateListNew().then(() => {
					let parmas = {app_id: this.appId, template_id: this.templateList[0].templateId, version: e.version, description: e.versionDesc}
					this.commit(parmas).then(() => {
						this.getQrcode()
					})
				})
			})
		})
	}
	// 提交审核申请
	postMiniApp() {
		postMiniAppApi({app_id: this.appId})
	}
	handleCommand (e) {
		switch (e) {
			case 'postrelease':
				// 发布小程序
				postReleaseApi({app_id: this.appId})
				break
			case 'deleteAudit':
				// 撤销审核
				deleteAuditApi({app_id: this.appId})
				break
		}
	}
	// 版本回滚
	deleteRelease () {
		deleteReleaseApi({app_id: this.appId})
	}
}
</script>

<style scoped lang="less">
	.publish {
		.autoRefresh {
			margin-bottom: 30px;
			text-align: right;
			.txt {
				margin-right: 20px;
			}
		}
		.publishInner {
			margin: 22px;
			min-width: 500px;
			.card {
				background-color: #fff;
		    border-radius: 4px;
		    box-shadow: 0 1px 2px rgba(150,150,150,0.3);
		    padding: 20px 30px 30px;
		    text-align: left;
		    margin-bottom: 30px;
		    .audit {
		    	.status-detail {
		    		padding-top: 20px;
		    		margin-top: 20px;
		    		border-top: 1px solid #eee;
		    	}
		    	.status-detail:first-child {
		    		padding-top: 0;
		    		margin-top: 0;
		    		border-top: none
		    	}
		    }
		    .title {
		    	font-size: 20px;
		    	color: #353535;
		    	margin-bottom: 30px;
		    }
		    .shenhe {
		    	padding: 30px 0;
		    	text-align: center;
		    	color: #9a9a9a;
		    	font-size: 14px;
		    }
		    .status-detail {
		    	width: 100%;
		    	overflow: hidden;
		    	.descTitle {
		    		color: #9a9a9a;
		    		font-size: 14px;
		    	}
		    	.number {
		    		width: 120px;
		    		float: left;
		    		.num {
		    			font-size: 22px;
		    			line-height: 1.6;
		    			margin-top: 2px;
		    		}
		    		.qrCode {
		    			width: 100px;
		    		}
		    	}
		    	.content {
		    		float: left;
		    		.descTitle {
		    			width: 6em;
		    			margin-right: 1em;
		    			display: inline-block;
		    		}
		    		.descData {
							color: #353535;
							font-size: 14px;
		    		}
		    		.publishTime, .publishDesc {
		    			margin-top: 14px;
		    		}
		    	}
		    	.operArea {
		    		float: right;
		    		margin-left: 30px;
		    		.operBtn {
		    			padding: 12px 0px;
		    			margin-left: 10px;
		    		}
		    		.icon {
		    			font-size: 14px;
		    			padding: 0 12px;
		    		}
		    	}
		    }
			}
		}
	}
</style>