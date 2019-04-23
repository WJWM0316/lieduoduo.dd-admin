import { request } from './index.js'


/* 招聘官审核列表 */
export const getRecruiterListApi = data => request({
  url: '/applyjoin/newList',
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
  data,
  noGlobalLoading: true
})
/* 身份证信息校验 */
export const checkUserauthApi = data => request({
  url: `/usermanage/userauth`,
  type: 'post',
  data
})
/* 身份证信息编辑并校验 */
export const editUserauthApi = (uid, data) => request({
  url: `/usermanage/userauth/${uid}`,
  type: 'post',
  data
})
/* 创建用户 */
export const createdUserApi = data => request({
  url: `/usermanage/user`,
  type: 'post',
  data
})
/* 编辑用户 */
export const editUserApi = (uid, data) => request({
  url: `/usermanage/user/${uid}`,
  type: 'put',
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
/* 开启招聘官发布职位权限 */
export const onCreatedRightApi = data => request({
  url: `/usermanage/create_position/block/${data}`,
  type: 'delete'
})
/* 关闭招聘官发布职位权限 */
export const offCreatedRightApi = data => request({
  url: `/usermanage/create_position/block/${data}`,
  type: 'post'
})
