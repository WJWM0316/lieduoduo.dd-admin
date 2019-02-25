import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router/index'
let loadingInstance = null

import { getAccessToken, removeAccessToken } from './cacheService'

//开发状态
let isTest = false
const API_ROOT = process.env.VUE_APP_API

// 请求的跟地址
export const upload_api = `${API_ROOT}/attaches`
axios.defaults.baseURL = API_ROOT
// 请求拦截器
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({})
//  config.headers.Cookie = getAccessToken()
    config.headers.common['Authorization-Admin'] = getAccessToken()
    return config
  },
  error => {
    return Promise.error(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  res => {
    if (loadingInstance) loadingInstance.close()
    return res
  },
  err => {
    // 登陆过期或者未登录
    if(err.response.data.httpStatus === 401) {
      router.push({name: 'login'})
      removeAccessToken()
      Message.error(`登录状态已过期,请重新登录`)
    }
    if (loadingInstance) loadingInstance.close()
    return Promise.reject(err.response)
  }
)

export const request = ({type = 'post', url, data = {}, config = {}} = {}) => {
  if (data.globalLoading) {
    loadingInstance = Loading.service({})
    delete params.globalLoading
  }
  return axios[type](url, type === 'get' ? { params: data } : data)
  .catch(err => {
    /* 通用的错误捕获可以在这里操作 */
   return Promise.reject(err)
  })
}
