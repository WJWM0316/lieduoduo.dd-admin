import Layout from '@/pages/layout'

export const recruiterManage = [
  /* 招聘官管理 */
  {
    path: "/recruiterManage",
    name: "recruiterManageIndex",
    meta: { title: "招聘官管理" },
    component: Layout,
    children: [
      {
        path: "index",
        name: "recruiterManageIndex",
        meta: { title: "招聘官管理", haveParent: false, keepAlive: true },
        component: resolve => require(["@/pages/recruiterManage/recruiter.vue"], resolve)
      },
      {
        path: "detail/:id",
        name: "detail",
        meta: { title: "招聘官详情" },
        component: resolve => require(["@/pages/recruiterManage/info_recruiter.vue"], resolve)
      },
      {
        path: "edit/:id",
        name: "edit",
        meta: { title: "编辑招聘官信息" },
        component: resolve => require(["@/pages/recruiterManage/editRecruiter.vue"], resolve)
      }
    ]
  }
]