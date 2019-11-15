<template>
	<div class="commitsPop" v-show="showPop">
		<div class="inner">
			<p class="inner-title">提交体验服</p>
			<div class="inputBox" v-if="type !== 'detail'"><span class="desc">模板Id</span><el-input class="input" v-model="templateId" placeholder="请输入模板Id"></el-input></div>
			<div class="inputBox"><span class="desc">版本号</span><el-input class="input" v-model="version" placeholder="请输入版本号"></el-input></div>
			<div class="inputBox"><span class="desc">版本描述</span><el-input class="input textarea" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="versionDesc" placeholder="请输入版本描述"></el-input></div>
			<div class="innerBtn">
				<el-button class="submit" @click="btnPop('cancel')">取消</el-button>
				<el-button class="submit" @click="btnPop('sureCommits')">确定</el-button>
			</div>
		</div>
	</div>
</template>
<style lang="less">
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
</style>
<script>
	import { batchCommitsApi } from "API/publish";
	export default {
		props: {
			appId: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				templateId: null,
				version: null,
				versionDesc: null,
				showPop: false
			}
		},
		methods: {
			btnPop (type) {
				switch (type) {
					case 'cancel':
						this.showPop = false
						break
					case 'sureCommits':
						let title = ''
						// 发布详情的弹窗 
						if (this.type === 'detail') {
							if (!this.version) {
								title = '版本号不能为空'
							} else if (!this.versionDesc) {
								title = '版本描述不能为空'
							}
							if (title) {
								this.$message({
			            type: 'warning',
			            message: title
			          })
								return
							}
							this.$emit('callback', {version: this.version, versionDesc: this.versionDesc})
							this.showPop = false
							return
						}
						let params = {
							mini_programs_appid: this.appId, 
							version: this.version, 
							template_id: this.templateId,
							description: this.versionDesc
						}
						
						if (!params.template_id) {
							title = '模板id不能为空'
						} else if (!params.version) {
							title = '版本号不能为空'
						} else if (!params.description) {
							title = '版本描述不能为空'
						}
						if (title) {
							this.$message({
		            type: 'warning',
		            message: title
		          })
							return
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
			}
		}
	}
</script>