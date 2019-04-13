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
