export const promiseRouters = [
	{
    "path": "/platformManage",
    "name": "platformManage",
    "meta": { "title": "平台管理" },
    "children": [
      {
        "path": "index",
        "name": "platformManageIndex",
        "meta": { "title": "平台信息" }
      },
      {
        "path": "publishMag",
        "name": "publishMag",
        "meta": { "title": "发版管理" }
      },
    ]
  },
  {
    "path": "/companyManage",
    "name": "companyManage",
    "meta": { "title": "公司库" },
    "children": [
      {
        "path": "index",
        "name": "companyManageIndex",
        "meta": { "title": "公司库" }
      }
    ]
  },
  {
    "path": "/userManage",
    "name": "userManage",
    "meta": { "title": "用户管理" },
    "children": [
      {
        "path": "index",
        "name": "userManageIndex",
        "meta": { "title": "用户管理" }
      }
    ]
  },
  {
    "path": "/recruiterManage",
    "name": "recruiterManage",
    "meta": { "title": "招聘官管理" },
    "children": [
      {
        "path": "index",
        "name": "recruiterManageIndex",
        "meta": { "title": "招聘官管理" },
      }
    ]
  },
  {
    "path": "/verifyManage",
    "name": "verifyManage",
    "meta": { "title": "审核管理" },
    "children": [
      {
        "path": "index",
        "name": "companyCheckIndex",
        "meta": { "title": "公司审核管理" }
      }
    ]
  }
]