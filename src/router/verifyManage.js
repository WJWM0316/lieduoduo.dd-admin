import Layout from '@/pages/layout'

export const verifyManage = [
  /* 审核管理 */
  {
    path: "/verifyManage",
    name: "verifyManage",
    meta: { title: "审核管理" },
    component: Layout,
    children: [
      {
        path: "index",
        name: "companyCheckIndex",
        meta: { title: "公司审核管理" },
        component: resolve => require(["@/pages/companyCheck/index.vue"], resolve),
      },
      {
        path: "verify",
        name: "verify",
        meta: { title: "公司审核" },
        component: resolve => require(["@/pages/companyCheck/verify.vue"], resolve)
      },
      {
        path: "editCompanyInfo",
        name: "editCompanyInfo",
        meta: { title: "编辑公司信息" },
        component: resolve => require(["@/pages/companyCheck/editCompanyInfo.vue"], resolve)
      }
    ]
  }
]