import { request } from './index.js'


/* 招聘官审核列表 */
export const getRecruiterListApi = data => request({
  url: '/applyjoin/list',
  type: 'get',
  data
})

/* 招聘官审核详情 */
export const getReviewDetailsApi = data => request({
  url: `/applyjoin/${data}`,
  type: 'get'
})
