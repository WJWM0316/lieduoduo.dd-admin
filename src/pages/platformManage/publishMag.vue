<template>
	<div class="publishMag">
		<p class="title">发版管理</p>
		<div class="header">
			<div class="search">
				<el-input class="input" v-model="companyName" placeholder="请输入公司名称"></el-input>
				<i class="icon iconfont icon-sousuo"></i>
			</div>
			<el-select class="select" v-model="filter">
		    <el-option
		      v-for="item in options"
		      :key="item.type"
		      :label="item.desc"
		      :value="item.type">
		    </el-option>
		  </el-select>
		  <div class="btnBox">
		  	<el-button class="submit" @click="toOper('commits')">提交体验服</el-button>
		  	<el-button class="submit" @click="toOper('submits')">提交审核</el-button>
		  	<el-button class="submit" @click="toOper('releases')">发布</el-button>
		  </div>
		</div>
		
		<div class="tableList">
			<el-table :data="tableData" style="width: 100%" height="65vh" @selection-change="handleSelectionChange">
				<el-table-column fixed type="selection"></el-table-column>
		    <el-table-column prop="nickName" label="小程序名"></el-table-column>
		    <el-table-column prop="companyName" label="公司名"></el-table-column>
				<el-table-column prop="officialVersion.templateId" label="模板ID"></el-table-column>
				<el-table-column prop="officialVersion.version" label="线上版本"></el-table-column>
				<el-table-column prop="experienceVersion.version" label="体验版本"></el-table-column>
				<el-table-column prop="auditVersion.version" label="审核版本"></el-table-column>
				<el-table-column prop="auditVersion.statusDesc" label="审核状态"></el-table-column>
				<el-table-column label="操作" fixed="right">
					<template slot-scope="scope">
		        <el-button type="text" size="small" @click="toDetail(scope.row.appId, scope.row.nickName)">查看详情</el-button>
		        <el-button v-if="scope.row.auditVersion && scope.row.auditVersion.type === 5" type="text" size="small" @click="auditReason(scope.row.auditVersion.auditReason)">原因</el-button>
		      </template>
				</el-table-column>
		  </el-table>
		</div>

		<div class="commitsPop" v-show="showPop">
			<div class="inner">
				<p class="inner-title">提交体验服</p>
				<div class="inputBox"><span class="desc">模板Id</span><el-input class="input" v-model="templateId" placeholder="请输入模板Id"></el-input></div>
				<div class="inputBox"><span class="desc">版本号</span><el-input class="input" v-model="version" placeholder="请输入版本号"></el-input></div>
				<div class="inputBox"><span class="desc">版本描述</span><el-input class="input textarea" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="versionDesc" placeholder="请输入版本描述"></el-input></div>
				<div class="innerBtn">
					<el-button class="submit" @click="btnPop('cancel')">取消</el-button>
					<el-button class="submit" @click="btnPop('sureCommits')">确定</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Message } from "element-ui";
import { getHomeApi, batchCommitsApi, batchSubmitstsApi, batchReleasesApi } from "API/publish";
export default {
	data () {
		return {
			companyName: '',
			tableData: [],
			options: [],
			filter: 0,
			multipleSelection: '',
			templateId: null,
			version: null,
			versionDesc: null,
			showPop: false
		}
	},
	watch: {
		filter () {
			this.getList()
		},
		companyName () {
			this.getList()
		}
	},
	created () {
		this.getList()
	},
	methods: {
		handleSelectionChange (e) {
			let multipleSelection = []
			if (e.length) {
				e.map(item => {
					multipleSelection.push(item.appId)
				})
				this.multipleSelection = multipleSelection.join()
			} else {
				this.multipleSelection = ''
			}
		},
		getList () {
			let params = {}
			if (this.companyName) params.company_name = this.companyName
			if (this.filter) params.vcs_type = this.filter
			getHomeApi(params).then(res => {
				this.tableData = res.data.data.miniProgramsVcsPanel && res.data.data.miniProgramsVcsPanel.items
				res.data.data.auditTypes = [{type: 0, desc: '全部类型'}, ...res.data.data.auditTypes]
				this.options = res.data.data.auditTypes
				let tableData = this.tableData
				if (tableData && tableData.length) {
					tableData.map((item, index) => {
						item.vcs.map((n, i) => {
							switch (n.type) {
								case 1:
									item.experienceVersion = n
									break
								case 2:
									n.statusDesc = '审核中'
									item.auditVersion = n
									break
								case 3:
									item.officialVersion = n
									break
								case 5:
									n.statusDesc = '审核失败'
									item.auditVersion = n
									break
								case 6:
									n.statusDesc = '审核成功'
									item.auditVersion = n
									break
								case 8:
									n.statusDesc = '审核延期'
									item.auditVersion = n
									break
							}
						})
					})
					this.tableData = tableData
				}
			})
		},
		toOper (type) {
			if (!this.multipleSelection) {
				this.$message.warning('您还未勾选小程序')
				return
			}
			let params = {mini_programs_appid: this.multipleSelection}
			switch (type) {
				case 'commits':
					this.$confirm('是否确定将勾选的小程序提交到体验服？', '提交体验服', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消'
	        }).then(() => {
	        	this.showPop = true
	        })
					break
				case 'submits':
					this.$confirm('是否确定将勾选的小程序提交审核？', '提交审核', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消'
	        }).then(() => {
	        	batchSubmitstsApi(params).then(res => {
	        		this.$message({
		            type: 'success',
		            message: '提交审核成功!'
		          })
						})
	        })
					break
				case 'releases':
					this.$confirm('是否确定将勾选的小程序发布上线？', '发布', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消'
	        }).then(() => {
	        	batchReleasesApi(params).then(res => {
	        		this.$message({
		            type: 'success',
		            message: '发布成功!'
		          })
						})
	        })
					break
			}
		},
		btnPop (type) {
			switch (type) {
				case 'cancel':
					this.showPop = false
					break
				case 'sureCommits':
					let params = {
						mini_programs_appid: this.multipleSelection, 
						version: this.version, 
						template_id: this.templateId,
						description: this.versionDesc
					}
					batchCommitsApi(params).then(res => {
						this.showPop = false
        		this.$message({
	            type: 'success',
	            message: '提交体验服成功!'
	          })
					})
					break
			}
		},
		auditReason (content) {
			const h = this.$createElement;
      this.$notify({
        title: '提审失败',
        message: h('i', { style: 'color: teal'}, content)
      });
		},
		toDetail (id, name) {
			this.$router.push({name: 'publishDetail', query: {appId: id, name}})
		}
	}
	
	
}
</script>
<style lang="less" scoped>
	.publishMag {
		border: 1px solid rgb(238, 238, 238);
		padding: 0 20px;
		.title {
			font-size: 16px;
	    color: #353535;
	    margin-bottom: 10px;
	    line-height: 60px;
	    position: relative;
	    padding-left: 14px;
	    &:after {
	    	background: #ffe266;
		    content: "";
		   	display: block;
		    height: 16px;
		    width: 6px;
		    position: absolute;
		    left: 0;
		    top: 50%;
		    margin-top: -8px;
	    }
		}
		.header {
			.search {
				margin-bottom: 30px;
				float: left;
				position: relative;
				.input {
					width: 300px;
					position: relative;
				}
				.icon {
					font-size: 12px;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translate3d(0, -50%, 0);
					width: 40px;
					height: 40px;
					text-align: center;
					line-height: 40px;
				}
			}
			.select {
				width: 150px;
				float: left;
				margin-left: 50px;
			}
			.btnBox {
				float: right;
			}
		}
		.commitsPop {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			background: rgba(0, 0, 0, .5);
			display: flex;
			align-items: center;
			justify-content: center;
			.inner {
				width: 400px;
				padding: 30px 50px;
				background: #fff;
				border-radius: 8px;
				.inner-title {
					text-align: center;
					font-size: 16px;
					color: #333;
				}
				.inputBox {
					font-size: 14px;
					display: flex;
					align-items: center;
					margin-top: 20px;
					.desc {
						width: 80px;
						display: inline-block;
					}
					.input {
						width: 320px;
					}
				}
				.innerBtn {
					width: 200px;
					margin: 30px auto 0;
					display: flex;
					justify-content: space-between;
				}
			}
		}
		
	}
.el-textarea__inner  {
	height: 80px !important;
}	
</style>