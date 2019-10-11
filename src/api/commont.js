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
/* 获取客户等级 */
export const getCompanyCustomerLevelRangeApi = () => request({
  url: `/company/customer_level/range`,
  type: 'get',
  noGlobalLoading: true
})
/* 顾问推荐 - 顾问列表 */
export const getAdvisorUserListApi = () => request({
  url: `/advisor/user/list`,
  type: 'get',
  noGlobalLoading: true
})
/* 公司库添加跟进人/修改跟进人 */
export const setCompanyAdvisorApi = data => request({
  url: `/company/set/advisor/${data.id}`,
  type: 'put',
  data,
  noGlobalLoading: true
})
/* 扣点（实扣点） */
export const payRecommendApi = data => request({
  url: `/recommend/pay/${data.recommendId}`,
  type: 'post',
  data,
  noGlobalLoading: true
})
/* 返点 */
export const refundRecommendApi = data => request({
  url: `/recommend/refund/${data.recommendId}`,
  type: 'post',
  data,
  noGlobalLoading: true
})

/* 获取职业素养标签列表 */
export const getLabelProfessionalLiteracyListApi = data => request({
  url: `/label/professionalLiteracy`,
  type: 'get',
  noGlobalLoading: true
})

/* 职位技能列表 */
export const getLabelProfessionalSkillsListApi = data => request({
  url: `/label/professionalSkills`,
  type: 'get',
  noGlobalLoading: true
})

// 查看生成小程序链接
export const generatebindUrlApi = data => request({
	url: `/open/platform/auth/url/`,
	type: 'get',
	data
})
