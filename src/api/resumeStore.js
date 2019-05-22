import { request } from './index.js';

// 职位搜索列表
export const GetResumeAPI = data => request({
	url: `/resume/search`,
	type: 'get',
	data
})