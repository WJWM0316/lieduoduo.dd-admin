import { request } from "./index.js";

// 职位搜索列表
export const GetResumeAPI = data =>
  request({
    url: `/resume/search`,
    type: "get",
    data
  });
/* 简历详情 */
export const GetResumeDetailsAPI = data =>
  request({
    url: `/resume/detail/uid/${data}`,
    type: "get"
  });

// 获取所有学历定义
export const degreeListAPI = () =>
  request({
    url: `/degree/all`,
    type: "get"
  });

// 求职状态列表
export const jobhuntStatusAPI = data =>
  request({
    url: `/jobhunt_status/all`,
    type: "get"
  });
// 创建推荐单
export const createOrder = (positionId, data) =>
  request({
    url: `/advisor/recommend/resume/${positionId}`,
    type: "post",
    noGlobalLoading: true,
    data
  });
// 获取简历历史记录
export const GetResumeHistory = (uid, data) =>
  request({
    url: `/resume/history/${uid}`,
    type: "get",
    noGlobalLoading: true,
    data
  });

// 添加简历历史记录
export const addHistory = (uid, data) =>
  request({
    url: `/resume/history/${uid}`,
    type: "post",
    noGlobalLoading: true,
    data
  });

// 校验职位id
export const searchId = id =>
  request({
    url: `/position/recommend/${id}`,
    type: "get",
    noGlobalLoading: true
  });
