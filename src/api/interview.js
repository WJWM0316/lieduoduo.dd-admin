

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

