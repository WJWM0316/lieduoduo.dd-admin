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
        component: resolve => require(["@/pages/companyManage/index.vue"], resolve)
      },
      {
        path: "edit",
        name: "editCompanyInfo",
        meta: { title: "编辑公司信息" },
        component: resolve => require(["@/pages/companyManage/editCompany.vue"], resolve)
      },
      {
        path: "create",
        name: "createCompanyInfo",
        meta: { title: "新建公司" },
        component: resolve => require(["@/pages/companyManage/editCompany.vue"], resolve)
      },
      {
        path: "detail",
        name: "companyInfo",
        meta: { title: "公司详情" },
        component: resolve => require(["@/pages/companyManage/companyInfo.vue"], resolve)
      },
    ]
  }
]