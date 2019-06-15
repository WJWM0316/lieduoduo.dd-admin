import { request } from './index.js'


/* 行业领域 */
export const fieldApi = data => request({
  url: '/label/field',
  type: 'get',
  data
})

/* 上传文件 */
export const uploadApi = data => request({
  url: '/attaches',
  type: 'post',
  data
})
/*  左侧菜单栏 */
export const admin_menu = () => request({
  url: '/cur/admin_menu',
  type: 'get',
  noGlobalLoading: true
})
/* 登录 */
export const loginApi = data => request({
  url: '/auth/login',
  type: 'post',
  data
})

/* 上传身份证信息 */
export const uploadIdcardApi = data => request({
  url: '/attaches/idcard',
  type: 'post',
  data
})
/* 获取权益信息 */
export const rightInfoApi = data => request({
  url: '/rights',
  type: 'get',
  data
})
/* 获取销售人员名单 */
export const getSalerListApi = () => request({
  url: `/company/admin_user_list`,
  type: 'get',
  noGlobalLoading: true
})
