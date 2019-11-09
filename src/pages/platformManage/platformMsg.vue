<template>
	<div class="platformMsg">
		<p class="title">平台信息</p>
		<div class="date-desktop">
			<div class="item">
				<p class="num">{{dateDesktop.miniProgramCount}}</p>
				<p class="desc">小程序个数</p>
			</div>
			<div class="item">
				<p class="num">{{dateDesktop.limit}}</p>
				<p class="desc">当月发版次数</p>
			</div>
			<div class="item">
				<p class="num">{{dateDesktop.rest}}</p>
				<p class="desc">当月剩余发版次数</p>
			</div>
		</div>
		<p class="title">模板列表</p>
		<div class="tableList">
			<el-table :data="tableData" style="width: 100%" height="65vh">
		    <el-table-column fixed prop="userVersion" label="版本号"></el-table-column>
		    <el-table-column prop="id" label="模板Id"></el-table-column>
				<el-table-column prop="developer" label="发布人"></el-table-column>
				<el-table-column prop="createdAt" label="发布时间"></el-table-column>
				<el-table-column prop="userDesc" label="模板描述"></el-table-column>
		  </el-table>
		</div>
	</div>
</template>
<script>
import { getHomeApi, getTemplateListApi } from "API/publish";
export default {
	data () {
		return {
			dateDesktop: {
				miniProgramCount: 0,
				limit: 0,
				rest: 0
			},
			tableData: [],
			appId: process.env.VUE_APP_ID
		}
	},
	created () {
		getHomeApi().then(res => {
			this.dateDesktop = res.data.data.platformPanel
		})
		this.getTemplateList()
	},
	methods: {
		getTemplateList () {
			let parmas = {app_id: this.appId, page: 1, count: 50}
			getTemplateListApi(parmas).then(res => {
				this.tableData = res.data.data
			})
		},
	}
	
	
}
</script>
<style lang="less" scoped>
	.platformMsg {
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
		.date-desktop {
			display: flex;
			margin-bottom: 20px;
			.item {
				flex: 1;
				text-align: center;
				.num {
					font-size: 30px;
			    color: #333333;
			    margin-bottom: 10px;
				}
				.desc {
					font-size: 14px;
			    color: #333333;
				}
			}
		}
	}
	
</style>