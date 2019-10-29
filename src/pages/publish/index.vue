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
				<div class="status-detail">
					<div class="number">
						<p class="descTitle">版本号</p>
						<p class="num">111</p>
					</div>
					<div class="content">
						<p class="publisher"><span class="descTitle">发布人</span><span class="descData">1111</span></p>
						<p class="publishTime"><span class="descTitle">发布时间</span><span class="descData">1111</span></p>
						<p class="publishDesc"><span class="descTitle">描述</span><span class="descData">1111</span></p>
					</div>
					<div class="operArea">
						<el-button type="success">版本回退</el-button>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="title">审核版本</div>
				<template v-if="!auditData">
					<p class="shenhe">你暂无提交审核的版本或者版本已发布上线</p>
				</template>
				<template v-else>
					<div class="status-detail">
					<div class="number">
						<p class="descTitle">版本号</p>
						<p class="num">{{auditData.version}}</p>
					</div>
					<div class="content">
						<p class="publisher"><span class="descTitle">发布人</span><span class="descData">{{auditData.developer}}</span></p>
						<p class="publishTime"><span class="descTitle">提交时间</span><span class="descData">{{auditData.createdAt}}</span></p>
						<p class="publishDesc"><span class="descTitle">描述</span><span class="descData">{{auditData.comment}}</span></p>
					</div>
					<div class="operArea">
						<el-button type="success">发布版本</el-button>
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
						<img class="qrCode" :src="qrCodeUrl1" alt="">
					</div>
					<div class="content">
						<p class="publisher"><span class="descTitle">发布人</span><span class="descData">{{experientialData.developer}}</span></p>
						<p class="publishTime"><span class="descTitle">提交时间</span><span class="descData">{{experientialData.createdAt}}</span></p>
						<p class="publishDesc"><span class="descTitle">描述</span><span class="descData">{{experientialData.userDesc}}</span></p>
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
<!-- 						<img class="qrCode" :src="qrCodeUrl" alt="">
 -->					</div>
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
	</div>
</template>
<style scoped lang="less">
	.publish {
		margin-left: 200px;
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
		    	}
		    }
			}
		}
	}
</style>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { getTemplateListNewApi, getDartsApi, addTemplateApi, getTemplateListApi, commitApi, getQrcodeApi, deleteTemplateApi, postMiniAppApi, getcodeManagerVcsListsApi } from "API/publish";
let timer = null
@Component({
  name: "publish",
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
	experientialData  = {} // 体验服数据
	appId = process.env.VUE_APP_ID
	qrCodeUrl = ''
	autoRefresh = true // 开启自动刷新
	qrCodeUrl1 = ''
	auditData = {}
	created() {
		this.getDarts()
		this.getTemplateList()
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
			// this.getQrcode().then(src => this.qrCodeUrl = src)
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
			this.experientialData = list[0]
			this.getQrcode().then(src => this.qrCodeUrl1 = src)
		})
	}
	getTemplateListNew() {
		let parmas = {app_id: this.appId, page: 1, count: 50}
		return getTemplateListNewApi(parmas).then(res => {
			console.log(res)
			let list = res.data.data.templateList
			this.templateList = list
			// console.log(list, 'a')
			this.getQrcode().then(src => this.qrCodeUrl1 = src)
		})
	}
	// 状态列表
	getcodeManagerVcsLists() {
		let parmas = {app_id: this.appId, page: 1, count: 50}
		return getcodeManagerVcsListsApi(parmas).then(res => {
			let list = res.data.data.items
			// this.experientialData = list.find(item => item.type === 1)
			this.auditData = list.find(item => item.type === 2)
			this.templateList = list
		})
	}
	// 提审
	commit () {
		let parmas = {app_id: this.appId, template_id: this.templateList[0].templateId}
		return commitApi(parmas).then(res => {
			this.getcodeManagerVcsLists()
		})
	}
	// 生成二维码
	getQrcode () {
		let parmas = {app_id: this.appId, path: 'page/common/pages/homepage/homepage', format: 'base64'}
		return getQrcodeApi(parmas).then(res => {
			this.qrCodeUrl = res.data.data.qrcode
			return res.data.data.qrcode
		})
	}
	// 提交代码到体验服
	toCommit () {
		this.getDarts().then(() => {
			this.addTemplate().then(() => {
				this.getTemplateListNew().then(() => {
					this.commit().then(() => {
						this.getTemplateList()
					})
				})
			})
		})
	}
	// 发布小程序
	postMiniApp() {
		postMiniAppApi({app_id: this.appId})
	}
}
</script>