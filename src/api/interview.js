

import { request } from './index.js'


/* 面试申请列表 */
export const getApplyListApi = data => request({
  url: '/interview/apply',
  type: 'get',
  data
})
/* 获取不合适评价内容 */
export const getInterviewComment = uid => request({
  url: `/interview/getInterviewComment?interviewId=${uid}`,
  type: 'get',
})
/* 获取面试状态列表 */
export const getInterviewStatusType = uid => request({
  url: `/interview/getInterviewStatusType`,
  type: 'get',
})
/* 获取申请不合适二级列表 */
export const getNotSuitTypeList = uid => request({
  url: `/interview/getApplyNotSuitTypeList`,
  type: 'get',
})
/* 获取邀约不合适二级列表 */
export const getInviteNotSuitTypeList = uid => request({
  url: `/interview/getInviteNotSuitTypeList`,
  type: 'get',
})
/*获取申请列表面试状态一级列表 */
export const getApplyInterviewStatusType = uid => request({
  url: `/interview/getApplyInterviewStatusType`,
  type: 'get',
})
/*获取申请列表面试状态一级列表 */
export const getInviteInterviewStatusType = uid => request({
  url: `/interview/getInviteInterviewStatusType`,
  type: 'get',
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

/* 24h急速反馈列表 */
export const getQuickApplyInterviewApi = data => request({
  url: '/interview/quickApply',
  type: 'get',
  data,
  noGlobalLoading: true
})
