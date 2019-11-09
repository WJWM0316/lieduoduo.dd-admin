import Layout from '@/pages/layout'

export const verifyManage = [
  /* 审核管理 */
  {
    path: "/verifyManage",
    name: "verifyManage",
    meta: { title: "审核管理", keepAlive: false },
    component: Layout,
    children: [
      {
        path: "index",
        name: "companyCheckIndex",
        meta: { title: "公司审核管理", keepAlive: false },
        component: resolve => require(["@/pages/companyCheck/index.vue"], resolve),
      },
      {
        path: "verify",
        name: "verify",
        meta: { title: "公司审核", keepAlive: false },
        component: resolve => require(["@/pages/companyCheck/verify.vue"], resolve)
      }
    ]
  }
]