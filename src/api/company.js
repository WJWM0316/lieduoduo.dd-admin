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

/* 审核公司信息通过 */
export const temppassApi = data => request({
  url: `/company/temppass/${data}`,
  type: 'put'
})

/* 审核公司信息不通过 */
export const tempfailApi = (id, data) => request({
  url: `/company/tempfail/${id}`,
  type: 'put',
  data
})

/* 审核人员信息通过 */
export const identityPassApi = data => request({
  url: `/identity/pass/${data}`,
  type: 'put'
})

/* 审核人员信息不通过 */
export const identityFailApi = (id, data) => request({
  url: `/identity/fail/${id}`,
  type: 'put',
  data
})

/* 填写公司信息 */
export const setCompanyInfoApi = data => request({
  url: `/company`,
  type: 'post',
  data
})

/* 填写人员认证信息 */
export const setIdentityInfoApi = data => request({
  url: `/identity`,
  type: 'post',
  data
})

/* 获取地址 */
export const getCompanyAdressApi = data => request({
  url: `/company/position/address/${data.id}`,
  type: 'get'
})

/* 修改地址 */
export const editCompanyAdressApi = data => request({
  url: `/company/position/address/${data.id}`,
  type: 'post',
  data
})

/* 删除地址 */
export const deleteCompanyAdressApi = data => request({
  url: `/company/position/address/${data.id}`,
  type: 'delete',
  data
})

/* 添加地址 */
export const addCompanyAdressApi = data => request({
  url: `/company/position/address`,
  type: 'put',
  data
})

/* 分页获取地址列表 */
export const getAdressListApi = data => request({
  url: `/company/position/simplepage/addresses`,
  type: 'get',
  data
})
/* 获取录入公司列表 */
export const getCompanyListApi = data => request({
  url: `/company/list`,
  type: 'get',
  data
})

/* 获取录入公司详情 */
export const getCompanyInfoApi = data => request({
  url: `/company/${data}`,
  type: 'get'
})

/* 删除公司 */
export const deleteCompanyApi = data => request({
  url: `/company/${data}`,
  type: 'delete'
})

/* 编辑公司 */
export const editCompanyApi = (id, data) => request({
  url: `/company/${id}`,
  type: 'put',
  data
})

/* 编辑身份信息 */
export const editIdentityApi = (id, data) => request({
  url: `/identity/${id}`,
  type: 'put',
  data
})

/* 编辑身份信息 */
export const getIdentityApi = (id, data) => request({
  url: `/identity/${id}`,
  type: 'get',
  data
})

/* 添加公司地址 */
export const addCompanyAddressApi = (id, data) => request({
  url: `/company/address/${id}`,
  type: 'put',
  data
})

/* 删除公司地址 */
export const delCompanyAddressApi = (id) => request({
  url: `/company/address/${id}`,
  type: 'delete'
})

/* 城市标签 */
export const getCityApi = () => request({
  url: `/area?level=3`,
  type: 'get'
})
/* 获取销售人员名单 */
export const getSalerListApi = () => request({
  url: `/company/admin_user_list`,
  type: 'get'
})