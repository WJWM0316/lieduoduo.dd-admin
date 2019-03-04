

import { request } from './index.js'


/* 招聘官审核列表 */
export const getApplyListApi = data => request({
  url: '/interview/apply',
  type: 'get',
  data
})