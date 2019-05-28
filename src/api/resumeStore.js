import { request } from './index.js';

// 职位搜索列表
export const GetResumeAPI = data => request({
	url: `/resume/search`,
	type: 'get',
	data
})
/* 简历详情 */
export const GetResumeDetailsAPI = data => request({
	url: `/resume/detail/uid/${data}`,
	type: 'get',
})

// 获取所有学历定义
export const degreeListAPI = () => request({
	url: `/degree/all`,
	type: 'get',
})

// 求职状态列表
export const jobhuntStatusAPI = data => request({
	url: `/jobhunt_status/all`,
	type: 'get',
})

// 获取简历历史记录
export const GetResumeHistory = data => request({
	url: `/resume/history/${data}`,
	type: 'get',
	noGlobalLoading: true,
})

// 添加简历历史记录
export const addHistory = (uid,data) => request({
	url: `/resume/history/${uid}`,
	type: 'post',
	noGlobalLoading: true,
	data
})