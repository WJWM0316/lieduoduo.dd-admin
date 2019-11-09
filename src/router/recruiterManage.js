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
        component: resolve => require(["@/pages/user/recruiter.vue"], resolve)
      },
      {
        path: "detail",
        name: "detail",
        meta: { title: "招聘官详情" },
        component: resolve => require(["@/pages/user/info_recruiter.vue"], resolve)
      },
      {
        path: "edit",
        name: "edit",
        meta: { title: "编辑招聘官信息" },
        component: resolve => require(["@/pages/user/editRecruiter.vue"], resolve)
      }
    ]
  }
]