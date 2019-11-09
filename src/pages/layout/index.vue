<template>
	<div id="wrap">
		<page-header/>
		<page-aside/>
		<router-view id="wrap-content" />
	</div>
</template>
<script>
import pageHeader from '@/components/pageHeader'
import pageAside from '@/components/pageAside'

export default {
	components: {
		pageHeader,
		pageAside
	},
	data () {
		return {

		}
	}
}
</script>
<style lang="less" scoped>
	#wrap {
		padding: 82px 0 0 222px;
	}
</style>