

import { request } from './index.js'


/* 面试申请列表 */
export const getApplyListApi = data => request({
  url: '/interview/apply',
  type: 'get',
  data
})

/* 面试邀请列表 */
export const getInviteListApi = data => request({
  url: '/interview/invite',
  type: 'get',
  data
})

/* 获取简历小程序码 */
export const getResumeCodeUrlApi = data => request({
  url: '/resume/get_resume_code_url',
  type: 'get',
  data,
  noGlobalLoading: true //不需要loading
})

/* 获取招聘官主页小程序码 */
export const getRecruiterCodeUrlApi = data => request({
  url: '/applyjoin/get_recruiter_code_url',
  type: 'get',
  data,
  noGlobalLoading: true
})

/* 获取职位详情小程序码 */
export const getPositionCodeUrlApi = data => request({
  url: '/get_position_code_url',
  type: 'get',
  data,
  noGlobalLoading: true
})
