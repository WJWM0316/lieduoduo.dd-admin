import { request } from './index.js'


/* 公司审核列表 */
export const login = data => request({
  url: '/auth/login',
  type: 'post',
  data
})

/* 公司审核列表 */
export const templistApi = data => request({
  url: '/company/templist',
  type: 'get',
  data
})

/* 获取审核公司基本信息 */
export const getCompanyInfo = data => request({
  url: `/company/temp/${data}`,
  type: 'get'
})

/* 审核通过 */
export const temppassApi = data => request({
  url: `/company/temppass/${data}`,
  type: 'put'
})

/* 审核不通过 */
export const tempfailApi = data => request({
  url: `/company/tempfail/${data}`,
  type: 'put'
})