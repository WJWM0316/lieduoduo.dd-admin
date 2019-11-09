import Layout from '@/pages/layout'

export const companyManage = [
  /* 公司库 */
  {
    path: "/companyManage",
    name: "companyManageIndex",
    component: Layout,
    meta: { title: "公司库" },
    children: [
      {
        path: "index",
        name: "companyManageIndex",
        meta: { title: "公司库" },
        component: resolve => require(["@/pages/index/index.vue"], resolve)
      },
      {
        path: "edit/:id",
        name: "editCheckCompany",
        meta: { title: "编辑公司信息" },
        component: resolve => require(["@/pages/index/createCompany.vue"], resolve)
      },
      {
        path: "detail",
        name: "companyInfo",
        meta: { title: "公司详情" },
        component: resolve => require(["@/pages/index/companyInfo.vue"], resolve)
      },
    ]
  }
]