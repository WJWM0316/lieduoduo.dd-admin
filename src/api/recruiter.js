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

/* 校验手机号码 */
export const detectionMobileApi = data => request({
  url: `/usermanage/is_existed/mobile`,
  type: 'post',
  data
})
/* 身份证信息校验 */
export const checkUserauthApi = data => request({
  url: `/usermanage/userauth`,
  type: 'post',
  data
})
/* 创建用户 */
export const createdUserApi = data => request({
  url: `/usermanage/user`,
  type: 'post',
  data
})
/* 获取用户列表 */
export const getUserListApi = data => request({
  url: `/usermanage/users/search`,
  type: 'get',
  data
})
/* 获取用户详情 */
export const getUserInfoApi = data => request({
  url: `/usermanage/user/detail/${data}`,
  type: 'get'
})


