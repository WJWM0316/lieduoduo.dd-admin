import { request } from './index.js'

// 获取平台信息
export const getHomeApi = data => request({
	url: `/open/platform/mini_program/vcs/home`,
	type: 'get',
	data,
	noGlobalLoading: false
})

// 批量提交模板到体验服务
export const batchCommitsApi = data => request({
	url: `/open/platform/code_manager/commits`,
	type: 'post',
	data,
	noGlobalLoading: false
})

// 批量提交审核申请
export const batchSubmitstsApi = data => request({
	url: `/open/platform/code_manager/submits`,
	type: 'post',
	data,
	noGlobalLoading: false
})

// 批量发布小程序
export const batchReleasesApi = data => request({
	url: `/open/platform/code_manager/releases`,
	type: 'post',
	data,
	noGlobalLoading: false
})

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

// 获取对应小程序当前版本控制信息列表
export const getcodeManagerVcsListsApi = data => request({
	url: `/open/platform/code_manager/vcs`,
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

// 提交审核申请
export const postMiniAppApi = data => request({
	url: `/open/platform/code_manager/submit`,
	type: 'post',
	data,
	noGlobalLoading: false
})

// 生成二维码
export const getTemplateListNewApi = data => request({
	url: `/open/platform/code_manager/template_lists`,
	type: 'get',
	data,
	noGlobalLoading: false
})

// 撤销审核
export const deleteAuditApi = data => request({
	url: `/open/platform/code_manager/submit`,
	type: 'delete',
	data,
	noGlobalLoading: false
})

// 回滚代码版本[到上一个版本]
export const deleteReleaseApi = data => request({
	url: `/open/platform/mini_program/release`,
	type: 'delete',
	data,
	noGlobalLoading: false
})

// 发布
export const postReleaseApi = data => request({
	url: `/open/platform/mini_program/release`,
	type: 'post',
	data,
	noGlobalLoading: false
})
