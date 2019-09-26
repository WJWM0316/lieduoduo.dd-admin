import { request } from './index.js'

// 获取草稿列表
export const getDartsApi = data => request({
	url: `/open/platform/code_manager/darts`,
	type: 'get',
	data,
	noGlobalLoading: false
})

// 添加模板
export const addTemplateApi = data => request({
	url: `/open/platform/code_manager/add_template`,
	type: 'get',
	data,
	noGlobalLoading: false
})

// 删除模板
export const deleteTemplateApi = (data, config) => request({
	url: `/open/platform/code_manager/template?app_id=${data.app_id}&template_id=${data.template_id}`,
	type: 'delete',
	data,
	config,
	noGlobalLoading: false
})

// 获取模板
export const getTemplateListApi = data => request({
	url: `/open/platform/code_manager/templates`,
	type: 'get',
	data,
	noGlobalLoading: false
})

// 提交体验服
export const commitApi = data => request({
	url: `/open/platform/code_manager/commit`,
	type: 'get',
	data,
	noGlobalLoading: false
})

// 生成二维码
export const getQrcodeApi = data => request({
	url: `/open/platform/code_manager/path_qrcode`,
	type: 'get',
	data,
	noGlobalLoading: false
})

